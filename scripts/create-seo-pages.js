const fs = require('fs');

// Get dynamic build information
const buildNumber = process.env.GITHUB_RUN_NUMBER || Math.floor(Math.random() * 1000);
const currentDateTime = new Date().toISOString();
const displayDate = new Date(currentDateTime).toLocaleString('en-US', { 
  timeZone: 'UTC',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});

console.log(`Creating SEO pages - Build #${buildNumber} at ${displayDate} UTC`);

function createSEOLandingPage(filename, title, description, keywords, content, focusKeywords) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    <link rel="canonical" href="https://faahims.rehab/${filename}">
    
    <!-- Enhanced Open Graph for social sharing -->
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://faahims.rehab/${filename}">
    <meta property="og:site_name" content="FAA HIMS Program Community">
    <meta property="og:image" content="https://faahims.rehab/images/faa-hims-community.jpg">
    <meta property="og:updated_time" content="${currentDateTime}">
    
    <!-- Enhanced Schema.org for rich SERP features -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "${title}",
      "description": "${description}",
      "url": "https://faahims.rehab/${filename}",
      "datePublished": "${currentDateTime}",
      "dateModified": "${currentDateTime}",
      "publisher": {
        "@type": "Organization",
        "name": "FAA HIMS Program Community"
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
          "description": "Aviation medical certification process and requirements for commercial and private pilots seeking medical certificate reinstatement"
        },
        {
          "@type": "Thing",
          "name": "Aviation Medical Recovery",
          "description": "Professional rehabilitation and recovery support programs specifically designed for aviation professionals and commercial pilots"
        }
      ],
      "mainEntity": {
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
            "name": "How long does the HIMS program take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The HIMS program timeline varies by individual case but typically involves initial evaluation, treatment phase (3-12 months), and ongoing monitoring (2-5 years) with regular check-ins and compliance requirements."
            }
          }
        ]
      },
      "keywords": [${focusKeywords.map(k => `"${k}"`).join(', ')}],
      "audience": {
        "@type": "Audience",
        "audienceType": "Aviation Professionals",
        "geographicArea": {
          "@type": "Country",
          "name": "United States"
        }
      }
    }
    </script>
    
    <!-- 12-second redirect with professional countdown -->
    <script>
        const isBot = /bot|crawl|spider|slurp|index|google|bing|yahoo|facebook|twitter|linkedin|facebookexternalhit|whatsapp|telegram|yandex|baidu/i.test(navigator.userAgent);
        const isHeadless = navigator.webdriver || window.navigator.webdriver || window.callPhantom || window._phantom;
        
        if (!isBot && !isHeadless && typeof window !== 'undefined') {
            let countdown = 12;
            
            const countdownDiv = document.createElement('div');
            countdownDiv.style.cssText = \`
                position: fixed; top: 25px; right: 25px; 
                background: linear-gradient(135deg, #1a365d, #2c5282); 
                color: white; padding: 20px; border-radius: 8px; 
                font-weight: 600; z-index: 1000; 
                box-shadow: 0 8px 30px rgba(0,0,0,0.3);
                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                text-align: center; min-width: 280px;
                border: 2px solid rgba(255,255,255,0.1);
            \`;
            countdownDiv.innerHTML = '<div style="font-weight:600;margin-bottom:8px;font-size:14px;">HIMS Professional Community</div><div style="font-size:13px;">Connecting in ' + countdown + ' seconds</div><div style="font-size:11px;margin-top:8px;opacity:0.8;">Click to join immediately</div>';
            
            countdownDiv.onclick = function() {
                window.location.href = 'https://hims-victims.freeforums.net';
            };
            
            document.body.appendChild(countdownDiv);
            
            const timer = setInterval(() => {
                countdown--;
                if (countdown > 0) {
                    countdownDiv.innerHTML = '<div style="font-weight:600;margin-bottom:8px;font-size:14px;">HIMS Professional Community</div><div style="font-size:13px;">Connecting in ' + countdown + ' seconds</div><div style="font-size:11px;margin-top:8px;opacity:0.8;">Click to join immediately</div>';
                } else {
                    countdownDiv.innerHTML = '<div style="font-weight:600;font-size:14px;">Establishing connection...</div>';
                    clearInterval(timer);
                    setTimeout(() => {
                        window.location.href = 'https://hims-victims.freeforums.net';
                    }, 800);
                }
            }, 1000);
        }
    </script>
    
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.7; color: #333; margin: 0; background: #fff;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        .build-info-banner {
            background: #f7fafc; 
            padding: 12px 20px; 
            text-align: center;
            font-size: 0.9em; 
            color: #4a5568;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Mono', Monaco, monospace;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .hero { 
            background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%);
            color: white; padding: 70px 0; text-align: center;
        }
        .hero h1 { 
            font-size: 3.5em; margin-bottom: 20px; font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .hero p { font-size: 1.4em; margin-bottom: 30px; opacity: 0.95; }
        
        .redirect-notice { 
            background: #f7fafc; 
            border: 3px solid #3182ce; 
            padding: 30px; margin: 30px 0; border-radius: 8px; 
            text-align: center; font-weight: 600;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }
        
        .content-section { padding: 50px 0; }
        
        .features { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px; margin: 40px 0;
        }
        .feature { 
            background: white; padding: 35px; border-radius: 8px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.08);
            border-left: 5px solid #3182ce;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .feature:hover { 
            transform: translateY(-8px); 
            box-shadow: 0 15px 40px rgba(0,0,0,0.12);
        }
        .feature h3 { 
            color: #1a365d; margin-bottom: 20px; font-size: 1.4em; 
            display: flex; align-items: center;
        }
        .feature h3::before { 
            content: attr(data-icon); margin-right: 12px; 
            font-size: 1.5em; 
        }
        
        .cta-primary { 
            background: linear-gradient(135deg, #3182ce, #2c5282); 
            color: white; padding: 22px 45px; 
            text-decoration: none; border-radius: 8px; 
            font-weight: 700; font-size: 1.3em;
            display: inline-block; margin: 20px 15px;
            transition: all 0.3s ease;
            box-shadow: 0 6px 20px rgba(49, 130, 206, 0.3);
        }
        .cta-primary:hover { 
            background: linear-gradient(135deg, #2c5282, #2a4365);
            transform: translateY(-4px);
            box-shadow: 0 10px 30px rgba(49, 130, 206, 0.4);
        }
        
        .cta-secondary { 
            background: #38a169; color: white; padding: 18px 35px; 
            text-decoration: none; border-radius: 8px; 
            font-weight: 600; display: inline-block; margin: 15px 10px;
            transition: all 0.3s ease; font-size: 1.1em;
        }
        .cta-secondary:hover { 
            background: #2f855a; transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(56, 161, 105, 0.3);
        }
        
        .internal-navigation { 
            background: #f7fafc; 
            padding: 35px; border-radius: 8px; 
            margin: 40px 0; border-left: 5px solid #3182ce;
            box-shadow: 0 6px 20px rgba(0,0,0,0.06);
        }
        .internal-navigation h3 { 
            color: #1a365d; margin-bottom: 25px; font-size: 1.3em;
        }
        .nav-grid { 
            display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px; margin-top: 20px;
        }
        .nav-item { 
            background: white; padding: 15px 20px; border-radius: 8px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.05);
            transition: transform 0.2s ease;
        }
        .nav-item:hover { transform: translateY(-2px); }
        .nav-item a { 
            color: #3182ce; text-decoration: none; font-weight: 600;
            display: flex; align-items: center;
        }
        .nav-item a:hover { color: #2c5282; }
        .nav-item a::before { 
            content: '→'; margin-right: 8px; color: #38a169; 
        }
        
        .stats-showcase { 
            background: #f8f9fa; padding: 60px 0; text-align: center;
            margin: 50px 0;
        }
        .stats { 
            display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 30px; margin: 40px 0;
        }
        .stat { 
            background: white; padding: 30px; border-radius: 8px; 
            box-shadow: 0 6px 20px rgba(0,0,0,0.08);
            transition: transform 0.3s ease;
        }
        .stat:hover { transform: translateY(-5px); }
        .stat-number { 
            font-size: 3.2em; font-weight: bold; color: #3182ce; 
            margin-bottom: 10px;
        }
        .stat-label { font-weight: 600; color: #555; font-size: 1.1em; }
        
        .keywords-section {
            background: #f7fafc;
            padding: 40px; border-radius: 8px; margin: 40px 0;
            border-left: 5px solid #3182ce;
        }
        .keywords-section h3 { color: #1a365d; margin-bottom: 20px; }
        .keyword-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
        .keyword-tag { 
            background: #fff; padding: 8px 15px; border-radius: 20px;
            font-size: 0.9em; font-weight: 500; color: #2c5282;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        @media (max-width: 768px) {
            .hero h1 { font-size: 2.5em; }
            .features { grid-template-columns: 1fr; }
            .stats { grid-template-columns: repeat(2, 1fr); }
            .nav-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="build-info-banner">
        <strong>System Update #${buildNumber}</strong> • Last updated: ${displayDate} UTC • Updated every 6 hours
    </div>
    
    <section class="hero">
        <div class="container">
            <h1>${title.split(' | ')[0]}</h1>
            <p>Professional guidance • Real pilot experiences • Medical certification support</p>
            
            <div class="redirect-notice">
                <strong>Connecting to active FAA HIMS professional community...</strong><br>
                <span style="font-size: 1.1em; color: #3182ce; margin: 10px 0; display: block;">Access expert guidance and professional support from aviation medical practitioners</span>
                <a href="https://hims-victims.freeforums.net" style="color: #2c5282; font-weight: bold; font-size: 1.2em; text-decoration: none;">Click to access forum immediately →</a>
            </div>
        </div>
    </section>

    <section class="content-section">
        <div class="container">
            ${content}
            
            <div class="internal-navigation">
                <h3>Comprehensive FAA HIMS Resources</h3>
                <div class="nav-grid">
                    <div class="nav-item">
                        <a href="/">FAA HIMS Community Home</a>
                    </div>
                    <div class="nav-item">
                        <a href="/discussion.html">General Discussion Forum</a>
                    </div>
                    <div class="nav-item">
                        <a href="/join.html">Join Professional Community</a>
                    </div>
                    <div class="nav-item">
                        <a href="/topics.html">Recent HIMS Topics</a>
                    </div>
                    <div class="nav-item">
                        <a href="/faa-hims-guide.html">Complete Program Guide</a>
                    </div>
                    <div class="nav-item">
                        <a href="/pilot-medical-certification.html">Medical Certification</a>
                    </div>
                    <div class="nav-item">
                        <a href="/hims-requirements.html">Program Requirements</a>
                    </div>
                    <div class="nav-item">
                        <a href="/aviation-medical-recovery.html">Medical Recovery</a>
                    </div>
                </div>
            </div>
            
            <div class="keywords-section">
                <h3>Professional Discussion Topics</h3>
                <p><strong>Comprehensive coverage includes:</strong> ${keywords}</p>
                <div class="keyword-tags">
                    ${focusKeywords.map(keyword => `<span class="keyword-tag">${keyword}</span>`).join('')}
                </div>
            </div>
        </div>
    </section>

    <section class="stats-showcase">
        <div class="container">
            <h2>Professional FAA HIMS Network</h2>
            <div class="stats">
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
    </section>

    <section style="text-align: center; padding: 60px 0; background: linear-gradient(135deg, #f8f9fa, #e9ecef);">
        <div class="container">
            <h2 style="margin-bottom: 25px; color: #1a365d;">Connect with FAA HIMS Professionals</h2>
            <p style="font-size: 1.3em; margin-bottom: 35px; color: #555;">Professional community for aviation medical practitioners and certified pilots navigating HIMS program requirements</p>
            
            <a href="https://hims-victims.freeforums.net/register" class="cta-primary">Join Professional Community</a>
            <a href="https://hims-victims.freeforums.net" class="cta-secondary">Browse Discussions</a>
        </div>
    </section>

    <footer style="background: linear-gradient(135deg, #1a365d, #2c5282); color: white; padding: 50px 0; text-align: center;">
        <div class="container">
            <p style="font-size: 1.2em; margin-bottom: 15px;">
                <strong>Professional FAA HIMS Community</strong>
            </p>
            <p style="font-size: 1.1em; margin-bottom: 20px;">
                <a href="https://hims-victims.freeforums.net" style="color: #a0aec0; font-weight: bold; text-decoration: none;">hims-victims.freeforums.net</a>
            </p>
            <p style="opacity: 0.9; margin-bottom: 15px; font-size: 1.05em;">
                Professional guidance • Medical certification support • Evidence-based resources • Updated every 6 hours
            </p>
            <p style="opacity: 0.75; font-size: 0.9em; font-family: monospace;">
                Build #${buildNumber} • ${displayDate} UTC
            </p>
            <p style="opacity: 0.8; font-size: 0.95em; max-width: 600px; margin: 15px auto 0;">
                Professional peer support resource for aviation practitioners navigating FAA HIMS program requirements. Not affiliated with the FAA. Always follow official FAA guidance and consult qualified aviation medical professionals.
            </p>
        </div>
    </footer>
</body>
</html>`;

  fs.writeFileSync(filename, html);
  console.log(`Created SEO landing page: ${filename} - Build #${buildNumber}`);
}

// Rest of the file stays the same...
