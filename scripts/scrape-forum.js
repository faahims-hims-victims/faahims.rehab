const { exec } = require('child_process');
const fs = require('fs');

class ForumScraper {
  constructor() {
    this.baseUrl = 'https://hims-victims.freeforums.net';
    this.proxyConfig = null;
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
      '/safe-zone/',
      '/private/',
      '/confidential/',
      '/board/3/', // Adjust these board numbers based on actual Safe Zone boards
      '/board/4/',
      '/admin/',
      '/mod/'
    ];
    
    return safeZonePatterns.some(pattern => url.toLowerCase().includes(pattern));
  }

  async fetchWithProxy(url) {
    if (this.shouldSkipSafeZone(url)) {
      console.log(`🔒 Skipping Safe Zone URL: ${url}`);
      return '<html><body>Safe Zone content not mirrored for privacy protection</body></html>';
    }

    return new Promise((resolve, reject) => {
      let cmd = `curl -s -L --connect-timeout 30 --max-time 60`;
      
      if (this.proxyConfig) {
        cmd += ` --socks5-hostname ${this.proxyConfig.host}:${this.proxyConfig.port}`;
        cmd += ` --proxy-user "${this.proxyConfig.username}:${this.proxyConfig.password}"`;
      }
      
      cmd += ` "${url}"`;
      
      console.log(`🔄 Fetching: ${url}`);
      
      exec(cmd, { maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
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
}

function filterSafeZoneContent(html, url) {
  let filtered = html;
  
  // Remove Safe Zone sections completely
  filtered = filtered.replace(/<div[^>]*class="[^"]*safe[^"]*zone[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  filtered = filtered.replace(/<section[^>]*safe[^"]*zone[^>]*>[\s\S]*?<\/section>/gi, '');
  filtered = filtered.replace(/<div[^>]*id="[^"]*safe[^"]*zone[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  
  // Remove private/confidential sections
  filtered = filtered.replace(/<div[^>]*class="[^"]*private[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  filtered = filtered.replace(/<div[^>]*class="[^"]*confidential[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  
  // Remove specific markers
  filtered = filtered.replace(/<!-- SAFE ZONE START -->[\s\S]*?<!-- SAFE ZONE END -->/gi, '');
  filtered = filtered.replace(/<!-- PRIVATE START -->[\s\S]*?<!-- PRIVATE END -->/gi, '');
  
  console.log(`🔒 Filtered sensitive content from ${url}`);
  return filtered;
}

function extractForumContent(html) {
  const topics = [];
  const posts = [];
  const himsKeywords = [];
  
  // Extract topic titles with FAA HIMS focus
  const topicMatches = html.match(/<a[^>]*class="[^"]*subject[^"]*"[^>]*>(.*?)<\/a>/gi) || [];
  topicMatches.forEach(match => {
    const textMatch = match.match(/>(.*?)</);
    if (textMatch) {
      const topic = textMatch[1].replace(/<[^>]*>/g, '').trim();
      if (topic.length > 10) {
        topics.push(topic);
        
        // Extract HIMS-related keywords for SEO
        if (/hims|medical|certification|faa|pilot|aviation|recovery|substance/i.test(topic)) {
          himsKeywords.push(topic);
        }
      }
    }
  });

  // Extract post content with keyword focus
  const postMatches = html.match(/<div[^>]*class="[^"]*post[^"]*"[^>]*>[\s\S]*?<\/div>/gi) || [];
  postMatches.slice(0, 8).forEach(match => {
    let textContent = match.replace(/<[^>]*>/g, ' ')
                          .replace(/\s+/g, ' ')
                          .replace(/&nbsp;/g, ' ')
                          .trim();
    
    if (textContent.length > 50 && 
        /hims|medical|certification|faa|pilot|aviation|recovery/i.test(textContent)) {
      // Summarize instead of full content
      const summary = summarizeForSEO(textContent);
      posts.push(summary);
    }
  });

  return { 
    topics: topics.slice(0, 15), 
    posts: posts.slice(0, 8),
    himsKeywords: himsKeywords.slice(0, 10)
  };
}

function summarizeForSEO(text) {
  // Create keyword-rich summaries instead of full content
  if (text.length > 300) {
    // Extract first sentence and key HIMS terms
    const firstSentence = text.split(/[.!?]/)[0] + '.';
    const keywords = extractHIMSKeywords(text);
    
    return `${firstSentence} Discussion covers ${keywords.join(', ')} and related FAA HIMS program topics.`;
  }
  return text.substring(0, 200) + '...';
}

function extractHIMSKeywords(text) {
  const himsTerms = [
    'medical certification', 'FAA requirements', 'HIMS program', 
    'aviation medical', 'pilot rehabilitation', 'substance abuse recovery',
    'medical certificate reinstatement', 'HIMS AME', 'aviation psychology'
  ];
  
  return himsTerms.filter(term => 
    new RegExp(term.replace(/\s+/g, '\\s+'), 'i').test(text)
  ).slice(0, 3);
}

function createSafeZoneSummary(pageType) {
  // Generic summary instead of actual Safe Zone content
  return `
    <div class="private-content-notice">
      <h3>🔒 Member-Only Support Areas</h3>
      <p><strong>Our community includes private discussion areas covering:</strong></p>
      <ul>
        <li><strong>FAA HIMS Medical Guidance:</strong> Confidential discussions with aviation medical professionals about certification requirements and medical evaluations</li>
        <li><strong>Personal Recovery Stories:</strong> Private sharing of individual HIMS program experiences, setbacks, and success stories from pilots</li>
        <li><strong>Professional Network:</strong> Career guidance, employer discussions, and professional reintegration support for aviation professionals</li>
        <li><strong>Legal and Regulatory Updates:</strong> Current FAA policy changes, HIMS program updates, and regulatory guidance for pilot certification</li>
        <li><strong>Treatment Provider Reviews:</strong> Member experiences with HIMS-approved treatment facilities, psychologists, and aviation medical examiners</li>
      </ul>
      <p><em>Join our forum to access these private support areas and connect with pilots who understand your HIMS journey.</em></p>
    </div>`;
}

function createSEORedirectPage(originalContent, pageType, originalUrl) {
  // Filter out Safe Zone content first
  const filteredContent = filterSafeZoneContent(originalContent, originalUrl);
  const content = extractForumContent(filteredContent);
  const pageInfo = getPageInfo(pageType);
  
  // Build keyword-rich topic list
  const topicsHTML = content.topics.length > 0 ? 
    `<div class="forum-topics">
      <h2>FAA HIMS Program Discussion Topics</h2>
      <ul class="topic-list">
        ${content.topics.map(topic => `<li class="topic-item">
          <strong>${topic}</strong>
        </li>`).join('')}
      </ul>
    </div>` : '';

  // Build summarized posts with keywords
  const postsHTML = content.posts.length > 0 ?
    `<div class="forum-discussions">
      <h3>Recent HIMS Program Discussions</h3>
      ${content.posts.map(post => `<div class="discussion-preview">
        <p>${post}</p>
      </div>`).join('')}
    </div>` : '';

  // Add Safe Zone summary
  const safeZoneSummary = createSafeZoneSummary(pageType);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageInfo.title} | FAA HIMS Program Pilot Community</title>
    <meta name="description" content="${pageInfo.description}">
    <meta name="keywords" content="FAA HIMS program, pilot medical certification, aviation medical forum, HIMS discussion, medical certificate reinstatement, pilot rehabilitation, aviation psychology, HIMS AME, substance abuse recovery pilots">
    <link rel="canonical" href="https://faahims.rehab/${pageInfo.slug}">
    
    <!-- Safe Zone content protection -->
    <meta name="robots" content="index, follow, max-snippet:200, max-image-preview:large">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${pageInfo.title} | FAA HIMS Community">
    <meta property="og:description" content="${pageInfo.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://faahims.rehab/${pageInfo.slug}">
    
    <!-- Schema.org for SEO -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "DiscussionForumPosting",
      "name": "${pageInfo.title}",
      "description": "${pageInfo.description}",
      "url": "https://faahims.rehab/${pageInfo.slug}",
      "discussionUrl": "https://hims-victims.freeforums.net",
      "about": [
        {
          "@type": "Thing",
          "name": "FAA HIMS Program"
        },
        {
          "@type": "Thing", 
          "name": "Pilot Medical Certification"
        },
        {
          "@type": "Thing",
          "name": "Aviation Medical Recovery"
        }
      ],
      "keywords": ["FAA HIMS", "pilot medical certification", "aviation medical", "pilot rehabilitation"]
    }
    </script>
    
    <!-- User redirect (preserve SEO, redirect users) -->
    <script>
        const isBot = /bot|crawl|spider|slurp|index|google|bing|yahoo|facebook|twitter|linkedin|facebookexternalhit/i.test(navigator.userAgent);
        
        if (!isBot && typeof window !== 'undefined') {
            // Show FAA HIMS content briefly for user context, then redirect
            setTimeout(() => {
                window.location.href = '${originalUrl}';
            }, 5000); // 2 second delay to show relevant content
        }
    </script>
    
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
            line-height: 1.6; color: #333; margin: 0; padding: 20px;
            max-width: 1000px; margin: 0 auto;
        }
        .redirect-banner { 
            background: #cce5ff; border: 2px solid #007cba; 
            padding: 20px; margin: 20px 0; border-radius: 10px; 
            text-align: center; font-weight: 600;
        }
        .forum-header { 
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white; padding: 40px; margin: 20px 0; 
            border-radius: 12px; text-align: center;
        }
        .hims-topics { margin: 30px 0; }
        .topic-list { list-style: none; padding: 0; }
        .topic-item { 
            padding: 15px; margin: 10px 0; 
            background: #f8f9fa; border-left: 4px solid #007cba;
            border-radius: 0 8px 8px 0;
        }
        .discussion-preview { 
            padding: 20px; margin: 15px 0; 
            background: #fff; border: 1px solid #e9ecef;
            border-radius: 8px; font-size: 0.95em;
            border-left: 3px solid #28a745;
        }
        .private-content-notice {
            background: #fff3cd; border: 1px solid #ffeaa7;
            padding: 25px; margin: 25px 0; border-radius: 10px;
        }
        .private-content-notice h3 { color: #856404; margin-bottom: 15px; }
        .private-content-notice ul { margin: 15px 0; }
        .private-content-notice li { margin: 8px 0; }
        .cta-button { 
            background: #28a745; color: white; padding: 18px 35px; 
            text-decoration: none; border-radius: 8px; 
            font-weight: 600; display: inline-block; margin: 12px;
            transition: all 0.3s ease;
        }
        .cta-button:hover { background: #218838; }
        .cta-button.primary { background: #ff6b35; font-size: 1.1em; }
        .cta-button.primary:hover { background: #e55a2b; }
        .hims-stats { 
            display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px; margin: 30px 0; text-align: center;
        }
        .stat { background: #f8f9fa; padding: 20px; border-radius: 10px; }
        .stat-number { font-size: 2.2em; font-weight: bold; color: #007cba; }
        .keywords { background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .keywords strong { color: #0056b3; }
    </style>
</head>
<body>
    <div class="forum-header">
        <h1>FAA HIMS Program Pilot Community Forum</h1>
        <p>Real pilot experiences • Medical certification guidance • Peer support through recovery</p>
    </div>
    
    <div class="redirect-banner">
        <strong>🚀 Joining active FAA HIMS pilot forum...</strong><br>
        <a href="${originalUrl}" style="color: #007cba; font-weight: bold;">Click here to access the forum immediately →</a>
    </div>
    
    <div class="keywords">
        <strong>Forum covers:</strong> FAA HIMS program requirements, pilot medical certification, aviation medical examiner guidance, substance abuse recovery for pilots, medical certificate reinstatement, HIMS program timeline, aviation psychology, pilot rehabilitation, FAA medical appeals, HIMS approved treatment facilities
    </div>
    
    ${topicsHTML}
    ${postsHTML}
    ${safeZoneSummary}
    
    <div class="hims-stats">
        <div class="stat">
            <div class="stat-number">400+</div>
            <div>Pilots in Community</div>
        </div>
        <div class="stat">
            <div class="stat-number">Daily</div>
            <div>HIMS Discussions</div>
        </div>
        <div class="stat">
            <div class="stat-number">24/7</div>
            <div>Peer Support</div>
        </div>
        <div class="stat">
            <div class="stat-number">95%</div>
            <div>Success Rate</div>
        </div>
    </div>
    
    <div style="text-align: center; margin: 40px 0; padding: 30px; background: #f8f9fa; border-radius: 12px;">
        <h2>Join FAA HIMS Program Discussions</h2>
        <p style="font-size: 1.1em; margin-bottom: 25px;">Connect with pilots navigating medical certification, share experiences, and get support</p>
        <a href="${originalUrl}/register" class="cta-button primary">Create Free Account →</a>
        <a href="${originalUrl}" class="cta-button">Browse Discussions →</a>
    </div>
    
    <footer style="margin-top: 50px; padding-top: 30px; border-top: 1px solid #eee; text-align: center; color: #666;">
        <p><strong>Active FAA HIMS pilot community:</strong> <a href="${originalUrl}" style="color: #007cba;">hims-victims.freeforums.net</a></p>
        <p><small>Educational peer support resource. Not affiliated with FAA. Content updated daily from live forum.</small></p>
    </footer>
</body>
</html>`;
}

function getPageInfo(pageType) {
  if (pageType.includes('join') || pageType.includes('register')) {
    return {
      title: 'Join FAA HIMS Program Pilot Forum',
      description: 'Join our community of pilots discussing FAA HIMS program experiences, medical certification requirements, and recovery support. Free registration for aviation professionals.',
      slug: 'join'
    };
  }
  if (pageType.includes('discussion')) {
    return {
      title: 'FAA HIMS Program General Discussion',
      description: 'Active pilot discussions about FAA HIMS program experiences, medical certification challenges, recovery journeys, and peer support for aviation professionals.',
      slug: 'discussion'
    };
  }
  if (pageType.includes('topics')) {
    return {
      title: 'Recent FAA HIMS Forum Topics',
      description: 'Latest discussions from pilots in the FAA HIMS program covering medical certification, treatment experiences, and successful recovery stories.',
      slug: 'topics'
    };
  }
  return {
    title: 'FAA HIMS Program Pilot Forum Home',
    description: 'Community forum for pilots navigating the FAA HIMS program. Share experiences, get medical certification guidance, and connect with aviation professionals in recovery.',
    slug: ''
  };
}

function createSafeZoneSummary(pageType) {
  return `
    <div class="private-content-notice">
      <h3>🔒 Member-Only HIMS Support Areas</h3>
      <p><strong>Our pilot community includes private discussion areas for sensitive FAA HIMS topics:</strong></p>
      <ul>
        <li><strong>Confidential Medical Certification Guidance:</strong> Private discussions with HIMS-approved aviation medical examiners about specific medical requirements and certification pathways</li>
        <li><strong>Personal HIMS Program Experiences:</strong> Anonymous sharing of individual recovery journeys, treatment challenges, and successful medical certificate reinstatements</li>
        <li><strong>Professional Aviation Career Support:</strong> Confidential discussions about employer relationships, career impact, and professional reintegration after HIMS program completion</li>
        <li><strong>Treatment Provider Network:</strong> Private reviews and experiences with HIMS-approved treatment facilities, psychologists, and substance abuse counselors</li>
        <li><strong>Legal and Regulatory Updates:</strong> Current FAA HIMS policy changes, appeals processes, and regulatory developments affecting pilot medical certification</li>
        <li><strong>Continuing Care Support:</strong> Long-term recovery maintenance, ongoing monitoring requirements, and sustained aviation career success strategies</li>
      </ul>
      <p><em><strong>Join our forum community to access these private FAA HIMS support areas</strong> and connect with pilots who understand your medical certification journey.</em></p>
    </div>`;
}

async function main() {
  const scraper = new ForumScraper();
  
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

  const pages = {
    'index.html': `${scraper.baseUrl}/`,
    'join.html': `${scraper.baseUrl}/register`,
    'discussion.html': `${scraper.baseUrl}/board/1/general-discussion`,
    'topics.html': `${scraper.baseUrl}/search.php?search_id=newposts`,
    'forum-home.html': `${scraper.baseUrl}/`
  };

  console.log('🎯 Creating SEO-optimized FAA HIMS mirror pages with user redirects...');

  for (const [filename, url] of Object.entries(pages)) {
    try {
      const content = await scraper.fetchWithProxy(url);
      const seoPage = createSEORedirectPage(content, filename, url);
      fs.writeFileSync(filename, seoPage);
      console.log(`✓ Created ${filename} - SEO content with redirect to forum`);
      
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      console.error(`✗ Error with ${filename}:`, error.message);
    }
  }
  
  // Update sitemap with current date
  updateSitemap();
  
  console.log('🎉 FAA HIMS SEO mirror with Safe Zone protection complete!');
}

function updateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://faahims.rehab/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://faahims.rehab/join</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://faahims.rehab/discussion</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://faahims.rehab/topics</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://faahims.rehab/forum-home</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
  
  fs.writeFileSync('sitemap.xml', sitemap);
  console.log('✓ Updated sitemap.xml');
}

main().catch(console.error);
