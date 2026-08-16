const fs = require('fs');

function generateEnhancedSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];

  const urls = [
    { loc: 'https://faahims.rehab/', changefreq: 'daily', priority: '1.0' },
    { loc: 'https://faahims.rehab/faa-hims-guide.html', changefreq: 'weekly', priority: '0.9' },
    { loc: 'https://faahims.rehab/pilot-medical-certification.html', changefreq: 'weekly', priority: '0.9' },
    { loc: 'https://faahims.rehab/faq.html', changefreq: 'weekly', priority: '0.9' },
    { loc: 'https://faahims.rehab/hims-requirements.html', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://faahims.rehab/hims-ame-directory.html', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://faahims.rehab/hims-treatment-facilities.html', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://faahims.rehab/hims-success-stories.html', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://faahims.rehab/aviation-medical-recovery.html', changefreq: 'weekly', priority: '0.8' }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync('sitemap.xml', sitemap);
  console.log(`✓ Sitemap.xml generated with ${urls.length} URLs`);
}
generateEnhancedSitemap();
