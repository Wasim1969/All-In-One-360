# v1.8.46 — SCORE2 Treatment Plan
Only score2-calculator.html changed relative to v1.8.45. Added optional LDL-C, guideline-band-specific conditional lipid management, therapeutic sequence, lifestyle, monitoring and risk modifiers. Existing numerical SCORE2 engine and reset preserved. No changes to other application files.


## v1.8.47 — Drug Calculation 360 (isolated)
- Drug Calculation route now displays a new, responsive drug workspace.
- Embedded medication list derived from the user-provided external tool's labeled April 2026 SFDA product list (13,487 entries). Independent official-source verification and redistribution permission are not established.
- Added brand/generic/registration search, medication details, user-entered dose arithmetic, optional mg/mL conversion, packs and price.
- Added browser-local SFDA Database Manager: CSV/XLS/XLSX/JSON/ZIP (one supported file), preview, confirmation, IndexedDB active/backup/restore.
- The user's example IDF workbook was NOT imported into the app.
- Other tools' source files remain byte-for-byte unchanged; index.html route change is isolated to Drug Calculation.
- Browser testing and medical-dose clinical validation not performed.
