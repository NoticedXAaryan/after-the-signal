extends RefCounted
## A local narrative save. Story IDs and capabilities do not depend on a programming language.

const SAVE = "user://story-v1.json"
var registry: Dictionary
var content: Dictionary
var data: Dictionary = {}
var save_ok := true

func _init() -> void:
	registry = JSON.parse_string(FileAccess.get_file_as_string("res://story/registry.json"))
	content = JSON.parse_string(FileAccess.get_file_as_string("res://story/opening.json"))
	data = defaults()
	for path in [SAVE, SAVE + ".bak"]:
		if not FileAccess.file_exists(path):
			continue
		var parsed: Variant = JSON.parse_string(FileAccess.get_file_as_string(path))
		if parsed is Dictionary and parsed.get("schema") == 1 and parsed.get("flags") is Dictionary and parsed.get("dialogue") is Dictionary:
			data.merge(parsed, true)
			break
	# Missing or new content does not delete the save. Unknown values fall back to current choices.
	if not data.dialogue.is_empty() and not content.nodes.has(data.dialogue.get("node", "")):
		data["suspended_dialogue"] = data.dialogue.duplicate(true)
		data.dialogue = {}

func defaults() -> Dictionary:
	return {"schema":1,"campaign_id":"common-dawn","content_version":1,"started":false,
		"player_name":"Ash","track_id":"java","goal_id":"understand","flags":{},
		"capabilities":[],"completed_missions":[],"choices":[],"rook_trust":0,"dialogue":{},
		"settings":{"reduced_motion":false,"instant_text":true}}

func start(player_name: String, goal_id: String, track_id: String = "java") -> void:
	var settings: Dictionary = data.settings.duplicate()
	if data.started and FileAccess.file_exists(SAVE):
		DirAccess.copy_absolute(SAVE, "user://story-before-restart-" + str(Time.get_unix_time_from_system()).replace(".", "-") + ".json")
	data = defaults()
	data.settings = settings
	data.started = true
	data.player_name = player_name.strip_edges().left(24) if not player_name.strip_edges().is_empty() else "Ash"
	data.goal_id = goal_id
	data.track_id = track_id
	begin("opening", "intro_done")

func save() -> bool:
	var file := FileAccess.open(SAVE + ".tmp", FileAccess.WRITE)
	if not file:
		save_ok = false
		return false
	file.store_string(JSON.stringify(data, "\t"))
	file.close()
	if FileAccess.file_exists(SAVE):
		DirAccess.copy_absolute(SAVE, SAVE + ".bak")
	save_ok = DirAccess.rename_absolute(SAVE + ".tmp", SAVE) == OK
	return save_ok

func goal() -> Dictionary:
	for entry in registry.goals:
		if entry.id == data.goal_id:
			return entry
	return registry.goals[0]

func track() -> Dictionary:
	for entry in registry.tracks:
		if entry.id == data.track_id:
			return entry
	return {"id":data.track_id,"name":"Unavailable expedition","available":false}

func text(raw: String) -> String:
	var replacements := {"player":data.player_name,"language":track().name,"intent":goal().intent,"guidance":goal().guidance,
		"rook_output":"Let's see the log you promised." if data.flags.get("approach") == "public" else "What should that word allow us to do?",
		"rook_receipt":"You kept the promise. I can follow what changed." if data.rook_trust > 0 else "One receipt is a beginning. I still want to see the failures.",
		"rook_after":"Bring me the test that surprised you. That's usually where the useful work begins." if data.rook_trust > 0 else "Keep showing me what a repair cannot do. Trust can wait for evidence."}
	for key in replacements:
		raw = raw.replace("{" + key + "}", str(replacements[key]))
	return raw

func begin(node: String, completion: String = "") -> void:
	data.dialogue = {"node":node,"line":0,"completion":completion}
	save()

func node() -> Dictionary:
	return content.nodes.get(data.dialogue.get("node",""), {})

func finish_or_move(next: String) -> bool:
	if next == "@end":
		var completion: String = data.dialogue.get("completion","")
		if not completion.is_empty():
			data.flags[completion] = true
		data.dialogue = {}
		save()
		return true
	data.dialogue.node = next
	data.dialogue.line = 0
	save()
	return false

func advance() -> bool:
	if data.dialogue.is_empty():
		return true
	if int(data.dialogue.line) + 1 < node().lines.size():
		data.dialogue.line += 1
		save()
		return false
	if node().has("choices"):
		return false
	return finish_or_move(node().get("next", "@end"))

func choose(index: int) -> bool:
	var choices: Array = node().get("choices", [])
	if index < 0 or index >= choices.size():
		return false
	var choice: Dictionary = choices[index]
	data.flags.merge(choice.get("set", {}), true)
	data.rook_trust = clampi(int(data.rook_trust) + int(choice.get("trust",0)), -4, 4)
	data.choices.append(choice.label)
	return finish_or_move(choice.next)

func grant(capability: String) -> void:
	if not data.capabilities.has(capability):
		data.capabilities.append(capability)
		save()

func complete_mission(id: String) -> bool:
	for mission in registry.missions:
		if mission.id != id:
			continue
		for prerequisite in mission.requires:
			if not data.capabilities.has(prerequisite):
				return false
		for capability in mission.grants:
			grant(capability)
		if not data.completed_missions.has(id):
			data.completed_missions.append(id)
			save()
		return true
	return false

func objective() -> String:
	if not data.flags.get("intro_done", false):
		return "Speak with Mara and Rook before the first trial."
	if not data.capabilities.has("terminal.output"):
		return "Read Wick's note. At Terminal 01, pass the first output lesson."
	if not data.flags.get("output_debrief", false):
		return "Return to Rook and explain what READY actually proves."
	if not data.capabilities.has("records.receipt"):
		return "Complete First steps and print a supply receipt in the workbench."
	if not data.flags.get("chapter_one_done", false):
		return "Show Rook the receipt and hear Mara's account."
	return "The Smallest Promise is complete. Continue learning in the Java workbench."
