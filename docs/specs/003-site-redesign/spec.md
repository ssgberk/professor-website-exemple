# 003 Site redesign (refine while keeping the style)

## Goal
Present the CV content more clearly, with Publications, Teaching, Research/Projects and a printable CV first. The visual language stays the same: Fomantic UI (unpkg), Lato, the neutral palette, the existing icons and the two-column layout. The header and footer from 001 stay; at most their spacing changes.

## Requirements
1. **Profile card** (left column): a ~160px rounded avatar; name (the page's only `h1`), position, institution and a short tagline (`status.tagline`). Two actions: **Contact** (mailto built from the obfuscated email) and **Download CV (PDF)** (`window.print()`, revealed by JS). Location, specialty, employer and education as a compact icon list. "Updated X ago" stays (`#version`, `#version-icon`).
2. **Readability**: text in the main column is at most ~72ch wide. One type scale with three levels: section (`h2`), entry (`h3`/`h4`) and meta (muted, smaller). The summary biography becomes prose, not bullets. The following-menu highlighting and the anchor offsets under the fixed header keep working.
3. **Section order**: Summary, Publications, Teaching, Research & Projects, Education, Experience, Awards, Patents, Languages, Skills, Additional Info. The section IDs do not change (`courses` stays the Teaching anchor).
4. **Publications**: grouped by year, newest first. Academic format: authors (the owner in bold), title, venue in italics, volume(issue), pages, year. A type badge (Journal, Conference, Book chapter, Thesis). PDF and DOI/Link buttons appear only when the link is not `#`. The abstract sits in `<details>`. Type and year filter chips are plain JS buttons with `aria-pressed` and a live count. Without JS, the chips are hidden and every entry shows.
5. **Teaching**: the courses become real fields (`code, name, term, level, role, description`), with content unchanged. Courses are grouped by term, newest first. Each row shows code, name, a level badge, a role badge and a one-line description. The heading is "Teaching" through i18n.
6. **Research & Projects**: a `ui two stackable cards` grid with equal heights. A card has title, period, institution, summary, funding (with an icon), team, link buttons (none for `#`) and extra bullets in `<details>`. The other project groups use the same card. Coursework projects become a compact list.
7. **Education and Experience**: a pure-CSS vertical timeline (left rail, dot, date as meta, title, subtitle, details) that works on mobile.
8. **Long lists** with more than 6 entries (Teaching terms, skill groups, coursework projects) show the first N plus a "Show all (k)" button with `aria-expanded`. Without JS, and in print, everything shows.
9. **Print** (`@media print`): hide the header, footer, sidebar, following menu, buttons and filters. Use one full-width column with the profile as a compact top block, black text, external links followed by a short URL, `break-inside: avoid` on entries and `@page` margins that suit A4 and Letter. `<details>` open on `beforeprint`.
10. **Consistency**: one heading style, one badge style (`ui mini basic label` in existing hues, with text darkened to meet contrast), one link style. Section and sub-section titles and the new UI strings are translated in en, pt-br and es. Awards, patents, languages, skills and additional info follow the same system without big visual changes.

## Constraints
No new dependencies or CDNs. Changes stay in templates, `common.css`, `common.js`, `_i18n/*`, `_data/menu_items.yml`, and in `_data/cv.yml` (the courses split and `status.tagline`).

## Acceptance criteria
- `/`, `/pt-br/` and `/es/` return 200 with no console errors; `docker logs professor-site` shows a clean build.
- There is exactly one `h1` per page; section IDs are unchanged; the following menu highlights the current section on desktop.
- At 390px nothing scrolls horizontally (`scrollWidth == 390`); at 1366px the two-column layout is kept.
- Publications filters narrow the list and update the count; `aria-pressed` reflects the state; with JS disabled all 6 publications are visible.
- "Show all" toggles `aria-expanded` and reveals the hidden items; print shows all items.
- Print preview has no header, footer or menu; it is one column, and the profile block is on top.
- Focus is visible on links, buttons and summaries; motion respects `prefers-reduced-motion`.

## Out of scope
Translating CV content (entries stay in English), real PDF generation, changes to the header and footer structure, the demo pages under `pages/`.
