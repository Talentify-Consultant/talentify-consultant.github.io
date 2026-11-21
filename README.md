# Talentify Consultant website

One-page company website (English and Arabic with a language switch).

## Edit the text
Open `index.html` and find `var I18N` near the bottom. Every sentence is listed there in English (`en`) and Arabic (`ar`). Change a sentence in both places and save.

## Contact details
The WhatsApp number appears in the contact card, the WhatsApp links and the footer in `index.html`. Search for `01042635352` and `201042635352` to change it.

## Social icons
The footer has Instagram, Facebook and LinkedIn icons. LinkedIn is linked to the company page. Instagram and Facebook are visual only for now: to link one, add `href="https://..." target="_blank" rel="noopener"` to its `<a class="soc" ...>` line in the footer of `index.html`.

## Publish with GitHub Pages
Settings > Pages > Source: Deploy from a branch > `main` / `(root)`. The site goes live at `https://<username>.github.io/<repo>/` after a minute.

## Web app
The installable app version lives in `app/` and opens at `/app/`. On a phone, open it and choose Add to Home Screen. Edit the text inside `app/index.html`.

## Files
- `index.html`: the whole site (styles and script included)
- `logo.png`: Talentify Consultant logo (for dark backgrounds)
- `favicon.png`, `apple-touch-icon.png`: browser and home-screen icons
