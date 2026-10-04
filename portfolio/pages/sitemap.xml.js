import { SITE } from '@/lib/data';

const PAGES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/services', priority: 0.9, changefreq: 'monthly' },
  { path: '/products', priority: 0.9, changefreq: 'monthly' },
  { path: '/case-studies', priority: 0.8, changefreq: 'monthly' },
  { path: '/case-studies/ruchi-bazzar', priority: 0.7, changefreq: 'monthly' },
  { path: '/case-studies/school-management', priority: 0.7, changefreq: 'monthly' },
  { path: '/pricing', priority: 0.8, changefreq: 'weekly' },
  { path: '/faq', priority: 0.6, changefreq: 'monthly' },
  { path: '/contact', priority: 0.8, changefreq: 'monthly' },
  { path: '/privacy-policy', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms', priority: 0.3, changefreq: 'yearly' },
  { path: '/refund-policy', priority: 0.3, changefreq: 'yearly' },
];

function generateSitemap() {
  const now = new Date().toISOString().split('T')[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(
  (page) => `  <url>
    <loc>${SITE.url}${page.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
).join('\n')}
</urlset>`;
}

export default function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSitemap();
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();
  return { props: {} };
}
