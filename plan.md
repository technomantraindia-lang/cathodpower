# Home Page Layout & Animation Plan: Exact Replication of Emergena

**Reference Site:** [https://tokomoo-emergena.webflow.io/](https://tokomoo-emergena.webflow.io/)  
**Target Scope:** Home page (`src/pages/Home.jsx` and its sub-sections), maintaining client-approved status of all other pages (`/products`, `/ci`, `/monitoring`, `/downloads`, `/about`, `/contact`).

---

## 1. Executive Summary & Architecture

The client has approved all other pages in the project. The sole objective is to transform the **Home page** layout and animations to **exactly match** the reference site `https://tokomoo-emergena.webflow.io/`.

To achieve 100% visual and interactive parity:
1. **Isolated Layout for Home:**
   - In `src/components/layout/Layout.jsx`, conditionally suppress Cathode's global `<Header />` and `<Footer />` on the root route (`pathname === "/"`).
   - Render the authentic **Emergena Hero Navbar**, **Emergena Floating Navigation Menu**, and **Emergena Footer** exclusively on the Home page.
2. **Complete Section Hierarchy (14 Total Sections & Overlays):**
   - **0. Custom Smooth Trailing Cursor** (`.cursor-core` + `.cursor-pointer`)
   - **1. Video Modal Overlay** (`.popup-video` with YouTube/HTML5 embed & backdrop fade)
   - **2. Floating Scroll-Triggered Navigation Pill & Full Off-Canvas Menu** (`.menu-navbar-floating` + `.circle-wrap` + `.navmenu-floating-wrap`)
   - **3. Hero Section with Opening Sequence** (`.main-section.hero-homepage` with top navbar, "Built to reduce" headline, CTA, and infinite partner logo marquee)
   - **4. Solutions: Three Connected Disciplines** (`.solutions-content-wrapper` with 3 cards, draw borders, image height expands, and hover state)
   - **5. Who We Are: Manifesto & Animated Metric Counters** (`.main-section.dark` with dark green background, manifesto typography, separator line reveal, and 4 counting numbers `31%`, `6.2M`, `17 Days`, `140+`)
   - **6. Guiding Standards / Principles** (`.principles-content-wrapper` with 3-column architecture: 2 left cards, center floral solar panel image with expanding vertical mask, 2 right cards)
   - **7. Success Stories / Case Studies Carousel** (`.projects-content-wrapper` with 4 case studies, metric cards, previous/next controls, and hover zoom)
   - **8. Process Timeline** (`.main-section.process-section` with 4 steps from Site Assessment to Optimization, pinned scroll scrub on desktop and swipe on mobile)
   - **9. Live Data USP Telemetry Dashboard** (`.main-section.usp` with alternating headline, 4 telemetry image & stat cards connected by animated lines)
   - **10. Clear Answers FAQ Accordion** (`.main-section` with founder portrait card Emma Carter, 5 accordion questions with 45deg icon rotation and smooth height transition)
   - **11. Field Notes Editorial Journal** (`.main-section` with 3 journal article cards, gradient reveal, category accent highlights, and "View all articles" CTA)
   - **12. Call to Action Banner** (`.main-section.cta` with curved landscape banner, "Ready to make your operation more efficient?", "Talk to an Engineer" button, and video card play trigger)
   - **13. Emergena Footer** (`.main-section.footer.section` with newsletter subscribe form, Emergena logo, navigation columns, social links, and copyright)

---

## 2. Animation & Interaction Inventory (Extracted from Reference Site)

Every interaction on `tokomoo-emergena.webflow.io` has been analyzed directly from the site's compiled JavaScript (`site_webflow.js` & custom scripts):

| # | Animation / Interaction | Reference Trigger / Script | Detailed Behavior |
|---|---|---|---|
| **A1** | **Hero Page-Load Sequence** | `t-28b06bdc` | On load, navbar starts centered at `y: 40vh`. Logo fades in (1s), navbar line draws horizontally (`scaleX: 0 -> 1`), logo slides to left edge (`x: 40vw -> 0vw`), nav links fade in, navbar rises to top (`y: 40vh -> 0vh`), hero landscape image & gradient fade in (1.2s), headline reveals upwards (`y: 100% -> 0%`, `ease: back.out(1.7)`), subtitle reveals, CTA button fades in, and partner marquee expands (`width: 0% -> 100%`). |
| **A2** | **Floating Menu Button & Flyout** | `t-002ed7c8`, `t-be092390` | Triggers when scrolling past 5% of the page. Circular pill button (`.circle-wrap`) scales `0 -> 1`. Clicking toggles hamburger to 'X', opens flyout menu (`.navmenu-floating-wrap`) from top-right (`scale: 0 -> 1`, `opacity: 0 -> 100%`, `ease: 3`). Clicking again or backdrop reverses cleanly. |
| **A3** | **Partner Logo Marquee** | `Script 16` | Infinite seamless horizontal marquee. Images eager-loaded; track translated by GSAP at ~45-50px/s without jerkiness; pauses on hover; debounced re-measurement on resize. |
| **A4** | **Nav Link Underline Effect** | `t-b911c677`, `t-a2682537` | Hovering over nav links animates underline `.menu-line` from `x: -105%` to `0%` (0.35s). On mouseleave, animates from `0%` to `105%` to create continuous flow. |
| **A5** | **Primary Button Hover Fill** | `t-2fb7568c`, `t-f8f973b6` | Button background `.bg-primary-btn` rotates `45deg`, scales `6x`, and slides across on hover, turning background to accent lime and text to dark green. |
| **A6** | **Solutions Cards Entrance & Hover** | `t-b41a1c11`, `t-6221c4f4` | Scroll entrance: tag, title, description reveal with `y: 50% -> 0%`, `back.out(1.7)`. Top accent border draws across (`scaleX: 0 -> 1`), card background uncurls (`scaleY: 0 -> 1`), image expands. Hover: background shifts to accent, description text turns dark green, image scales `1.1x`. |
| **A7** | **Counters Numerical Rollup** | `Script 14`, `t-cf9c9a75` | Manifesto text reveals, separator line scales across (`scaleX: 0 -> 1`). Icon circles pop in (`scale: 0 -> 1`). GSAP animates integers/decimals (`0 -> 31%`, `0 -> 6.2M`, `0 -> 17 Days`, `0 -> 140+`) over 4s with `power2.out` and index-staggered delay. |
| **A8** | **Principles 3-Column Entrance** | `t-7a0af10b` | Header tag & title reveal upwards. Center image vertical mask expands (`height: 0% -> 100%`, `scale: 1.2 -> 1.0`). Left cards slide in from left (`x: -100% -> 0%`, `opacity: 0 -> 100%`). Right cards slide in from right (`x: 100% -> 0%`, `opacity: 0 -> 100%`). |
| **A9** | **Success Stories Slider** | `t-71880a11`, `t-19bf233a`, `Script 18` | Headline reveals upwards. Carousel supports previous/next navigation and autoplay. Hover on card highlights project number badge with accent color and zooms client image `1.1x`. Metric counter smoothly animates on slide change. |
| **A10** | **Process Steps Scroll Scrub** | `t-ec29d4d4`, `Script 17` | Desktop: Pinned sticky timeline section scrubbing through steps 1..4 with title and image scale transitions. Mobile: Touch-swipe slider with drag velocity detection and animated progress bar (`.swipe-indicator-line`). |
| **A11** | **Live Data USP Telemetry Transition** | `t-a0a7b983`, `t-02c7ef0e` | Central title switches between "See performance as it happens" and "Technology that makes impact visible" with vertical crossfade. Telemetry lines and stat cards (`+31%`, `0.4s`, `99.8%`, `24/7`) animate into position on scroll. |
| **A12** | **FAQ Smooth Accordion** | `t-598e6944`, `t-138ac376` | Clicking question smoothly animates height `0 -> auto`, rotates plus icon `45deg` into 'X', closes previously opened questions. |
| **A13** | **Field Notes Journal Hover** | `t-59483fb8`, `t-04275d86` | Staggered entrance on scroll. Hovering card highlights category tag with accent lime, triggers image gradient reveal, and scales image `1.05x`. |
| **A14** | **CTA Banner & Video Modal** | `t-1ce67fc3`, `t-84704455` | Section scrolls in with tag, title, and CTA sliding up; video card thumbnail scales in from bottom right (`transformOrigin: 100% 100%`). Clicking thumbnail or play button opens `.popup-video` modal with YouTube embed, backdrop fade, and escape/click-outside close. |
| **A15** | **Trailing Magnetic Cursor** | `Script 13` | Dot pointer (`.cursor-pointer`) directly follows cursor; outer ring (`.cursor-core`) trails with lerp `0.15` on `gsap.ticker`. Hovering interactive elements pauses pointer visibility. |
| **A16** | **Lenis Smooth Inertial Scrolling** | `Script 15` | Desktop inertial scrolling with `lerp: 0.07`, `smoothWheel: true`, synced with GSAP ScrollTrigger and `ResizeObserver`. |

---

## 3. Step-by-Step Implementation Roadmap

### Step 1: Layout Isolation (`Layout.jsx`) — [COMPLETED]
- In `src/components/layout/Layout.jsx`:
  - Detects `isHome = pathname === "/"`.
  - Suppresses Cathode's `<Header />` and `<Footer />` only on `/`.
  - All other approved client pages (`/products`, `/ci`, `/monitoring`, `/downloads`, `/about`, `/contact`) remain 100% untouched.

### Step 2: Floating Navigation, Flyout Menu & Video Modal Components — [COMPLETED]
- Created `src/sections/emergena/EmergenaNavFloating.jsx`:
  - Floating circular trigger `.circle-wrap` appearing on scroll past 5%.
  - Full floating overlay `.navmenu-floating-wrap` with links, image, social icons, and utility links.
  - Smooth GSAP open/close animations.
- Created `src/sections/emergena/EmergenaVideoModal.jsx`:
  - `.popup-video` with iframe, backdrop overlay `.bg-overlay-video`, and close handlers.

### Step 3: Emergena Hero Refinement (`EmergenaHero.jsx`) — [COMPLETED & VERIFIED]
- **Root Cause & Fix for Hero Section Layout Issue:**
  - An unscoped legacy CSS rule `.hero { height: 100vh; background: black; }` in `src/styles/global.css` was matching Webflow's modifier classes `.bottom-content-wrap.vertical.hero`, `.left-content-wrap.hero`, `.description-wrap.hero`, and `.right-content-wrap.bottom.right.hero`.
  - This forced those elements into `100vh` height and solid black background, hiding the landscape background image and pushing the headline to the top over the navbar and the CTA button to the bottom.
  - **Resolution:** Scoped the legacy `.hero` and `.section` rules in `src/styles/global.css` with `body:not(:has(.emergena-home))` and established comprehensive layout overrides in `src/sections/emergena/emergena.css`.
  - Verified with live browser screenshot: full-viewport wind turbine background, correctly positioned inline navbar, "Built to reduce. Designed to grow stronger." headline, subtitle, "Learn More" button, and crisp white partner logo marquee.

### Step 4: Emergena Footer Component (`EmergenaFooter.jsx`) — [COMPLETED]
- `src/sections/emergena/EmergenaFooter.jsx`:
  - Email newsletter form.
  - Emergena logotype & tagline.
  - 4-column link structure (Navigation, Utility, Social media).
  - Copyright and legal bar.

### Step 5: Sections Visual & Animation Upgrades — [COMPLETED]
- **`EmergenaSolutions.jsx`**: Exact card styling, z-index layering above `.bg-card-solutions`, border line scaleX animation, eager image loading, hover color shift.
- **`EmergenaAboutCounters.jsx`**: Exact 4s `power2.out` GSAP numerical roll-up with index delay (`31%`, `6.2M`, `17 Days`, `140+`).
- **`EmergenaPrinciples.jsx`**: Exact 3-column architecture, center image vertical mask expand, eager image loading, left/right card slide-in.
- **`EmergenaCaseStudies.jsx`**: Smooth slider with navigation arrows, tag hover highlight, image zoom, and dynamic metric counters.
- **`EmergenaProcess.jsx`**: Timeline steps with progress indicators.
- **`EmergenaUsp.jsx`**: Alternating headline cross-fade and 4 telemetry cards with connecting lines.
- **`EmergenaFaq.jsx`**: Emma Carter portrait card and accordion toggle with 45deg plus-to-X rotation.
- **`EmergenaJournal.jsx`**: 3 editorial cards with image hover zoom, category accent background, and gradient overlay.
- **`EmergenaCta.jsx`**: Full-width curved banner, "Talk to an Engineer" button, and video play trigger.

### Step 6: Testing & Verification — [COMPLETED]
- Verified live rendering of all sections in Chromium.
- Resolved image loading with `loading="eager"` across sections.
- Verified smooth scrolling, animations, cursor, and interactive states.

