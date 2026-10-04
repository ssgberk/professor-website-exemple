# Plan

## Files
- `_includes/header.html`, `sidebar.html`, `footer.html`, new `_includes/lang_switcher.html`
- `assets/css/common.css`, `assets/js/common.js`
- `_i18n/{en,pt-br,es}.yml` (labels)

## Approach
- Header: `position: fixed` via `.ui.fixed.main.menu`-style rule on the existing menu; `body` padding-top equals header height; `.scrolled` class toggled by JS adds the shadow.
- Anchors: `.cv-section, #status { scroll-margin-top }`; sticky `offset` set to header height + gap.
- Switcher: built from `site.languages`, `site.baseurl_root`, `page.url`; default language unprefixed.
- Footer: Fomantic grid, quick links reuse `menu_items.html`.
- Version text: `#version` stays in the status block; footer uses `.version-text`; JS updates both.

## Decisions
- Shared switcher include to avoid duplication (header, sidebar, footer).
- No new dependencies.
