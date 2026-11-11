# Play After the Signal in Godot

On Windows x64, extract the complete portable folder and double-click **Play After the Signal.cmd**. The folder contains the engine, the Node runtime, and the local learning app. It needs the Windows WebView2 Runtime and a JDK 17 or newer. The game is local and does not need an account.

1. Choose **Begin a new journey** or **Continue** from the title. Name the protagonist, choose Java, and choose a study goal. Read the opening conversation and decide what to promise Rook.
2. Walk with WASD or the arrow keys. Press **E** to read Mara's note from the wind-up courier or talk to Rook.
3. Approach Terminal 01 and press **E** to open the lesson inside the game window. **F2** or the HUD button opens the workbench from anywhere.
4. Run a demonstration, write Java in the editor, and choose **Check level**. For unrestricted access to the problem bank, choose **Open practice**. The campaign, narration, stars, draft editor, tests, notes, and timed sessions all use the same workbench as the standalone app.
5. Choose **Return to ruin** in the workbench header or press **F2** to walk again. A passing Level 1 submission lights the terminal. Talk to Rook about what you proved. The First steps receipt checkpoint changes the display to RECORDED and opens the chapter's final conversation.

Use **J** to inspect your objective and recorded choices. **Esc** opens the pause menu; **Save and return to title** keeps your place. Story saves and workbench saves are separate, so beginning another story does not clear your code or earned stars.

Tab indents in the editor, Shift+Tab unindents, and Ctrl+Enter runs an example. See the editor's shortcut guide for more. The game saves your work locally in its own WebView2 profile; browser and Tauri saves stay in their respective profiles.

[Preview the workbench running inside the Godot window](in-game-workbench.png).

## Build

From the source project, run `pnpm install --frozen-lockfile`, then open **Play After the Signal.cmd** with the Windows Godot 4 binary available through `GODOT_BIN` or on PATH. The launcher also looks for the local development runtime when present. The project includes the pinned [Godot WRY](https://github.com/doceazedo/godot_wry/releases/tag/v1.0.2) Windows DLL and its license.

To make a portable folder, run `node scripts/build-game.mjs` on Windows x64. Set `GODOT_BIN` to the Godot Windows executable and `DSA_RUNTIME_LICENSES` to a directory containing `Godot-LICENSE.txt`, `Godot-COPYRIGHT.txt`, and `Node-LICENSE.txt` from the exact runtime versions being packaged. The build bundles the editor before copying files, so the portable game doesn't need pnpm or node_modules. Its game host defaults to port 4180 and shuts down when the game closes.
