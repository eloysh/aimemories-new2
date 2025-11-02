// app/robots.js
export default function robots() {
  return { rules:[{ userAgent:"*", allow:"/" }], sitemap:"https://www.aimemories.ru/sitemap.xml" };
}
// app/sitemap.js
export default function sitemap() {
  const base="https://www.aimemories.ru";
  return [{ url: base, lastModified: new Date() }];
}
