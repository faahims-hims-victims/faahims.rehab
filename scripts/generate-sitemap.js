const fs = require('fs');

function generateEnhancedSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls = [
    // faahims.rehab Pages ONLY
    {
      loc: 'https://faahims.rehab/',
      lastmod: currentDate,
      changefreq: 'hourly',
      priority: '1.0'
    },
    {
      loc: 'https://faahims.rehab/join.html',
      lastmod: currentDate,
      changefreq: 'hourly',
      priority: '0.9'
    },
    {
      loc: 'https://faahims.rehab/forum-home.html',
      lastmod: currentDate,
      changefreq: 'hourly',
      priority: '0.8'
    },
    {
      loc: 'https://faahims.rehab/faa-hims-guide.html',
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      loc: 'https://faahims.rehab/pilot-medical-certification.html',
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.9'
    },
    {
      loc: 'https://faahims.rehab/hims-requirements.html',
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.8'
    },
    {
      loc: 'https://faahims.rehab/aviation-medical-recovery.html',
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.8'
    }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;
  
  fs.writeFileSync('sitemap.xml', sitemap);
  console.log(`✓ Sitemap.xml generated with ${urls.length} URLs`);
}

generateEnhancedSitemap();
