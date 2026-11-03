# PREAUTH360 Guidelines360 — Persistent Portable Baseline

## Purpose

This package is the portable baseline for the PREAUTH360 Guidelines360 application. It is prepared for local use, upload to an AI editing service, and static hosting. The original Offline and Online HTML files are preserved, and a standard `index.html` entry point is included.

## Main entry point

Open `index.html`. For the most reliable behavior, serve the package directory through a static HTTP server and open `/index.html` rather than opening the file directly with `file://`.

## Persistent uploaded-file behavior

The package includes a lightweight, asynchronous browser file vault based on IndexedDB. Any file selected through an `input[type="file"]` control is retained locally in the current browser profile. The file content is saved, not merely its name or the original device path. This applies to Guidelines360 and to future tools that add a file-upload field.

The saved files are retained when moving between tools, re-opening the application, or reloading the page. The **Saved files** control provides a list of retained files and offers **Download** and explicit **Delete** actions. No saved file is deleted automatically. Deletion requires confirmation for the selected file. The vault is local to the same browser and device; moving it to another device requires an explicit backup/export and restore workflow.

## Local use

Keep the `Tawuniya_documents` folder beside the HTML files. The bundled guideline documents use relative paths. If you add a file manually while the application is running, leave the browser storage intact to retain it locally. Do not clear site data or browser storage unless you intend to remove locally retained files.

## Use with an AI editing service

Upload the complete ZIP package rather than only one HTML file. Identify `index.html` as the entry point and specify which screen or behavior may be changed. Ask the editing service to preserve `Tawuniya_documents`, relative paths, the `PREAUTH360FileVault` storage helper, and all unrelated tools. Keep each returned ZIP as a separate version instead of overwriting the previous baseline.

## Update and release workflow

1. Start from the latest portable ZIP.
2. Apply one clearly defined group of changes.
3. Test the changed feature, file upload, Saved files list, and main entry point.
4. Increment `VERSION.txt` and add a dated entry to `UPDATE_LOG.md`.
5. Package the complete folder again, including `Tawuniya_documents` and all HTML files.
6. Publish the new package on a static host or preview server and verify the public URL before sharing it.

## Hosting

The package is compatible with GitHub Pages, Netlify, Cloudflare Pages, and ordinary static web hosting. A permanent URL requires a hosting account or domain controlled by the owner. Temporary preview links can expire when the hosting session ends.

## Data and privacy

The package contains local medical guideline documents. Use an access-controlled host when the documents are not intended for public distribution. Browser-local files remain in the local browser profile and are not uploaded to a server by this client-only package. Do not enter real patient information into an offline demonstration unless the deployment has been reviewed and secured for that purpose.

## Included files

- `index.html`: standard entry point and copy of the Offline version.
- `PREAUTH360_Guidelines360_Offline.html`: Offline application.
- `PREAUTH360_Guidelines360_Online.html`: Online application.
- `Tawuniya_documents/`: bundled guideline documents.
- `VERSION.txt`: package version.
- `UPDATE_LOG.md`: release history.

## Portable AI-Ready release files

This release also includes `RELEASE_MANIFEST.json`, which provides machine-readable release metadata, entry points, preserved features, and editing invariants. `AI_EDITING_GUIDE.md` is the primary handoff document for another AI coding assistant. `HOSTING_GUIDE.md` explains local preview, permanent static hosting, privacy, and cross-device backup transfer.

These documents are part of the release contract. Future edited versions should retain them, update the version and change log, and return the complete package rather than an isolated HTML fragment.

## v1.8.47 Drug Calculation 360
Open `index.html` on Netlify and select Drug Calculation in the sidebar. This route opens the isolated `drug-calculation-360.html` workspace. The built-in April 2026 SFDA-labeled product list was extracted from the external calculator supplied by the user; source authenticity, current registration status, clinical dose data, and redistribution permissions have not been independently verified. The separately supplied example IDF workbook is NOT embedded or imported.

The SFDA Database Manager supports CSV, JSON, XLS/XLSX and ZIP containing exactly one such file. It previews the selected records, requires explicit confirmation, stores the replacement in the current browser's IndexedDB, and retains a previous local database for restoration. It does NOT replace the published static files or synchronize across browsers/users. Use an administrative backend for shared updates.

Dose calculations are arithmetic based on clinician-entered values, not automatic medical recommendations or drug-interaction checking. Product strength and pack contents must be verified; pack quantities require matching units. Other existing tools and source files remain unchanged. Browser execution and medical validation should be completed on a staging deployment before production.
