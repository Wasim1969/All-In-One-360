# Static Hosting Guide

## Local preview

Open `index.html` directly for a quick preview. For the most reliable browser behavior, serve this folder with any static HTTP server and open the resulting `/index.html` URL. No database server or build process is required for the standalone release.

## Permanent public URL

A permanent URL requires a static hosting account, repository, domain, or deployment service controlled by the owner. Upload the complete release folder, including all three HTML entry points and the bundled guideline documents. Configure the host to serve `index.html` as the root document.

Suitable static hosts include GitHub Pages, Netlify, Cloudflare Pages, and ordinary web hosting. The exact upload steps depend on the owner’s account and cannot be embedded in a client-only HTML file.

## Privacy

The bundled documents may contain medical guidance. Use private or access-controlled hosting when the documents are not intended for public distribution. The application’s manually uploaded files remain in browser-local storage and are not automatically uploaded to the host.

## Cross-device data

Hosting the HTML files makes the application available from multiple devices, but browser-local files and icons remain associated with each browser profile. Export the application backup on the source device and import it on the target device when transferring saved local data.

## AI-assisted update workflow

Upload the complete ZIP to the AI editing service. Identify `index.html` as the entry point, provide the exact requested change, and require a complete ZIP response. Ask the service to preserve `RELEASE_MANIFEST.json`, `AI_EDITING_GUIDE.md`, `VERSION.txt`, `UPDATE_LOG.md`, all entry points, and all bundled documents.
