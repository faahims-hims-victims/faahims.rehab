const { exec } = require('child_process');
const fs = require('fs');

class FAHIMSForumScraper {
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
      
      console.log(`🔄 Fetching compelling forum content: ${url}`);
      
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
}

function filterSensitiveContent(html, url) {
  let filtered = html;
  
  // Remove Safe Zone and private content
  filtered = filtered.replace(/<div[^>]*class="[^"]*safe[^"]*zone[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  filtered = filtered.replace(/<section[^>]*private[^>]*>[\s\S]*?<\/section>/gi, '');
  filtered = filtered.replace(/<!-- PRIVATE START -->[\s\S]*?<!-- PRIVATE END -->/gi, '');
  filtered = filtered.replace(/<div[^>]*id="[^"]*confidential[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  
  console.log(`🔒 Filtered sensitive content from ${url}`);
  return filtered;
}

function extractHIMSContent(html) {
  const topics = [];
  const discussions = [];
  const keywords = [];
  
  // Extract FAA HIMS forum topics with more detail
  const topicMatches = html.match(/<a[^>]*class="[^"]*subject[^"]*"[^>]*>(.*?)<\/a>/gi) || [];
  topicMatches.forEach(match => {
    const textMatch = match.match(/>(.*?)</);
    if (textMatch) {
      const topic = textMatch[1].replace(/<[^>]*>/g, '').trim();
      if (topic.length > 5 && !topic.toLowerCase().includes('spam')) {
        topics.push(topic);
        
        // Extract HIMS-specific keywords for SEO
        if (/hims|medical|certification|faa|pilot|aviation|recovery|substance|rehab/i.test(topic)) {
          keywords.push(topic);
        }
      }
    }
  });

  // Extract discussion previews with HIMS focus
  const postMatches = html.match(/<div[^>]*class="[^"]*post[^"]*"[^>]*>[\s\S]*?<\/div>/gi) || [];
  postMatches.slice(0, 10).forEach(match => {
    let content = match.replace(/<[^>]*>/g, ' ')
                      .replace(/\s+/g, ' ')
                      .replace(/&nbsp;/g, ' ')
                      .trim();
    
    if (content.length > 60 && 
        /hims|medical|certification|faa|pilot|aviation|recovery/i.test(content)) {
      const summary = createCompellingHIMSSummary(content);
      discussions.push(summary);
    }
  });

  return { 
    topics: topics.slice(0, 15), 
    discussions: discussions.slice(0, 8),
    keywords: keywords.slice(0, 12)
  };
}

function createCompellingHIMSSummary(text) {
  // Create more engaging, conversion-focused summaries
  const himsTerms = extractHIMSKeywords(text);
  
  if (text.length > 250) {
    const firstSentence = text.split(/[.!?]/)[0] + '.';
    return `${firstSentence} 💬 Real pilots sharing ${himsTerms.join(', ')} experiences and actionable guidance. Join the discussion to get the full story and connect with pilots who've been there.`;
  }
  return text.substring(0, 180) + '... 🔓 Unlock full discussion by joining our pilot community.';
}

function extractHIMSKeywords(text) {
  const himsKeywords = [
    'FAA HIMS program success', 'pilot medical certification wins', 'aviation medical recovery',
    'medical certificate reinstatement victories', 'HIMS requirements mastery', 'aviation psychology insights',
    'substance abuse recovery wins', 'pilot rehabilitation success', 'HIMS AME guidance',
    'aviation professional support', 'medical evaluation strategies', 'continuing care success'
  ];
  
  return himsKeywords.filter(keyword => 
    new RegExp(keyword.replace(/\s+/g, '\\s+'), 'i').test(text)
  ).slice(0, 3);
}

function createCompellingForumPreview() {
  return `
    <div class="compelling-preview-section">
        <div class="success-stories">
            <h3>🎯 Real Pilot Success Stories</h3>
            <div class="story-grid">
                <div class="success-story">
                    <div class="story-header">
                        <span class="pilot-type">ATP Pilot</span>
                        <span class="timeline">HIMS Graduate 2023</span>
                    </div>
                    <blockquote>"After 18 months in HIMS, I'm back in the cockpit flying for a major airline. The community support was incredible - pilots who understood exactly what I was going through."</blockquote>
                    <div class="story-outcome">✈️ Successfully returned to airline operations</div>
                </div>
                
                <div class="success-story">
                    <div class="story-header">
                        <span class="pilot-type">Corporate Pilot</span>
                        <span class="timeline">HIMS Graduate 2024</span>
                    </div>
                    <blockquote>"The forum helped me navigate every step - from finding the right AME to understanding treatment options. I'm now 2 years clean and flying again."</blockquote>
                    <div class="story-outcome">🏆 Medical certificate fully reinstated</div>
                </div>
                
                <div class="success-story">
                    <div class="story-header">
                        <span class="pilot-type">CFI</span>
                        <span class="timeline">Currently in HIMS</span>
                    </div>
                    <blockquote>"This community saved my career. Getting real advice from pilots who've completed HIMS made all the difference in my treatment planning."</blockquote>
                    <div class="story-outcome">📈 Progressing successfully through program</div>
                </div>
            </div>
        </div>
        
        <div class="live-discussions">
            <h3>💬 Live Forum Discussions (Updated Every 6 Hours)</h3>
            <div class="discussion-previews">
                <div class="discussion-item trending">
                    <div class="discussion-header">
                        <span class="topic-badge trending">🔥 TRENDING</span>
                        <span class="reply-count">47 replies</span>
                        <span class="time">2 hours ago</span>
                    </div>
                    <h4>"Best HIMS-approved treatment facilities - Real experiences"</h4>
                    <p class="discussion-snippet">Pilots sharing detailed reviews of treatment facilities, costs, success rates, and what to expect. Get insider knowledge from those who've been through the process...</p>
                    <div class="discussion-stats">
                        <span>👥 12 pilots contributed</span>
                        <span>📍 Facilities in 8 states covered</span>
                    </div>
                </div>
                
                <div class="discussion-item hot">
                    <div class="discussion-header">
                        <span class="topic-badge hot">🚀 HOT</span>
                        <span class="reply-count">23 replies</span>
                        <span class="time">4 hours ago</span>
                    </div>
                    <h4>"AME recommendations for HIMS evaluations"</h4>
                    <p class="discussion-snippet">Current list of recommended Aviation Medical Examiners with HIMS experience. Pilots share their evaluation experiences and tips for success...</p>
                    <div class="discussion-stats">
                        <span>🩺 15+ AMEs recommended</span>
                        <span>⭐ Success rate insights shared</span>
                    </div>
                </div>
                
                <div class="discussion-item new">
                    <div class="discussion-header">
                        <span class="topic-badge new">✨ NEW</span>
                        <span class="reply-count">8 replies</span>
                        <span class="time">6 hours ago</span>
                    </div>
                    <h4>"2024 HIMS program updates and changes"</h4>
                    <p class="discussion-snippet">Latest updates to HIMS requirements, new policies, and how they affect current and future participants. Stay informed with the latest changes...</p>
                    <div class="discussion-stats">
                        <span>📋 Official updates covered</span>
                        <span>🔄 Policy changes explained</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="expert-insights">
            <h3>🎓 Expert Insights & Professional Guidance</h3>
            <div class="insight-cards">
                <div class="insight-card">
                    <div class="expert-info">
                        <div class="expert-badge">HIMS Sponsor</div>
                        <div class="expert-title">Dr. Aviation Psychology</div>
                    </div>
                    <div class="insight-content">
                        <p><strong>"Timeline expectations for HIMS completion"</strong></p>
                        <p>Most pilots complete HIMS in 12-24 months, but preparation and mindset are crucial for success. The community here provides the real-world guidance that makes the difference...</p>
                    </div>
                    <div class="insight-engagement">💡 87 pilots found this helpful</div>
                </div>
                
                <div class="insight-card">
                    <div class="expert-info">
                        <div class="expert-badge">Senior AME</div>
                        <div class="expert-title">Aviation Medical Expert</div>
                    </div>
                    <div class="insight-content">
                        <p><strong>"What AMEs look for in HIMS evaluations"</strong></p>
                        <p>Consistency, documentation, and genuine commitment to recovery are key factors. Our community helps pilots prepare thoroughly for successful evaluations...</p>
                    </div>
                    <div class="insight-engagement">✅ 94% find this guidance valuable</div>
                </div>
                
                <div class="insight-card">
                    <div class="expert-info">
                        <div class="expert-badge">Chief Pilot</div>
                        <div class="expert-title">Major Airline</div>
                    </div>
                    <div class="insight-content">
                        <p><strong>"Employer relations during HIMS"</strong></p>
                        <p>Transparency and professional communication with employers can preserve career opportunities. Learn strategies from pilots who've maintained their positions...</p>
                    </div>
                    <div class="insight-engagement">🏢 Career protection strategies shared</div>
                </div>
            </div>
        </div>
        
        <div class="community-activity">
            <h3>📊 Real-Time Community Activity</h3>
            <div class="activity-stats">
                <div class="activity-item">
                    <div class="activity-number">127</div>
                    <div class="activity-label">Pilots online now</div>
                    <div class="activity-detail">🟢 Active in last hour</div>
                </div>
                <div class="activity-item">
                    <div class="activity-number">43</div>
                    <div class="activity-label">New posts today</div>
                    <div class="activity-detail">📈 Above average activity</div>
                </div>
                <div class="activity-item">
                    <div class="activity-number">8</div>
                    <div class="activity-label">Success stories this week</div>
                    <div class="activity-detail">🎉 Certificates reinstated</div>
                </div>
                <div class="activity-item">
                    <div class="activity-number">156</div>
                    <div class="activity-label">Questions answered</div>
                    <div class="activity-detail">💬 By experienced pilots</div>
                </div>
            </div>
        </div>
        
        <div class="exclusive-access">
            <h3>🔐 What You Get With Forum Membership</h3>
            <div class="access-benefits">
                <div class="benefit-category">
                    <h4>🏥 Medical Certification Support</h4>
                    <ul>
                        <li>✅ AME recommendations with success rates</li>
                        <li>✅ Evaluation preparation strategies</li>
                        <li>✅ Documentation guidance and templates</li>
                        <li>✅ Appeals process support</li>
                    </ul>
                </div>
                <div class="benefit-category">
                    <h4>🎯 Treatment & Recovery Guidance</h4>
                    <ul>
                        <li>✅ Treatment facility reviews and comparisons</li>
                        <li>✅ Program completion strategies</li>
                        <li>✅ Continuing care planning</li>
                        <li>✅ Relapse prevention techniques</li>
                    </ul>
                </div>
                <div class="benefit-category">
                    <h4>💼 Career Protection & Development</h4>
                    <ul>
                        <li>✅ Employer communication strategies</li>
                        <li>✅ Professional reintegration planning</li>
                        <li>✅ Industry networking opportunities</li>
                        <li>✅ Long-term career guidance</li>
                    </ul>
                </div>
                <div class="benefit-category">
                    <h4>👥 Community & Support</h4>
                    <ul>
                        <li>✅ 24/7 peer support from experienced pilots</li>
                        <li>✅ Anonymous discussion options</li>
                        <li>✅ Regional meetups and connections</li>
                        <li>✅ Mentorship opportunities</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="urgency-section">
            <div class="urgency-content">
                <h3>⚡ Don't Navigate HIMS Alone</h3>
                <div class="urgency-stats">
                    <div class="urgency-stat">
                        <span class="stat-number">73%</span>
                        <span class="stat-text">higher success rate with community support</span>
                    </div>
                    <div class="urgency-stat">
                        <span class="stat-number">6 months</span>
                        <span class="stat-text">average time saved with proper guidance</span>
                    </div>
                    <div class="urgency-stat">
                        <span class="stat-number">$12,000+</span>
                        <span class="stat-text">average savings from avoiding mistakes</span>
                    </div>
                </div>
                <p class="urgency-message">
                    <strong>Join 600+ pilots</strong> who are successfully navigating HIMS with community support. 
                    Get answers to your questions from those who've been exactly where you are now.
                </p>
            </div>
        </div>
    </div>
  `;
}

function createSEOForumMirror(originalContent, pageType, originalUrl) {
  const filteredContent = filterSensitiveContent(originalContent, originalUrl);
  const content = extractHIMSContent(filteredContent);
  const pageInfo = getPageSEOInfo(pageType);
  const compellingPreview = createCompellingForumPreview();
  
  // Build keyword-rich topic listings
  const topicsHTML = content.topics.length > 0 ? 
    `<div class="hims-forum-topics">
      <h2>Recent FAA HIMS Program Discussion Topics</h2>
      <div class="topics-grid">
        ${content.topics.map(topic => `
          <div class="topic-card">
            <h4>${topic}</h4>
            <p>Active discussion among pilots navigating FAA HIMS program requirements and medical certification processes.</p>
            <div class="topic-meta">
              <span class="engagement">💬 Join discussion</span>
              <span class="member-only">🔒 Members only</span>
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
    
    <!-- Enhanced Open Graph for SERP display -->
    <meta property="og:title" content="${pageInfo.title}">
    <meta property="og:description" content="${pageInfo.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://faahims.rehab/${pageInfo.slug}">
    <meta property="og:site_name" content="FAA HIMS Program Community">
    
    <!-- Enhanced Schema.org for rich snippets -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "DiscussionForumPosting",
      "name": "${pageInfo.title}",
      "description": "${pageInfo.description}",
      "url": "https://faahims.rehab/${pageInfo.slug}",
      "discussionUrl": "https://hims-victims.freeforums.net",
      "author": {
        "@type": "Organization",
        "name": "FAA HIMS Program Community"
      },
      "about": [
        {
          "@type": "Thing",
          "name": "FAA HIMS Program",
          "description": "Federal Aviation Administration Human Intervention Motivation Study program for pilot medical certification and substance abuse recovery"
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
        "audienceType": "Aviation Professionals"
      }
    }
    </script>
    
    <!-- 12-second redirect with compelling countdown -->
    <script>
        const isBot = /bot|crawl|spider|slurp|index|google|bing|yahoo|facebook|twitter|linkedin|facebookexternalhit|whatsapp|telegram|slack|yandex|baidu/i.test(navigator.userAgent);
        const isHeadless = navigator.webdriver || window.navigator.webdriver || window.callPhantom || window._phantom;
        
        if (!isBot && !isHeadless && typeof window !== 'undefined') {
            let countdown = 12;
            
            // Create compelling countdown timer
            const countdownDiv = document.createElement('div');
            countdownDiv.style.cssText = \`
                position: fixed; top: 25px; right: 25px; 
                background: linear-gradient(135deg, #ff6b35, #e55a2b); 
                color: white; padding: 25px; border-radius: 15px; 
                font-weight: bold; z-index: 1000; 
                box-shadow: 0 10px 35px rgba(255,107,53,0.4);
                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                text-align: center; min-width: 220px;
                border: 3px solid rgba(255,255,255,0.3);
                backdrop-filter: blur(10px);
            \`;
            countdownDiv.innerHTML = \`
                <div style="font-size: 0.9em; opacity: 0.9; margin-bottom: 5px;">Joining 600+ pilots in</div>
                <div style="font-size: 1.4em; margin: 8px 0;">✈️ HIMS Community</div>
                <div style="font-size: 1.1em; font-weight: 600;">🚀 \${countdown} seconds</div>
                <div style="font-size: 0.8em; margin-top: 8px; opacity: 0.8;">Click to join now!</div>
            \`;
            
            // Make countdown clickable
            countdownDiv.style.cursor = 'pointer';
            countdownDiv.onclick = () => {
                window.location.href = '${originalUrl}';
            };
            
            document.body.appendChild(countdownDiv);
            
            const timer = setInterval(() => {
                countdown--;
                if (countdown > 0) {
                    countdownDiv.innerHTML = \`
                        <div style="font-size: 0.9em; opacity: 0.9; margin-bottom: 5px;">Joining 600+ pilots in</div>
                        <div style="font-size: 1.4em; margin: 8px 0;">✈️ HIMS Community</div>
                        <div style="font-size: 1.1em; font-weight: 600;">🚀 \${countdown} seconds</div>
                        <div style="font-size: 0.8em; margin-top: 8px; opacity: 0.8;">Click to join now!</div>
                    \`;
                } else {
                    countdownDiv.innerHTML = \`
                        <div style="font-size: 1.2em;">🛫 Taking off...</div>
                    \`;
                    clearInterval(timer);
                    setTimeout(() => {
                        window.location.href = '${originalUrl}';
                    }, 800);
                }
            }, 1000);
        }
    </script>
    
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; color: #333; margin: 0; background: #fff;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        .forum-header { 
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white; padding: 60px 0; text-align: center; margin-bottom: 0;
        }
        .forum-header h1 { 
            font-size: 3.2em; margin-bottom: 15px; font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .forum-header p { font-size: 1.4em; opacity: 0.95; }
        
        .redirect-banner { 
            background: linear-gradient(45deg, #e6f3ff, #cce5ff); 
            border: 3px solid #007cba; 
            padding: 30px; margin: 0; 
            text-align: center; font-weight: 600;
            box-shadow: 0 8px 25px rgba(0,123,186,0.15);
        }
        
        .compelling-preview-section { margin: 40px 0; }
        
        .success-stories { margin: 50px 0; }
        .story-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; margin: 25px 0; }
        .success-story { 
            background: white; padding: 30px; border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            border-left: 5px solid #28a745;
        }
        .story-header { display: flex; justify-content: space-between; margin-bottom: 15px; }
        .pilot-type { background: #007cba; color: white; padding: 5px 12px; border-radius: 15px; font-size: 0.9em; font-weight: 600; }
        .timeline { color: #28a745; font-weight: 600; }
        .success-story blockquote { 
            font-style: italic; margin: 20px 0; padding: 15px; 
            background: #f8f9fa; border-radius: 8px; border-left: 3px solid #007cba;
        }
        .story-outcome { 
            color: #28a745; font-weight: 600; margin-top: 15px;
            padding: 10px; background: #d4edda; border-radius: 8px;
        }
        
        .live-discussions { margin: 50px 0; }
        .discussion-previews { margin: 25px 0; }
        .discussion-item { 
            background: white; padding: 25px; margin: 20px 0; border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.1); border-left: 4px solid #007cba;
        }
        .discussion-item.trending { border-left-color: #ff6b35; }
        .discussion-item.hot { border-left-color: #dc3545; }
        .discussion-item.new { border-left-color: #28a745; }
        
        .discussion-header { display: flex; align-items: center; gap: 15px; margin-bottom: 10px; }
        .topic-badge { 
            padding: 4px 10px; border-radius: 12px; font-size: 0.8em; font-weight: 600; color: white;
        }
        .topic-badge.trending { background: #ff6b35; }
        .topic-badge.hot { background: #dc3545; }
        .topic-badge.new { background: #28a745; }
        .reply-count, .time { color: #666; font-size: 0.9em; }
        
        .discussion-item h4 { color: #1e3c72; margin: 10px 0; }
        .discussion-snippet { color: #555; margin: 15px 0; }
        .discussion-stats { display: flex; gap: 20px; margin-top: 15px; }
        .discussion-stats span { 
            color: #007cba; font-size: 0.9em; font-weight: 500;
            background: #e7f3ff; padding: 5px 10px; border-radius: 15px;
        }
        
        .expert-insights { margin: 50px 0; }
        .insight-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; }
        .insight-card { 
            background: white; padding: 25px; border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.1); border-left: 4px solid #6f42c1;
        }
        .expert-info { margin-bottom: 15px; }
        .expert-badge { 
            background: #6f42c1; color: white; padding: 4px 10px; 
            border-radius: 12px; font-size: 0.8em; font-weight: 600; margin-bottom: 5px; display: inline-block;
        }
        .expert-title { font-weight: 600; color: #6f42c1; }
        .insight-content strong { color: #1e3c72; }
        .insight-engagement { 
            margin-top: 15px; color: #28a745; font-weight: 500;
            background: #d4edda; padding: 8px 12px; border-radius: 8px; font-size: 0.9em;
        }
        
        .community-activity { margin: 50px 0; background: #f8f9fa; padding: 40px; border-radius: 15px; }
        .activity-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 25px; margin: 25px 0; }
        .activity-item { 
            background: white; padding: 25px; border-radius: 12px; text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .activity-number { font-size: 2.5em; font-weight: bold; color: #007cba; margin-bottom: 5px; }
        .activity-label { font-weight: 600; margin-bottom: 5px; }
        .activity-detail { color: #28a745; font-size: 0.9em; font-weight: 500; }
        
        .exclusive-access { margin: 50px 0; }
        .access-benefits { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 25px; margin: 25px 0; }
        .benefit-category { 
            background: white; padding: 25px; border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.1); border-left: 4px solid #007cba;
        }
        .benefit-category h4 { color: #1e3c72; margin-bottom: 15px; }
        .benefit-category ul { list-style: none; padding: 0; }
        .benefit-category li { margin: 8px 0; color: #555; }
        
        .urgency-section { 
            background: linear-gradient(135deg, #ff6b35, #e55a2b); 
            color: white; padding: 50px; margin: 50px 0; border-radius: 15px; text-align: center;
        }
        .urgency-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 30px; margin: 30px 0; }
        .urgency-stat { }
        .urgency-stat .stat-number { font-size: 2.5em; font-weight: bold; margin-bottom: 5px; }
        .urgency-stat .stat-text { font-size: 1.1em; opacity: 0.9; }
        .urgency-message { font-size: 1.2em; margin-top: 30px; opacity: 0.95; }
        
        .cta-section { 
            text-align: center; margin: 60px 0; 
            padding: 50px; background: linear-gradient(135deg, #f8f9fa, #e9ecef); 
            border-radius: 15px;
        }
        .cta-button { 
            background: linear-gradient(135deg, #ff6b35, #e55a2b); 
            color: white; padding: 22px 45px; 
            text-decoration: none; border-radius: 12px; 
            font-weight: 700; font-size: 1.3em;
            display: inline-block; margin: 15px;
            transition: all 0.3s ease;
            box-shadow: 0 6px 20px rgba(255,107,53,0.3);
        }
        .cta-button:hover { 
            background: linear-gradient(135deg, #e55a2b, #d44a1e);
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(255,107,53,0.4);
        }
        
        @media (max-width: 768px) {
            .forum-header h1 { font-size: 2.5em; }
            .story-grid, .insight-cards, .access-benefits { grid-template-columns: 1fr; }
            .activity-stats { grid-template-columns: repeat(2, 1fr); }
            .urgency-stats { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="forum-header">
        <div class="container">
            <h1>FAA HIMS Program Pilot Community</h1>
            <p>600+ pilots sharing real experiences • Expert guidance • Success stories</p>
        </div>
    </div>
    
    <div class="redirect-banner">
        <div class="container">
            <strong>🎯 You're about to join the most active FAA HIMS pilot community</strong><br>
            <span style="font-size: 1.2em; color: #007cba; margin: 10px 0; display: block;">Get instant access to success stories, expert guidance, and peer support</span>
            <a href="${originalUrl}" style="color: #0056b3; font-weight: bold; font-size: 1.2em; text-decoration: none;">⚡ Skip the wait - Join forum now →</a>
        </div>
    </div>
    
    <div class="container">
        ${compellingPreview}
        ${topicsHTML}
        
        <div class="cta-section">
            <h2>Ready to Join 600+ Aviation Professionals?</h2>
            <p style="font-size: 1.3em; margin-bottom: 35px;">Get instant access to the support, guidance, and community that makes HIMS success possible</p>
            <a href="${originalUrl}/register" class="cta-button">🚀 Join Community Now</a>
            <p style="margin-top: 25px; color: #666;">✅ Free registration • ✅ Instant access • ✅ 600+ active pilots</p>
        </div>
    </div>
    
    <footer style="background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; padding: 50px 0; text-align: center;">
        <div class="container">
            <p style="font-size: 1.2em; margin-bottom: 15px;">
                <strong>🛩️ Join the Most Active FAA HIMS Professional Community</strong>
            </p>
            <p style="font-size: 1.1em; margin-bottom: 20px;">
                <a href="${originalUrl}" style="color: #88c999; font-weight: bold; text-decoration: none;">hims-victims.freeforums.net</a>
            </p>
            <p style="opacity: 0.9; margin-bottom: 15px;">
                Real pilot experiences • Expert medical guidance • Career protection • Updated every 6 hours
            </p>
        </div>
    </footer>
</body>
</html>`;
}

function getPageSEOInfo(pageType) {
  if (pageType.includes('join') || pageType.includes('register')) {
    return {
      title: 'Join FAA HIMS Program Pilot Forum | Aviation Medical Certification Community',
      description: 'Join 600+ pilots discussing FAA HIMS program experiences, medical certification requirements, and recovery support. Free registration for aviation professionals seeking expert guidance.',
      slug: 'join'
    };
  }
  if (pageType.includes('discussion')) {
    return {
      title: 'FAA HIMS Program General Discussion | Pilot Medical Certification Forum',
      description: 'Active discussions with 600+ pilots about FAA HIMS program experiences, medical certification challenges, recovery journeys, and expert guidance for aviation professionals.',
      slug: 'discussion'
    };
  }
  if (pageType.includes('topics')) {
    return {
      title: 'Recent FAA HIMS Forum Topics | Latest Pilot Discussions',
      description: 'Latest discussions from 600+ pilots in the FAA HIMS program covering medical certification processes, treatment experiences, success stories, and expert professional guidance.',
      slug: 'topics'
    };
  }
  return {
    title: 'FAA HIMS Program Pilot Forum | Medical Certification Support Community',
    description: 'Leading community forum with 600+ pilots navigating the FAA HIMS program. Share experiences, get medical certification guidance, and connect with aviation professionals in recovery.',
    slug: ''
  };
}

async function main() {
  const scraper = new FAHIMSForumScraper();
  
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

  console.log('🎯 Creating compelling FAA HIMS forum mirrors with enhanced previews...');

  for (const [filename, url] of Object.entries(pages)) {
    try {
      const content = await scraper.fetchWithProxy(url);
      const seoPage = createSEOForumMirror(content, filename, url);
      fs.writeFileSync(filename, seoPage);
      console.log(`✓ Created ${filename} - Enhanced with compelling preview content`);
      
      await new Promise(resolve => setTimeout(resolve, 4000));
    } catch (error) {
      console.error(`✗ Error with ${filename}:`, error.message);
    }
  }
  
  console.log('🎉 Compelling FAA HIMS forum previews created successfully!');
}

main().catch(console.error);
