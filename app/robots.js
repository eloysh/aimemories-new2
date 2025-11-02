export function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: https://www.aimemories.ru/sitemap.xml
`;
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}