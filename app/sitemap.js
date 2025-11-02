// app/sitemap.js
export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.aimemories.ru";

  return [
    { url: base, lastModified: new Date() },

    // Добавь остальные важные разделы, если они существуют на сайте:
    // { url: `${base}/privacy`, lastModified: new Date() },
    // { url: `${base}/terms`, lastModified: new Date() },
  ];
}
