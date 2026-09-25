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

## Content guide

All public content is stored as typed records. Records use stable IDs to connect scriptures, recordings, practices, places, and field notes. Keep an ID unchanged after publication so existing links continue to work.

### Add or edit a scripture

Edit `data/scriptures.ts`. Each record needs a unique `id` and URL-safe `slug`, title and alternate titles, one or more traditions, a text type, language information, themes, a short description, source records, and related content IDs. Use `teachingMode` only when the exoteric/esoteric distinction is historically appropriate; otherwise leave it `null`. Do not infer translations, dates, authorship, or sectarian classifications.

### Add or edit audio

Edit `data/recordings.ts` and place the media file in `public/audio/`. Record the performer or source institution, recording date when known, tradition, language, rights status, and source. An audio file should not be published until permission and attribution are clear.

### Add or edit a practice

Edit `data/practices.ts`. Label every practice as `historical`, `traditional`, or `modern-adaptation`, and explain the label in the record. Keep modern guided exercises distinct from documented historical or living-tradition practice.

### Add a sacred place and photographs

Edit `data/places.ts`, then create a folder at:

```text
public/images/places/[place-slug]/
├── cover.jpg
└── gallery/
    ├── 01.jpg
    ├── 02.jpg
    └── 03.jpg
```

Add a `coverImage` and one `Photograph` record per gallery image. Every photograph should include stable `id`, local `src`, concise `alt`, visible `caption`, `credit`, `dateTaken` when known, and rights information. Preserve original aspect ratios; the gallery and lightbox handle portrait and landscape images without cropping.

Do not publish an exact map coordinate unless it has been verified. Places without coordinates remain available as full archive records but do not receive a map marker.

### Add a field note

Edit `data/field-notes.ts`. Field notes must come from the project author. Do not generate or reconstruct observations. Add related scripture, recording, practice, place, and photograph IDs only when the relationship is supported by the note.

### Add or revise a Guide entry

Edit `data/guide.ts`. Guide language should be concise, relational, and non-sectarian. Explain contested categories and historical variation rather than presenting traditions as sealed-off denominations. Add reviewed sources before changing an entry from placeholder/review status.

### Sources, rights, and status

The shared schema is in `types/content.ts`. Use source objects for citations and rights statements. Keep uncertain material explicitly marked `placeholder` or `needs-review`; do not hide missing attribution behind polished prose. The public policy is at `/sources-ethics`.

After content changes, run both validation commands below and inspect the affected page at desktop and mobile widths.

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
