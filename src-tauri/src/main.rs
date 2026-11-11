#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod java;

use tauri_plugin_opener::OpenerExt;

#[tauri::command]
fn open_reference(app: tauri::AppHandle, url: String) -> Result<(), String> {
    let parsed = tauri::Url::parse(&url).map_err(|_| "Invalid reference URL")?;
    let course_site = matches!(
        parsed.host_str(),
        Some("leetcode.com" | "dev.java" | "docs.oracle.com")
    ) || (parsed.host_str() == Some("exercism.org")
        && parsed.path().starts_with("/tracks/java/exercises/"));
    if parsed.scheme() != "https"
        || !course_site
        || !parsed.username().is_empty()
        || parsed.password().is_some()
        || parsed.port().is_some()
    {
        return Err("This reference is outside the approved course sites.".into());
    }
    app.opener()
        .open_url(url, None::<&str>)
        .map_err(|err| err.to_string())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![java::run_java, open_reference])
        .run(tauri::generate_context!())
        .expect("could not launch Java Quest");
}
