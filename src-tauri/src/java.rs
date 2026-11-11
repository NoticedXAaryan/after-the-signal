use serde::{Deserialize, Serialize};
use std::env;
use std::fs::{self, File};
use std::io::Read;
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};
use std::thread;
use std::time::{Duration, Instant};

const OUTPUT_LIMIT: u64 = 500_000;
static RUNNER: std::sync::Mutex<()> = std::sync::Mutex::new(());

#[derive(Deserialize)]
pub struct Job {
    files: Vec<(String, String)>,
    main: String,
    input: Option<String>,
}

#[derive(Serialize)]
pub struct Run {
    ok: bool,
    stdout: String,
    stderr: String,
    failure: String,
}

fn jdk_dir() -> Option<PathBuf> {
    let executable = if cfg!(windows) { "javac.exe" } else { "javac" };
    let bin_exists = |root: &Path| root.join("bin").join(executable).is_file();
    if let Some(root) = env::var_os("JAVA_HOME").map(PathBuf::from) {
        if bin_exists(&root) {
            return Some(root.join("bin"));
        }
    }
    if cfg!(windows) {
        let root = Path::new("C:/Program Files/Java");
        let mut candidates: Vec<_> = fs::read_dir(root)
            .into_iter()
            .flatten()
            .filter_map(Result::ok)
            .filter(|entry| entry.file_name().to_string_lossy().starts_with("jdk-"))
            .filter(|entry| bin_exists(&entry.path()))
            .map(|entry| entry.path())
            .collect();
        candidates.sort_by_key(|path| {
            path.file_name()
                .unwrap_or_default()
                .to_string_lossy()
                .split(|c: char| !c.is_ascii_digit())
                .filter_map(|part| part.parse::<u32>().ok())
                .collect::<Vec<_>>()
        });
        return candidates.pop().map(|root| root.join("bin"));
    }
    None
}

fn process(
    bin: Option<&Path>,
    name: &str,
    args: &[&str],
    dir: &Path,
    timeout: Duration,
    input: Option<&str>,
) -> Result<Run, String> {
    let stdout = dir.join("stdout.txt");
    let stderr = dir.join("stderr.txt");
    let stdin = match input {
        Some(text) => {
            let path = dir.join("stdin.txt");
            fs::write(&path, text).map_err(|e| e.to_string())?;
            Stdio::from(File::open(path).map_err(|e| e.to_string())?)
        }
        None => Stdio::null(),
    };
    let executable = match bin {
        Some(bin) => bin.join(if cfg!(windows) {
            format!("{name}.exe")
        } else {
            name.into()
        }),
        None => PathBuf::from(name),
    };
    let mut command = Command::new(executable);
    command
        .args(args)
        .current_dir(dir)
        .stdin(stdin)
        .stdout(File::create(&stdout).map_err(|e| e.to_string())?)
        .stderr(File::create(&stderr).map_err(|e| e.to_string())?);
    #[cfg(windows)]
    {
        use std::os::windows::process::CommandExt;
        command.creation_flags(0x08000000);
    }
    let mut child = command.spawn().map_err(|e| {
        if e.kind() == std::io::ErrorKind::NotFound {
            "Install a JDK or set JAVA_HOME to its installation folder.".into()
        } else {
            e.to_string()
        }
    })?;
    let started = Instant::now();
    let (ok, failure) = loop {
        let failure = if [&stdout, &stderr]
            .iter()
            .any(|p| fs::metadata(p).is_ok_and(|meta| meta.len() > OUTPUT_LIMIT))
        {
            "Output limit exceeded."
        } else if started.elapsed() >= timeout {
            "Time limit exceeded."
        } else {
            ""
        };
        if !failure.is_empty() {
            let _ = child.kill();
            let _ = child.wait();
            break (false, failure.to_string());
        }
        if let Some(status) = child.try_wait().map_err(|e| e.to_string())? {
            break (status.success(), String::new());
        }
        thread::sleep(Duration::from_millis(15));
    };
    let read = |path| -> Result<String, String> {
        let mut bytes = Vec::new();
        File::open(path)
            .and_then(|file| file.take(OUTPUT_LIMIT).read_to_end(&mut bytes))
            .map_err(|err| err.to_string())?;
        Ok(String::from_utf8_lossy(&bytes).into_owned())
    };
    Ok(Run {
        ok,
        stdout: read(stdout)?,
        stderr: read(stderr)?,
        failure,
    })
}

fn execute(job: Job) -> Result<Run, String> {
    let _runner = RUNNER
        .try_lock()
        .map_err(|_| "A Java run is already in progress.")?;
    let allowed = [
        "Solution.java",
        "Support.java",
        "Judge.java",
        "Measure.java",
        "Main.java",
        "Baseline.java",
        "Reference.java",
    ];
    if !matches!(job.main.as_str(), "Main" | "Judge" | "Measure")
        || job.files.is_empty()
        || job.files.len() > 7
        || job
            .files
            .iter()
            .any(|(name, code)| !allowed.contains(&name.as_str()) || code.len() > 850_000)
        || job.input.as_ref().is_some_and(|input| input.len() > 48_000)
    {
        return Err("Invalid or oversized Java job.".into());
    }
    let dir = tempfile::Builder::new()
        .prefix("java-quest-")
        .tempdir()
        .map_err(|e| e.to_string())?;
    let mut args = vec!["-encoding", "UTF-8", "-proc:none"];
    for (name, code) in &job.files {
        fs::write(dir.path().join(name), code).map_err(|e| e.to_string())?;
        args.push(name);
    }
    let jdk = jdk_dir();
    let compile = process(
        jdk.as_deref(),
        "javac",
        &args,
        dir.path(),
        Duration::from_secs(12),
        None,
    )?;
    if !compile.ok {
        return Ok(compile);
    }
    process(
        jdk.as_deref(),
        "java",
        &["-Dfile.encoding=UTF-8", "-Xmx160m", "-cp", ".", &job.main],
        dir.path(),
        Duration::from_secs(5),
        job.input.as_deref(),
    )
}

#[tauri::command]
pub async fn run_java(job: Job) -> Result<Run, String> {
    tauri::async_runtime::spawn_blocking(move || execute(job))
        .await
        .map_err(|err| err.to_string())?
}
