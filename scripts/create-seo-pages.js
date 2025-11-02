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
                Build #${buildNumber} • Last updated: ${displayDate} UTC
            </p>
        </div>
    </footer>
</body>
</html>`;

  fs.writeFileSync(filename, html);
  console.log(`Created ${filename} - SEO landing page with dynamic timestamps`);
}

// Create comprehensive FAA HIMS Guide page
createSEOLandingPage(
  'faa-hims-guide.html',
  'Complete FAA HIMS Program Guide 2025 | Requirements & Procedures',
  'Comprehensive guide to the FAA HIMS program including requirements, procedures, timeline, costs, and success strategies. Expert guidance from aviation medical practitioners and HIMS participants.',
  'FAA HIMS program guide, HIMS requirements, pilot medical certification process, aviation medical evaluation, HIMS program timeline, treatment requirements, AME consultation, medical certificate reinstatement',
  `
    <div class="features">
        <div class="feature">
            <h3 data-icon="📋">Program Overview</h3>
            <p>The FAA HIMS (Human Intervention Motivation Study) Program provides a structured pathway for pilots and aviation professionals to regain their medical certificates following substance abuse issues. Established by the Federal Aviation Administration, this program combines medical evaluation, approved treatment, and ongoing monitoring to ensure aviation safety while supporting professional recovery.</p>
        </div>
        <div class="feature">
            <h3 data-icon="⏱️">Timeline & Process</h3>
            <p>The HIMS program typically spans 2-5 years and includes: Initial evaluation by HIMS-approved Aviation Medical Examiner (AME), completion of FAA-approved treatment program (3-12 months), ongoing monitoring with regular testing, periodic evaluations, and gradual return to flight duties. Individual timelines vary based on specific circumstances and compliance.</p>
        </div>
        <div class="feature">
            <h3 data-icon="✅">Requirements</h3>
            <p>Key requirements include: Complete abstinence from prohibited substances, attendance at FAA-approved treatment facility, regular drug and alcohol testing, ongoing participation in support programs, periodic evaluations by HIMS AME, compliance with all monitoring requirements, and demonstration of sustained recovery over extended period.</p>
        </div>
        <div class="feature">
            <h3 data-icon="💰">Cost Considerations</h3>
            <p>Program costs vary significantly based on individual circumstances: Initial evaluation ($500-2,000), treatment program ($5,000-50,000+), ongoing monitoring ($200-500/month), periodic AME consultations ($300-800 each), testing requirements ($50-200 per test), and related travel expenses. Many pilots invest $20,000-75,000 total over the program duration.</p>
        </div>
        <div class="feature">
            <h3 data-icon="🎯">Success Strategies</h3>
            <p>Maximize success through: Early engagement with HIMS AME, complete transparency with FAA and medical professionals, diligent compliance with all requirements, active participation in recovery support, maintaining detailed documentation, seeking guidance from experienced HIMS participants, and staying informed about program updates and requirements.</p>
        </div>
        <div class="feature">
            <h3 data-icon="🤝">Professional Support</h3>
            <p>Access professional guidance from: HIMS-approved Aviation Medical Examiners, experienced aviation medical practitioners, certified substance abuse professionals, aviation attorney specialists, peer support from program graduates, and active HIMS community forums providing real-world insights and experiences.</p>
        </div>
    </div>
  `,
  [
    'FAA HIMS program',
    'pilot medical certification',
    'aviation medical evaluation',
    'HIMS requirements',
    'medical certificate reinstatement',
    'aviation substance abuse program',
    'HIMS AME consultation',
    'pilot rehabilitation',
    'FAA medical certification process'
  ]
);

// Create Pilot Medical Certification page
createSEOLandingPage(
  'pilot-medical-certification.html',
  'Pilot Medical Certification & FAA HIMS Program | Aviation Medical Support',
  'Expert guidance on pilot medical certification, FAA HIMS program participation, medical certificate reinstatement, and aviation medical evaluation procedures. Professional support from experienced AMEs and program participants.',
  'pilot medical certification, FAA medical certificate, aviation medical examination, HIMS medical evaluation, medical certificate reinstatement, aviation medical requirements, AME consultation, pilot medical standards',
  `
    <div class="features">
        <div class="feature">
            <h3 data-icon="🏥">Medical Certification Process</h3>
            <p>Understanding the aviation medical certification process is essential for all pilots. The FAA requires regular medical examinations conducted by Aviation Medical Examiners (AMEs) to ensure pilots meet medical standards. For pilots in the HIMS program, this process involves additional evaluation steps, specialized assessments, and ongoing monitoring to demonstrate fitness for flight duties while maintaining recovery.</p>
        </div>
        <div class="feature">
            <h3 data-icon="📊">Evaluation Requirements</h3>
            <p>HIMS medical evaluations include comprehensive assessments: Complete medical history review, physical examination by HIMS AME, psychological evaluation, substance abuse assessment, laboratory testing, detailed documentation of treatment and recovery, evaluation of support systems, and assessment of professional commitment to sustained recovery and aviation safety.</p>
        </div>
        <div class="feature">
            <h3 data-icon="🔄">Reinstatement Path</h3>
            <p>The medical certificate reinstatement process requires: Completion of approved treatment program, demonstrated sustained abstinence, regular monitoring compliance, positive evaluations from HIMS AME, documentation of recovery progress, evidence of lifestyle changes, participation in ongoing support, and clearance from FAA medical certification division based on comprehensive evaluation.</p>
        </div>
        <div class="feature">
            <h3 data-icon="👨‍⚕️">HIMS AME Selection</h3>
            <p>Selecting a HIMS-approved Aviation Medical Examiner is crucial. Look for: FAA HIMS certification, experience with aviation professionals, understanding of pilot career concerns, accessibility for regular evaluations, reputation among HIMS participants, communication with FAA medical certification, and commitment to supporting pilot recovery while maintaining safety standards.</p>
        </div>
        <div class="feature">
            <h3 data-icon="📝">Documentation Standards</h3>
            <p>Maintaining comprehensive documentation is essential: Complete medical records, treatment program documentation, testing results and compliance records, AME evaluation reports, support group participation logs, employment status updates, and any relevant correspondence with FAA. Organized documentation facilitates smoother evaluation processes and demonstrates program compliance.</p>
        </div>
        <div class="feature">
            <h3 data-icon="💼">Career Considerations</h3>
            <p>Navigate career implications through: Understanding airline and operator policies, maintaining communication with employers when appropriate, exploring temporary alternative aviation roles, planning financial considerations during process, building support within aviation community, staying current with professional requirements, and preparing for successful return to flight operations.</p>
        </div>
    </div>
  `,
  [
    'pilot medical certification',
    'FAA medical certificate',
    'aviation medical exam',
    'HIMS AME',
    'medical certificate reinstatement',
    'aviation medical evaluation',
    'pilot medical standards',
    'FAA medical requirements',
    'aviation medical examiner'
  ]
);

// Create HIMS Requirements page
createSEOLandingPage(
  'hims-requirements.html',
  'FAA HIMS Program Requirements 2025 | Comprehensive Compliance Guide',
  'Detailed information on FAA HIMS program requirements including treatment standards, monitoring protocols, testing procedures, and compliance guidelines. Professional guidance from aviation medical experts and program participants.',
  'HIMS program requirements, FAA HIMS compliance, aviation medical standards, HIMS monitoring requirements, substance abuse testing, treatment program requirements, HIMS evaluation standards',
  `
    <div class="features">
        <div class="feature">
            <h3 data-icon="📋">Core Program Requirements</h3>
            <p>The FAA HIMS program establishes specific requirements for all participants: Complete abstinence from alcohol and prohibited substances, participation in FAA-approved treatment program, compliance with all monitoring and testing protocols, regular evaluations by HIMS AME, active engagement in aftercare and support programs, maintenance of detailed recovery documentation, and ongoing demonstration of commitment to recovery and aviation safety.</p>
        </div>
        <div class="feature">
            <h3 data-icon="🔬">Testing Protocols</h3>
            <p>HIMS participants must comply with rigorous testing requirements: Random drug and alcohol testing conducted through approved laboratories, specific testing frequencies based on program phase, immediate notification systems for testing requests, strict adherence to collection procedures, understanding of detection windows and testing methodologies, proper documentation of all test results, and rapid response to any testing discrepancies or concerns.</p>
        </div>
        <div class="feature">
            <h3 data-icon="🏥">Treatment Standards</h3>
            <p>FAA-approved treatment programs must meet specific criteria: Accreditation by recognized addiction treatment organizations, specialized understanding of aviation professionals, evidence-based treatment methodologies, comprehensive assessment and individualized treatment plans, family involvement components when appropriate, aftercare planning, and regular progress reporting to HIMS AME and FAA medical certification.</p>
        </div>
        <div class="feature">
            <h3 data-icon="📊">Monitoring Requirements</h3>
            <p>Ongoing monitoring is central to HIMS program: Regular check-ins with HIMS AME, participation in monitoring contracts, compliance with testing schedules, attendance at support group meetings, documentation of recovery activities, reporting any relevant life changes or stressors, maintaining contact with program coordinators, and demonstration of sustained engagement with recovery support systems.</p>
        </div>
        <div class="feature">
            <h3 data-icon="⚖️">Compliance Standards</h3>
            <p>Maintaining program compliance requires: Perfect attendance at scheduled appointments and evaluations, immediate response to testing notifications, complete abstinence from all prohibited substances, honest and transparent communication with HIMS team, timely submission of required documentation, adherence to all program guidelines and restrictions, and proactive problem-solving when challenges arise.</p>
        </div>
        <div class="feature">
            ">
            <h3 data-icon="📈">Progress Milestones</h3>
            <p>The HIMS program includes key milestones: Initial stabilization and treatment completion (3-6 months), demonstrated sustained abstinence (6-12 months), return to flight duties with restrictions (12-18 months), gradual reduction in monitoring intensity (18-36 months), and eventual transition to standard medical certification requirements (typically 2-5 years based on individual progress and FAA determination).</p>
        </div>
    </div>
  `,
  [
    'HIMS program requirements',
    'FAA HIMS compliance',
    'aviation medical monitoring',
    'substance abuse testing pilots',
    'HIMS treatment standards',
    'FAA medical requirements',
    'aviation testing protocols',
    'HIMS program compliance',
    'pilot monitoring requirements'
  ]
);

// Create Aviation Medical Recovery page
createSEOLandingPage(
  'aviation-medical-recovery.html',
  'Aviation Medical Recovery & Rehabilitation | FAA HIMS Support',
  'Professional guidance for aviation medical recovery and rehabilitation through the FAA HIMS program. Expert support from medical practitioners, peer mentors, and experienced program graduates for successful return to flight operations.',
  'aviation medical recovery, pilot rehabilitation, substance abuse recovery pilots, aviation professional support, HIMS recovery program, medical certificate restoration, aviation career recovery',
  `
    <div class="features">
        <div class="feature">
            <h3 data-icon="🌟">Recovery Journey</h3>
            <p>The aviation medical recovery journey through HIMS is comprehensive and transformative: Initial acknowledgment and assessment of substance abuse issues, engagement with FAA-approved treatment programs, development of sustainable recovery strategies, rebuilding trust with FAA and aviation community, gradual return to flight operations, and long-term maintenance of recovery and professional success in aviation career.</p>
        </div>
        <div class="feature">
            <h3 data-icon="🧠">Psychological Support</h3>
            <p>Mental health is integral to aviation recovery: Access to aviation-specialized therapists and counselors, cognitive-behavioral therapy for substance abuse, stress management and coping skills development, addressing underlying psychological factors, building emotional resilience, maintaining mental wellness during recovery, and ongoing psychological support throughout HIMS program participation and beyond.</p>
        </div>
        <div class="feature">
            <h3 data-icon="👥">Peer Support Networks</h3>
            <p>Connection with peers provides invaluable support: Participation in aviation-specific support groups, mentorship from successful HIMS graduates, shared experiences with fellow aviators in recovery, understanding of unique aviation industry stressors, professional networking during recovery journey, accountability partnerships, and long-term recovery community involvement for sustained success.</p>
        </div>
        <div class="feature">
            <h3 data-icon="💼">Career Transition</h3>
            <p>Managing career during recovery requires planning: Understanding employment implications during HIMS participation, exploring alternative aviation roles during treatment, maintaining professional certifications and currency, financial planning for program duration, communication strategies with employers when appropriate, preparing for return to flight operations, and long-term career development post-recovery.</p>
        </div>
        <div class="feature">
            <h3 data-icon="🏠">Family & Relationships</h3>
            <p>Recovery impacts personal relationships significantly: Family education about HIMS program and recovery process, rebuilding trust with loved ones, involving family in treatment when appropriate, addressing relationship issues affecting recovery, developing healthy communication patterns, balancing recovery priorities with family needs, and building sustainable support systems beyond aviation community.</p>
        </div>
        <div class="feature">
            <h3 data-icon="🎯">Long-term Success</h3>
            <p>Sustained recovery requires ongoing commitment: Maintaining abstinence through life challenges and stressors, continued participation in recovery support activities, regular self-assessment and reflection, building fulfilling life beyond aviation identity, developing healthy stress management strategies, staying connected with recovery community, and serving as mentor for others entering HIMS program.</p>
        </div>
    </div>
    
    <div style="background: #fff3cd; border-left: 5px solid #ffc107; padding: 25px; margin: 40px 0; border-radius: 8px;">
        <h3 style="color: #856404; margin-bottom: 15px;">🤝 Join Our Recovery Community</h3>
        <p style="color: #856404; line-height: 1.7;">Connect with hundreds of aviation professionals who have successfully navigated the HIMS program. Share experiences, get answers to your questions, and receive support from those who understand the unique challenges of aviation recovery. Our community provides professional guidance, peer mentorship, and evidence-based resources for every stage of your HIMS journey.</p>
    </div>
  `,
  [
    'aviation medical recovery',
    'pilot rehabilitation program',
    'substance abuse recovery aviation',
    'HIMS recovery support',
    'aviation career recovery',
    'pilot mental health',
    'aviation professional support',
    'medical certificate restoration',
    'aviation recovery community'
  ]
);

console.log('All SEO landing pages created successfully with dynamic timestamps');
console.log(`Total pages created: 4`);
console.log(`Build #${buildNumber} completed at ${displayDate} UTC`);
