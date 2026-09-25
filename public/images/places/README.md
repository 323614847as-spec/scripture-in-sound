# Place photographs

Create one directory per place using the place record's `slug`:

```text
[place-slug]/
├── cover.jpg
└── gallery/
    ├── 01.jpg
    └── 02.jpg
```

Then register every published file in `data/places.ts`. Required photograph metadata: a stable ID, local path, meaningful alt text, visible caption, photographer credit, date when known, and rights or permission status.

Do not add scraped images or files with unclear rights. Do not add a precise coordinate unless it has been verified.
