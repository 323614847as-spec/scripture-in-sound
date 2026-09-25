# Scripture in Sound

A public-facing digital humanities project organized around four connected ideas:

**Scripture → Sound → Contemplative Practice → Place**

## Project structure

- `app/` — routes, page metadata, sitemap, and layouts
- `components/` — reusable navigation, audio, map, practice, related-content, and field-note interfaces
- `data/` — editable content records
- `types/content.ts` — shared TypeScript content models
- `public/audio/` — locally hosted audio files
- `public/images/` — add original or licensed images here

## Adding content

- Scriptures: `data/scriptures.ts`
- Audio and recording credits: `data/recordings.ts`
- Contemplative sessions: `data/practices.ts`
- Sacred places and verified coordinates: `data/places.ts`
- Field notes, dates, captions, and relationships: `data/field-notes.ts`

Records use stable IDs to connect scriptures, recordings, practices, places, and field notes. Replace `placeholder` content only after facts, translations, rights, coordinates, and credits have been checked.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
```

The current `lint` command performs a strict TypeScript check. The production build also validates types and generates all static routes.

## Deployment

The production site is published by Vercel from the connected GitHub repository and uses `https://www.scriptureinsound.com` as its canonical URL.
