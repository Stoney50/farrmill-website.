# Farrmill Pest Control — Website Style Guide

**Design system:** "Grove" v3 (light-forward)
**Source of truth:** [`assets/css/styles.css`](assets/css/styles.css). If this guide and the CSS disagree, the CSS wins. Update this file when you change it.

---

## 1. Design principles

1. **Readability comes first.** The body is warm white with charcoal text. Body type is never smaller than 17px. Text meets WCAG AA at minimum, and AAA wherever practical.
2. **Use dark sparingly.** Dark forest "feature bands" (`.band-dark`) appear only at high-impact moments: the hero, the "Why Farrmill" section, stats, the CTA and the footer. Everything else is light.
3. **It should look like a trade, not a tech startup.** Keep it clean, solid and straightforward. Use white cards with soft shadows, green buttons and plain language.
4. **Tokens, not hard-coded values.** Use the CSS custom properties. Components re-theme themselves inside `.band-dark` through variables, so nothing needs a separate dark version.

---

## 2. Brand

| Item | Value |
|---|---|
| Business name | Farrmill Pest Control |
| Logo (colour, for light backgrounds) | `assets/img/farrmill-logo.svg` |
| Logo (light, for dark backgrounds) | `assets/img/farrmill-logo-dark.svg` |
| Mark / icon only | `assets/img/farrmill-mark.svg` |
| Favicon | `assets/img/favicon.png` |
| Social share image | `assets/img/og-image.jpg` |
| Theme colour (browser chrome) | `#0A130D` |

**Logo sizing:** 38px high in the header and 42px in the footer. The height stays fixed when the header shrinks on scroll, so the logo doesn't blur.

**Two-state header:** the header is transparent with the *light* logo over the dark hero. After scrolling it turns solid white with the *colour* logo. Both `<img>` tags are in the markup (`.logo-light` and `.logo-dark`), and `.is-scrolled` switches between them.

---

## 3. Colour

### Light surfaces (the default)

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F6F8F2` | Page background (warm white) |
| `--surface` | `#FFFFFF` | Cards, forms, accordion |
| `--surface-2` | `#FBFCF8` | Alternate section background (`.surface-alt`), form inputs |
| `--tint` | `#EDF3E7` | Soft green tint: icon boxes, avatars, notices |

### Text

| Token | Hex | Contrast on white | Use |
|---|---|---|---|
| `--text` | `#16211A` | AAA | Headings and primary text |
| `--text-soft` | `#47544B` | ~9:1 (AAA) | Body paragraphs and descriptions |
| `--text-dim` | `#66726A` | ~5.3:1 (AA) | Captions, helper text, metadata. Keep it short. |

### Brand green

| Token | Hex | Use |
|---|---|---|
| `--green` | `#6AA84F` | **Logo green.** For decorative fills, hover borders and icon-box hover only. **Never use it for text on light backgrounds** because the contrast is too low. |
| `--green-ink` | `#2F5723` | Green **text and icons** on light backgrounds |
| `--green-btn` | `#3C6B2C` | Solid button fill, with white text |
| `--green-btn-hi` | `#457E31` | Button hover |
| `--green-bright` | `#8ACF63` | Accent text and icons **on dark bands only** |

### Lines, shadows and accents

| Token | Value | Use |
|---|---|---|
| `--line` | `#E4E8DD` | Default borders and dividers |
| `--line-strong` | `#D3DACB` | Input borders, ghost buttons, chips |
| `--card-shadow` | soft two-layer shadow | Resting cards |
| `--card-shadow-hi` | deeper shadow | Hovered cards, form card |
| `--gold` | `#C98A12` | Review stars on light backgrounds |
| `--gold-star` | `#E0A83A` | Review stars on dark backgrounds |

### Dark feature band (`.band-dark`)

- Background: `linear-gradient(165deg, #17301F → #0C160E)` with two soft green radial glows and a faint grain overlay.
- Text tokens inside the band are flipped to `--text #F2F7ED`, `--text-soft #C7D5C2` and `--text-dim #97A793`.
- The accent and kicker colour becomes `--green-bright`. Cards become translucent white (`rgba(255,255,255,.045)`) with a 14% white border.
- The footer uses its own slightly darker gradient: `#12241A → #0A130D`.

### Error states

| Use | Value |
|---|---|
| Error text | `#C0392B` |
| Error border | `#E0736A` |
| Error background | `#FDF3F1` |
| Error banner text | `#A23B2E` |

### Colour rules at a glance
- Green **text** on light backgrounds uses `--green-ink`. On dark backgrounds it uses `--green-bright`.
- Buttons are always solid `--green-btn` with white text.
- `--green` (`#6AA84F`) is decorative only.

---

## 4. Typography

Both fonts are **self-hosted** in `assets/fonts/` (no Google Fonts requests) and preloaded in `<head>`.

| Role | Family | Weights |
|---|---|---|
| Display: headings, buttons, labels, kickers, stats | **Space Grotesk** | 300–700 (mostly 600 and 700) |
| Body: paragraphs, lists, inputs | **DM Sans** | 400–700 |

Fallback stack: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.

### Type scale (fluid)

| Token | Size (min → max) | Use |
|---|---|---|
| `--fs-hero` | 2.7rem → 5.4rem | Homepage hero `h1` (weight 700) |
| `--fs-h1` | 2.1rem → 3.6rem | Inner page hero `h1` |
| `--fs-h2` | 1.8rem → 2.9rem | Section headings |
| `--fs-h3` | 1.25rem → 1.55rem | Card headings |
| `--fs-lead` | 1.08rem → 1.3rem | Intro paragraphs under headings |
| `--fs-body` | 1.0625rem (**17px**) | Body text. This is the minimum. |
| `--fs-sm` | 0.95rem | Card body and list descriptions |
| `--fs-xs` | 0.82rem | Fine print only |

### Heading style
- `line-height: 1.07`, `letter-spacing: -0.02em`, weight 600 (the hero is 700).
- Body `line-height: 1.65`.
- To highlight a key phrase in a heading, wrap it in `<span class="text-gradient">`. It renders in solid green-ink on light backgrounds and green-bright on dark ones. Despite the name, there is no gradient.
- Keep body text to about 60 characters per line (`.measure`, or `max-width: 54–60ch`).

### Kicker (eyebrow)
A small uppercase label above section headings: Space Grotesk, 0.77rem, weight 600, `letter-spacing: .16em`, green, with a 28px leading dash. Add `.kicker--center` to remove the dash for centred headings.

```html
<span class="kicker">What we do</span>
<h2>Complete protection, <span class="text-gradient">under one local roof</span></h2>
```

---

## 5. Layout and spacing

| Token / class | Value |
|---|---|
| `--container` | 1200px max width (`.container`) |
| `--container-wide` | 1320px (`.container--wide`, header) |
| Side gutter | `clamp(1.15rem, 4vw, 2.5rem)` |
| `.section` | Vertical padding `clamp(3.75rem → 7rem)` |
| `.section--tight` | Vertical padding `clamp(2.75rem → 4.75rem)` |
| Grid gap | `clamp(1.25rem → 2rem)` |
| `--header-h` | 84px (66px when scrolled) |

### Grids
`.grid` combined with `.cols-2`, `.cols-3` or `.cols-4`.
- At **960px or less**, 3 and 4 columns drop to 2.
- At **640px or less**, everything is a single column.

`.split` is a two-column text and media layout. It stacks at 920px or less. Add `.split--reverse` to put the media on the right.

### Section rhythm
Sections alternate between plain `--bg`, `.surface-alt` (off-white with top and bottom borders), and occasional `.band-dark`. Never place two dark bands next to each other.

### Breakpoints

| Width | What changes |
|---|---|
| 1100px | Footer drops to 3 columns |
| **1024px** | Nav collapses to the hamburger menu, and the header phone number shows the icon only |
| 980px | Hero grid stacks |
| 960px | 3- and 4-column grids drop to 2 |
| 920px | `.split` stacks |
| 820px | CTA band stacks and centres |
| **720px** | The sticky mobile call bar appears |
| 640px | All grids become a single column |
| 560px | Form rows stack |

---

## 6. Shape and elevation

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 12px | Inputs, small tiles |
| `--radius` | 18px | Cards, accordion |
| `--radius-lg` | 26px | Media frames, form card, glass panel |
| `--radius-pill` | 999px | Buttons, chips, badges |

Icon boxes use 15px radius, ticks and avatars are fully round, and media frames use a 5:4 aspect ratio.

---

## 7. Components

### Buttons
All buttons are pills, at least **54px** tall, in Space Grotesk 600. On hover they lift 2px and gain a green glow.

| Class | Look | Use |
|---|---|---|
| `.btn` | Solid green with white text | Primary action: "Book an inspection" |
| `.btn--glass` | Transparent with an outline | Secondary action: "Call 0411 240 281", "More about us" |
| `.btn--lg` | 60px tall | Hero and CTA bands |
| `.btn--block` | Full width | Forms, mobile |

A standard CTA pair is a primary **Book** button next to a ghost **Call** button.

```html
<a class="btn btn--lg" href="/contact#book">Book an inspection</a>
<a class="btn btn--glass btn--lg" href="tel:+61411240281">Call 0411 240 281</a>
```

`.link-arrow` is an inline text link with an arrow that slides 4px right on hover. Use it for "Learn more" style links inside cards.

### Cards
- `.card` is a white surface with an 18px radius and a soft shadow. On hover it lifts 6px and gets a green border.
- `.service-card` adds an `.icon-box` (56px, tinted). On hover the icon box fills with green and tilts slightly.
- `.card--feature` is a **dark green tile among white cards**. It's reserved for the featured termite service, so use one per grid at most.
- `.quote-card` holds testimonials: stars, a blockquote, then an avatar initial, name and context.

### Lists and steps
- `.check-list` has round tinted ticks with a bold heading and a soft description under each item.
- `.step .num` is a 54px numbered tile. It's used for the 3-step "How it works" section.

### Badges and chips
- `.kicker` is the section eyebrow (see Typography).
- `.badge-pill` is a small tinted pill for labels such as "Since 1993".
- `.chip` is an outlined pill, used for the suburb lists.
- `.panel-badge` is a green-on-dark pill inside `.glass-panel`.

### Hero
- `.hero.band-dark.hero--photo` is the homepage hero. The photo (`ute-hero-golden.webp`) sits under a dark scrim of roughly 78–90% opacity.
- `.glass-panel` is the frosted dark panel beside the hero copy.
- `.hero-trust` is the stat row (bold number with a small label, separated by 1px dividers).
- `.float-chip` is the floating white badge on hero media. It bobs gently.
- Inner pages use `.page-hero.band-dark` with a breadcrumb, kicker, `h1` and lead paragraph.

### Other sections
- `.trust-strip` is a white bar of icon and text trust items directly under the hero.
- `.stats-band` holds large Space Grotesk numbers with a green `.suffix` (for example "50**km**"). Numbers count up on scroll via `data-count`.
- `.cta-band` is a dark band with the heading on the left and the actions on the right.
- `.accordion` is the FAQ. Its plus icon rotates into an × and turns green when open.
- `.prose` is for legal and long-form pages: max 760px, with underlined green-ink links.
- `.legal-notice` is a tinted callout box.

### Forms
- `.form-card` is white, with a 26px radius and the high shadow.
- Inputs are at least **52px** tall, with a 1.5px `--line-strong` border, a 12px radius and a `--surface-2` fill.
- Focus state: green border, white fill and a 4px green halo.
- Labels are Space Grotesk 600 at 0.92rem. Required fields are marked with a green `.req` asterisk.
- Errors use `.field.has-error`, which gives a red border, a pale red fill and a `.error-msg` shown below the field.
- `.form-row` is a two-column row that stacks at 560px.
- Anti-spam: `.hp-field` is the honeypot and is positioned off-screen. Don't remove it.

### Navigation
- Desktop: text links with an underline that grows from the left on hover. The current page has `aria-current="page"` and shows in green.
- 1024px or less: a hamburger toggle opens a white drop-down panel with full-width rows.
- 720px or less: the sticky `.mobile-callbar` at the bottom of the screen holds **Call** and **Book** buttons.

---

## 8. Iconography

- **Inline SVG**, `viewBox="0 0 24 24"`, using `stroke="currentColor"` (or `fill="currentColor"` for solid icons such as stars), so icons take their colour from the surrounding text.
- Outline style uses `fill="none"`, `stroke-linecap="round"` and `stroke-linejoin="round"`.
- Stroke width: **1.8–2** by default, and 2.4 for small UI glyphs such as arrows and ticks.
- Typical sizes: 18px (links), 20px (buttons), 22px (lists and trust items), 30px (service icon boxes).
- Colour: `--green-ink` on light backgrounds and `--green-bright` on dark ones.
- No icon fonts and no external icon libraries.

---

## 9. Imagery

- Use real or realistic photography of Farrmill's own work, ute and technicians. Warm, golden, natural light is preferred.
- Current images in `assets/img/` are `ute-hero-golden`, `ute-about-daylight`, `why-farrmill-tech`, `termite-soil`, `general-pest-interior` and `commercial-exterior`.
- Provide **WebP** with a JPG fallback where possible.
- Photos sit in a `.media-frame` (26px radius, 5:4 ratio, `object-fit: cover`).
- Text over a photo always needs a dark scrim, which keeps it readable.
- The bespoke dark SVG tiles (radar, shield, map, 1993 seal) are **placeholders** until real or AI-generated photos replace them. See `Website Imagery - AI Prompts (Draft).md`.

---

## 10. Motion

- Easing: `--ease` `cubic-bezier(.22,.61,.36,1)` and `--ease-out` `cubic-bezier(.16,1,.3,1)`.
- Scroll reveal: add `data-reveal` (plus optional `="left"`, `"right"` or `"scale"`) to a single element, or `data-stagger` to a parent to animate its children in sequence. The `.in` class is added by `main.js`.
- Hover effects: buttons lift 2px, cards lift 6px, icon boxes tilt and fill with green, and arrows slide 4px.
- Ambient effects are slow and subtle: hero glow pulses (9–11s) and the float chip bobs (5s).
- **`prefers-reduced-motion` is respected.** All animation is switched off and revealed content is shown immediately. Every new animation must do the same.

---

## 11. Accessibility checklist

- [ ] Body text is 17px or larger. Don't set paragraph copy below `--fs-sm`.
- [ ] Text contrast is AA or better. Never use `--green` (`#6AA84F`) for text on light backgrounds.
- [ ] Touch targets are **44px or larger** (buttons are 54px, inputs 52px, the nav toggle 46px).
- [ ] Focus rings are visible: a 3px `--green-btn` outline with a 3px offset (`--green-bright` on dark bands). Never remove `:focus-visible`.
- [ ] Every page sets `lang="en-AU"`. Decorative SVGs need no label, and icon-only links need an `aria-label`.
- [ ] Each page has exactly one `<h1>`, and heading levels go in order.
- [ ] Reduced motion is respected.

---

## 12. Voice and copy

**Tone:** a local tradesman giving straight answers. Plain, confident and honest, with no hard sell and no jargon.

- Write in **Australian English**: colour, organise, metres, "ute".
- Use the StoryBrand structure: the customer's problem, then Farrmill as the guide, then the simple 3-step plan (*Book → Get a straight answer → Stay protected*), then the stakes ("Termite damage is often invisible until it's expensive").
- Hero line: **"Termites & pests don't wait. Neither do we."**
- Headings are short, sentence case, and phrased as benefits ("Protect your biggest investment", "Not sure which service you need?").
- Kickers are 2–4 words ("What we do", "Why Farrmill", "Good to know", "Kind words").
- Button labels start with a verb: "Book an inspection", "Call 0411 240 281", "Check your area".

**Positioning words to use:** locally owned, independent, Gosnells-based, serving Perth's south-east since 1993, fully licensed, thermal camera and moisture meters on every termite inspection.

**Never say:**
- "Family-run" or "family business". Garry Millar founded the business in 1993 and Jeremy Vavra bought it in 2019. They are not related.
- Anything implying a franchise or a call centre.
- Bird or bee *proofing* services, which aren't offered.
- Bare "strata". Write **"commercial strata"**. Residential units are treated unit by unit, and whole-complex coordination is never offered.
- Invented procedural details. Check any claim about how jobs are done with Jeremy first.

### Fixed business details
Use these exactly as written.

| | |
|---|---|
| Phone | **0411 240 281**, linked as `tel:+61411240281` |
| Email | info@farrmill.com.au |
| Licence | REG 1229 |
| ABN | 78 233 135 833 |
| Hours | Mon–Fri 8am–4pm, Sat 8am–1pm, after-hours by appointment |
| Base | Gosnells, Perth WA |

---

## 13. Technical conventions

- Vanilla HTML, CSS and JS with no framework. All styles live in one stylesheet, `assets/css/styles.css`. Bump the `?v=` query string on the `<link>` when you change it.
- **Internal links and canonicals are extensionless** (`/services`, not `services.html`). Cloudflare serves clean URLs, and `_redirects` handles the legacy `.html` and old Webflow paths.
- Suburb pages follow the pattern `pest-control-<suburb>.html`. Each needs distinct local content, not a copy of another suburb's page.
- Avoid inline `style=""` in new markup. Add a class or a token instead.
- Any new component must be built from tokens so it works on both light backgrounds and `.band-dark`.
