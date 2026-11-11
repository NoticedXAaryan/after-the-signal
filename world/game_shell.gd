extends Node
## Native title, scene loading, dialogue, and journal. Grading stays in the workbench.

const StoryState = preload("res://story_state.gd")
const RUIN = "res://first_ruin.tscn"
var story := StoryState.new()
var ui := Control.new()
var layer := CanvasLayer.new()
var ruin: Node
var mode := "title"
var return_mode := "world"
var loading := false
var practice_only := false
var load_bar: ProgressBar
var load_text: Label
var text_box: RichTextLabel
var reveal := 0.0
var background: TextureRect
var character_name: LineEdit
var goal_choice: OptionButton
var track_choice: OptionButton
var body_font := SystemFont.new()
var heading_font := SystemFont.new()
var loading_started := 0
var menu_motion: Tween

func _ready() -> void:
	body_font.font_names = PackedStringArray(["Segoe UI", "Arial"])
	heading_font.font_names = PackedStringArray(["Georgia", "Times New Roman"])
	get_window().title = "After the Signal"
	layer.layer = 20
	add_child(layer)
	layer.add_child(ui)
	ui.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	ui.add_theme_font_override("font", body_font)
	show_title()

func _process(delta: float) -> void:
	if mode == "dialogue" and is_instance_valid(text_box) and not story.data.settings.instant_text and not story.data.settings.reduced_motion:
		reveal += delta * 34
		text_box.visible_characters = int(reveal)
	if not loading:
		return
	var progress: Array = []
	var status := ResourceLoader.load_threaded_get_status(RUIN, progress)
	if is_instance_valid(load_bar):
		load_bar.value = float(progress[0]) * 100.0 if not progress.is_empty() else 0.0
	if status == ResourceLoader.THREAD_LOAD_LOADED and Time.get_ticks_msec() - loading_started >= 500:
		loading = false
		load_text.text = "Opening the ridge office…"
		call_deferred("_enter_world")
	elif status == ResourceLoader.THREAD_LOAD_FAILED or status == ResourceLoader.THREAD_LOAD_INVALID_RESOURCE:
		loading = false
		load_text.text = "The ridge office could not load. Return to the title and try again."

func _unhandled_key_input(event: InputEvent) -> void:
	if not event is InputEventKey or not event.pressed or event.echo:
		return
	var key: Key = event.physical_keycode if event.physical_keycode != KEY_NONE else event.keycode
	if key == KEY_ESCAPE:
		if mode == "loading":
			cancel_loading()
		elif mode in ["settings", "credits", "new"]:
			show_title()
		elif mode in ["pause", "journal"]:
			resume()
		elif mode != "title":
			pause()
		get_viewport().set_input_as_handled()
	elif mode == "dialogue" and key in [KEY_ENTER, KEY_SPACE]:
		advance_dialogue()
		get_viewport().set_input_as_handled()
	elif mode == "world" and key == KEY_J:
		show_journal()
		get_viewport().set_input_as_handled()

func clear_ui(next_mode: String) -> void:
	if menu_motion and menu_motion.is_valid():
		menu_motion.kill()
	for child in ui.get_children():
		child.queue_free()
	mode = next_mode
	ui.visible = true
	ui.mouse_filter = Control.MOUSE_FILTER_STOP
	text_box = null
	background = null
	if is_instance_valid(ruin):
		ruin.story_blocked = next_mode != "world"
		ruin.hud_layer.visible = next_mode == "world"

func texture(path: String) -> Texture2D:
	var image := Image.new()
	var err := image.load_svg_from_string(FileAccess.get_file_as_string(path)) if path.ends_with(".svg") else image.load(path)
	return ImageTexture.create_from_image(image) if err == OK else null

func backdrop(dim: float = 0.4) -> void:
	if mode in ["title", "new", "settings", "credits", "loading"]:
		background = TextureRect.new()
		background.texture = texture("res://assets/title.webp")
		background.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
		background.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_COVERED
		ui.add_child(background)
		background.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
		background.mouse_filter = Control.MOUSE_FILTER_IGNORE
	var shade := ColorRect.new()
	shade.color = Color(0.035, 0.065, 0.06, dim)
	ui.add_child(shade)
	shade.set_anchors_and_offsets_preset(Control.PRESET_FULL_RECT)
	shade.mouse_filter = Control.MOUSE_FILTER_IGNORE

func label(text: String, size: int = 19, color: Color = Color("#eee4d0")) -> Label:
	var item := Label.new()
	item.text = text
	item.add_theme_font_override("font", body_font)
	item.add_theme_font_size_override("font_size", size)
	item.add_theme_color_override("font_color", color)
	item.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	return item

func heading(text: String, size: int = 38) -> Label:
	var item := label(text, size)
	item.add_theme_font_override("font", heading_font)
	return item

func button(text: String, action: Callable) -> Button:
	var item := Button.new()
	item.text = text
	item.custom_minimum_size = Vector2(250, 43)
	item.alignment = HORIZONTAL_ALIGNMENT_LEFT
	item.add_theme_font_override("font", body_font)
	item.add_theme_font_size_override("font_size", 18)
	var normal := StyleBoxFlat.new()
	normal.bg_color = Color("#172b25e8")
	normal.border_color = Color("#617864")
	normal.set_border_width_all(1)
	normal.content_margin_left = 15
	normal.content_margin_right = 15
	item.add_theme_stylebox_override("normal", normal)
	var hover := normal.duplicate() as StyleBoxFlat
	hover.bg_color = Color("#365448")
	hover.border_color = Color("#c8bd8d")
	item.add_theme_stylebox_override("hover", hover)
	item.add_theme_stylebox_override("focus", hover)
	item.pressed.connect(action)
	return item

func column(at: Vector2, width: float) -> VBoxContainer:
	var box := VBoxContainer.new()
	box.position = at
	box.custom_minimum_size.x = width
	box.size.x = width
	box.add_theme_constant_override("separation", 10)
	ui.add_child(box)
	return box

func show_title() -> void:
	loading = false
	clear_ui("title")
	backdrop(0.4)
	if not story.data.settings.reduced_motion:
		menu_motion = create_tween().set_loops()
		menu_motion.tween_property(background, "modulate", Color(0.94, 0.97, 0.95), 5.0)
		menu_motion.tween_property(background, "modulate", Color.WHITE, 5.0)
	var box := column(Vector2(58, 35), 410)
	box.add_child(label("THE COMMON DAWN", 14, Color("#dbbd86")))
	var mark := TextureRect.new()
	mark.texture = texture("res://assets/signal-wordmark.svg")
	mark.custom_minimum_size = Vector2(365, 90)
	mark.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
	mark.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
	box.add_child(mark)
	box.add_child(label("Keep a record. Leave a way back.", 22))
	box.add_child(label("A programming adventure about what we rebuild,\nand who gets to decide.", 17))
	box.add_child(HSeparator.new())
	if story.data.started:
		var cont := button("Continue · " + str(story.data.player_name), func(): start_loading(false))
		box.add_child(cont)
		cont.grab_focus()
	var begin := button("Begin a new journey", show_new)
	box.add_child(begin)
	if not story.data.started:
		begin.grab_focus()
	box.add_child(button("Java workbench", func(): start_loading(true)))
	box.add_child(button("Settings", show_settings))
	box.add_child(button("Credits", show_credits))
	box.add_child(button("Quit", func(): get_tree().quit()))
	var footer := label("THE SMALLEST PROMISE · OPENING CHAPTER\nJava is playable. More expeditions will share this world.", 13, Color("#c4c6b6"))
	footer.position = Vector2(60, 642)
	footer.size.x = 650
	ui.add_child(footer)

func show_new() -> void:
	clear_ui("new")
	backdrop(0.72)
	var box := column(Vector2(70, 65), 600)
	box.add_child(heading("A name for the record"))
	box.add_child(label("Mara knows you as Ash. What should the ledger say?", 19))
	character_name = LineEdit.new()
	character_name.text = "Ash"
	character_name.max_length = 24
	character_name.custom_minimum_size.y = 43
	box.add_child(character_name)
	box.add_child(label("Choose your first language", 23, Color("#dbbd86")))
	track_choice = OptionButton.new()
	track_choice.custom_minimum_size.y = 43
	for entry in story.registry.tracks:
		track_choice.add_item(entry.name + ("" if entry.available else " · planned"))
		track_choice.set_item_disabled(track_choice.item_count - 1, not entry.available)
	box.add_child(track_choice)
	box.add_child(label("Java is the available course. Rust and Python are planned; the story will follow the capabilities you learn.", 17))
	box.add_child(label("What brings you to the ruins?", 21))
	goal_choice = OptionButton.new()
	goal_choice.custom_minimum_size.y = 43
	for goal in story.registry.goals:
		goal_choice.add_item(goal.name)
	box.add_child(goal_choice)
	if story.data.started:
		box.add_child(label("A new journey starts a new story record. The previous record is backed up; your coding drafts and stars remain.", 16))
	box.add_child(button("Begin the chapter", begin_new))
	box.add_child(button("Back", show_title))
	character_name.grab_focus()

func begin_new() -> void:
	story.start(character_name.text, story.registry.goals[goal_choice.selected].id, story.registry.tracks[track_choice.selected].id)
	start_loading(false)

func show_settings() -> void:
	clear_ui("settings")
	backdrop(0.76)
	var box := column(Vector2(75, 85), 600)
	box.add_child(heading("Settings"))
	var motion := CheckButton.new()
	motion.text = "Reduce menu and dialogue motion"
	motion.button_pressed = story.data.settings.reduced_motion
	motion.toggled.connect(func(value: bool): story.data.settings.reduced_motion = value; story.save())
	box.add_child(motion)
	var instant := CheckButton.new()
	instant.text = "Show dialogue immediately"
	instant.button_pressed = story.data.settings.instant_text
	instant.toggled.connect(func(value: bool): story.data.settings.instant_text = value; story.save())
	box.add_child(instant)
	box.add_child(label("WASD / arrows: walk · Shift: faster\nE: interact · F2: workbench · J: journal · Esc: pause\nEnter / Space: continue dialogue. Choices are clickable and keyboard accessible.", 19))
	box.add_child(label("The opening runs locally without an AI key. Story choices are saved on this device.", 17))
	box.add_child(button("Back to title", show_title))

func show_credits() -> void:
	clear_ui("credits")
	backdrop(0.76)
	var box := column(Vector2(75, 85), 690)
	box.add_child(heading("A record of the work"))
	box.add_child(label("After the Signal · The Common Dawn\nAn open-source learning adventure.", 23))
	box.add_child(label("Godot Engine · Godot WRY · Node.js · CodeMirror\nExercism Java curriculum adaptations · Kokoro narration\nKenney CC0 courier and scenery assets", 20))
	box.add_child(label("Current illustrations are concept art. The intended final direction is grounded realism: practical clothing, natural light, and believable machines.", 18))
	box.add_child(label("Source licenses and credits are included in the project and portable package. Later acts are planned, not yet playable.", 17))
	box.add_child(button("Back", show_title))

func start_loading(practice: bool) -> void:
	practice_only = practice
	if is_instance_valid(ruin):
		ruin.queue_free()
		ruin = null
	clear_ui("loading")
	backdrop(0.74)
	var box := column(Vector2(100, 250), 770)
	box.add_child(label("CAIRN · THE RIDGE OFFICE", 15, Color("#dbbd86")))
	box.add_child(heading("The Smallest Promise", 43))
	load_text = label("Reading the path to the old office…", 20)
	box.add_child(load_text)
	load_bar = ProgressBar.new()
	load_bar.show_percentage = false
	load_bar.custom_minimum_size.y = 8
	var track := StyleBoxFlat.new()
	track.bg_color = Color("#526257")
	var fill := StyleBoxFlat.new()
	fill.bg_color = Color("#c9d8b8")
	load_bar.add_theme_stylebox_override("background", track)
	load_bar.add_theme_stylebox_override("fill", fill)
	box.add_child(load_bar)
	box.add_child(label("“A missing page bothers me more than an honest mistake.” — Rook", 18))
	box.add_child(button("Back to title", cancel_loading))
	loading = true
	loading_started = Time.get_ticks_msec()
	if ResourceLoader.load_threaded_get_status(RUIN) == ResourceLoader.THREAD_LOAD_INVALID_RESOURCE:
		ResourceLoader.load_threaded_request(RUIN)

func cancel_loading() -> void:
	loading = false
	show_title()

func _enter_world() -> void:
	if mode != "loading":
		return
	var packed := ResourceLoader.load_threaded_get(RUIN) as PackedScene
	ruin = packed.instantiate()
	ruin.story_interact = interact
	ruin.story_blocked = true
	ruin.milestone_changed.connect(milestone)
	add_child(ruin)
	ruin.lab.returned_to_ruin.connect(after_workbench)
	if practice_only:
		show_world()
		ruin._open_workbench()
	elif not story.data.dialogue.is_empty():
		show_dialogue()
	elif not story.data.flags.get("intro_done", false):
		story.begin("opening", "intro_done")
		show_dialogue()
	else:
		show_world()

func milestone(powered: bool, receipt: bool) -> void:
	if not story.data.started:
		return
	if powered:
		story.complete_mission("cairn.first-output")
	if receipt:
		story.complete_mission("cairn.receipt")
	if mode == "world":
		show_world()

func show_world() -> void:
	clear_ui("world")
	ui.mouse_filter = Control.MOUSE_FILTER_IGNORE
	var box := column(Vector2(755, 24), 330)
	box.add_child(label("PRACTICE SESSION" if practice_only else "THE SMALLEST PROMISE", 14, Color("#dbbd86")))
	box.add_child(label("F2 opens the full Java workbench." if practice_only else story.objective(), 18))
	box.add_child(button("Journal  [J]", show_journal))
	box.add_child(button("Pause / title  [Esc]", pause))

func interact(person: String) -> void:
	if mode != "world":
		return
	if practice_only:
		if person == "terminal":
			ruin._open_workbench(ruin.terminal_route().get_slice("#", 1))
		return
	var target := "courier"
	var completion := ""
	if person == "terminal":
		ruin._open_workbench(ruin.terminal_route().get_slice("#", 1))
		return
	if person == "rook":
		if story.data.capabilities.has("terminal.output") and not story.data.flags.get("output_debrief", false):
			target = "output"
			completion = "output_debrief"
		elif story.data.capabilities.has("records.receipt") and not story.data.flags.get("chapter_one_done", false):
			target = "receipt"
			completion = "chapter_one_done"
		elif story.data.flags.get("chapter_one_done", false):
			target = "rook_after"
		else:
			target = "rook_" + str(story.data.flags.get("approach", "public"))
	story.begin(target, completion)
	show_dialogue()

func show_dialogue() -> void:
	if story.data.dialogue.is_empty():
		show_world()
		return
	clear_ui("dialogue")
	var panel := PanelContainer.new()
	panel.position = Vector2(70, 240)
	panel.custom_minimum_size = Vector2(980, 0)
	panel.size.x = 980
	var skin := StyleBoxFlat.new()
	skin.bg_color = Color("#17231ff7")
	skin.border_color = Color("#a79871")
	skin.set_border_width_all(1)
	for edge in [SIDE_LEFT,SIDE_RIGHT,SIDE_TOP,SIDE_BOTTOM]:
		skin.set_content_margin(edge, 20)
	panel.add_theme_stylebox_override("panel",skin)
	ui.add_child(panel)
	var box := VBoxContainer.new()
	box.add_theme_constant_override("separation", 12)
	panel.add_child(box)
	var line: Array = story.node().lines[int(story.data.dialogue.line)]
	box.add_child(label(str(line[0]), 16, Color("#dbbd86")))
	text_box = RichTextLabel.new()
	text_box.text = story.text(str(line[1]))
	text_box.bbcode_enabled = false
	text_box.fit_content = true
	text_box.scroll_active = false
	text_box.custom_minimum_size = Vector2(925, 94)
	text_box.add_theme_font_override("normal_font",body_font)
	text_box.add_theme_font_size_override("normal_font_size",22)
	box.add_child(text_box)
	reveal = 0
	text_box.visible_characters = -1 if story.data.settings.instant_text or story.data.settings.reduced_motion else 0
	var last: bool = int(story.data.dialogue.line) == story.node().lines.size() - 1
	if last and story.node().has("choices"):
		for i in range(story.node().choices.size()):
			var choice := button(story.node().choices[i].label, choose.bind(i))
			box.add_child(choice)
			if i == 0:
				choice.grab_focus()
	else:
		var next := button("Continue  [Enter]", advance_dialogue)
		box.add_child(next)
		next.grab_focus()
	var footer := HBoxContainer.new()
	footer.add_theme_constant_override("separation", 14)
	box.add_child(footer)
	footer.add_child(button("Practice now  [F2]", func(): ruin._open_workbench()))
	footer.add_child(button("Pause  [Esc]", pause))

func advance_dialogue() -> void:
	if not story.data.settings.instant_text and not story.data.settings.reduced_motion and text_box.visible_characters >= 0 and text_box.visible_characters < text_box.get_total_character_count():
		reveal = text_box.get_total_character_count()
		text_box.visible_characters = -1
		return
	if story.advance():
		show_world()
	else:
		show_dialogue()

func choose(index: int) -> void:
	story.choose(index)
	if story.data.dialogue.is_empty():
		show_world()
	else:
		show_dialogue()

func after_workbench() -> void:
	if not story.data.dialogue.is_empty() and not practice_only:
		show_dialogue()
	else:
		show_world()

func pause() -> void:
	if mode in ["loading","title"]:
		return
	return_mode = "dialogue" if not story.data.dialogue.is_empty() and not practice_only else "world"
	clear_ui("pause")
	backdrop(0.78)
	var box := column(Vector2(90, 120), 700)
	box.add_child(heading("Keep your place"))
	box.add_child(label(story.objective() if not practice_only else "The Java workbench is ready.", 20))
	box.add_child(button("Resume", resume))
	box.add_child(button("Journal", show_journal))
	box.add_child(button("Save and return to title", return_to_title))
	box.add_child(label("Saved locally." if story.save_ok else "Saving failed. Keep this session open and check disk access.", 16))

func resume() -> void:
	if return_mode == "dialogue":
		show_dialogue()
	else:
		show_world()

func show_journal() -> void:
	if mode not in ["pause","journal"]:
		return_mode = "dialogue" if mode == "dialogue" else "world"
	clear_ui("journal")
	backdrop(0.84)
	var box := column(Vector2(90, 60), 900)
	box.add_child(heading("The field record"))
	box.add_child(label(story.data.player_name + " · " + story.track().name + " · " + str(story.goal().name), 20, Color("#dbbd86")))
	box.add_child(label(story.objective(), 21))
	var notes := RichTextLabel.new()
	notes.custom_minimum_size = Vector2(880, 300)
	notes.add_theme_font_size_override("normal_font_size",18)
	notes.text = "CHOICES RECORDED\n\n" + ("No promise recorded yet." if story.data.choices.is_empty() else "\n\n".join(story.data.choices))
	var skills: Array[String] = []
	for capability in story.data.capabilities:
		skills.append(story.registry.capability_labels.get(capability, "A skill from another expedition"))
	notes.text += "\n\nWHAT YOU HAVE PROVED\n" + ("A first trial is still ahead." if skills.is_empty() else "\n".join(skills))
	notes.bbcode_enabled = false
	box.add_child(notes)
	box.add_child(label("This build contains the opening chapter. The Java course continues beyond the story slice.", 16))
	box.add_child(button("Back", resume))

func return_to_title() -> void:
	story.save()
	if is_instance_valid(ruin):
		ruin.queue_free()
		ruin = null
	show_title()
