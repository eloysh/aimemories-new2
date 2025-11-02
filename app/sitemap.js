// app/sitemap.js
export default async function sitemap() {
  const base = "https://www.aimemories.ru";
  return [{ url: base, lastModified: new Date() }];
}
