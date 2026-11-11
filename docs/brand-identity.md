# After the Signal identity

**After the Signal** is the game name. **Cairn Recovery Office** is the name of the in-world organization. **Learn Java from zero** describes the current expedition; future language tracks use the same game identity.

[Preview the identity in the actual home screen](brand-preview.png).

The logo is a beacon stamped into a brass-edged plate. Mint arcs signal that a machine is awake. The large angular wordmark uses original outlines, so it renders without an installed font. The rest of the UI uses Georgia for editorial headings, Segoe UI for reading, and a monospace face for code and instrument labels.

| Asset | Use |
| --- | --- |
| [Beacon emblem](../assets/brand/signal-insignia.svg) | App icon, favicon, game HUD, and small markers. Keep it at least 16 px. |
| [Dark background lockup](../assets/brand/signal-lockup-dark.svg) | App sidebar and dark covers. |
| [Light background lockup](../assets/brand/signal-lockup-light.svg) | README, parchment, and light stationery. |
| [Wordmark](../assets/brand/signal-wordmark.svg) | Display lettering when the emblem is already nearby. Keep the left part of the background quiet. |
| [First Signal key art](art/first-signal-key-art.png) | Original image for the home screen. The app loads the smaller `assets/brand/first-signal.webp`. |
| [Recovery Workbench art](art/recovery-workbench.png) | Original image for the Fieldbook. The app loads `assets/brand/recovery-workbench.webp`. |

| Color | Value | Use |
| --- | --- | --- |
| Spruce black | `#132322` | Emblem and navigation |
| Parchment | `#eee4d0` | Reading and practice surfaces |
| Brass | `#dbbd86` | Hardware details and recognition |
| Signal mint | `#a9ead0` | Beacon, readiness, and successful repairs |
| Ink | `#172723` | Marks on light surfaces |

Rebuild the vector family with `node scripts/build-brand.mjs`. For OS icon formats run `pnpm exec tauri icon assets/brand/signal-insignia.svg`; the desktop build uses `src-tauri/icons/icon.ico` and `icon.png`. Keep the original PNGs in this documentation folder and use the WebP copies in the app.

## Original illustration prompts

Both illustrations were created with the built-in image generation tool. Their text and logo are placed by the interface.

**First Signal**

> Use case: stylized-concept. Asset type: landscape key art for the home screen of After the Signal, a mature post-collapse programming adventure. Original widescreen game art. A moss-covered concrete data center and old office in a valley reclaimed by foliage; at right-center, seen from behind, a young adult in a dark olive hood and rust canvas field coat kneels by the first working terminal, with a tiny cream wind-up courier with a muted violet antenna nearby. The CRT puts out a small mint signal. Leave the left 38 percent naturally dark, low-detail and quiet for live title and UI. Frame right subject and mint glow around 72 percent horizontal, keep all details inside safe center vertical crop for a 2.4:1 hero. Moody painted stylized game environment, tactile brush texture, restrained atmospheric depth, warm late-afternoon amber highlights against spruce, old concrete and charcoal, credible architecture and a sense of hope. No writing, letters, logos, watermarks, borders, guns, or bright cyberpunk neon.

**Recovery Workbench**

> Use case: stylized-concept. Asset type: wide chapter art for the Fieldbook in After the Signal. Original editorial adventure-game illustration, interior of an abandoned office turned into a recovery workbench. Brass calipers, a folded paper map with abstract illegible traces, a green CRT terminal in standby, a broken keyboard, tagged salvaged circuit boards, and climbing ivy near a sunlit window. Single pool of honey light, muted spruce, faded concrete and charcoal, weathered believable materials, painterly brush texture. Visually rich in the center/right and comparatively quiet at left. Landscape framing for a short banner crop. Keep an air of discovery, natural shadows, no readable writing, no logo, no watermark, no border, no people.
