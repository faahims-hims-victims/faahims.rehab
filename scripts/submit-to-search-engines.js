const https = require('https');

async function submitToSearchEngines() {
  console.log('🎯 Submitting FAA HIMS pages to search engines...');
  
  const sitemapUrl = 'https://faahims.rehab/sitemap.xml';
  
  const searchEngines = [
    {
      name: 'Google',
      url: `https://www.google.com/ping?sitemap=${sitemapUrl}`
    },
    {
      name: 'Bing',
      url: `https://www.bing.com/ping?sitemap=${sitemapUrl}`
    }
  ];
  
  for (const engine of searchEngines) {
    try {
      await pingSearchEngine(engine.url);
      console.log(`✓ Successfully pinged ${engine.name}`);
    } catch (error) {
      console.log(`✗ Failed to ping ${engine.name}: ${error.message}`);
    }
  }
  
  console.log('🎉 Search engine submission complete!');
  console.log('📈 Pages will be indexed for FAA HIMS keyword ranking');
}

function pingSearchEngine(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        resolve();
      } else {
        reject(new Error(`HTTP ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

submitToSearchEngines().catch(console.error);
