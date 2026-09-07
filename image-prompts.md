# I&H Foundation — Image Prompt Pack

Every image slot the site expects, with a ready-to-paste generation prompt and the exact
export size. Filenames must match exactly — the page falls back to a gradient placeholder
for anything missing.

All files go in `images/` as **WebP, quality 82, under 250 KB**.

Generate as PNG (that's what most tools give you), drop the PNGs in `images/`, then run the
converter below — it resizes and converts every PNG to a correctly-sized `.webp` in one go.

```bash
ffmpeg -y -i images/NAME.png -vf "scale=800:-2:flags=lanczos" -c:v libwebp -quality 82 -compression_level 6 images/NAME.webp
```

Use the width from the size table for `scale=W:-2`. The 12 images done so far went from
25 MB of PNG to 962 KB of WebP with no visible quality loss.

---

## 1. How to use this pack

**Step 1 — paste the STYLE BLOCK in front of every prompt.** This is what makes 25 images
from 25 separate generations look like one photographer shot them in one week.

```
STYLE BLOCK (prepend to every prompt):
Documentary NGO photography, South India (Tamil Nadu). Authentic candid moment, not a
stock-photo pose. Natural daylight, soft warm midday or golden-hour light, no harsh flash.
Shot on a full-frame camera, 35mm or 50mm lens, f/2.8, eye-level with the subject, shallow
but readable depth of field. Colour grade: clean warm neutrals, gentle contrast, slight
lift in the shadows, blues and reds naturally present in clothing and signage. Real skin
texture, real fabric texture, real dust and imperfection. Photojournalistic, dignified,
hopeful. Subjects look capable and in control of their own story.
```

**Step 2 — paste the NEGATIVE BLOCK** (or append after `--no` in Midjourney):

```
NEGATIVE BLOCK:
no poverty-porn framing, no crying children, no dirt-smeared faces for pity, no white
saviour composition, no hands reaching up to a benefactor, no staged fake smiles at camera,
no text, no watermark, no logo, no letters, no captions, no distorted hands, no extra
fingers, no plastic AI skin, no HDR halos, no oversaturation, no heavy vignette,
no cartoon, no 3D render, no illustration, no stock-photo business people
```

**Step 3 — generate square/large, then crop to the export size below.** Generating at the
final odd aspect ratio (like 300:220) gives worse composition than generating at 4:3 and
cropping. Leave headroom.

**Step 4 — the dignity rule.** This is an NGO site that has to survive scrutiny from CSR
partners. Every prompt below is written so the subject has agency: working, learning,
laughing, building. Nobody is being pitied. Keep it that way if you rewrite anything.

**Tool notes**
- Midjourney: append `--ar W:H --style raw --stylize 150`
- Gemini / Imagen: paste style block + prompt as one paragraph, then ask for the aspect ratio in words
- DALL·E: it only outputs 1024×1024, 1792×1024, 1024×1792 — pick the closest and crop

---

## 2. Size table (all 25 slots)

✅ = already generated, converted and live on the page.

| # | Filename | Export size | Aspect | Where it appears |
|---|---|---|---|---|
| 1 ✅ | `hero-children.webp` | 1440 × 1080 | 4:3 | Hero, right side |
| 2 ✅ | `about-classroom.webp` | 1440 × 960 | 3:2 | About section, with play button |
| 3 ✅ | `program-education.webp` | 800 × 600 | 4:3 | Programs card 1 |
| 4 ✅ | `program-healthcare.webp` | 800 × 600 | 4:3 | Programs card 2 |
| 5 ✅ | `program-women.webp` | 800 × 600 | 4:3 | Programs card 3 |
| 6 ✅ | `program-food.webp` | 800 × 600 | 4:3 | Programs card 4 |
| 7 ✅ | `program-environment.webp` | 800 × 600 | 4:3 | Programs card 5 |
| 8 ✅ | `program-disaster.webp` | 800 × 600 | 4:3 | Programs card 6 |
| 9 ✅ | `story-ramesh-before.webp` | 800 × 534 | 3:2 | Story 1, left half (CSS crops to square) |
| 10 ✅ | `story-ramesh-after.webp` | 800 × 534 | 3:2 | Story 1, right half (CSS crops to square) |
| 11 ✅ | `story-lakshmi.webp` | 1000 × 800 | 5:4 | Story 2 (CSS crops to 2:1) |
| 12 | `story-anjali.webp` | 1200 × 600 | 2:1 | Story 3 |
| 13 | `story-school.webp` | 1200 × 600 | 2:1 | Story 4 |
| 14 | `gallery-1.webp` | 1200 × 880 | 15:11 | Masonry |
| 15 | `gallery-2.webp` | 1200 × 1200 | 1:1 | Masonry |
| 16 | `gallery-3.webp` | 1200 × 960 | 5:4 | Masonry |
| 17 | `gallery-4.webp` | 1200 × 1120 | 15:14 | Masonry (video badge) |
| 18 | `gallery-5.webp` | 1200 × 800 | 3:2 | Masonry |
| 19 | `gallery-6.webp` | 1200 × 1280 | 15:16 | Masonry (tallest) |
| 20 | `gallery-7.webp` | 1200 × 1040 | 15:13 | Masonry |
| 21 | `gallery-8.webp` | 1200 × 920 | 30:23 | Masonry |
| 22 | `gallery-9.webp` | 1200 × 1160 | 30:29 | Masonry |
| 23 | `event-health.webp` | 1200 × 750 | 16:10 | Event card 1 |
| 24 | `event-skills.webp` | 1200 × 750 | 16:10 | Event card 2 |
| 25 | `event-trees.webp` | 1200 × 750 | 16:10 | Event card 3 |

Plus `logo.webp` at **512 × 512** ✅ (converted from your logo PNG — used in the header at
64 px and in the footer at 84 px inside a white chip).

Optional extra, not yet referenced in the HTML: `og-cover.webp` at **1200 × 630** for social
sharing previews.

---

## 3. Hero & About

### 1. `hero-children.webp` — 1600 × 1200 (4:3)

> A group of six to eight Indian schoolchildren aged 7 to 12 packed close together,
> laughing openly at something just off-camera. One girl in the centre foreground is in
> sharp focus, face lit, hair loose, wearing a simple cream kurta; the others fall softly
> out of focus behind her in a warm receding line. Bright outdoor light behind them, sunlit
> courtyard, warm bokeh. Mixed uniforms and everyday clothes in blues and reds. Genuine
> uncontrolled joy — mid-laugh, eyes crinkled, not a posed row.
>
> **Composition note:** the subject cluster must sit in the CENTRE-RIGHT of the frame. The
> left third of this image can be cropped on small screens. Leave breathing room top and
> bottom — the stats card overlaps the bottom edge.

### 2. `about-classroom.webp` — 1440 × 960 (3:2)

> Inside a modest Indian government primary school classroom. Fifteen children in blue and
> white uniforms sit at long wooden desks, and most of them have their hands shot straight
> up in the air, eager to answer. Open notebooks, chalk dust in a shaft of window light,
> pale blue-green painted wall behind. A teacher's arm is barely visible at the frame edge.
> Energy and eagerness, warm daylight from the left, slightly wide angle taking in the room.
>
> **Composition note:** keep the dead centre of the frame relatively calm — a circular white
> play button sits there. No critical faces in the exact middle.

---

## 4. Programs — 6 cards, 800 × 600 (4:3) each

These six sit in one row. Shoot them as a **matched set**: same time of day, same colour
temperature, same distance to subject. Vary the activity, never the look.

### 3. `program-education.webp`
> Two Indian primary school children sharing a desk, heads bent together over an open
> exercise book, one pointing at the page with a pencil while the other writes. Warm window
> light from the left across the paper. Blue and white uniforms, worn wooden desk, a stack
> of textbooks at the edge of frame. Quiet concentration, an unguarded moment of one child
> teaching the other.

### 4. `program-healthcare.webp`
> An Indian doctor in a white coat with a stethoscope gently examining a young child at a
> rural health camp, the child's mother seated beside them watching. Clean improvised
> clinic set up in a village hall, folding table, blood-pressure cuff and a small medical
> kit visible. Calm daylight from a window. The doctor is mid-explanation, warm and
> unhurried; the mother looks reassured, not anxious.

### 5. `program-women.webp`
> Six to eight Indian women in bright saris — magenta, teal, mustard, orange — standing
> together in a self-help group meeting, mid-conversation and clearly enjoying it. One
> woman gestures as she speaks; the others lean in. Outdoors or in a simple community hall
> with plain plastered walls. Strong warm colour from the saris against a neutral
> background. Confident, collective, in charge.

### 6. `program-food.webp`
> A community meal distribution: volunteers in simple clothing serving hot rice and dal
> from large steel vessels into steel plates held by a queue of people of all ages. Steam
> rising off the food, hands and plates in the foreground, an orderly friendly line behind.
> Outdoor daylight under a shade cloth. Focus on the food and the exchange between server
> and receiver — both of them smiling, treated as equals.

### 7. `program-environment.webp`
> A young Indian boy of about ten crouched in freshly turned earth, pressing soil around a
> newly planted sapling with both hands, looking down at his work with total concentration.
> Green field and more young saplings receding behind him in soft focus. Golden late
> afternoon light, warm rim light on his shoulders, rich green and brown palette. Dirt on
> his hands — real work, not a photo-op.

### 8. `program-disaster.webp`
> Relief volunteers in red and orange vests handing out supply kits and drinking water from
> the back of a small truck after flooding in a Tamil Nadu village. Wet ground, overcast
> flat light, people receiving packets with both hands. Urgent but calm and organised —
> a line, a checklist, coordination. No wailing, no spectacle. Muted greys and browns lifted
> by the vests.

---

## 5. Success stories

### 9. `story-ramesh-before.webp` — 600 × 600 (1:1)
> Head-and-shoulders portrait of a serious Indian boy about 12 years old in a plain worn
> navy shirt, standing against a weathered concrete wall. Neutral expression, direct steady
> look at the camera, faint natural light from the side. Slightly cooler, flatter grade
> than the rest of the set. Composed and self-possessed — reserved, not sad, not pitiable.

### 10. `story-ramesh-after.webp` — 600 × 600 (1:1)
> **The same young man, now about 19**, head-and-shoulders, in a crisp collared shirt and
> sunglasses pushed up, smiling with real confidence. Bright open outdoor background,
> college or workplace suggested in soft bokeh. Warmer grade, brighter key light, more
> contrast in the eyes.
>
> **Critical:** generate this one **from the "before" image** using image-to-image, a
> character reference (`--cref` in Midjourney), or "same person, older" in a follow-up turn
> in the same chat. If the two faces don't read as one person, the whole before/after card
> collapses. Match crop, head size, and camera distance between the two.

### 11. `story-lakshmi.webp` — 1200 × 600 (2:1)
> An Indian woman in her thirties wearing an orange and green sari, standing in the doorway
> of her own small tailoring shop with arms relaxed, looking directly at camera with quiet
> pride. A sewing machine and bolts of fabric visible behind her. Warm daylight, greenery
> to one side. She owns this space and it shows. Wide 2:1 crop, subject placed off-centre
> left with her shop filling the right.

### 12. `story-anjali.webp` — 1200 × 600 (2:1)
> A doctor's hands administering care to a small Indian girl of about four at a health camp
> — a gentle check of her ear or a plaster being applied — while the child watches with
> curiosity rather than fear. Soft indoor daylight, clean pale background, white coat
> sleeve, tiny hands. Tender and clinical at once. Wide crop, faces in the left two-thirds.

### 13. `story-school.webp` — 1200 × 600 (2:1)
> A freshly repainted single-storey village school building with a bright blue and white
> exterior, children streaming in through the gate in the morning, a few running. Clear
> morning light, long soft shadows, palm trees at the edge of frame, a hand-painted wall
> mural. Wide establishing shot — the building is the subject, the children give it life.

---

## 6. Gallery — 9 masonry tiles

Deliberately varied heights, so vary the shot type too: mix tight detail, mid, and wide.
Every one of these gets a caption overlay on hover along the bottom edge — keep the bottom
20% of each frame free of critical detail.

### 14. `gallery-1.webp` — 1200 × 880 · *"Classroom smiles, Anna Nagar"*
> Three Indian schoolchildren at a shared desk turning to grin at the camera mid-lesson,
> notebooks open in front of them, an urban Chennai classroom with a green chalkboard
> softly out of focus behind. Bright even daylight, blue and white uniforms.

### 15. `gallery-2.webp` — 1200 × 1200 (square) · *"Free eye check-up camp"*
> An elderly Indian man having his vision tested at a free eye camp, seated in front of a
> Snellen chart while an optometrist holds a trial lens frame to his face. He is squinting
> in concentration. Village hall, plastic chairs, daylight through an open door. Square crop,
> subject centred.

### 16. `gallery-3.webp` — 1200 × 960 · *"Tailoring workshop graduation"*
> A row of Indian women seated at hand-operated sewing machines in a bright training hall,
> each mid-stitch, fabric in bright colours running through their hands. Shot slightly down
> the row so the machines repeat into soft focus. Warm daylight from tall windows.

### 17. `gallery-4.webp` — 1200 × 1120 · *"Annual Day celebration"* — **video still**
> Children in colourful traditional Tamil costume performing a folk dance on a small
> outdoor stage, caught mid-movement with skirts and scarves flying, a crowd of blurred
> seated spectators in the foreground silhouette. Evening event lighting, warm stage
> colour, slight motion blur in the limbs.
>
> Frame this like a **video frame grab** — a play badge is overlaid top-right, so keep that
> corner uncluttered.

### 18. `gallery-5.webp` — 1200 × 800 · *"Meal distribution drive"*
> Close overhead angle on steel plates being filled with rice, sambar and vegetables along
> a serving line, several volunteers' hands working at once. Steam, warm food colours,
> shallow focus running down the line. Almost no faces — this is a hands-and-food detail
> shot for texture variety.

### 19. `gallery-6.webp` — 1200 × 1280 (tallest) · *"Tree plantation, Thiruvallur"*
> Vertical composition: a tall young sapling tied to a bamboo stake in the foreground with
> a group of volunteers and schoolchildren planting more in the field behind, receding into
> the distance. Big open sky in the upper third, golden hour side light, deep greens.

### 20. `gallery-7.webp` — 1200 × 1040 · *"School kit handover"*
> A child receiving a new school bag and stationery kit with both hands, looking up at the
> volunteer with delight; several more children waiting behind with visible anticipation.
> Bright outdoor daylight, blue school bags stacked at the edge of frame. Eye-level with
> the child, not looking down at them.

### 21. `gallery-8.webp` — 1200 × 920 · *"Flood relief volunteers"*
> Volunteers in bright vests wading through shallow flood water carrying supply boxes
> above the waterline, a partly submerged village street behind them. Overcast light,
> reflections in the water, muted palette with strong vest colour. Determined, coordinated.

### 22. `gallery-9.webp` — 1200 × 1160 · *"Women's day march"*
> A crowd of Indian women walking together on a road holding plain handmade placards
> (blank — no readable text), many in bright saris, mid-stride and mid-chant. Shot from
> slightly low and in front so the group fills the frame with energy. Bright daylight,
> saturated fabric colour against a plain street background.

---

## 7. Events — 3 cards, 1200 × 750 (16:10) each

A white date chip sits **top-left** on each of these. Keep that corner visually quiet.

### 23. `event-health.webp` — *Free Health Check-up Camp, Govt. School, Thiruvallur*
> A rural health camp set up in a government school courtyard: folding tables under a
> shade canopy, a nurse taking a woman's blood pressure in the foreground, a queue of
> villagers of all ages waiting patiently on plastic chairs behind. Morning light, white
> coats, blue chairs, dusty ground. Wide enough to read as an organised event, not a
> portrait.

### 24. `event-skills.webp` — *Skill Training for Women, Chennai*
> A skills training session in a community centre: eight Indian women seated around tables
> working on a practical craft — sewing, block printing, or handmade products — with an
> instructor leaning in to guide one of them. Bright interior daylight, materials spread
> across the tables, engaged focused faces. Warm and industrious.

### 25. `event-trees.webp` — *Tree Plantation Drive, Kanchipuram*
> A large group of volunteers and schoolchildren spread across an open field beside a lake,
> each planting a sapling, spades and watering cans in use. Shot wide from a slightly
> raised angle so you read the scale of the group. Early morning golden light, mist on the
> water, deep greens and warm skin tones.

### Optional — `og-cover.webp` — 1200 × 630
> Wide banner-style version of the hero image: laughing Indian schoolchildren filling the
> right two-thirds of the frame, with clean unbusy background in the left third for the
> logo and headline to be composited over later. No text in the generated image itself.

---

## 8. After generating

1. **Crop to the exact size in the table.** Don't upload a 4096px square and let the
   browser scale it — layout shift and a slow page.
2. **Convert with the ffmpeg command at the top of this file** — it resizes and compresses
   in one pass. Target under 250 KB each.
3. **Keep the `.webp` extension.** The HTML references `.webp` by name. Keep the original
   PNGs as masters; the page never loads them.
4. **Check the faces.** AI hands and background faces fail in exactly the places a CSR
   partner will zoom in. Reject anything with a six-fingered hand in the crowd.
5. **Alt text is already written** in `index.html` for every slot — if you change what an
   image depicts, update its `alt` to match.

---

## 9. Partner logos

These are **not** generated — they must be the files each partner supplies, from their
own brand/press kit. Do not recreate a corporate mark by hand or lift one off a website.

Drop each file in `images/` with the exact name below. The card falls back to a text
lockup while a file is missing, so you can add them one at a time.

| Filename | Partner |
|---|---|
| `partner-tata.webp` | TATA Trusts |
| `partner-reliance.webp` | Reliance Foundation |
| `partner-hdfc.webp` | HDFC Bank Parivartan |
| `partner-infosys.webp` | Infosys Foundation |
| `partner-wipro.webp` | Wipro Cares |
| `partner-techmahindra.webp` | Tech Mahindra Foundation |
| `partner-flipkart.webp` | Flipkart Foundation |

**Prep:** trim whitespace around the mark, then export at **max height 92px** (2× the 46px
display box) on a transparent or white background. Convert with:

```bash
ffmpeg -y -i images/partner-NAME.png -vf "scale=-2:92:flags=lanczos" -c:v libwebp -quality 90 images/partner-NAME.webp
```

Logos with alpha keep it — libwebp preserves transparency, and the cards are white.

**Before publishing:** confirm each organisation has actually agreed to be listed as a
donor or partner, and that you are within their logo-usage terms. Most CSR brand kits
specify minimum size and clear space.


---

## 10. Event photos

Three slots, **1200 × 750 (16:10)**. Until each file exists the card shows a stand-in from
the programme set, so you can add them one at a time — drop the file in `images/` and it
appears on both the home page and `/events.html`.

Filenames and the events they belong to (keep these in step with `EVENTS` in
`src/shared.jsx` if you change the schedule):

| File | Event | Stand-in used until then |
|---|---|---|
| `event-health.webp` | Free Health & Eye Camp, Govt. School, Thiruvallur | `program-healthcare.webp` |
| `event-skills.webp` | Skills Training for Women, I&H Community Centre, Trichy | `program-women.webp` |
| `event-trees.webp` | Tree Plantation Drive, Lake Road, Kanchipuram | `program-environment.webp` |

**Composition:** a white date chip sits over the **top-left** corner of every card, so keep
that area free of faces and text.

### `event-health.webp`
> A rural health camp in a government school courtyard: folding tables under a shade canopy,
> a nurse taking an older woman's blood pressure in the foreground, a queue of villagers of
> all ages waiting on plastic chairs behind. Morning light, white coats, blue chairs, dusty
> ground. Wide enough to read as an organised event rather than a portrait.

### `event-skills.webp`
> A skills training session in a community centre: eight Indian women around tables working
> on tailoring, an instructor leaning in to guide one of them at a sewing machine. Bright
> interior daylight, fabric and materials spread across the tables, focused engaged faces.

### `event-trees.webp`
> Volunteers and schoolchildren spread across an open field beside a lake, each planting a
> sapling, spades and watering cans in use. Shot wide from slightly raised so the scale of
> the group reads. Early morning golden light, mist on the water, deep greens.

**Convert with:**

```bash
ffmpeg -y -i images/event-NAME.png -vf "scale=1200:-2:flags=lanczos" -c:v libwebp -quality 82 -compression_level 6 images/event-NAME.webp
```
