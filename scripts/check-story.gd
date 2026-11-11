extends SceneTree
## Run only with AFTER_SIGNAL_TEST_RUN=1 and an isolated APPDATA directory.

const State = preload("res://story_state.gd")
var errors: Array[String] = []

func check(value: bool, why: String) -> void:
	if not value:
		errors.append(why)
		push_error(why)

func _initialize() -> void:
	call_deferred("run")

func finish(state: RefCounted, choice: int = 0) -> void:
	for i in range(80):
		if state.data.dialogue.is_empty():
			return
		var last: bool = int(state.data.dialogue.line) + 1 == state.node().lines.size()
		if last and state.node().has("choices"):
			state.choose(choice)
		else:
			state.advance()
	check(false, "A conversation failed to finish.")

func run() -> void:
	if OS.get_environment("AFTER_SIGNAL_TEST_RUN") != "1":
		push_error("Use an isolated test profile; no story state was changed.")
		quit(1)
		return
	var variants: Array[String] = []
	for branch in range(3):
		var state = State.new()
		state.start("Nora", "build")
		check(not state.complete_mission("cairn.receipt"), "A repair must require its declared capability.")
		finish(state, branch)
		check(state.data.flags.get("intro_done", false), "The introduction must finish.")
		check(state.text("{player} chose {language} to {intent}.").contains("Nora chose Java"), "Player and track text must resolve.")
		var approach: String = state.data.flags.approach
		check(approach in ["public","proof","shared"], "A real approach must be recorded.")
		state.begin("rook_" + approach)
		variants.append(state.node().lines[0][1])
		finish(state)
		state.complete_mission("cairn.first-output")
		state.begin("output", "output_debrief")
		finish(state, 0)
		state.complete_mission("cairn.receipt")
		state.begin("receipt", "chapter_one_done")
		finish(state, branch % 2)
		check(state.data.flags.get("chapter_one_done", false), "Receipt dialogue must complete the chapter.")
		check(state.save(), "Story save must succeed.")
		var loaded = State.new()
		check(loaded.data.flags == state.data.flags, "Continue must preserve choices.")
		check(loaded.data.capabilities == state.data.capabilities, "Continue must preserve capabilities.")
	check(variants[0] != variants[1] and variants[1] != variants[2], "Rook must respond differently to each promise.")
	var future = State.new()
	future.data.track_id = "future-language"
	future.begin("a-future-story-node")
	var retained = State.new()
	check(retained.data.track_id == "future-language", "Unknown track IDs must survive.")
	check(retained.data.has("suspended_dialogue"), "Unavailable dialogue must be retained.")

	var shell = load("res://main.tscn").instantiate()
	root.add_child(shell)
	await process_frame
	shell.start_loading(false)
	shell.cancel_loading()
	check(shell.mode == "title", "Back from loading must return to title.")
	shell.show_new()
	shell.character_name.text = "Nora"
	shell.goal_choice.select(1)
	shell.begin_new()
	for i in range(30):
		await create_timer(0.1).timeout
		if shell.mode == "dialogue":
			break
	check(shell.mode == "dialogue", "Loading must reach the opening dialogue.")
	for i in range(40):
		if shell.mode != "dialogue":
			break
		if shell.story.node().has("choices") and int(shell.story.data.dialogue.line) + 1 == shell.story.node().lines.size():
			shell.choose(2)
		else:
			shell.advance_dialogue()
		await process_frame
	check(shell.mode == "world", "Finishing the introduction must allow exploration.")
	check(not shell.ruin.story_blocked, "Exploration controls must be released.")
	var pos: Vector3 = shell.ruin.player.position
	shell.pause()
	check(shell.ruin.story_blocked, "Pause must stop walking.")
	shell.resume()
	check(shell.ruin.player.position == pos, "Resume must keep the player's position.")
	shell.interact("rook")
	check(shell.story.data.dialogue.node == "rook_shared", "The scene must choose dialogue from the saved approach.")
	shell.show_journal()
	check(shell.mode == "journal", "Journal must open.")
	shell.return_to_title()
	check(shell.mode == "title", "Back to title must work.")
	shell.queue_free()
	await process_frame
	if errors.is_empty():
		print("Verified: three story branches, goal text, save/continue, future-ID preservation, actual loading, pause/resume, journal, and return to title.")
	quit(0 if errors.is_empty() else 1)
