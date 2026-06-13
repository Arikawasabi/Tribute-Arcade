# Tribute Arcade Source

Edit these split source files instead of hand-editing the generated HTML:

- `styles.css` - the app styles from the original inline `<style>` block.
- `scripts/online-runtime.js` - the small online bootstrap script.
- `scripts/app.js` - the main arcade code.
- `tribute_four.template.html` - the HTML shell with source tokens.

Run `.\build_public.ps1` from the repo root to rebuild:

- `outputs/tribute_four.html`
- `outputs/cloudflare/public/tribute_four.html`
- `outputs/render_upload/tribute_four.html`
- `outputs/tribute_arcade_render_upload.zip`
