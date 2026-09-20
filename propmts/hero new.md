# IMPLEMENTATION TASK — VISHAL CHAUHAN 3D AVATAR PORTAL

You are a senior React + TypeScript frontend engineer and interaction designer.

I want to integrate the provided GlyphPortal component into my existing
Vishal Chauhan developer portfolio.

The provided GlyphPortal component is a scroll-driven camera experience
that uses SVG text as a clipping/magnification mask and supports:

- background ReactNode
- foreground ReactNode
- children
- scrollLength
- interactive letter selection
- reduced-motion support
- responsive sizing
- onProgress callbacks

Do not blindly use the original demo.

The portfolio must remain:

DARK TECHNICAL EDITORIAL × INTERACTIVE SYSTEMS

==================================================
1. FIRST — INSPECT THE EXISTING PROJECT
==================================================

Before modifying anything, inspect:

- package.json
- src/
- current routes
- current homepage
- existing Hero component
- existing design system
- Tailwind configuration
- TypeScript configuration
- existing Motion setup
- asset structure
- global CSS
- font configuration

Determine whether this is already:

- React
- Vite
- TypeScript
- Tailwind
- shadcn

If shadcn is already present, reuse it.

If the project is missing the required structure, explain what must
be installed/configured before implementation.

Do not unnecessarily reinstall dependencies.

==================================================
2. INSTALL THE GLYPH PORTAL
==================================================

Create:

src/components/ui/glyph-portal.tsx

Copy the provided GlyphPortal implementation into this file.

Preserve its functionality.

Do not rewrite the internal scroll/camera mathematics unless a
real integration bug requires it.

The component already handles:

- measuring glyph geometry
- calculating the target ink region
- scroll progress
- sticky positioning
- clipping
- responsive layout
- reduced motion
- keyboard interaction
- touch selection

Preserve these behaviors.

==================================================
3. CREATE A PORTFOLIO-SPECIFIC WRAPPER
==================================================

Do NOT use GlyphPortal directly everywhere.

Create:

src/components/portfolio/AvatarPortal.tsx

This component should configure GlyphPortal specifically for my
portfolio.

Example conceptual API:

<AvatarPortal />

Internally it should use:

<GlyphPortal
  word="VISHAL"
  scrollLength={2.6}
  interactive={false}
  annotations={false}
  ...
/>

Do not expose unnecessary configuration to the homepage.

==================================================
4. USE THE 3D AVATAR AS THE BACKGROUND
==================================================

The generated 3D avatar is the primary visual asset.

Add the avatar to:

src/assets/avatar-3d.png

or an appropriate optimized image format.

Use the actual supplied/generated avatar.

DO NOT generate another image.

DO NOT use an Unsplash image.

DO NOT use a random stock avatar.

The avatar should become the visual background of the GlyphPortal.

Conceptually:

<GlyphPortal
  word="VISHAL"
  background={
    <AvatarBackground />
  }
>
  ...
</GlyphPortal>

The avatar background should:

- fill the portal
- preserve aspect ratio
- remain centered
- avoid distortion
- have a dark surrounding environment
- feel cinematic
- integrate with the portfolio

==================================================
5. AVATAR BACKGROUND COMPONENT
==================================================

Create:

src/components/portfolio/AvatarBackground.tsx

Structure:

<div className="absolute inset-0 overflow-hidden">
    dark background
    subtle radial lighting
    avatar
    subtle technical elements
</div>

The avatar should be approximately:

55–75% of the viewport height

depending on screen size.

Use:

object-fit: contain

rather than:

object-fit: cover

because the avatar composition should remain intact.

The avatar should sit slightly below the visual center.

Desktop:

transform:
translateY(2–5%)

Mobile:

transform:
translateY(0)

Do not over-engineer this.

==================================================
6. DO NOT MAKE IT LOOK LIKE A GENERIC AI WEBSITE
==================================================

This is extremely important.

Avoid:

- neon green hacker aesthetics
- purple cyberpunk gradients
- excessive glow
- floating particles
- random binary code
- matrix rain
- excessive glassmorphism
- 3D spinning cards
- cursor trails
- excessive HUD elements
- fake terminal windows
- giant glowing borders

The avatar should feel like a premium creative identity piece.

Think:

Apple product page
+
high-end developer portfolio
+
editorial art direction
+
subtle technical interface

==================================================
7. GLYPH PORTAL COLOR SYSTEM
==================================================

The original component contains a green:

--gp-field

Do NOT retain the default green aesthetic.

Override the component from AvatarPortal.

Use approximately:

background:
#08090A

foreground:
#F3F3F0

secondary:
#8B8F91

border:
rgba(255,255,255,0.12)

accent:
a very restrained cool blue/cyan

The exact colors should come from the existing portfolio design tokens
if they already exist.

Do not create a competing color system.

==================================================
8. PORTAL TYPOGRAPHY
==================================================

Use the existing portfolio fonts.

Preferred:

Display:
Space Grotesk

Technical:
JetBrains Mono

Do NOT load the Glyph Portal demo's external font.

The provided component's demo dynamically loads an external font.
Do not reproduce that behavior.

Use the portfolio's existing typography system.

==================================================
9. HERO STRUCTURE
==================================================

The portal should become part of the homepage's opening experience.

Homepage:

01 / INTRO

--------------------------------

[large typography]

I BUILD.
I BREAK.
I UNDERSTAND.
I BUILD AGAIN.

VISHAL CHAUHAN

BTech CS & IT
ADYPU · 2029

[CTA]

--------------------------------

[3D AVATAR PORTAL]

--------------------------------

The portal should not completely replace the hero content.

It should enhance the opening experience.

==================================================
10. SCROLL EXPERIENCE
==================================================

This is the most important part.

When the user enters the section:

The 3D avatar is visible.

As the user scrolls:

Stage 1:
The avatar is clearly visible.

Stage 2:
The GlyphPortal camera begins moving through the word.

Stage 3:
The glyph becomes increasingly large.

Stage 4:
The viewport becomes filled by the glyph/visual mask.

Stage 5:
The next portfolio content is revealed.

The transition should feel like:

"zooming through my identity"

rather than:

"scrolling past a picture."

Do not hijack browser scrolling.

Use the existing GlyphPortal scroll implementation.

==================================================
11. PORTAL WORD
==================================================

Use:

VISHAL

instead of:

SUBLIME

The word should function as the camera entry point.

The final visual should feel like:

V
I
S
H
A
L

becomes a portal into the next section.

Do NOT show the word as a normal large heading.

It should primarily be part of the visual transition.

==================================================
12. NEXT SECTION
==================================================

After the portal transition, reveal:

02 / HOW I GOT HERE

Heading:

HOW I GOT HERE.

Then the story:

Gaming.
Modded APKs.
Cracked games.
Minecraft.
GitHub.
Programming.
Web development.
AI-assisted development.
ML.
Deep Learning.
Cybersecurity.

Keep the copy authentic and concise.

Do not turn it into motivational LinkedIn-style writing.

==================================================
13. PORTAL → STORY TRANSITION
==================================================

The final frame of the portal should transition naturally into the
story section.

Use:

opacity
clip-path
transform
background continuity

where appropriate.

Do not create a hard page transition.

The user should feel like they are travelling through the identity
visual and arriving inside the story.

==================================================
14. FOREGROUND UI
==================================================

Use the GlyphPortal `front` prop for lightweight hero metadata.

Possible elements:

01 / INTRO

VISHAL CHAUHAN

BTech CS & IT · ADYPU · 2029

SCROLL TO EXPLORE ↓

Keep this extremely minimal.

Do not duplicate the main hero typography excessively.

==================================================
15. TECHNICAL MARKERS
==================================================

You may add tiny technical labels:

VCH / 01

PORTFOLIO / 2026

BUILD / LEARN / BREAK / REPEAT

These must be subtle.

They should look like editorial metadata.

Not cyberpunk HUD elements.

==================================================
16. INTERACTION
==================================================

Set:

interactive={false}

for the main portfolio experience.

I do NOT want users selecting letters manually.

The scroll itself should control the camera.

The original component's keyboard and touch letter-selection
functionality can remain internally supported, but the portfolio
should not expose letter-picking UI.

==================================================
17. RESPONSIVE DESIGN
==================================================

Desktop:

1440px:
large avatar + spacious composition

1280px:
slightly smaller avatar

1024px:
reduce visual scale

768px:
switch to more vertical composition

430px:
compact portrait

390px:
compact portrait

360px:
smallest supported layout

Never allow:

horizontal overflow
cropped face
distorted avatar
overlapping text
broken portal geometry

==================================================
18. MOBILE EXPERIENCE
==================================================

Do NOT force the desktop composition onto mobile.

On mobile:

01 / INTRO

small metadata

3D avatar

scroll instruction

then portal transition

then:

02 / HOW I GOT HERE

Use normal vertical flow where appropriate.

The experience should still work without requiring a mouse.

==================================================
19. PERFORMANCE
==================================================

This component uses:

requestAnimationFrame
ResizeObserver
IntersectionObserver
canvas text measurement
SVG clipping

Do not add another continuous scroll listener.

Do not create expensive React state updates per frame.

Do not use React state for scroll progress.

If progress needs to drive visuals:

use the existing:

onProgress

callback

and manipulate DOM/CSS variables efficiently.

Keep animation work outside React's render cycle.

==================================================
20. IMAGE OPTIMIZATION
==================================================

Optimize the 3D avatar.

Preferred:

AVIF/WebP where supported.

Keep an appropriate fallback.

Prevent layout shift.

Use:

width
height
aspect-ratio

where appropriate.

Because this is above the fold, do not blindly lazy-load the primary
avatar.

Prioritize the initial hero visual.

==================================================
21. ACCESSIBILITY
==================================================

The avatar should have:

alt="Stylized 3D avatar of Vishal Chauhan"

If the avatar becomes purely decorative and equivalent textual
information already exists nearby, use an appropriate decorative
treatment.

Do not make the portfolio dependent on the animation.

With:

prefers-reduced-motion: reduce

the experience should become:

static avatar
+
normal hero
+
normal story section

The user must still be able to understand the page.

==================================================
22. REMOVE DEMO-SPECIFIC CONTENT
==================================================

Do NOT include:

SUBLIME
sublime.
Design & digital experiences
A different perspective starts here.
Follow your curiosity.
A different way into what comes next.
Choose your way in
Set the scene
Keep going

Those belong to the original demo.

Replace all demo content with Vishal's portfolio content.

==================================================
23. HOMEPAGE ARCHITECTURE
==================================================

The homepage should become:

Home
│
├── Hero / AvatarPortal
│
├── How I Got Here
│
├── Currently
│
├── The Stack
│
├── What I've Built
│
├── Things I've Done
│
├── Coding Lab
│
├── What I'm Chasing
│
├── Now / Next
│
└── Contact

The GlyphPortal should be an opening cinematic transition,
not an isolated component.

==================================================
24. COMPONENT STRUCTURE
==================================================

Prefer:

src/
├── components/
│   ├── ui/
│   │   └── glyph-portal.tsx
│   │
│   └── portfolio/
│       ├── AvatarPortal.tsx
│       ├── AvatarBackground.tsx
│       └── Hero.tsx
│
├── assets/
│   └── avatar-3d.png
│
├── pages/
│   └── Home.tsx
│
└── ...

Adapt this to the project's existing structure rather than blindly
creating duplicate architecture.

==================================================
25. IMPORTANT — DO NOT BREAK EXISTING SCROLL SYSTEM
==================================================

The portfolio already uses a continuous scroll-based narrative.

The GlyphPortal must become one section within that system.

Do NOT create:

- nested full-page scrolling
- scroll hijacking
- competing smooth-scroll libraries
- independent document scrolling
- iframe-like behavior

There must be ONE primary page scroll.

If the existing portfolio has a custom scroll container, make GlyphPortal
work with that container using its existing scrollParent detection.

==================================================
26. VISUAL QUALITY CHECK
==================================================

After implementation, actually run the application.

Inspect:

Desktop:
1440 × 900

Laptop:
1280 × 800

Tablet:
768 × 1024

Mobile:
390 × 844

Check:

- avatar position
- face visibility
- glyph transition
- scroll timing
- section transition
- typography
- spacing
- image quality
- page performance

The animation should feel intentional.

If the effect looks like a demo component pasted into a portfolio,
refine the composition.

==================================================
27. FINAL ACCEPTANCE CRITERIA
==================================================

The implementation is complete only when:

[ ] GlyphPortal works
[ ] Avatar is integrated as its background
[ ] VISHAL is the portal word
[ ] Demo branding is removed
[ ] Existing portfolio design system is preserved
[ ] Hero feels premium
[ ] Scroll transition works
[ ] Next section reveals naturally
[ ] No scroll hijacking
[ ] Mobile works
[ ] Reduced motion works
[ ] Keyboard accessibility works
[ ] No horizontal overflow
[ ] No unnecessary dependencies
[ ] No external demo font
[ ] No default green demo styling
[ ] No generic hacker aesthetic
[ ] Avatar looks like part of the portfolio identity
[ ] Performance remains strong

==================================================
28. DO NOT STOP AFTER COMPILATION
==================================================

Do not consider this finished simply because TypeScript compiles.

Run:

npm run build

and the development server.

Inspect the actual rendered experience.

Fix:

TypeScript errors
React warnings
layout issues
overflow
animation glitches
font loading issues
mobile issues
accessibility problems

Then provide a concise implementation summary and list exactly which
files were created or modified.