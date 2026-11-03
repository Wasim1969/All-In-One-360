# PREAUTH360 Guidelines360 — AI Editing Guide

## Purpose

This is a standalone static HTML release of the PREAUTH360 Guidelines360 application. It is intentionally packaged so another AI coding assistant can inspect, modify, test, and repackage it without a framework build step.

## Start here

Use `index.html` as the recommended entry point. The files `PREAUTH360_Guidelines360_Offline.html` and `PREAUTH360_Guidelines360_Online.html` are the maintained alternate entry points. Treat all three HTML files as synchronized release artifacts.

For browser testing, serve the release directory over HTTP and open `/index.html`. Direct `file://` opening may restrict browser storage or local relative-resource behavior in some browsers.

## Safe editing contract

Before editing, read `README.md`, `RELEASE_MANIFEST.json`, `VERSION.txt`, `UPDATE_LOG.md`, and `VALIDATION.md`. Make only the change requested by the user. Do not remove or rename existing IDs, storage keys, IndexedDB stores, backup fields, bundled guideline documents, or entry points unless the user explicitly requests a migration.

After editing, test the Welcome screen, the requested feature, one unrelated sidebar tool, local persistence, and the backup workflow. Update `VERSION.txt`, add a dated entry to `UPDATE_LOG.md`, and record the test result in the release notes. Return a complete ZIP rather than a partial HTML file.

## Important application invariants

| Area | Must remain true |
|---|---|
| Initial screen | Welcome to workspace appears before the dashboard |
| Guidelines360 | Manual uploads remain locally stored and searchable in real time |
| Guidelines360 search | It filters manually uploaded files only; bundled guidelines are not filtered by that search |
| File persistence | Uploaded files are stored in browser-local IndexedDB until explicitly deleted |
| Icon persistence | Valid Dashboard links are saved when Enter is pressed |
| Backup | Export and Import Backup remain available and preserve saved files |
| Ordering | Manual files use English natural filename ordering, including numeric segments |
| Packaging | Keep `index.html`, Offline, Online, bundled documents, and release documentation |

## Data portability

Browser-local IndexedDB and localStorage are tied to the browser profile. To move saved files or icons to another device, use the application backup export/import workflow and retain the complete release ZIP. A public URL does not by itself transfer browser-local data.

## Suggested request format for future edits

State the exact screen, the exact visible behavior, what must not change, and the expected test. For example: “In Guidelines360 Document Center, change only the visual label of the upload button; preserve the manual-file-only search, IndexedDB storage, backup format, and all other tools.”

## Delivery checklist

1. Keep the complete release folder intact.
2. Validate all three HTML entry points.
3. Confirm no unrelated tools or storage behavior regressed.
4. Increment the release version and update the log.
5. Create a ZIP containing the complete folder.
6. For a permanent cross-device URL, upload the folder to a static host controlled by the owner; preview URLs can expire.
