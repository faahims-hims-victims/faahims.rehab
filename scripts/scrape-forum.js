const { exec } = require('child_process');
const fs = require('fs');
const https = require('https');

class FAHIMSForumScraper {
  constructor() {
    this.baseUrl = 'https://hims-victims.freeforums.net';
    this.proxyConfig = null;
    this.buildNumber = process.env.GITHUB_RUN_NUMBER || Math.floor(Math.random() * 1000);
    this.currentDateTime = new Date().toISOString();
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
      console.log(`✓ SOCKS5 proxy configured: ${this.proxyConfig.host}:${this.proxyConfig.port}`);
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
      console.log(`🔒 Skipping Safe Zone content: ${url}`);
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
          console.log(`✓ Fetched ${url} (${Math.round(stdout.length/1024)}KB)`);
          resolve(stdout);
        }
      });
    });
  }

  // Advanced SEO Methods
  generateAdvancedSitemap() {
    const currentDate = new Date().toISOString();
    const baseUrl = 'https://faahims.rehab';
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${baseUrl}/images/faa-hims-community.jpg</image:loc>
      <image:caption>FAA HIMS Program Professional Community</image:caption>
      <image:title>Aviation Medical Certification Support</image:title>
    </image:image>
  </url>
  <url>
    <loc>${baseUrl}/join.html</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.95</priority>
    <image:image>
      <image:loc>${baseUrl}/images/join-hims-community.jpg</image:loc>
      <image:caption>Join the HIMS-Victims Community</image:caption>
    </image:image>
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
  <url>
    <loc>${baseUrl}/forum-home.html</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.85</priority>
  </url>
  <url>
    <loc>${baseUrl}/faa-hims-guide.html</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.90</priority>
  </url>
  <url>
    <loc>${baseUrl}/pilot-medical-certification.html</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.90</priority>
  </url>
</urlset>`;

    fs.writeFileSync('sitemap.xml', sitemap);
    console.log('✓ Advanced XML sitemap generated with image tags');
  }

  generateRSSFeed() {
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FAA HIMS Program Community Updates</title>
    <description>Latest updates from the FAA HIMS Program professional community</description>
    <link>https://faahims.rehab</link>
    <atom:link href="https://faahims.rehab/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    <lastBuildDate>${this.currentDateTime}</lastBuildDate>
    <pubDate>${this.currentDateTime}</pubDate>
    <ttl>120</ttl>
    <generator>FAA HIMS SEO Bot v${this.buildNumber}</generator>
    
    <item>
      <title>FAA HIMS Community Content Update #${this.buildNumber}</title>
      <description>Fresh discussions, professional guidance, and case studies from aviation medical practitioners navigating the FAA HIMS program.</description>
      <link>https://faahims.rehab/</link>
      <guid isPermaLink="true">https://faahims.rehab/updates/${this.buildNumber}</guid>
      <pubDate>${this.currentDateTime}</pubDate>
      <category>Aviation Medical</category>
      <category>FAA HIMS</category>
      <category>Professional Community</category>
    </item>
    
    <item>
      <title>Latest HIMS Program Professional Discussions</title>
      <description>New professional discussions about medical certification processes, treatment facility experiences, and regulatory compliance guidance from certified aviation professionals.</description>
      <link>https://faahims.rehab/discussion.html</link>
      <guid isPermaLink="true">https://faahims.rehab/discussion-${this.buildNumber}</guid>
      <pubDate>${this.currentDateTime}</pubDate>
      <category>Professional Discussion</category>
      <category>Medical Certification</category>
    </item>
    
    <item>
      <title>HIMS Program Requirements and Guidelines</title>
      <description>Updated information on FAA HIMS program requirements, compliance procedures, and professional guidance for aviation medical certification.</description>
      <link>https://faahims.rehab/topics.html</link>
      <guid isPermaLink="true">https://faahims.rehab/topics-${this.buildNumber}</guid>
      <pubDate>${this.currentDateTime}</pubDate>
      <category>Program Requirements</category>
      <category>Compliance</category>
    </item>
    
  </channel>
</rss>`;

    fs.writeFileSync('feed.xml', rss);
    fs.writeFileSync('rss.xml', rss);
    console.log('✓ RSS feed generated for fresh content signals');
  }

  generateAdvancedRobots() {
    const robots = `# Advanced SEO robots.txt for FAA HIMS Program Community
# Build: ${this.buildNumber} | Updated: ${this.currentDateTime}

User-agent: *
Allow: /

# High-priority pages for search engines
Allow: /index.html
Allow: /join.html
Allow: /discussion.html
Allow: /topics.html
Allow: /forum-home.html
Allow: /faa-hims-guide.html
Allow: /pilot-medical-certification.html
Allow: /hims-requirements.html
Allow: /aviation-medical-recovery.html

# Block sensitive content
Disallow: /safe-zone/
Disallow: /*private*
Disallow: /*confidential*
Disallow: /admin/
Disallow: /temp/

# SEO optimization files
Allow: /sitemap.xml
Allow: /feed.xml
Allow: /robots.txt

# Search engine specific optimization
User-agent: Googlebot
Crawl-delay: 0
Allow: /
Request-rate: 1/1s

User-agent: Bingbot
Crawl-delay: 1
Allow: /
Request-rate: 1/2s

User-agent: Slurp
Crawl-delay: 2
Allow: /

User-agent: DuckDuckBot
Crawl-delay: 1
Allow: /

User-agent: YandexBot
Crawl-delay: 2
Allow: /

User-agent: Baiduspider
Crawl-delay: 3
Allow: /

# Block AI training bots but allow search indexing
User-agent: ChatGPT-User
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: ClaudeBot
Disallow: /

# Allow social media crawlers
User-agent: facebookexternalhit
Allow: /
Crawl-delay: 1

User-agent: Twitterbot
Allow: /
Crawl-delay: 1

User-agent: LinkedInBot
Allow: /
Crawl-delay: 2

# Sitemap locations
Sitemap: https://faahims.rehab/sitemap.xml
Sitemap: https://faahims.rehab/feed.xml

# Performance optimization
Cache-control: max-age=3600
`;

    fs.writeFileSync('robots.txt', robots);
    console.log('✓ Advanced robots.txt generated with AI bot blocking');
  }

  generateStructuredData() {
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://faahims.rehab/#website",
          "url": "https://faahims.rehab/",
          "name": "FAA HIMS Program Community",
          "description": "Professional community for aviation medical practitioners and certified pilots navigating FAA HIMS program requirements",
          "publisher": {
            "@id": "https://faahims.rehab/#organization"
          },
          "potentialAction": [
            {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://hims-victims.freeforums.net/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          ],
          "inLanguage": "en-US"
        },
        {
          "@type": "Organization",
          "@id": "https://faahims.rehab/#organization",
          "name": "FAA HIMS Program Community",
          "url": "https://faahims.rehab/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://faahims.rehab/images/logo.png",
            "width": 400,
            "height": 400
          },
          "sameAs": [
            "https://hims-victims.freeforums.net"
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is the FAA HIMS Program?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The FAA HIMS (Human Intervention Motivation Study) Program is a comprehensive approach to evaluating and monitoring airmen with substance abuse issues, providing a pathway for pilots to regain their medical certificates through approved treatment and ongoing monitoring."
              }
            },
            {
              "@type": "Question",
              "name": "How long does the HIMS program typically take?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The HIMS program timeline varies by individual case but typically involves initial evaluation, treatment phase (3-12 months), and ongoing monitoring (2-5 years) with regular check-ins and compliance requirements."
              }
            },
            {
              "@type": "Question",
              "name": "Who can participate in the FAA HIMS program?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The HIMS program is available to pilots and aviation professionals who have substance abuse issues affecting their medical certification eligibility, as determined by FAA medical standards and evaluation processes."
              }
            },
            {
              "@type": "Question",
              "name": "What are the costs associated with the HIMS program?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "HIMS program costs vary depending on treatment facility, duration, and individual requirements. Typical costs include evaluation fees, treatment program costs, ongoing monitoring, and AME consultation fees."
              }
            }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://faahims.rehab/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "HIMS Program Guide",
              "item": "https://faahims.rehab/faa-hims-guide.html"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Medical Certification",
              "item": "https://faahims.rehab/pilot-medical-certification.html"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Professional Community",
              "item": "https://faahims.rehab/join.html"
            }
          ]
        }
      ]
    };
    
    fs.writeFileSync('structured-data.json', JSON.stringify(structuredData, null, 2));
    console.log('✓ Advanced structured data generated for enhanced SERP features');
  }

  async submitToSearchEngines() {
    console.log('🎯 Advanced search engine submission starting...');
    
    const searchEngines = [
      { name: 'Google', url: 'https://www.google.com/ping?sitemap=https://faahims.rehab/sitemap.xml' },
      { name: 'Bing', url: 'https://www.bing.com/ping?sitemap=https://faahims.rehab/sitemap.xml' },
      { name: 'Yandex', url: 'https://webmaster.yandex.com/ping?sitemap=https://faahims.rehab/sitemap.xml' }
    ];
    
    const results = [];
    
    for (const engine of searchEngines) {
      try {
        await this.pingSearchEngine(engine.url);
        console.log(`✓ Successfully pinged ${engine.name}`);
        results.push({ engine: engine.name, status: 'success' });
      } catch (error) {
        console.log(`✗ Failed to ping ${engine.name}: ${error.message}`);
        results.push({ engine: engine.name, status: 'failed', error: error.message });
      }
    }
    
    // Create submission log
    const submissionLog = {
      timestamp: this.currentDateTime,
      buildNumber: this.buildNumber,
      results: results,
      totalEngines: searchEngines.length,
      successfulSubmissions: results.filter(r => r.status === 'success').length
    };
    
    fs.writeFileSync('submission-log.json', JSON.stringify(submissionLog, null, 2));
    console.log(`🎉 Search engine submission completed! ${submissionLog.successfulSubmissions}/${submissionLog.totalEngines} successful`);
  }

  pingSearchEngine(url) {
    return new Promise((resolve, reject) => {
      https.get(url, { timeout: 10000 }, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve();
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      }).on('error', reject).on('timeout', () => reject(new Error('Timeout')));
    });
  }

  monitorPerformance() {
    const htmlFiles = fs.readdirSync('.').filter(file => file.endsWith('.html'));
    const performanceReport = {
      timestamp: this.currentDateTime,
      buildNumber: this.buildNumber,
      files: []
    };
    
    htmlFiles.forEach(file => {
      const stats = fs.statSync(file);
      const sizeKB = Math.round(stats.size / 1024);
      
      performanceReport.files.push({
        filename: file,
        sizeKB,
        status: sizeKB > 100 ? 'Large' : sizeKB > 50 ? 'Medium' : 'Optimal'
      });
    });
    
    // Performance recommendations
    performanceReport.recommendations = [];
    const largeFiles = performanceReport.files.filter(f => f.sizeKB > 100);
    if (largeFiles.length > 0) {
      performanceReport.recommendations.push('Consider compressing large HTML files');
    }
    
    performanceReport.totalFiles = htmlFiles.length;
    performanceReport.averageSize = Math.round(
      performanceReport.files.reduce((sum, f) => sum + f.sizeKB, 0) / htmlFiles.length
    );
    
    fs.writeFileSync('performance-report.json', JSON.stringify(performanceReport, null, 2));
    console.log(`✓ Performance report generated - ${htmlFiles.length} files, ${performanceReport.averageSize}KB average`);
    
    return performanceReport;
  }
}

function filterSensitiveContent(html, url) {
  let filtered = html;
  
  // Remove Safe Zone and private content
  filtered = filtered.replace(/<div[^>]*class="[^"]*safe[^"]*zone[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  filtered = filtered.replace(/<section[^>]*private[^>]*>[\s\S]*?<\/section>/gi, '');
  filtered = filtered.replace(/<!-- PRIVATE START -->[\s\S]*?<!-- PRIVATE END -->/gi, '');
  filtered = filtered.replace(/<div[^>]*id="[^"]*confidential[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  
  console.log(`Filtered sensitive content from ${url}`);
  return filtered;
}

function extractHIMSContent(html) {
  const topics = [];
  const discussions = [];
  const keywords = [];
  
  // Extract FAA HIMS forum topics
  const topicMatches = html.match(/<a[^>]*class="[^"]*subject[^"]*"[^>]*>(.*?)<\/a>/gi) || [];
  topicMatches.forEach(match => {
    const textMatch = match.match(/>(.*?)</);
    if (textMatch) {
      const topic = textMatch[1].replace(/<[^>]*>/g, '').trim();
      if (topic.length > 5 && !topic.toLowerCase().includes('spam')) {
        topics.push(topic);
        
        if (/hims|medical|certification|faa|pilot|aviation|recovery|substance|rehab/i.test(topic)) {
          keywords.push(topic);
        }
      }
    }
  });

  // Extract discussion previews
  const postMatches = html.match(/<div[^>]*class="[^"]*post[^"]*"[^>]*>[\s\S]*?<\/div>/gi) || [];
  postMatches.slice(0, 8).forEach(match => {
    let content = match.replace(/<[^>]*>/g, ' ')
                      .replace(/\s+/g, ' ')
                      .replace(/&nbsp;/g, ' ')
                      .trim();
    
    if (content.length > 60 && 
        /hims|medical|certification|faa|pilot|aviation|recovery/i.test(content)) {
      const summary = createProfessionalHIMSSummary(content);
      discussions.push(summary);
    }
  });

  return { 
    topics: topics.slice(0, 12), 
    discussions: discussions.slice(0, 6),
    keywords: keywords.slice(0, 10)
  };
}

function createProfessionalHIMSSummary(text) {
  const himsTerms = extractHIMSKeywords(text);
  
  if (text.length > 200) {
    const firstSentence = text.split(/[.!?]/)[0] + '.';
    return `${firstSentence} Discussion includes professional insights on ${himsTerms.join(', ')} from aviation medical practitioners and experienced program participants.`;
  }
  return text.substring(0, 160) + '... [Complete discussion available to registered members]';
}

function extractHIMSKeywords(text) {
  const himsKeywords = [
    'FAA HIMS program procedures', 'pilot medical certification', 'aviation medical recovery',
    'medical certificate reinstatement', 'HIMS compliance requirements', 'aviation psychology evaluation',
    'substance abuse treatment programs', 'pilot rehabilitation services', 'HIMS AME consultation',
    'aviation medical monitoring', 'certification appeal processes'
  ];
  
  return himsKeywords.filter(keyword => 
    new RegExp(keyword.replace(/\s+/g, '\\s+'), 'i').test(text)
  ).slice(0, 3);
}

function createProfessionalSVGSprite() {
  return `
    <!-- Professional Aviation Medical SVG Sprite -->
    <svg style="display: none;" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <g id="medical-certification">
          <rect x="4" y="3" width="16" height="18" rx="2" fill="#edf2f7" stroke="#1a365d" stroke-width="1.5"/>
          <path d="M12 7v6M9 10h6" stroke="#3182ce" stroke-width="2"/>
          <circle cx="12" cy="13" r="2" fill="none" stroke="#2c5282" stroke-width="1"/>
          <path d="M8 17h8" stroke="#1a365d" stroke-width="1"/>
        </g>
        
        <g id="forum-community">
          <circle cx="9" cy="7" r="3" fill="#3182ce"/>
          <circle cx="15" cy="7" r="3" fill="#2c5282"/>
          <circle cx="12" cy="13" r="3" fill="#1a365d"/>
          <path d="M1 21v-1a7 7 0 0 1 7-7h8a7 7 0 0 1 7 7v1" fill="#edf2f7"/>
        </g>
        
        <g id="professional-guidance">
          <path d="M12 2l3.09 6.26L22 9l-6.91 3.74L12 22l-3.09-8.26L2 9l6.91-.74L12 2z" fill="#1a365d"/>
          <circle cx="12" cy="12" r="3" fill="white"/>
          <path d="M12 10v4M10 12h4" stroke="#3182ce" stroke-width="1"/>
        </g>
        
        <g id="success-outcomes">
          <circle cx="12" cy="12" r="10" fill="#38a169"/>
          <path d="M8 12l2 2 4-4" stroke="white" stroke-width="3" fill="none"/>
        </g>
        
        <g id="confidential-support">
          <rect x="3" y="11" width="18" height="11" rx="2" fill="#1a365d"/>
          <circle cx="12" cy="11" r="3" fill="none" stroke="#1a365d" stroke-width="2"/>
          <path d="M7 11a5 5 0 0 1 10 0" fill="none" stroke="#1a365d" stroke-width="2"/>
          <circle cx="12" cy="16" r="1" fill="#3182ce"/>
        </g>
        
        <g id="aviation-professional">
          <path d="M3 12c0-1 0.5-2 2-2.5L12 8l7 1.5c1.5 0.5 2 1.5 2 2.5s-0.5 2-2 2.5L12 16l-7-1.5C3.5 14 3 13 3 12z" fill="#1a365d"/>
          <ellipse cx="12" cy="12" rx="3" ry="1" fill="#3182ce"/>
          <path d="M6 10l12 4M6 14l12-4" stroke="white" stroke-width="0.5"/>
        </g>
        
        <g id="treatment-resources">
          <rect x="4" y="4" width="16" height="16" rx="2" fill="#edf2f7" stroke="#1a365d"/>
          <circle cx="12" cy="12" r="4" fill="none" stroke="#3182ce" stroke-width="2"/>
          <path d="M12 8v8M8 12h8" stroke="#3182ce" stroke-width="2"/>
          <circle cx="8" cy="8" r="1" fill="#2c5282"/>
          <circle cx="16" cy="8" r="1" fill="#2c5282"/>
          <circle cx="8" cy="16" r="1" fill="#2c5282"/>
          <circle cx="16" cy="16" r="1" fill="#2c5282"/>
        </g>
        
        <g id="legal-compliance">
          <rect x="6" y="3" width="12" height="16" rx="1" fill="#edf2f7" stroke="#1a365d"/>
          <path d="M9 7h6M9 10h6M9 13h4" stroke="#2c5282" stroke-width="1"/>
          <circle cx="12" cy="20" r="2" fill="#3182ce"/>
          <path d="M10 20h4" stroke="white" stroke-width="1"/>
        </g>
        
        <g id="expert-consultation">
          <circle cx="12" cy="8" r="4" fill="#1a365d"/>
          <path d="M8 21v-4a4 4 0 0 1 8 0v4" fill="#3182ce"/>
          <circle cx="12" cy="8" r="2" fill="white"/>
          <rect x="10" y="15" width="4" height="2" fill="#2c5282"/>
        </g>
      </defs>
    </svg>
  `;
}

function createProfessionalForumPreview(buildNumber) {
  return `
    <div class="professional-preview-section">
        <div class="build-info" style="background: #f7fafc; padding: 10px 15px; border-radius: 6px; margin-bottom: 30px; font-size: 0.9em; color: #4a5568; text-align: center;">
            <strong>Live Update #${buildNumber}</strong> • Last refreshed: ${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC • Fresh content every 2 hours
        </div>
        
        <div class="case-studies-section">
            <h2>
              <svg class="section-icon"><use href="#success-outcomes"></use></svg>
              Professional Case Studies
            </h2>
            <div class="case-studies-grid">
                <div class="case-study">
                    <div class="case-header">
                        <span class="case-type">
                          <svg class="inline-icon"><use href="#aviation-professional"></use></svg>
                          Commercial Pilot
                        </span>
                        <span class="case-outcome">Successful Reinstatement</span>
                    </div>
                    <div class="case-content">
                        <p>Following completion of FAA HIMS program requirements over an 18-month period, including comprehensive evaluation and approved treatment protocols, this commercial pilot successfully regained medical certification and returned to airline operations.</p>
                        <div class="case-details">
                            <span>Timeline: 18 months</span>
                            <span>Status: Medical certificate reinstated</span>
                        </div>
                    </div>
                </div>
                
                <div class="case-study">
                    <div class="case-header">
                        <span class="case-type">
                          <svg class="inline-icon"><use href="#aviation-professional"></use></svg>
                          Corporate Pilot
                        </span>
                        <span class="case-outcome">Program Completion</span>
                    </div>
                    <div class="case-content">
                        <p>Through structured treatment at an FAA-approved facility and ongoing compliance with HIMS monitoring requirements, this corporate pilot maintained employment throughout the process and successfully completed all program milestones.</p>
                        <div class="case-details">
                            <span>Timeline: 24 months</span>
                            <span>Status: Program completed</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="forum-activity-section">
            <h2>
              <svg class="section-icon"><use href="#forum-community"></use></svg>
              Recent Professional Discussions
            </h2>
            <div class="activity-list">
                <div class="activity-item">
                    <div class="activity-header">
                        <span class="activity-type">
                          <svg class="inline-icon"><use href="#treatment-resources"></use></svg>
                          Treatment Resources
                        </span>
                        <span class="activity-engagement">Multiple Contributors</span>
                        <span class="activity-fresh">Updated in build #${buildNumber}</span>
                    </div>
                    <h3>HIMS-Approved Treatment Facility Evaluations</h3>
                    <p>Comprehensive analysis of FAA-approved treatment facilities, including program structures, completion rates, and member experiences. Contributors provide detailed insights on facility selection criteria and treatment outcomes.</p>
                </div>
                
                <div class="activity-item">
                    <div class="activity-header">
                        <span class="activity-type">
                          <svg class="inline-icon"><use href="#medical-certification"></use></svg>
                          Medical Certification
                        </span>
                        <span class="activity-engagement">Expert Contributions</span>
                        <span class="activity-fresh">Live discussions</span>
                    </div>
                    <h3>Aviation Medical Examiner Consultation Guidelines</h3>
                    <p>Professional guidance on AME selection, evaluation preparation, and documentation requirements. Discussion includes contributions from HIMS-approved AMEs and pilots with successful evaluation experiences.</p>
                </div>
            </div>
        </div>
        
        <div class="membership-benefits">
            <h2>
              <svg class="section-icon"><use href="#confidential-support"></use></svg>
              Professional Community Access
            </h2>
            <div class="benefits-grid">
                <div class="benefit-item">
                    <svg class="benefit-icon"><use href="#expert-consultation"></use></svg>
                    <h4>Expert Consultation Network</h4>
                    <p>Access to experienced aviation medical professionals, HIMS program administrators, and certified pilots who provide professional guidance based on documented program experiences.</p>
                </div>
                <div class="benefit-item">
                    <svg class="benefit-icon"><use href="#treatment-resources"></use></svg>
                    <h4>Resource Documentation</h4>
                    <p>Comprehensive resource library including treatment facility evaluations, AME recommendations, legal guidance, and procedural documentation maintained by community contributors.</p>
                </div>
            </div>
        </div>
    </div>
  `;
}

function createProfessionalSEOForumMirror(originalContent, pageType, originalUrl, scraper) {
  const filteredContent = filterSensitiveContent(originalContent, originalUrl);
  const content = extractHIMSContent(filteredContent);
  const pageInfo = getPageSEOInfo(pageType);
  const svgSprite = createProfessionalSVGSprite();
  const professionalPreview = createProfessionalForumPreview(scraper.buildNumber);
  
  // Fixed registration URL
  const registrationUrl = 'https://login.proboards.com/register/7088425';
  const forumHomeUrl = 'https://hims-victims.freeforums.net';
  
  // Build professional topic listings
  const topicsHTML = content.topics.length > 0 ? 
    `<div class="forum-topics-section">
      <h2>
        <svg class="section-icon"><use href="#forum-community"></use></svg>
        Current Discussion Topics
        <span style="font-size: 0.6em; background: #e6fffa; color: #234e52; padding: 2px 6px; border-radius: 3px; margin-left: 10px;">Build #${scraper.buildNumber}</span>
      </h2>
      <div class="topics-list">
        ${content.topics.map(topic => `
          <div class="topic-item">
            <div class="topic-header">
              <svg class="inline-icon"><use href="#medical-certification"></use></svg>
              <h4>${topic}</h4>
            </div>
            <p>Professional discussion among aviation medical practitioners and certified pilots regarding FAA HIMS program procedures and compliance requirements.</p>
            <div class="topic-access">
              <span class="access-level">Professional Members</span>
              <span class="discussion-type">Moderated Discussion</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageInfo.title}</title>
    <meta name="description" content="${pageInfo.description}">
    <meta name="keywords" content="FAA HIMS program, pilot medical certification, aviation medical forum, HIMS discussion, medical certificate reinstatement, pilot rehabilitation, aviation psychology, HIMS AME, substance abuse recovery pilots, aviation professional support, pilot community, medical evaluation process">
    <link rel="canonical" href="https://faahims.rehab/${pageInfo.slug}">
    
    <!-- SERP-Visible Elements -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect x='4' y='3' width='16' height='18' rx='2' fill='%23edf2f7' stroke='%231a365d' stroke-width='1.5'/%3E%3Cpath d='M12 7v6M9 10h6' stroke='%233182ce' stroke-width='2'/%3E%3Ccircle cx='12' cy='13' r='2' fill='none' stroke='%232c5282' stroke-width='1'/%3E%3Cpath d='M8 17h8' stroke='%231a365d' stroke-width='1'/%3E%3C/svg%3E">
    
    <!-- RSS Feed Discovery -->
    <link rel="alternate" type="application/rss+xml" title="FAA HIMS Community Updates" href="https://faahims.rehab/feed.xml">
    
    <!-- Enhanced Open Graph -->
    <meta property="og:title" content="${pageInfo.title}">
    <meta property="og:description" content="${pageInfo.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://faahims.rehab/${pageInfo.slug}">
    <meta property="og:site_name" content="FAA HIMS Program Community">
    <meta property="og:image" content="https://faahims.rehab/images/faa-hims-og.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="FAA HIMS Program Professional Community">
    <meta property="og:updated_time" content="${scraper.currentDateTime}">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${pageInfo.title}">
    <meta name="twitter:description" content="${pageInfo.description}">
    <meta name="twitter:image" content="https://faahims.rehab/images/faa-hims-og.jpg">
    
    <!-- Advanced Meta Tags -->
    <meta name="author" content="FAA HIMS Program Community">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="theme-color" content="#1a365d">
    <meta name="msapplication-TileColor" content="#1a365d">
    
    <!-- FIXED Schema.org - Resolves Google Analytics errors -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "DiscussionForumPosting",
      "name": "${pageInfo.title}",
      "headline": "${pageInfo.title}",
      "description": "${pageInfo.description}",
      "text": "${pageInfo.description}",
      "url": "https://faahims.rehab/${pageInfo.slug}",
      "discussionUrl": "https://hims-victims.freeforums.net",
      "datePublished": "${scraper.currentDateTime}",
      "dateModified": "${scraper.currentDateTime}",
      "inLanguage": "en-US",
      "author": {
        "@type": "Organization",
        "name": "FAA HIMS Program Community",
        "url": "https://faahims.rehab"
      },
      "publisher": {
        "@type": "Organization",
        "name": "FAA HIMS Program Community",
        "url": "https://faahims.rehab",
        "logo": {
          "@type": "ImageObject",
          "url": "https://faahims.rehab/images/logo.png",
          "width": 400,
          "height": 400
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://faahims.rehab/${pageInfo.slug}"
      },
      "about": [
        {
          "@type": "Thing",
          "name": "FAA HIMS Program",
          "description": "Federal Aviation Administration Human Intervention Motivation Study program for pilot medical certification and substance abuse recovery",
          "sameAs": "https://www.faa.gov/pilots/medical/"
        },
        {
          "@type": "Thing",
          "name": "Pilot Medical Certification",
          "description": "Aviation medical certification process and requirements for professional pilots seeking medical certificate reinstatement"
        }
      ],
      "keywords": ["FAA HIMS program", "pilot medical certification", "aviation medical recovery", "medical certificate reinstatement", "pilot rehabilitation"],
      "audience": {
        "@type": "Audience",
        "audienceType": "Aviation Professionals",
        "geographicArea": {
          "@type": "Country",
          "name": "United States"
        }
      },
      "interactionStatistic": {
        "@type": "InteractionCounter",
        "interactionType": "https://schema.org/CommentAction",
        "userInteractionCount": "500"
      }
    }
    </script>
    
    <!-- SIMPLIFIED WORKING 12-SECOND REDIRECT -->
    <script>
        function initRedirect() {
            var userAgent = navigator.userAgent.toLowerCase();
            var isBot = /bot|crawl|spider|index|google|bing|yahoo|facebook|twitter|linkedin|pinterest|reddit/.test(userAgent);
            
            if (isBot) {
                console.log('Search engine bot detected, no redirect');
                return;
            }
            
            var countdown = 12;
            var targetUrl = '${forumHomeUrl}';
            
            var notification = document.createElement('div');
            notification.style.cssText = 'position:fixed;top:20px;right:20px;background:#1a365d;color:white;padding:20px;border-radius:8px;font-family:sans-serif;z-index:10000;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.3);min-width:280px;';
            notification.innerHTML = '<div style="font-weight:600;margin-bottom:8px;">🛩️ HIMS Professional Community</div><div>Connecting in ' + countdown + ' seconds</div><div style="font-size:12px;margin-top:8px;opacity:0.8;">Click to join immediately...</div>';
            
            notification.onclick = function() {
                window.location.href = targetUrl;
            };
            
            document.body.appendChild(notification);
            
            var timer = setInterval(function() {
                countdown--;
                notification.innerHTML = '<div style="font-weight:600;margin-bottom:8px;">🛩️ HIMS Professional Community</div><div>Connecting in ' + countdown + ' seconds</div><div style="font-size:12px;margin-top:8px;opacity:0.8;">Click to join immediately...</div>';
                
                if (countdown <= 0) {
                    clearInterval(timer);
                    notification.innerHTML = '<div style="font-weight:600;">🚀 Connecting now...</div>';
                    setTimeout(function() {
                        window.location.href = targetUrl;
                    }, 500);
                }
            }, 1000);
        }
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initRedirect);
        } else {
            initRedirect();
        }
    </script>
    
    <style>
        * { box-sizing: border-box; }
        
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; color: #2d3748; margin: 0; background: #ffffff;
            font-size: 16px;
        }
        
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        .header { 
            background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
            color: white; padding: 60px 0; text-align: center;
        }
        .header h1 { 
            font-size: 2.8em; margin-bottom: 15px; font-weight: 600;
            letter-spacing: -0.025em; line-height: 1.1;
        }
        .header p { 
            font-size: 1.2em; opacity: 0.9; max-width: 600px; 
            margin: 0 auto; font-weight: 400;
        }
        
        .redirect-notice { 
            background: #edf2f7; 
            border: 1px solid #cbd5e0; 
            padding: 25px; margin: 0; 
            text-align: center; font-weight: 500;
            color: #2d3748; border-left: 4px solid #3182ce;
        }
        .redirect-notice a {
            color: #3182ce; text-decoration: none; font-weight: 600;
        }
        .redirect-notice a:hover { text-decoration: underline; }
        
        /* SVG Icon Styles */
        .section-icon { width: 24px; height: 24px; margin-right: 10px; vertical-align: middle; }
        .inline-icon { width: 16px; height: 16px; margin-right: 6px; vertical-align: middle; }
        .benefit-icon { width: 32px; height: 32px; margin-bottom: 15px; display: block; }
        
        .build-info { font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace; }
        
        .professional-preview-section { margin: 50px 0; }
        
        .case-studies-section, .forum-activity-section, .membership-benefits { margin: 60px 0; }
        
        .case-studies-section h2, .forum-activity-section h2, .membership-benefits h2 { 
            color: #1a365d; margin-bottom: 30px; font-size: 1.8em; 
            font-weight: 600; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;
            display: flex; align-items: center;
        }
        
        .case-studies-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); 
            gap: 30px; margin: 30px 0; 
        }
        .case-study { 
            background: #ffffff; padding: 30px; 
            border: 1px solid #e2e8f0; border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: box-shadow 0.3s ease;
        }
        .case-study:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
        
        .case-header { 
            display: flex; justify-content: space-between; 
            margin-bottom: 20px; align-items: center; flex-wrap: wrap; gap: 10px;
        }
        .case-type { 
            background: #3182ce; color: white; 
            padding: 8px 14px; border-radius: 6px; 
            font-size: 0.9em; font-weight: 500;
            display: flex; align-items: center;
        }
        .case-outcome { 
            color: #38a169; font-weight: 600; font-size: 0.9em;
            background: #c6f6d5; padding: 4px 8px; border-radius: 4px;
        }
        .case-content { color: #4a5568; line-height: 1.6; }
        .case-details { 
            margin-top: 20px; padding-top: 15px; 
            border-top: 1px solid #e2e8f0;
            display: flex; gap: 20px; flex-wrap: wrap;
            font-size: 0.9em; color: #718096;
        }
        
        .activity-list { margin: 30px 0; }
        .activity-item { 
            background: #ffffff; padding: 25px; margin: 20px 0; 
            border: 1px solid #e2e8f0; border-radius: 8px;
            box-shadow: 0 1px 6px rgba(0,0,0,0.06);
            border-left: 4px solid #3182ce;
        }
        .activity-header { 
            display: flex; justify-content: between; align-items: center; 
            margin-bottom: 15px; flex-wrap: wrap; gap: 15px;
        }
        .activity-type { 
            background: #edf2f7; color: #2d3748; 
            padding: 6px 12px; border-radius: 4px; 
            font-size: 0.85em; font-weight: 600;
            display: flex; align-items: center;
        }
        .activity-engagement { color: #718096; font-size: 0.9em; }
        .activity-fresh { 
            background: #c6f6d5; color: #22543d; 
            padding: 2px 6px; border-radius: 3px; 
            font-size: 0.75em; font-weight: 600;
        }
        .activity-item h3 { color: #1a365d; margin: 10px 0 15px; font-size: 1.2em; }
        .activity-item p { color: #4a5568; line-height: 1.6; }
        
        .benefits-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
            gap: 25px; margin: 30px 0; 
        }
        .benefit-item { 
            background: #ffffff; padding: 30px; text-align: center;
            border: 1px solid #e2e8f0; border-radius: 8px;
            box-shadow: 0 1px 6px rgba(0,0,0,0.06);
            transition: transform 0.2s ease;
        }
        .benefit-item:hover { transform: translateY(-2px); }
        .benefit-item h4 { 
            color: #1a365d; margin-bottom: 15px; font-size: 1.1em; 
        }
        .benefit-item p { color: #4a5568; line-height: 1.6; }
        
        .forum-topics-section { margin: 50px 0; }
        .topics-list { margin: 30px 0; }
        .topic-item { 
            background: #ffffff; padding: 25px; margin: 15px 0;
            border: 1px solid #e2e8f0; border-radius: 8px;
            box-shadow: 0 1px 6px rgba(0,0,0,0.06);
            border-left: 4px solid #3182ce;
        }
        .topic-header { 
            display: flex; align-items: center; margin-bottom: 10px; 
        }
        .topic-header h4 { color: #1a365d; margin: 0; font-size: 1.1em; }
        .topic-item p { color: #4a5568; margin: 10px 0 15px; }
        .topic-access { 
            display: flex; gap: 15px; flex-wrap: wrap;
        }
        .access-level, .discussion-type { 
            background: #edf2f7; color: #2d3748; 
            padding: 4px 10px; border-radius: 4px; 
            font-size: 0.85em; font-weight: 500;
        }
        
        .cta-section { 
            text-align: center; margin: 60px 0; 
            padding: 50px; background: linear-gradient(135deg, #f8f9fa, #e9ecef); 
            border-radius: 12px;
        }
        .cta-button { 
            background: linear-gradient(135deg, #3182ce, #2c5282); 
            color: white; padding: 18px 36px; 
            text-decoration: none; border-radius: 8px; 
            font-weight: 600; font-size: 1.1em;
            display: inline-block; margin: 15px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(49, 130, 206, 0.3);
        }
        .cta-button:hover { 
            background: linear-gradient(135deg, #2c5282, #2a4365);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(49, 130, 206, 0.4);
        }
        
        @media (max-width: 768px) {
            .header h1 { font-size: 2.2em; }
            .case-studies-grid, .benefits-grid { grid-template-columns: 1fr; }
            .case-header, .activity-header { flex-direction: column; align-items: flex-start; }
            .section-icon { width: 20px; height: 20px; margin-right: 8px; }
        }
    </style>
</head>
<body>
    ${svgSprite}
    
    <div class="header">
        <div class="container">
            <h1>FAA HIMS Program Professional Community</h1>
            <p>Expert guidance, professional support, and evidence-based resources for aviation medical certification</p>
        </div>
    </div>
    
    <div class="redirect-notice">
        <div class="container">
            <strong>You are being connected to the active professional community forum.</strong><br>
            <span style="font-size: 1.1em; color: #3182ce; margin: 10px 0; display: block;">Access expert guidance, case studies, and professional support from aviation medical practitioners</span>
            <a href="${forumHomeUrl}">Click here to access the forum immediately</a>
        </div>
    </div>
    
    <div class="container">
        ${professionalPreview}
        ${topicsHTML}
        
        <div class="cta-section">
            <h2>Access Professional Aviation Medical Community</h2>
            <p style="font-size: 1.2em; margin-bottom: 30px; color: #4a5568;">Connect with aviation medical professionals and experienced program participants</p>
            <a href="${registrationUrl}" class="cta-button">Join the HIMS-Victims Community</a>
            <a href="${forumHomeUrl}" class="cta-button" style="background: linear-gradient(135deg, #38a169, #2f855a);">Browse Forum</a>
            <p style="margin-top: 20px; color: #718096; font-size: 0.9em;">Professional registration • Evidence-based guidance • Confidential support</p>
        </div>
    </div>
    
    <footer style="background: linear-gradient(135deg, #1a365d, #2c5282); color: white; padding: 50px 0; text-align: center;">
        <div class="container">
            <p style="font-size: 1.1em; margin-bottom: 15px;">
                <strong>Professional FAA HIMS Community</strong>
            </p>
            <p style="font-size: 1em; margin-bottom: 20px;">
                <a href="${forumHomeUrl}" style="color: #88c999; font-weight: 600; text-decoration: none;">hims-victims.freeforums.net</a>
            </p>
            <p style="opacity: 0.9; margin-bottom: 10px;">
                Professional guidance • Medical certification support • Evidence-based resources • Updated every 2 hours
            </p>
            <p style="opacity: 0.8; font-size: 0.9em;">
                Build #${scraper.buildNumber} • Last updated: ${new Date(scraper.currentDateTime).toLocaleString('en-US', { timeZone: 'UTC' })} UTC
            </p>
        </div>
    </footer>
</body>
</html>`;
}

function getPageSEOInfo(pageType) {
  if (pageType.includes('join') || pageType.includes('register')) {
    return {
      title: 'Join the HIMS-Victims Community | Aviation Medical Certification',
      description: 'Access professional community of aviation medical practitioners and certified pilots discussing FAA HIMS program requirements, medical certification procedures, and evidence-based guidance.',
      slug: 'join'
    };
  }
  if (pageType.includes('discussion')) {
    return {
      title: 'FAA HIMS Program Professional Discussion | Aviation Medical Certification Forum',
      description: 'Professional discussions among aviation medical practitioners and certified pilots regarding FAA HIMS program experiences, medical certification procedures, and regulatory compliance.',
      slug: 'discussion'
    };
  }
  if (pageType.includes('topics')) {
    return {
      title: 'Recent FAA HIMS Professional Topics | Latest Aviation Medical Discussions',
      description: 'Latest professional discussions from aviation medical practitioners and certified pilots covering FAA HIMS program procedures, certification processes, and regulatory updates.',
      slug: 'topics'
    };
  }
  return {
    title: 'FAA HIMS Program Professional Community | Aviation Medical Certification Support',
    description: 'Professional community for aviation medical practitioners and certified pilots navigating FAA HIMS program requirements. Expert guidance, case studies, and evidence-based resources.',
    slug: ''
  };
}

async function main() {
  const scraper = new FAHIMSForumScraper();
  
  console.log(`🚀 Starting Advanced FAA HIMS SEO Optimization - Build #${scraper.buildNumber}`);
  
  const proxyUrl = process.env.PROXY_URL;
  const username = process.env.FORUM_USERNAME;
  const password = process.env.FORUM_PASSWORD;
  
  if (!username || !password) {
    console.error('❌ Missing forum credentials');
    process.exit(1);
  }

  if (proxyUrl) {
    const proxySet = scraper.setProxy(proxyUrl);
    if (!proxySet) {
      console.error('❌ Failed to configure SOCKS5 proxy');
      process.exit(1);
    }
  }

  // Generate advanced SEO files first
  console.log('📊 Generating advanced SEO optimization files...');
  scraper.generateAdvancedSitemap();
  scraper.generateRSSFeed();
  scraper.generateAdvancedRobots();
  scraper.generateStructuredData();

  // Updated scraping URLs with correct registration URL
  const pages = {
    'index.html': `${scraper.baseUrl}/`,
    'join.html': `${scraper.baseUrl}/register`,
    'discussion.html': `${scraper.baseUrl}/board/1/general-discussion`,
    'topics.html': `${scraper.baseUrl}/search.php?search_id=newposts`,
    'forum-home.html': `${scraper.baseUrl}/`
  };

  console.log('🛩️ Creating professional FAA HIMS forum mirrors with advanced SEO...');

  for (const [filename, url] of Object.entries(pages)) {
    try {
      const content = await scraper.fetchWithProxy(url);
      const professionalPage = createProfessionalSEOForumMirror(content, filename, url, scraper);
      fs.writeFileSync(filename, professionalPage);
      console.log(`✓ Created ${filename} - Advanced SEO with build tracking`);
      
      await new Promise(resolve => setTimeout(resolve, 4000));
    } catch (error) {
      console.error(`✗ Error with ${filename}:`, error.message);
    }
  }
  
  // Generate performance report
  console.log('📈 Generating performance monitoring report...');
  const performanceReport = scraper.monitorPerformance();
  
  // Submit to search engines
  console.log('🌍 Submitting to multiple search engines...');
  await scraper.submitToSearchEngines();
  
  console.log(`🎉 Advanced FAA HIMS SEO optimization completed successfully!`);
  console.log(`📊 Build #${scraper.buildNumber} | ${performanceReport.totalFiles} files | ${performanceReport.averageSize}KB average size`);
  console.log(`🔗 Generated: sitemap.xml, feed.xml, robots.txt, structured-data.json`);
}

main().catch(console.error);
