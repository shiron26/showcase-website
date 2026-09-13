Project images.

Drop screenshots here and reference them from `content/projects.ts`:

```
gallery: [
  { src: "/work/<slug>-1.webp",
    caption: { fr: "…", en: "…" },
    w: 2000, h: 1250 },
]
```

They are shown as a contact sheet at the end of the page, and open full screen
when clicked. Give `w` and `h` so the page does not jump while they load, and
convert to WebP (`cwebp -q 80 shot.png -o shot.webp`) — the seven MyAdvisor
screenshots weigh 548 KB that way against 5.2 MB as PNG.

A project with no image renders no block at all. Never add a placeholder.
