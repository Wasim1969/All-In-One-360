# SCORE2 validation status — v1.8.44

SCORE2 40–69, no diabetes: original published ESC four-decimal model coefficients, sex-specific baseline survival, four European regional recalibration factors. Formula regression test: male 63, current smoker, SBP 160, TC 10 mmol/L, HDL 1 mmol/L, moderate risk region = 27.078288892% => 27.1%, matching user-provided MDCalc screenshot.

SCORE2-OP and SCORE2-Diabetes: UNVERIFIED; do not output a numeric risk.

Full external multi-case testing against official ESC calculators has NOT been completed. Country-specific validation for Saudi Arabia is NOT available. Clinical guidance is conditional educational advice, not an independent prescribing algorithm.

References: https://academic.oup.com/eurheartj/article/43/3/241/6433491 ; https://pmc.ncbi.nlm.nih.gov/articles/PMC8248998/ ; https://pmc.ncbi.nlm.nih.gov/articles/PMC8248997/

## v1.8.46
Guideline treatment text is conditional decision support. LDL-C input is separate from SCORE2 risk computation. No browser E2E testing performed. Other app files preserved byte-for-byte except UPDATE_LOG.md and VALIDATION.md.


## v1.8.47 checks
- Node syntax checks for new Drug Calculation JS and offline SheetJS bundle.
- Existing non-index application files verified unchanged.
- JSON medication dataset parses and has 13,487 products.
- No end-to-end browser test was run. User should test on a staging Netlify site before production.
