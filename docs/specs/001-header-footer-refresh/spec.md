# 001 Header and footer refresh

## Goals
Refine the header and footer of the CV site while keeping the current Fomantic/Lato/neutral look.

## Requirements
Header
- Fixed on scroll; subtle shadow only after scrolling. Remove the double line under the menu.
- Content and in-page anchors never hide under the header (`scroll-margin-top`); the `.ui.sticky` following menu has an offset below the header.
- Left: name and position. Right: sections dropdown, EN/PT/ES switcher (active marked, `aria-current`, keeps current page), GitHub and email icon links (`aria-label`, external links `target=_blank rel=noopener`).
- Mobile: name next to the sandwich icon; language switcher inside the sidebar.
- `<nav aria-label>` landmark.

Footer
- `#f9fafb` background, top border, about 3em padding.
- `ui stackable three column grid` in `ui container`: (1) name, position, email; (2) quick links to sections; (3) language switcher, "Updated X ago", Back to top button (smooth scroll unless `prefers-reduced-motion`).
- Bottom row, small muted: existing credit line and copyright.

## Acceptance criteria
- Works at 1366px and 390px for `/`, `/pt-br/`, `/es/`.
- Switcher keeps the current page; default language has no prefix.
- Header sticky, shadow after scroll; back-to-top works.
- Sidebar, following-menu highlighting, dropdown and "Updated X ago" still work; unique IDs; no console errors.

## Out of scope
CV content, sections, body layout, new dependencies/CDNs, broken demo pages.
