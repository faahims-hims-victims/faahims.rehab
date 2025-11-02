const { exec } = require('child_process');
const fs = require('fs');
const https = require('https');

class FAHIMSForumScraper {
  constructor() {
    this.baseUrl = 'https://hims-victims.freeforums.net';
    this.proxyConfig = null;
    this.buildNumber = process.env.GITHUB_RUN_NUMBER || Math.floor(Math.random() * 1000);
    this.currentDateTime = new Date().toISOString();
    
    console.log(`=== SCRAPER INITIALIZATION ===`);
    console.log(`Build Number: ${this.buildNumber}`);
    console.log(`Current DateTime: ${this.currentDateTime}`);
  }

  setProxy(proxyUrl) {
    const match = proxyUrl.match(/socks5:\/\/([^:]+):([^@]+)@([^:]+):(\d+)/);
    if (match) {
      this.proxyConfig = {
        username: match[1],
        password: match[2],
        host: match[3],
        port: match[4]
      };
      console.log(`SOCKS5 proxy configured: ${this.proxyConfig.host}:${this.proxyConfig.port}`);
      return true;
    }
    return false;
  }

  shouldSkipSafeZone(url) {
    const safeZonePatterns = [
      '/safe-zone/', '/private/', '/confidential/', '/admin/', '/mod/',
      '/board/3/', '/board/4/', '/board/5/'
    ];
    return safeZonePatterns.some(pattern => url.toLowerCase().includes(pattern));
  }

  async fetchWithProxy(url) {
    if (this.shouldSkipSafeZone(url)) {
      console.log(`Skipping Safe Zone content: ${url}`);
      return '<html><body>Safe Zone content protected for privacy</body></html>';
    }

    return new Promise((resolve, reject) => {
      let cmd = `curl -s -L --connect-timeout 30 --max-time 60`;
      
      if (this.proxyConfig) {
        cmd += ` --socks5-hostname ${this.proxyConfig.host}:${this.proxyConfig.port}`;
        cmd += ` --proxy-user "${this.proxyConfig.username}:${this.proxyConfig.password}"`;
      }
      
      cmd += ` "${url}"`;
      
      console.log(`Fetching professional forum content: ${url}`);
      
      exec(cmd, { maxBuffer: 15 * 1024 * 1024 }, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error fetching ${url}:`, error.message);
          reject(error);
        } else {
          console.log(`Fetched ${url} (${Math.round(stdout.length/1024)}KB)`);
          resolve(stdout);
        }
      });
    });
  }

  generateAdvancedSitemap() {
    const currentDate = new Date().toISOString();
    const baseUrl = 'https://faahims.rehab';
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/faq.html</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>${baseUrl}/join.html</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${baseUrl}/discussion.html</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>${baseUrl}/topics.html</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.85</priority>
  </url>
</urlset>`;

    fs.writeFileSync('sitemap.xml', sitemap);
    console.log('Sitemap generated');
  }

  generateRSSFeed() {
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>FAA HIMS Program Community Updates</title>
    <description>Professional updates from the FAA HIMS Program community</description>
    <link>https://faahims.rehab</link>
    <lastBuildDate>${this.currentDateTime}</lastBuildDate>
    <item>
      <title>FAA HIMS Community Update #${this.buildNumber}</title>
      <description>Current discussions and professional guidance</description>
      <link>https://faahims.rehab/</link>
      <pubDate>${this.currentDateTime}</pubDate>
    </item>
  </channel>
</rss>`;

    fs.writeFileSync('feed.xml', rss);
    fs.writeFileSync('rss.xml', rss);
    console.log('RSS feed generated');
  }

  generateAdvancedRobots() {
    const robots = `# Build: ${this.buildNumber} | Updated: ${this.currentDateTime}
User-agent: *
Allow: /
Sitemap: https://faahims.rehab/sitemap.xml
`;

    fs.writeFileSync('robots.txt', robots);
    console.log('robots.txt generated');
  }

  generateStructuredData() {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://faahims.rehab/",
      "name": "FAA HIMS Program Community"
    };
    
    fs.writeFileSync('structured-data.json', JSON.stringify(structuredData, null, 2));
    console.log('Structured data generated');
  }

  async submitToSearchEngines() {
    console.log('Search engine submission initiating...');
    
    const results = [];
    const submissionLog = {
      timestamp: this.currentDateTime,
      buildNumber: this.buildNumber,
      results: results
    };
    
    fs.writeFileSync('submission-log.json', JSON.stringify(submissionLog, null, 2));
    console.log('Submission log created');
  }

  monitorPerformance() {
    const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
    const performanceReport = {
      timestamp: this.currentDateTime,
      buildNumber: this.buildNumber,
      files: [],
      totalFiles: htmlFiles.length
    };
    
    htmlFiles.forEach(file => {
      const stats = fs.statSync(file);
      performanceReport.files.push({
        filename: file,
        sizeKB: Math.round(stats.size / 1024)
      });
    });
    
    fs.writeFileSync('performance-report.json', JSON.stringify(performanceReport, null, 2));
    console.log(`Performance report generated - ${htmlFiles.length} files`);
    
    return performanceReport;
  }
}

function createProfessionalIndex(scraper) {
  const displayDate = new Date(scraper.currentDateTime).toLocaleString('en-US', { 
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FAA HIMS Program Professional Community</title>
    <meta name="description" content="Professional community for aviation medical practitioners and pilots navigating FAA HIMS program requirements.">
    <link rel="canonical" href="https://faahims.rehab/">
    
    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large">
    
    <script>
        // ===== REDIRECT TIMER CONTROL =====
        const REDIRECT_ENABLED = false;  // Set to true to enable 12-second timer
        // ==================================
        
        (function() {
            if (!REDIRECT_ENABLED) {
                console.log('Redirect timer is disabled - manual navigation only');
                // Update display to show static link for everyone
                const countdownDisplay = document.getElementById('countdown-display');
                if (countdownDisplay) {
                    countdownDisplay.innerHTML = '<a href="https://hims-victims.freeforums.net" style="color:#3182ce;font-weight:bold;text-decoration:none;font-size:1.2em">Visit HIMS Community Forum →</a>';
                }
                return;
            }
            
            const isBot = /bot|crawl|spider|slurp|index|google|bing|yahoo|facebook|twitter|linkedin|facebookexternalhit|whatsapp|telegram|yandex|baidu|duckduckbot|baiduspider|archive/i.test(navigator.userAgent);
            const isHeadless = navigator.webdriver || window.navigator.webdriver;
            
            if (isBot || isHeadless) {
                console.log('Search engine detected - indexing mode');
                const countdownDisplay = document.getElementById('countdown-display');
                if (countdownDisplay) {
                    countdownDisplay.innerHTML = '<a href="https://hims-victims.freeforums.net" style="color:#3182ce;font-weight:bold;text-decoration:none">Visit HIMS Community Forum →</a>';
                }
                return;
            }
            
            let countdown = 12;
            const targetUrl = 'https://hims-victims.freeforums.net';
            
            function updateCountdown() {
                const el = document.getElementById('countdown-seconds');
                if (el) el.textContent = countdown;
            }
            
            const notification = document.createElement('div');
            notification.style.cssText = 'position:fixed;top:25px;right:25px;background:linear-gradient(135deg,#1a365d,#2c5282);color:white;padding:20px;border-radius:8px;font-weight:600;z-index:10000;cursor:pointer;box-shadow:0 8px 30px rgba(0,0,0,0.3);font-family:-apple-system,sans-serif;text-align:center;min-width:280px;border:2px solid rgba(255,255,255,0.1)';
            notification.innerHTML = '<div style="font-weight:600;margin-bottom:8px;font-size:14px">🚀 HIMS Community</div><div style="font-size:13px">Connecting in <strong>' + countdown + '</strong> seconds</div><div style="font-size:11px;margin-top:8px;opacity:0.8">Click to join now</div>';
            
            notification.onclick = () => window.location.href = targetUrl;
            
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => document.body.appendChild(notification));
            } else {
                document.body.appendChild(notification);
            }
            
            const timer = setInterval(() => {
                countdown--;
                updateCountdown();
                
                if (countdown > 0) {
                    notification.innerHTML = '<div style="font-weight:600;margin-bottom:8px;font-size:14px">🚀 HIMS Community</div><div style="font-size:13px">Connecting in <strong>' + countdown + '</strong> seconds</div><div style="font-size:11px;margin-top:8px;opacity:0.8">Click to join now</div>';
                } else {
                    clearInterval(timer);
                    notification.innerHTML = '<div style="font-weight:600;font-size:14px">🔄 Connecting...</div>';
                    setTimeout(() => window.location.href = targetUrl, 500);
                }
            }, 1000);
        })();
    </script>
    
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; color: #2d3748; background: #fff;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        .header { 
            background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
            color: white; padding: 80px 0; text-align: center;
        }
        .header h1 { 
            font-size: 3em; margin-bottom: 20px; font-weight: 700;
        }
        .header p { font-size: 1.3em; opacity: 0.95; }
        
        .build-info {
            background: #f7fafc; padding: 15px; text-align: center;
            font-size: 0.9em; color: #4a5568; font-family: monospace;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .redirect-notice { 
            background: #f7fafc; border: 3px solid #3182ce; 
            padding: 40px; margin: 40px auto; border-radius: 8px; 
            text-align: center; max-width: 800px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        .redirect-notice h2 { color: #1a365d; margin-bottom: 20px; }
        .redirect-notice .countdown {
            font-size: 1.5em; color: #2c5282; margin: 20px 0;
            font-weight: 700;
        }
        .redirect-notice a {
            color: #3182ce; font-weight: 600; text-decoration: none;
            font-size: 1.1em;
        }
        .redirect-notice a:hover { text-decoration: underline; }
        
        .content { padding: 60px 0; }
        
        .features { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px; margin: 40px 0;
        }
        .feature { 
            padding: 30px; background: white;
            border: 1px solid #e2e8f0; border-radius: 8px;
            border-left: 4px solid #3182ce;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .feature h3 { color: #1a365d; margin-bottom: 15px; font-size: 1.3em; }
        .feature p { color: #4a5568; line-height: 1.7; }
        
        .stats { 
            background: #f8f9fa; padding: 60px 0; text-align: center;
            margin: 50px 0;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px; max-width: 1000px; margin: 40px auto;
        }
        .stat {
            background: white; padding: 30px; border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }
        .stat-number {
            font-size: 3em; font-weight: bold; color: #3182ce;
            margin-bottom: 10px;
        }
        .stat-label { font-weight: 600; color: #555; }
        
        .cta {
            text-align: center; padding: 60px 0;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
        }
        .cta h2 { color: #1a365d; margin-bottom: 20px; }
        .cta-button {
            display: inline-block; margin: 20px 10px;
            padding: 18px 40px; background: linear-gradient(135deg, #3182ce, #2c5282);
            color: white; text-decoration: none; border-radius: 8px;
            font-weight: 600; font-size: 1.1em;
            transition: transform 0.3s ease;
        }
        .cta-button:hover { transform: translateY(-3px); }
        .cta-button.secondary {
            background: linear-gradient(135deg, #38a169, #2f855a);
        }
        
        footer {
            background: linear-gradient(135deg, #1a365d, #2c5282);
            color: white; padding: 50px 0; text-align: center;
        }
        footer a { color: #a0aec0; text-decoration: none; font-weight: 600; }
        
        @media (max-width: 768px) {
            .header h1 { font-size: 2em; }
            .features { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="build-info">
        <strong>System Update #${scraper.buildNumber}</strong> • Last updated: ${displayDate} UTC • Updated every 6 hours
    </div>
    
    <div class="header">
        <div class="container">
            <h1>FAA HIMS Program Professional Community</h1>
            <p>Expert guidance • Real pilot experiences • Medical certification support</p>
        </div>
    </div>
    
    <div class="content">
        <div class="container">
            <div class="redirect-notice">
                <h2>Connecting to Active Community</h2>
                <p>Professional FAA HIMS community forum...</p>
                <div class="countdown" id="countdown-display">
                    <span id="countdown-seconds">12</span> seconds
                </div>
                <p style="margin-top:15px;color:#4a5568">Connect with aviation medical practitioners, HIMS-approved AMEs, and experienced program participants.</p>
            </div>
            
            <div class="features">
                <div class="feature">
                    <h3>Professional Community</h3>
                    <p>Connect with 600+ aviation medical practitioners, HIMS participants, and certified pilots navigating FAA medical certification requirements.</p>
                </div>
                <div class="feature">
                    <h3>Expert Guidance</h3>
                    <p>Access insights from HIMS-approved AMEs, certified professionals, aviation psychologists, and successful program graduates.</p>
                </div>
                <div class="feature">
                    <h3>Comprehensive Resources</h3>
                    <p>Program requirements, treatment facility guidance, medical certification procedures, testing protocols, and success strategies.</p>
                </div>
                <div class="feature">
                    <h3>Active Discussions</h3>
                    <p>Engage in discussions about treatment experiences, AME consultations, monitoring requirements, career considerations, and recovery strategies.</p>
                </div>
                <div class="feature">
                    <h3>Confidential Support</h3>
                    <p>Share concerns and receive support in a confidential environment from those who understand aviation medical certification challenges.</p>
                </div>
                <div class="feature">
                    <h3>Return to Flight</h3>
                    <p>Learn from pilots who successfully navigated HIMS and returned to commercial, corporate, and general aviation careers.</p>
                </div>
            </div>
        </div>
    </div>
    
    <div class="stats">
        <div class="container">
            <h2>Professional FAA HIMS Network</h2>
            <div class="stats-grid">
                <div class="stat">
                    <div class="stat-number">600+</div>
                    <div class="stat-label">Aviation Professionals</div>
                </div>
                <div class="stat">
                    <div class="stat-number">24/7</div>
                    <div class="stat-label">Expert Support</div>
                </div>
                <div class="stat">
                    <div class="stat-number">95%+</div>
                    <div class="stat-label">Success Rate</div>
                </div>
                <div class="stat">
                    <div class="stat-number">Daily</div>
                    <div class="stat-label">New Discussions</div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="cta">
        <div class="container">
            <h2>Connect with FAA HIMS Professionals</h2>
            <p style="font-size:1.2em;margin:20px 0;color:#555">Professional community for aviation medical practitioners and pilots</p>
            <a href="https://login.proboards.com/register/7088425" class="cta-button">Join Professional Community</a>
            <a href="https://hims-victims.freeforums.net" class="cta-button secondary">Browse Forum</a>
        </div>
    </div>
    
    <footer>
        <div class="container">
            <p style="font-size:1.2em;margin-bottom:15px"><strong>Professional FAA HIMS Community</strong></p>
            <p style="font-size:1.1em;margin-bottom:20px">
                <a href="https://hims-victims.freeforums.net">hims-victims.freeforums.net</a>
            </p>
            <p style="opacity:0.8;margin-bottom:10px">
                Professional guidance • Medical certification support • Evidence-based resources
            </p>
            <p style="opacity:0.7;font-size:0.9em;font-family:monospace">
                Build #${scraper.buildNumber} • ${displayDate} UTC
            </p>
        </div>
    </footer>
</body>
</html>`;

  fs.writeFileSync('index.html', html);
  console.log('✓ Professional index.html created');
}

async function main() {
  const scraper = new FAHIMSForumScraper();
  
  console.log(`\n=== FAA HIMS PROFESSIONAL FORUM SCRAPER ===`);
  console.log(`Build #${scraper.buildNumber}`);
  
  const proxyUrl = process.env.PROXY_URL;
  const username = process.env.FORUM_USERNAME;
  const password = process.env.FORUM_PASSWORD;
  
  if (!username || !password) {
    console.error('Missing forum credentials');
    process.exit(1);
  }

  if (proxyUrl) {
    scraper.setProxy(proxyUrl);
  }

  console.log('\nGenerating SEO files...');
  scraper.generateAdvancedSitemap();
  scraper.generateRSSFeed();
  scraper.generateAdvancedRobots();
  scraper.generateStructuredData();

  console.log('\nCreating professional index.html...');
  createProfessionalIndex(scraper);

  const otherPages = {
    'join.html': `${scraper.baseUrl}/register`,
    'discussion.html': `${scraper.baseUrl}/board/1/general-discussion`,
    'topics.html': `${scraper.baseUrl}/search.php?search_id=newposts`
  };

  console.log('\nAttempting to fetch additional pages...');
  for (const [filename, url] of Object.entries(otherPages)) {
    try {
      await scraper.fetchWithProxy(url);
      console.log(`Fetched data for ${filename}`);
    } catch (error) {
      console.log(`Could not fetch ${filename}: ${error.message}`);
    }
  }

  const performanceReport = scraper.monitorPerformance();
  await scraper.submitToSearchEngines();
  
  console.log(`\n=== SCRAPER COMPLETED ===`);
  console.log(`Build #${scraper.buildNumber}`);
  console.log(`${performanceReport.totalFiles} HTML files created`);
  console.log(`Professional index.html: ✓ CREATED`);
}

main().catch(console.error);
