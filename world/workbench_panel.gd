extends Node
## Hosts the existing workbench inside the game window. Java runs through the localhost service.

signal returned_to_ruin
const EXTENSION = "res://addons/godot_wry/WRY.gdextension"
const EXTERNAL_LINKS = [
	"https://exercism.org/tracks/java/exercises/",
	"https://leetcode.com/",
	"https://dev.java/",
	"https://docs.oracle.com/",
]
var origin: String
var opened := false
var view: Control
var available := false


func initialize(loopback_origin: String) -> void:
	origin = loopback_origin
	if OS.get_name() != "Windows" or DisplayServer.get_name() == "headless":
		return
	if not ClassDB.class_exists("WebView"):
		GDExtensionManager.load_extension(EXTENSION)
	available = ClassDB.class_exists("WebView")


func open(route: String = "") -> bool:
	if not available:
		return false
	if not view:
		view = ClassDB.instantiate("WebView") as Control
		if not view:
			return false
		view.set("url", origin + "/?mode=game" + ("#" + route if not route.is_empty() else ""))
		view.set("data_directory", "user://java-workbench")
		view.set("full_window_size", true)
		view.set("forward_input_events", false)
		view.set("focused_when_created", true)
		view.set("clipboard", true)
		view.set("devtools", false)
		view.connect("ipc_message", receive_message)
		opened = true
		add_child(view)
	else:
		opened = true
		view.call("set_visible", true)
		if not route.is_empty():
			view.call("eval", "location.hash = " + JSON.stringify(route))
		view.call("focus")
	return true


func close() -> void:
	if not opened:
		return
	opened = false
	view.call("eval", 'document.querySelector("audio")?.pause()')
	view.call("set_visible", false)
	view.call("focus_parent")
	returned_to_ruin.emit()


func receive_message(raw: String) -> void:
	if not opened or raw.length() > 2048:
		return
	var data: Variant = JSON.parse_string(raw)
	if not data is Dictionary:
		return
	match data.get("type"):
		"return-to-ruin":
			close()
		"open-reference":
			var url: Variant = data.get("url")
			if not url is String:
				return
			for prefix in EXTERNAL_LINKS:
				if url.begins_with(prefix):
					OS.shell_open(url)
					break
