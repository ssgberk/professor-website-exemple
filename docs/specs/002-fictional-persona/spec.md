# 002 Fictional persona

## Goal
Replace all real-person data (CV content, config, README) with a clearly fictional persona, "John Doe", a university professor, and credit matbrgz while keeping the original template attribution.

## Requirements
- `_data/cv.yml`: same structure, keys, icons/colors and approximate entry counts; fictional names only (Example University, Northfield Institute of Technology, Acme Research Lab); publications and patents clearly fictional; no real DOIs.
- Email `john.doe[at]example[dot]com`; location Springfield; timezone UTC; avatar stays `/images/avatar.svg`.
- `google_analytics_id` removed; `analytics.html` renders nothing when empty.
- Credits: author/organization matbrgz; url and repository of this project.
- Footer shows "Based on the CV template by iROCKBUNNY · CC BY-NC-ND 4.0" in en, pt-br, es. README has a "Credits & license" section.

## Acceptance criteria
- `/`, `/pt-br/`, `/es/` return 200; same section IDs as before; no console errors.
- grep for the original person's identifiers finds only the attribution line, LICENSE and docs/specs.

## Out of scope
Layout, header and footer structure, dependencies.
