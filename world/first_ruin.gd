extends Node3D
## Small, original third-person exploration slice. Java stays in the local workbench.

const TERMINAL = Vector3(0, 0, -7)
const COURIER = Vector3(-1.65, 0, 4.75)
const ROOK = Vector3(2.4, 0, 3.8)
signal milestone_changed(powered: bool, receipt: bool)
const SPAWN = Vector3(0, 1, 8)
const CAMERA_OFFSET = Vector3(6, 7, 10)
const WorkbenchPanel = preload("res://workbench_panel.gd")
var player := CharacterBody3D.new()
var outfit := Node3D.new()
var camera := Camera3D.new()
var message := Label.new()
var left_boot: MeshInstance3D
var right_boot: MeshInstance3D
var step_phase := 0.0
var rng := RandomNumberGenerator.new()
var workbench := "http://127.0.0.1:4173"
var terminal_powered := false
var receipt_printed := false
var screen: MeshInstance3D
var terminal_sign: Label3D
var screen_text: Label3D
var terminal_lamp: OmniLight3D
var status_request := HTTPRequest.new()
var status_pending := false
var action_feedback := ""
var spoke_to_courier := false
var brand_texture: ImageTexture
var lab := WorkbenchPanel.new()
var story_interact: Callable
var story_blocked := false
var hud_layer: CanvasLayer


func _ready() -> void:
	var port := OS.get_environment("DSA_PORT")
	if port.is_valid_int() and port.to_int() > 0 and port.to_int() <= 65535:
		workbench = "http://127.0.0.1:" + str(port.to_int())
	add_child(lab)
	lab.initialize(workbench)
	lab.returned_to_ruin.connect(_returned_from_workbench)
	rng.seed = 17
	var insignia := Image.new()
	if insignia.load_svg_from_string(FileAccess.get_file_as_string("res://assets/signal-insignia.svg")) == OK:
		brand_texture = ImageTexture.create_from_image(insignia)
		if DisplayServer.get_name() != "headless":
			DisplayServer.set_icon(insignia)
	create_landscape()
	create_explorer()
	create_field_props()
	create_rook()
	create_interface()
	camera.position = player.position + CAMERA_OFFSET
	camera.look_at(player.position + Vector3.UP)
	camera.fov = 44.0
	status_request.timeout = 2
	add_child(status_request)
	status_request.request_completed.connect(receive_status)
	var polling := Timer.new()
	polling.wait_time = 1.5
	add_child(polling)
	polling.timeout.connect(poll_status)
	polling.start()
	poll_status()


func _physics_process(delta: float) -> void:
	if lab.opened or story_blocked:
		return
	var right := Input.is_physical_key_pressed(KEY_D) or Input.is_physical_key_pressed(KEY_RIGHT)
	var left := Input.is_physical_key_pressed(KEY_A) or Input.is_physical_key_pressed(KEY_LEFT)
	var up := Input.is_physical_key_pressed(KEY_W) or Input.is_physical_key_pressed(KEY_UP)
	var down := Input.is_physical_key_pressed(KEY_S) or Input.is_physical_key_pressed(KEY_DOWN)
	var direction := Vector3(float(right) - float(left), 0, float(down) - float(up)).normalized()
	var walking := not direction.is_zero_approx()
	if walking:
		var speed := 5.2 if Input.is_physical_key_pressed(KEY_SHIFT) else 3.2
		player.velocity.x = direction.x * speed
		player.velocity.z = direction.z * speed
		outfit.rotation.y = lerp_angle(outfit.rotation.y, atan2(direction.x, direction.z), minf(delta * 12, 1))
		step_phase += delta * speed * 3
	else:
		player.velocity.x = 0
		player.velocity.z = 0
	player.velocity.y -= 20 * delta
	player.move_and_slide()
	var stride := sin(step_phase) * 0.18 if walking and player.is_on_floor() else 0.0
	left_boot.position.z = stride
	right_boot.position.z = -stride
	left_boot.position.y = -0.55 + maxf(stride, 0) * 0.45
	right_boot.position.y = -0.55 + maxf(-stride, 0) * 0.45
	if player.position.y < -3:
		player.position = SPAWN
		player.velocity = Vector3.ZERO
	camera.position = camera.position.lerp(player.position + CAMERA_OFFSET, 1.0 - exp(-delta * 7.0))
	camera.look_at(player.position + Vector3.UP)
	if not action_feedback.is_empty():
		message.text = action_feedback
	elif _near(COURIER, 2.15):
		message.text = "Mara’s note: Make it say Ready. Then teach it to print a receipt." if spoke_to_courier else "Mara’s wind-up courier  /  E: Read the note"
	elif _near(ROOK, 1.9):
		message.text = "Rook, waterkeeper  /  E: Talk"
	elif not _near(TERMINAL, 2.2):
		message.text = "Mara: Follow the stone path to the old terminal."
	elif receipt_printed:
		message.text = "Receipt printed. Terminal restored.  /  E: Review the repair"
	elif terminal_powered:
		message.text = "READY received. Next: print a receipt.  /  E: Continue training"
	else:
		message.text = "Terminal 01  /  E: Open Level 1"


func _unhandled_key_input(event: InputEvent) -> void:
	if not event is InputEventKey or not event.pressed or event.echo:
		return
	var key: Key = event.physical_keycode if event.physical_keycode != KEY_NONE else event.keycode
	if story_blocked and key != KEY_F2:
		return
	if key == KEY_F2:
		if lab.opened:
			lab.close()
		else:
			_open_workbench()
		get_viewport().set_input_as_handled()
	elif key == KEY_E and not lab.opened:
		if _near(TERMINAL, 2.2):
			if story_interact.is_valid():
				story_interact.call("terminal")
			else:
				_open_workbench(terminal_route().get_slice("#", 1))
		elif _near(ROOK, 1.9) and story_interact.is_valid():
			story_interact.call("rook")
		elif _near(COURIER, 2.15):
			spoke_to_courier = true
			if story_interact.is_valid():
				story_interact.call("courier")


func _near(point: Vector3, radius: float) -> bool:
	return Vector2(player.position.x - point.x, player.position.z - point.z).length_squared() < radius * radius


func _open_workbench(route: String = "") -> void:
	if lab.open(route):
		player.velocity = Vector3.ZERO
		action_feedback = ""
	else:
		action_feedback = "The in-game workbench needs the Windows WebView2 runtime. See the launcher instructions."


func _returned_from_workbench() -> void:
	poll_status()


func terminal_route() -> String:
	if receipt_printed:
		return "/#round/learn-receipt"
	if terminal_powered:
		return "/#home"
	return "/#round/learn-run"


func poll_status() -> void:
	if not status_pending:
		status_pending = status_request.request(workbench + "/api/world/first-ruin") == OK


func receive_status(result: int, response_code: int, _headers: PackedStringArray, body: PackedByteArray) -> void:
	status_pending = false
	if result != HTTPRequest.RESULT_SUCCESS or response_code != 200:
		return
	var data: Variant = JSON.parse_string(body.get_string_from_utf8())
	if data is Dictionary and data.get("terminalPowered") is bool and data.get("receiptPrinted") is bool:
		apply_progress(data["terminalPowered"], data["receiptPrinted"])


func apply_progress(powered: bool, receipt: bool) -> void:
	if powered == terminal_powered and receipt == receipt_printed:
		return
	terminal_powered = powered
	receipt_printed = receipt
	var green := Color("#88f8c5")
	screen.material_override = material(green if powered else Color("#786648"), powered)
	terminal_lamp.visible = powered
	terminal_sign.text = "01 / RESTORED" if receipt else ("01 / READY" if powered else "01 / TERMINAL")
	screen_text.text = "RECORDED" if receipt else ("READY" if powered else "STANDBY")
	milestone_changed.emit(powered, receipt)


func material(color: Color, glow: bool = false) -> StandardMaterial3D:
	var mat := StandardMaterial3D.new()
	mat.albedo_color = color
	mat.roughness = 0.92
	if glow:
		mat.emission_enabled = true
		mat.emission = color
		mat.emission_energy_multiplier = 1.4
	return mat


func shape(parent: Node3D, mesh: Mesh, point: Vector3, mat: Material) -> MeshInstance3D:
	var node := MeshInstance3D.new()
	node.mesh = mesh
	node.material_override = mat
	node.position = point
	parent.add_child(node)
	return node


func block(point: Vector3, size: Vector3, mat: Material, solid: bool = false) -> MeshInstance3D:
	var mesh := BoxMesh.new()
	mesh.size = size
	var part := shape(self, mesh, point, mat)
	if solid:
		var body := StaticBody3D.new()
		var hitbox := CollisionShape3D.new()
		var collider := BoxShape3D.new()
		collider.size = size
		hitbox.shape = collider
		part.add_child(body)
		body.add_child(hitbox)
	return part


func create_landscape() -> void:
	var sky_mat := ProceduralSkyMaterial.new()
	sky_mat.sky_top_color = Color("#315b62")
	sky_mat.sky_horizon_color = Color("#b6cdb0")
	sky_mat.ground_horizon_color = Color("#94a897")
	var sky := Sky.new()
	sky.sky_material = sky_mat
	var air := WorldEnvironment.new()
	air.environment = Environment.new()
	air.environment.background_mode = Environment.BG_SKY
	air.environment.sky = sky
	air.environment.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR
	air.environment.ambient_light_color = Color("#b9d4be")
	air.environment.ambient_light_energy = 0.42
	air.environment.fog_enabled = true
	air.environment.fog_density = 0.016
	air.environment.fog_light_color = Color("#99b2a2")
	add_child(air)
	var sun := DirectionalLight3D.new()
	sun.rotation_degrees = Vector3(-48, -32, 0)
	sun.light_color = Color("#ffdfab")
	sun.light_energy = 0.86
	sun.shadow_enabled = true
	add_child(sun)
	var grass := material(Color("#43593f"))
	var stone := material(Color("#888a82"))
	var moss := material(Color("#557948"))
	var dark := material(Color("#383e3d"))
	var brass := material(Color("#bf8e4d"))
	block(Vector3(0, -0.6, 0), Vector3(55, 1.2, 49), grass, true)
	for i in range(15):
		block(Vector3(rng.randf_range(-0.14, 0.14), 0.03, 9.0 - i), Vector3(2.5, 0.13, 0.88), stone).rotation.y = rng.randf_range(-0.12, 0.12)
	for side in [-1, 1]:
		block(Vector3(7.5 * side, 0.7, -6), Vector3(0.7, 1.4, 12.0), stone, true)
		for z in [-12.0, -8.0, -3.0]:
			var height := rng.randf_range(2.5, 4.6)
			block(Vector3(6.8 * side, height / 2, z), Vector3(1.25, height, 1.4), stone, true)
			block(Vector3(6.8 * side, height, z), Vector3(1.5, 0.3, 1.65), moss)
	for x in [-6.0, -3.6, -1.2, 1.2, 3.6, 6.0]:
		var height := rng.randf_range(2.1, 4.2)
		block(Vector3(x, height / 2, -12.0), Vector3(2.3, height, 0.7), stone, true)
		for band in range(1, floori(height / 0.48)):
			block(Vector3(x, band * 0.48, -11.64), Vector3(2.25, 0.023, 0.025), dark)
	for i in range(22):
		var x := rng.randf_range(4.2, 13.0) * (-1 if i % 2 == 0 else 1)
		var z := rng.randf_range(-11, 11)
		var rock := PrismMesh.new()
		var height := rng.randf_range(0.4, 2.0)
		rock.size = Vector3(height * 1.3, height, height)
		shape(self, rock, Vector3(x, height / 3, z), moss if i % 2 == 0 else stone).rotation.y = rng.randf() * TAU
	var brush := SphereMesh.new()
	brush.radial_segments = 8
	brush.rings = 4
	brush.radius = 0.7
	brush.height = 1.4
	for i in range(34):
		var x := rng.randf_range(2.0, 14.0) * (-1 if i % 2 == 0 else 1)
		var size := rng.randf_range(0.3, 1.2)
		var tuft := shape(self, brush, Vector3(x, 0.25, rng.randf_range(-13.0, 12.0)), moss)
		tuft.scale = Vector3(size, size * 0.64, size)
	var timber := material(Color("#514838"))
	var leaf := material(Color("#386745"))
	for center in [Vector3(-10,0,-9), Vector3(-12,0,-3), Vector3(10,0,-10), Vector3(10,0,-1), Vector3(-9,0,6)]:
		var trunk := CylinderMesh.new()
		trunk.top_radius = 0.11
		trunk.bottom_radius = 0.23
		trunk.height = 3.2
		shape(self, trunk, center + Vector3(0, 1.6, 0), timber)
		for i in range(6):
			var offset := Vector3(rng.randf_range(-1.2,1.2), rng.randf_range(2.5,4), rng.randf_range(-1,1))
			var crown := shape(self, brush, center + offset, leaf if i % 2 == 0 else moss)
			crown.scale = Vector3(1.6,1.2,1.5)
	for x in [-3.6, 3.6]:
		block(Vector3(x, 1.15, -9.8), Vector3(0.94, 2.3, 0.78), dark, true)
		block(Vector3(x, 2.30, -9.79), Vector3(0.99, 0.06, 0.84), stone)
		for bay in range(6):
			block(Vector3(x, 0.39 + bay * 0.27, -9.39), Vector3(0.7, 0.12, 0.047), stone)
			if bay == 1 or bay == 4:
				block(Vector3(x + 0.26, 0.39 + bay * 0.27, -9.36), Vector3(0.045, 0.045, 0.026), brass)
	block(TERMINAL + Vector3(0, 0.48, 0), Vector3(2.5, 0.96, 1.6), stone, true)
	block(TERMINAL + Vector3(0, 1.18, 0), Vector3(1.62, 0.65, 0.87), dark)
	screen = block(TERMINAL + Vector3(0, 1.21, 0.44), Vector3(1.37, 0.39, 0.045), material(Color("#786648")))
	block(TERMINAL + Vector3(0, 0.92, 0.58), Vector3(1.9, 0.07, 0.32), brass)
	terminal_sign = Label3D.new()
	terminal_sign.text = "01 / TERMINAL"
	terminal_sign.position = TERMINAL + Vector3(0, 1.94, 0.2)
	terminal_sign.billboard = BaseMaterial3D.BILLBOARD_ENABLED
	terminal_sign.font_size = 42
	terminal_sign.pixel_size = 0.008
	terminal_sign.modulate = Color("#e2ffe0")
	add_child(terminal_sign)
	screen_text = Label3D.new()
	screen_text.text = "STANDBY"
	screen_text.position = TERMINAL + Vector3(0, 1.22, 0.475)
	screen_text.font_size = 34
	screen_text.pixel_size = 0.0038
	screen_text.modulate = Color("#142923")
	screen_text.outline_size = 0
	add_child(screen_text)
	terminal_lamp = OmniLight3D.new()
	terminal_lamp.position = TERMINAL + Vector3(0, 1.6, 0.85)
	terminal_lamp.light_color = Color("#8ef2d0")
	terminal_lamp.omni_range = 4
	terminal_lamp.visible = false
	add_child(terminal_lamp)


func create_explorer() -> void:
	player.position = SPAWN
	var collision := CollisionShape3D.new()
	collision.shape = CapsuleShape3D.new()
	collision.shape.height = 1.4
	collision.shape.radius = 0.32
	add_child(player)
	player.add_child(collision)
	player.add_child(outfit)
	var body := CapsuleMesh.new()
	body.radius = 0.27
	body.height = 1.05
	shape(outfit, body, Vector3(0, -0.02, 0), material(Color("#b06e43")))
	var head := SphereMesh.new()
	head.radius = 0.22
	head.height = 0.44
	shape(outfit, head, Vector3(0, 0.43, 0), material(Color("#eed5a1")))
	var hood := SphereMesh.new()
	hood.radius = 0.24
	hood.height = 0.45
	shape(outfit, hood, Vector3(0, 0.47, -0.065), material(Color("#526646")))
	var pack := BoxMesh.new()
	pack.size = Vector3(0.39, 0.48, 0.2)
	shape(outfit, pack, Vector3(0, 0, -0.29), material(Color("#344c44")))
	var boots := BoxMesh.new()
	boots.size = Vector3(0.17, 0.28, 0.23)
	var leather := material(Color("#453c33"))
	left_boot = shape(outfit, boots, Vector3(-0.13, -0.55, 0), leather)
	right_boot = shape(outfit, boots, Vector3(0.13, -0.55, 0), leather)
	add_child(camera)
	camera.current = true


func load_prop(model: String) -> Node3D:
	# Load the small source models directly so the portable launcher needs no editor import pass.
	var doc := GLTFDocument.new()
	var state := GLTFState.new()
	var path := ProjectSettings.globalize_path("res://assets/kenney/" + model + ".glb")
	if doc.append_from_file(path, state) != OK:
		push_warning("Could not load scenery model: " + model)
		return null
	return doc.generate_scene(state) as Node3D


func place_prop(prop: Node3D, at: Vector3, scale_factor: float, angle: float) -> void:
	prop.position = at
	prop.scale = Vector3.ONE * scale_factor
	prop.rotation.y = angle
	add_child(prop)


func create_field_props() -> void:
	var courier := load_prop("character")
	if courier:
		place_prop(courier, COURIER, 1.35, 0.7)
		var animation := courier.find_child("AnimationPlayer", true, false) as AnimationPlayer
		if animation and animation.has_animation("idle"):
			animation.get_animation("idle").loop_mode = Animation.LOOP_LINEAR
			animation.play("idle")
	var banner := load_prop("flag")
	if banner:
		place_prop(banner, TERMINAL + Vector3(1.9, 0, 0.4), 1.7, PI / 2.0)
	var large := load_prop("grass")
	var small := load_prop("grass-small")
	for patch in range(24):
		var proto := large if patch % 2 == 0 else small
		if proto:
			var side := -1.0 if patch % 3 == 0 else 1.0
			var at := Vector3(side * rng.randf_range(1.6, 6.0), 0.03, rng.randf_range(-9.5, 8.0))
			place_prop(proto.duplicate() as Node3D, at, rng.randf_range(0.8, 1.7), rng.randf() * TAU)
	if large:
		large.free()
	if small:
		small.free()


func create_rook() -> void:
	var figure := Node3D.new()
	figure.position = ROOK
	add_child(figure)
	var coat := CapsuleMesh.new()
	coat.radius = 0.29
	coat.height = 1.1
	shape(figure, coat, Vector3(0, 0.65, 0), material(Color("#58605a")))
	var head := SphereMesh.new()
	head.radius = 0.22
	head.height = 0.44
	shape(figure, head, Vector3(0, 1.34, 0), material(Color("#ba9874")))
	var marker := Label3D.new()
	marker.text = "ROOK"
	marker.position.y = 1.93
	marker.billboard = BaseMaterial3D.BILLBOARD_ENABLED
	marker.font_size = 35
	marker.pixel_size = 0.007
	figure.add_child(marker)


func create_interface() -> void:
	var ui := CanvasLayer.new()
	hud_layer = ui
	add_child(ui)
	var panel := PanelContainer.new()
	panel.position = Vector2(24, 24)
	var skin := StyleBoxFlat.new()
	skin.bg_color = Color("#172620e8")
	skin.border_color = Color("#a5aa76")
	skin.set_border_width_all(1)
	skin.set_corner_radius_all(6)
	for edge in [SIDE_LEFT, SIDE_RIGHT, SIDE_TOP, SIDE_BOTTOM]:
		skin.set_content_margin(edge, 14)
	panel.add_theme_stylebox_override("panel", skin)
	ui.add_child(panel)
	var text := VBoxContainer.new()
	panel.add_child(text)
	var title_row := HBoxContainer.new()
	title_row.add_theme_constant_override("separation", 9)
	text.add_child(title_row)
	if brand_texture:
		var emblem := TextureRect.new()
		emblem.texture = brand_texture
		emblem.custom_minimum_size = Vector2(30,30)
		emblem.expand_mode = TextureRect.EXPAND_IGNORE_SIZE
		emblem.stretch_mode = TextureRect.STRETCH_KEEP_ASPECT_CENTERED
		title_row.add_child(emblem)
	var heading := Label.new()
	heading.text = "AFTER THE SIGNAL   /   FIRST RUIN"
	heading.add_theme_color_override("font_color", Color("#e4d3a2"))
	title_row.add_child(heading)
	text.add_child(message)
	var keys := Label.new()
	keys.text = "WASD or arrows: move    Shift: walk faster"
	keys.add_theme_color_override("font_color", Color("#c6d8ca"))
	text.add_child(keys)
	var workbench_button := Button.new()
	workbench_button.text = "Open Java workbench  [F2]"
	workbench_button.size_flags_horizontal = Control.SIZE_SHRINK_BEGIN
	workbench_button.pressed.connect(_open_workbench)
	text.add_child(workbench_button)
