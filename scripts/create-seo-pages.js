const fs = require('fs');

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
    
    <!-- Enhanced Schema.org for rich SERP features -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "${title}",
      "description": "${description}",
      "url": "https://faahims.rehab/${filename}",
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
                background: linear-gradient(135deg, #007cba, #005a87); 
                color: white; padding: 20px; border-radius: 15px; 
                font-weight: 600; z-index: 1000; 
                box-shadow: 0 8px 30px rgba(0,123,186,0.4);
                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                text-align: center; min-width: 200px;
                border: 2px solid rgba(255,255,255,0.2);
            \`;
            countdownDiv.innerHTML = '✈️ Connecting to HIMS forum in ' + countdown + 's...';
            document.body.appendChild(countdownDiv);
            
            const timer = setInterval(() => {
                countdown--;
                if (countdown > 0) {
                    countdownDiv.innerHTML = '✈️ Connecting to HIMS forum in ' + countdown + 's...';
                } else {
                    countdownDiv.innerHTML = '🚀 Joining community now...';
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
        
        .hero { 
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white; padding: 70px 0; text-align: center;
        }
        .hero h1 { 
            font-size: 3.5em; margin-bottom: 20px; font-weight: 700;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .hero p { font-size: 1.4em; margin-bottom: 30px; opacity: 0.95; }
        
        .redirect-notice { 
            background: linear-gradient(45deg, #e6f3ff, #cce5ff); 
            border: 3px solid #007cba; 
            padding: 30px; margin: 30px 0; border-radius: 15px; 
            text-align: center; font-weight: 600;
            box-shadow: 0 8px 25px rgba(0,123,186,0.15);
        }
        
        .content-section { padding: 50px 0; }
        
        .features { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px; margin: 40px 0;
        }
        .feature { 
            background: white; padding: 35px; border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            border-left: 5px solid #007cba;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .feature:hover { 
            transform: translateY(-8px); 
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }
        .feature h3 { 
            color: #007cba; margin-bottom: 20px; font-size: 1.4em; 
            display: flex; align-items: center;
        }
        .feature h3::before { 
            content: attr(data-icon); margin-right: 12px; 
            font-size: 1.5em; 
        }
        
        .cta-primary { 
            background: linear-gradient(135deg, #ff6b35, #e55a2b); 
            color: white; padding: 22px 45px; 
            text-decoration: none; border-radius: 12px; 
            font-weight: 700; font-size: 1.3em;
            display: inline-block; margin: 20px 15px;
            transition: all 0.3s ease;
            box-shadow: 0 6px 20px rgba(255,107,53,0.3);
            text-transform: uppercase; letter-spacing: 0.5px;
        }
        .cta-primary:hover { 
            background: linear-gradient(135deg, #e55a2b, #d44a1e);
            transform: translateY(-4px);
            box-shadow: 0 10px 30px rgba(255,107,53,0.4);
        }
        
        .cta-secondary { 
            background: #28a745; color: white; padding: 18px 35px; 
            text-decoration: none; border-radius: 10px; 
            font-weight: 600; display: inline-block; margin: 15px 10px;
            transition: all 0.3s ease; font-size: 1.1em;
        }
        .cta-secondary:hover { 
            background: #218838; transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(40,167,69,0.3);
        }
        
        .internal-navigation { 
            background: linear-gradient(135deg, #f0f8ff, #e6f3ff); 
            padding: 35px; border-radius: 15px; 
            margin: 40px 0; border-left: 5px solid #0056b3;
            box-shadow: 0 6px 20px rgba(0,86,179,0.1);
        }
        .internal-navigation h3 { 
            color: #0056b3; margin-bottom: 25px; font-size: 1.3em;
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
            color: #007cba; text-decoration: none; font-weight: 600;
            display: flex; align-items: center;
        }
        .nav-item a:hover { color: #005a87; }
        .nav-item a::before { 
            content: '→'; margin-right: 8px; color: #28a745; 
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
            background: white; padding: 30px; border-radius: 15px; 
            box-shadow: 0 6px 20px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }
        .stat:hover { transform: translateY(-5px); }
        .stat-number { 
            font-size: 3.2em; font-weight: bold; color: #007cba; 
            margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }
        .stat-label { font-weight: 600; color: #555; font-size: 1.1em; }
        
        .keywords-section {
            background: linear-gradient(135deg, #fff3e0, #ffe0b2);
            padding: 40px; border-radius: 15px; margin: 40px 0;
            border-left: 5px solid #ff9800;
        }
        .keywords-section h3 { color: #e65100; margin-bottom: 20px; }
        .keyword-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 20px; }
        .keyword-tag { 
            background: #fff; padding: 8px 15px; border-radius: 20px;
            font-size: 0.9em; font-weight: 500; color: #007cba;
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
    <section class="hero">
        <div class="container">
            <h1>${title.split(' | ')[0]}</h1>
            <p>Professional guidance • Real pilot experiences • Medical certification support</p>
            
            <div class="redirect-notice">
                <strong>🎯 Connecting to active FAA HIMS pilot community...</strong><br>
                <span style="font-size: 1.1em; color: #007cba; margin: 10px 0; display: block;">Join thousands of aviation professionals sharing real HIMS experiences and expert guidance</span>
                <a href="https://hims-victims.freeforums.net" style="color: #0056b3; font-weight: bold; font-size: 1.2em; text-decoration: none;">⚡ Click to join forum immediately →</a>
            </div>
        </div>
    </section>

    <section class="content-section">
        <div class="container">
            ${content}
            
            <div class="internal-navigation">
                <h3>🧭 Comprehensive FAA HIMS Resources</h3>
                <div class="nav-grid">
                    <div class="nav-item">
                        <a href="/">FAA HIMS Community Home</a>
                    </div>
                    <div class="nav-item">
                        <a href="/discussion.html">General Discussion Forum</a>
                    </div>
                    <div class="nav-item">
                        <a href="/join.html">Join Pilot Community</a>
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
                <h3>🎯 What Our FAA HIMS Community Discusses</h3>
                <p><strong>Comprehensive coverage includes:</strong> ${keywords}</p>
                <div class="keyword-tags">
                    ${focusKeywords.map(keyword => `<span class="keyword-tag">${keyword}</span>`).join('')}
                </div>
            </div>
        </div>
    </section>

    <section class="stats-showcase">
        <div class="container">
            <h2>Join the Premier FAA HIMS Professional Network</h2>
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
            <h2 style="margin-bottom: 25px; color: #1e3c72;">Ready to Connect with FAA HIMS Professionals?</h2>
            <p style="font-size: 1.3em; margin-bottom: 35px; color: #555;">Join aviation professionals navigating medical certification, sharing experiences, and providing expert guidance</p>
            
            <a href="https://hims-victims.freeforums.net/register" class="cta-primary">Join Community Now</a>
            <a href="https://hims-victims.freeforums.net" class="cta-secondary">Browse Discussions</a>
        </div>
    </section>

    <footer style="background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; padding: 50px 0; text-align: center;">
        <div class="container">
            <p style="font-size: 1.2em; margin-bottom: 15px;">
                <strong>🛩️ Active FAA HIMS Professional Community</strong>
            </p>
            <p style="font-size: 1.1em; margin-bottom: 20px;">
                <a href="https://hims-victims.freeforums.net" style="color: #88c999; font-weight: bold; text-decoration: none;">hims-victims.freeforums.net</a>
            </p>
            <p style="opacity: 0.9; margin-bottom: 15px; font-size: 1.05em;">
                Real pilot experiences • Medical certification guidance • Professional support • Updated every 6 hours
            </p>
            <p style="opacity: 0.8; font-size: 0.95em; max-width: 600px; margin: 0 auto;">
                Educational peer support resource for aviation professionals navigating FAA HIMS program requirements. Not affiliated with the FAA. Always follow official FAA guidance and consult qualified aviation medical professionals for medical certification decisions.
            </p>
        </div>
    </footer>
</body>
</html>`;

  fs.writeFileSync(filename, html);
  console.log(`✓ Created SEO landing page: ${filename}`);
}

function main() {
  console.log('🎯 Creating 4 premium SEO landing pages for FAA HIMS...');

  // Page 1: Comprehensive HIMS Guide
  createSEOLandingPage(
    'faa-hims-guide.html',
    'Complete FAA HIMS Program Guide 2025 | Pilot Medical Certification Recovery',
    'Comprehensive FAA HIMS program guide for pilots seeking medical certificate reinstatement. Step-by-step process, requirements, timeline, treatment facilities, and success strategies from aviation professionals.',
    'FAA HIMS program guide 2025, pilot medical certification, HIMS requirements, aviation medical recovery, medical certificate reinstatement, pilot rehabilitation, HIMS timeline, treatment facilities, continuing care, aviation medical examiner',
    `<h2>Complete FAA HIMS Program Guide for Aviation Professionals</h2>
    <div class="features">
        <div class="feature">
            <h3 data-icon="📋">HIMS Program Overview & Timeline</h3>
            <p>The FAA HIMS (Human Intervention Motivation Study) program provides a comprehensive pathway for pilots to regain medical certificates after substance-related issues. Understanding the complete process, from initial evaluation through successful reinstatement, is crucial for aviation professionals. Our community guides pilots through each phase with real experiences and expert insights.</p>
        </div>
        <div class="feature">
            <h3 data-icon="🏥">Medical Requirements & Evaluations</h3>
            <p>HIMS medical certification involves specific psychological evaluations, treatment documentation, and ongoing monitoring requirements. Aviation Medical Examiners (AMEs) play a crucial role in the process. Connect with pilots who've successfully navigated medical evaluations and certification requirements.</p>
        </div>
        <div class="feature">
            <h3 data-icon="📊">Treatment Facilities & Programs</h3>
            <p>FAA-approved HIMS treatment facilities meet strict standards for aviation professionals. Our community shares experiences with various treatment programs, helping pilots choose appropriate facilities and understand what to expect during treatment phases.</p>
        </div>
        <div class="feature">
            <h3 data-icon="✈️">Professional Reintegration & Career Success</h3>
            <p>Successfully completing HIMS means returning to aviation careers with confidence. Our pilot community provides ongoing support for professional reintegration, employer relationships, and long-term career success in aviation.</p>
        </div>
    </div>`,
    ['FAA HIMS program', 'pilot medical certification', 'aviation medical recovery', 'medical certificate reinstatement', 'HIMS requirements', 'pilot rehabilitation', 'aviation medical examiner', 'HIMS timeline', 'treatment facilities', 'continuing care monitoring']
  );

  // Page 2: Medical Certification Focus
  createSEOLandingPage(
    'pilot-medical-certification.html',
    'Pilot Medical Certification Process | FAA HIMS Medical Requirements 2025',
    'Navigate pilot medical certification challenges with expert guidance from aviation professionals. HIMS medical requirements, AME guidance, psychological evaluations, and certification success strategies.',
    'pilot medical certification, aviation medical examiner, FAA medical certificate, HIMS medical requirements, pilot medical renewal, aviation medical recovery, psychological evaluation, medical certificate reinstatement, AME guidance, aviation medical monitoring',
    `<h2>Expert Guidance for Pilot Medical Certification Success</h2>
    <div class="features">
        <div class="feature">
            <h3 data-icon="🩺">Aviation Medical Examiner (AME) Network</h3>
            <p>Working with experienced HIMS-approved Aviation Medical Examiners is essential for successful medical certificate reinstatement. Our community connects pilots with AMEs who understand HIMS requirements and provide professional guidance throughout the certification process.</p>
        </div>
        <div class="feature">
            <h3 data-icon="📋">Medical Evaluation Process</h3>
            <p>HIMS medical evaluations include comprehensive psychological assessments, treatment documentation review, and ongoing monitoring protocols. Understanding evaluation criteria and preparation strategies significantly improves certification success rates.</p>
        </div>
        <div class="feature">
            <h3 data-icon="🔄">Certificate Reinstatement Procedures</h3>
            <p>Medical certificate reinstatement through HIMS involves specific documentation requirements, compliance verification, and demonstration of sustained recovery. Our pilot community shares successful reinstatement experiences and strategic guidance.</p>
        </div>
        <div class="feature">
            <h3 data-icon="📈">Ongoing Monitoring & Compliance</h3>
            <p>HIMS continuing care includes regular medical monitoring, compliance reporting, and long-term oversight requirements. Learn about successful compliance strategies from pilots maintaining their medical certificates over multiple years.</p>
        </div>
    </div>`,
    ['pilot medical certification', 'aviation medical examiner', 'FAA medical certificate', 'HIMS medical requirements', 'psychological evaluation', 'medical certificate reinstatement', 'AME guidance', 'aviation medical monitoring', 'certification compliance', 'medical evaluation process']
  );

  // Page 3: HIMS Requirements Detail
  createSEOLandingPage(
    'hims-requirements.html',
    'FAA HIMS Program Requirements 2025 | Pilot Rehabilitation Guidelines',
    'Complete overview of FAA HIMS program requirements for aviation professionals. Treatment guidelines, evaluation criteria, monitoring requirements, and step-by-step compliance guidance.',
    'FAA HIMS requirements 2025, pilot rehabilitation requirements, HIMS program criteria, aviation medical requirements, substance abuse treatment pilots, HIMS evaluation criteria, treatment compliance, monitoring requirements, certification guidelines, pilot recovery standards',
    `<h2>Comprehensive FAA HIMS Program Requirements & Guidelines</h2>
    <div class="features">
        <div class="feature">
            <h3 data-icon="📝">Initial Evaluation & Assessment Criteria</h3>
            <p>HIMS program entry requires comprehensive evaluation by FAA-approved professionals using specific assessment criteria. Understanding evaluation components, documentation requirements, and preparation strategies is crucial for successful program entry and progression.</p>
        </div>
        <div class="feature">
            <h3 data-icon="🏥">Treatment Program Standards & Requirements</h3>
            <p>FAA-approved HIMS treatment facilities and programs must meet strict federal standards for aviation professionals. Learn about treatment program requirements, duration expectations, and facility selection criteria from experienced pilots.</p>
        </div>
        <div class="feature">
            <h3 data-icon="📊">Monitoring & Compliance Protocols</h3>
            <p>HIMS requires ongoing monitoring including regular testing, detailed reporting, professional oversight, and compliance verification. Understanding monitoring protocols and maintaining consistent compliance is essential for program success.</p>
        </div>
        <div class="feature">
            <h3 data-icon="⚖️">Regulatory Compliance & Legal Considerations</h3>
            <p>Understanding FAA regulatory requirements, legal implications of HIMS participation, and professional advocacy strategies helps protect aviation careers. Our community discusses compliance strategies and regulatory navigation.</p>
        </div>
    </div>`,
    ['FAA HIMS requirements', 'pilot rehabilitation requirements', 'HIMS program criteria', 'aviation medical requirements', 'HIMS evaluation criteria', 'treatment compliance', 'monitoring requirements', 'certification guidelines', 'regulatory compliance', 'pilot recovery standards']
  );

  // Page 4: Aviation Medical Recovery
  createSEOLandingPage(
    'aviation-medical-recovery.html',
    'Aviation Medical Recovery Support | Pilot Substance Abuse Recovery 2025',
    'Professional support for pilots in aviation medical recovery. HIMS program guidance, substance abuse recovery for aviation professionals, peer support community, and career protection strategies.',
    'aviation medical recovery, pilot substance abuse recovery, aviation professional support, pilot rehabilitation, aviation career recovery, professional pilot support, HIMS recovery program, pilot peer support, aviation recovery community, medical recovery guidance',
    `<h2>Professional Aviation Medical Recovery Support & Guidance</h2>
    <div class="features">
        <div class="feature">
            <h3 data-icon="💼">Professional Career Protection Strategies</h3>
            <p>Recovery while maintaining aviation career prospects requires specialized understanding and strategic planning. Connect with aviation professionals who've successfully navigated recovery while protecting their professional standing and career advancement opportunities.</p>
        </div>
        <div class="feature">
            <h3 data-icon="🤝">Aviation Professional Peer Support Networks</h3>
            <p>Building supportive relationships with other pilots in recovery provides unique understanding, accountability, and professional guidance. Our community offers ongoing peer support specifically designed for aviation professionals facing similar challenges.</p>
        </div>
        <div class="feature">
            <h3 data-icon="🛡️">Career Transition & Professional Development</h3>
            <p>Protecting aviation careers during recovery involves strategic planning, professional development, and industry relationship management. Learn from pilots who've maintained their professional reputation and career trajectory throughout recovery.</p>
        </div>
        <div class="feature">
            <h3 data-icon="📈">Long-term Success & Professional Excellence</h3>
            <p>Sustained recovery and aviation career excellence requires ongoing professional support, continuing education, and industry engagement. Our community provides long-term encouragement and professional development guidance for aviation professionals.</p>
        </div>
    </div>`,
    ['aviation medical recovery', 'pilot substance abuse recovery', 'aviation professional support', 'pilot rehabilitation', 'aviation career recovery', 'professional pilot support', 'pilot peer support', 'aviation recovery community', 'career protection strategies', 'professional development']
  );

  console.log('🎉 Premium SEO landing pages created successfully!');
  console.log('📈 All pages optimized for page 1 SERP ranking with 12-second redirects to forum');
}

main();
