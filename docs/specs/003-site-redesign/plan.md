# 003 Plan

## Approach
Liquid does the data shaping at build time: grouping by year or term, mapping types to badges, filtering out `#` links. A small amount of vanilla JS adds the enhancements (filters, show-all, print, short URLs). The CSS lives in `common.css` in commented sections: tokens, type scale, profile, publications, teaching, cards, timeline, collapsible, a11y, print.

## Key decisions
- **Headings**: `h1` is the profile name; sections are `h2.ui.dividing.header`; sub-sections are `h3`; entries are `h3`/`h4` with a `.cv-entry-title` class. Sizes come from CSS, not from the tag.
- **i18n**: `sections.*`, `sub.*` and `ui.*` keys. `menu_items.yml` gets an `i18n` key, rendered with `{% t menu_item.i18n %}` (the plugin resolves variables).
- **Publications**: the year comes from `details[title=Year]` and the type from `details[title=Type]`, mapped to journal, conference, chapter or thesis. The owner's name is compared with `first_name family_name` and bolded. Links whose icon contains `pdf` render as PDF; a link containing `doi.org` renders as DOI; anything else is Link. `#` is skipped.
- **Teaching**: the courses are concatenated from every education entry. The term sort key is `YYYY-s` (Spring=1, Summer=2, Fall=3), sorted and reversed.
- **Collapsible**: a `[data-collapsible][data-limit]` container holds `[data-collapsible-item]` children. JS adds `.is-collapsed` to the extra items and inserts a toggle button that carries the i18n labels from data attributes. Print CSS forces the items visible.
- **Visibility refresh**: after a filter or toggle, call `.visibility('refresh')` and `.sticky('refresh')` so the menu highlighting stays correct.
- **Contrast**: teal sub-section text and badge text are darkened (for example `#00827c`) to reach at least 4.5:1, with the same hue.
- **Teaching data**: Education stops linking to "N major courses", because those are taught courses that now live in Teaching. Coursework links stay.

## Risks
- Fomantic `visibility` caches offsets, so we refresh after every layout change.
- `<details>` is closed in print, so it is opened on `beforeprint` and restored on `afterprint`.
