const fs = require('fs');

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
    
    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large">
    
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://faahims.rehab/${filename}">
    <meta property="og:updated_time" content="${currentDateTime}">
    
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "${title}",
      "description": "${description}",
      "url": "https://faahims.rehab/${filename}",
      "datePublished": "${currentDateTime}",
      "dateModified": "${currentDateTime}",
      "keywords": [${focusKeywords.map(k => `"${k}"`).join(', ')}]
    }
    </script>
    
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
            
            function updateMainCountdown() {
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
                updateMainCountdown();
                
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
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.7; color: #333; margin: 0; background: #fff;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        .build-info-banner {
            background: #f7fafc; padding: 12px 20px; text-align: center;
            font-size: 0.9em; color: #4a5568;
            font-family: monospace; border-bottom: 1px solid #e2e8f0;
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
            background: #f7fafc; border: 3px solid #3182ce; 
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
            transition: transform 0.3s ease;
        }
        .feature:hover { transform: translateY(-8px); }
        .feature h3 { 
            color: #1a365d; margin-bottom: 20px; font-size: 1.4em; 
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
        }
        
        .cta-secondary {
            background: linear-gradient(135deg, #38a169, #2f855a); 
            color: white; padding: 18px 35px; 
            text-decoration: none; border-radius: 8px; 
            font-weight: 600; font-size: 1.1em;
            display: inline-block; margin: 15px 10px;
            transition: all 0.3s ease;
        }
        .cta-secondary:hover {
            background: linear-gradient(135deg, #2f855a, #276749);
            transform: translateY(-3px);
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
        
        @media (max-width: 768px) {
            .hero h1 { font-size: 2.5em; }
            .features { grid-template-columns: 1fr; }
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
                <strong>Professional FAA HIMS Community Forum</strong><br>
                <div id="countdown-display" style="font-size:1.3em;color:#2c5282;margin:15px 0;font-weight:700">
                    <span id="countdown-seconds">12</span> seconds...
                </div>
                <p style="margin-top:15px;color:#4a5568">Connect with aviation medical practitioners, HIMS-approved AMEs, and experienced program participants.</p>
            </div>
        </div>
    </section>

    <section class="content-section">
        <div class="container">
            ${content}
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

    <section style="text-align:center;padding:60px 0;background:linear-gradient(135deg,#f8f9fa,#e9ecef)">
        <div class="container">
            <h2 style="margin-bottom:25px;color:#1a365d">Connect with FAA HIMS Professionals</h2>
            <p style="font-size:1.3em;margin-bottom:35px;color:#555">Professional community for aviation medical practitioners and pilots</p>
            <a href="https://login.proboards.com/register/7088425" class="cta-primary">Join Professional Community</a>
            <a href="https://hims-victims.freeforums.net" class="cta-secondary">Browse Forum</a>
        </div>
    </section>

    <footer style="background:linear-gradient(135deg,#1a365d,#2c5282);color:white;padding:50px 0;text-align:center">
        <div class="container">
            <p style="font-size:1.2em;margin-bottom:15px"><strong>Professional FAA HIMS Community</strong></p>
            <p style="font-size:1.1em;margin-bottom:20px">
                <a href="https://hims-victims.freeforums.net" style="color:#a0aec0;font-weight:bold;text-decoration:none">hims-victims.freeforums.net</a>
            </p>
            <p style="opacity:0.75;font-size:0.9em;font-family:monospace">
                Build #${buildNumber} • Last updated: ${displayDate} UTC
            </p>
        </div>
    </footer>
</body>
</html>`;

  fs.writeFileSync(filename, html);
  console.log(`Created ${filename}`);
}

// CREATE FAA HIMS GUIDE
createSEOLandingPage(
  'faa-hims-guide.html',
  'Complete FAA HIMS Program Guide 2025 | Requirements & Procedures',
  'Comprehensive guide to the FAA HIMS program including requirements, procedures, timeline, costs, and success strategies.',
  'FAA HIMS program guide, HIMS requirements, pilot medical certification process',
  `
    <div class="features">
        <div class="feature">
            <h3>Program Overview</h3>
            <p>The FAA HIMS Program provides a structured pathway for pilots to regain medical certificates following substance abuse issues through approved treatment and monitoring.</p>
        </div>
        <div class="feature">
            <h3>Timeline & Process</h3>
            <p>Typically 2-5 years including initial evaluation, FAA-approved treatment (3-12 months), ongoing monitoring, and gradual return to flight duties.</p>
        </div>
        <div class="feature">
            <h3>Requirements</h3>
            <p>Complete abstinence, FAA-approved treatment, regular testing, HIMS AME evaluations, support program participation, and sustained recovery demonstration.</p>
        </div>
        <div class="feature">
            <h3>Cost Considerations</h3>
            <p>Costs vary: Initial evaluation ($500-2,000), treatment ($5,000-50,000+), ongoing monitoring ($200-500/month). Total investment: $20,000-75,000.</p>
        </div>
        <div class="feature">
            <h3>Success Strategies</h3>
            <p>Early HIMS AME engagement, complete transparency, diligent compliance, active recovery participation, detailed documentation, and peer guidance.</p>
        </div>
        <div class="feature">
            <h3>Professional Support</h3>
            <p>Access HIMS-approved AMEs, aviation medical practitioners, substance abuse professionals, aviation attorneys, and peer mentors.</p>
        </div>
    </div>
  `,
  ['FAA HIMS program', 'pilot medical certification', 'HIMS requirements', 'aviation medical evaluation']
);

// CREATE PILOT MEDICAL CERTIFICATION
createSEOLandingPage(
  'pilot-medical-certification.html',
  'Pilot Medical Certification & FAA HIMS Program | Aviation Medical Support',
  'Expert guidance on pilot medical certification, FAA HIMS program participation, and medical certificate reinstatement.',
  'pilot medical certification, FAA medical certificate, aviation medical examination',
  `
    <div class="features">
        <div class="feature">
            <h3>Medical Certification Process</h3>
            <p>Understanding aviation medical certification is essential. For HIMS participants, this involves additional evaluations, specialized assessments, and ongoing monitoring.</p>
        </div>
        <div class="feature">
            <h3>Evaluation Requirements</h3>
            <p>Comprehensive medical history, physical examination, psychological evaluation, substance abuse assessment, laboratory testing, and recovery documentation.</p>
        </div>
        <div class="feature">
            <h3>Reinstatement Path</h3>
            <p>Approved treatment completion, sustained abstinence, monitoring compliance, positive AME evaluations, recovery progress documentation, and FAA clearance.</p>
        </div>
        <div class="feature">
            <h3>HIMS AME Selection</h3>
            <p>Select AMEs with FAA HIMS certification, aviation professional experience, accessibility, good reputation, and commitment to supporting recovery.</p>
        </div>
        <div class="feature">
            <h3>Documentation Standards</h3>
            <p>Maintain complete medical records, treatment documentation, testing results, AME reports, support group logs, and FAA correspondence.</p>
        </div>
        <div class="feature">
            <h3>Career Considerations</h3>
            <p>Navigate employment policies, maintain certifications, plan finances, build support, stay current, and prepare for return to flight operations.</p>
        </div>
    </div>
  `,
  ['pilot medical certification', 'FAA medical certificate', 'HIMS AME', 'aviation medical exam']
);

// CREATE HIMS REQUIREMENTS
createSEOLandingPage(
  'hims-requirements.html',
  'FAA HIMS Program Requirements 2025 | Comprehensive Compliance Guide',
  'Detailed information on FAA HIMS program requirements including treatment standards, monitoring protocols, and testing procedures.',
  'HIMS program requirements, FAA HIMS compliance, aviation medical standards',
  `
    <div class="features">
        <div class="feature">
            <h3>Core Requirements</h3>
            <p>Complete abstinence, FAA-approved treatment, monitoring compliance, regular AME evaluations, aftercare participation, documentation, and commitment demonstration.</p>
        </div>
        <div class="feature">
            <h3>Testing Protocols</h3>
            <p>Random drug/alcohol testing, approved laboratories, specific frequencies, immediate notifications, strict procedures, and proper documentation.</p>
        </div>
        <div class="feature">
            <h3>Treatment Standards</h3>
            <p>Accredited programs, aviation professional understanding, evidence-based methodologies, individualized plans, family involvement, and progress reporting.</p>
        </div>
        <div class="feature">
            <h3>Monitoring Requirements</h3>
            <p>Regular HIMS AME check-ins, monitoring contracts, testing schedule compliance, support group attendance, activity documentation, and coordinator contact.</p>
        </div>
        <div class="feature">
            <h3>Compliance Standards</h3>
            <p>Perfect attendance, immediate testing response, complete abstinence, transparent communication, timely documentation, guideline adherence, and proactive problem-solving.</p>
        </div>
        <div class="feature">
            <h3>Progress Milestones</h3>
            <p>Treatment completion (3-6 months), sustained abstinence (6-12 months), return to flight (12-18 months), monitoring reduction (18-36 months), standard certification (2-5 years).</p>
        </div>
    </div>
  `,
  ['HIMS program requirements', 'FAA HIMS compliance', 'aviation medical monitoring', 'pilot testing protocols']
);

// CREATE AVIATION MEDICAL RECOVERY
createSEOLandingPage(
  'aviation-medical-recovery.html',
  'Aviation Medical Recovery & Rehabilitation | FAA HIMS Support',
  'Professional guidance for aviation medical recovery and rehabilitation through the FAA HIMS program.',
  'aviation medical recovery, pilot rehabilitation, substance abuse recovery pilots',
  `
    <div class="features">
        <div class="feature">
            <h3>Recovery Journey</h3>
            <p>Comprehensive transformation: acknowledgment, treatment engagement, sustainable strategies, trust rebuilding, gradual return to flight, and long-term maintenance.</p>
        </div>
        <div class="feature">
            <h3>Psychological Support</h3>
            <p>Aviation-specialized therapists, cognitive-behavioral therapy, stress management, resilience building, mental wellness, and ongoing psychological support.</p>
        </div>
        <div class="feature">
            <h3>Peer Support Networks</h3>
            <p>Aviation-specific support groups, HIMS graduate mentorship, shared experiences, industry stressor understanding, professional networking, and accountability partnerships.</p>
        </div>
        <div class="feature">
            <h3>Career Transition</h3>
            <p>Employment implications understanding, alternative role exploration, certification maintenance, financial planning, employer communication, and return preparation.</p>
        </div>
        <div class="feature">
            <h3>Family & Relationships</h3>
            <p>Family education, trust rebuilding, treatment involvement, relationship issue resolution, healthy communication, priority balancing, and support system building.</p>
        </div>
        <div class="feature">
            <h3>Long-term Success</h3>
            <p>Sustained abstinence, continued support participation, self-assessment, fulfilling life building, stress management, community connection, and peer mentorship.</p>
        </div>
    </div>
  `,
  ['aviation medical recovery', 'pilot rehabilitation', 'HIMS recovery support', 'aviation career recovery']
);

// CREATE FAQ PAGE
createSEOLandingPage(
  'faq.html',
  'FAA HIMS Program FAQ | Frequently Asked Questions',
  'Frequently asked questions about the FAA HIMS program, medical certification requirements, treatment process, costs, and timeline.',
  'FAA HIMS FAQ, HIMS questions, pilot medical certification FAQ, aviation medical questions',
  `
    <div style="max-width:900px;margin:0 auto">
        <div style="background:#e6f7ff;border-left:5px solid #1890ff;padding:30px;margin:40px 0;border-radius:8px">
            <h2 style="color:#0050b3;margin-bottom:20px">Frequently Asked Questions</h2>
            <p style="color:#0050b3;font-size:1.1em">Get answers to common questions about the FAA HIMS program, medical certification, treatment requirements, and the recovery process.</p>
        </div>
        
        <div class="features">
            <div class="feature">
                <h3>What is the FAA HIMS Program?</h3>
                <p>The FAA HIMS (Human Intervention Motivation Study) Program is a comprehensive approach to evaluating and monitoring airmen with substance abuse issues. It provides a structured pathway for pilots to regain their medical certificates through approved treatment, ongoing monitoring, and demonstrated sustained recovery.</p>
            </div>
            
            <div class="feature">
                <h3>How long does the HIMS program take?</h3>
                <p>The HIMS program timeline varies by individual case but typically spans 2-5 years. This includes initial evaluation by a HIMS-approved AME, completion of an FAA-approved treatment program (3-12 months), ongoing monitoring with regular testing, periodic evaluations, and gradual return to flight duties with progressive reduction in monitoring requirements.</p>
            </div>
            
            <div class="feature">
                <h3>Who can participate in the HIMS program?</h3>
                <p>The HIMS program is available to pilots and aviation professionals who have substance abuse issues affecting their medical certification eligibility. Participation is determined by FAA medical standards, evaluation by HIMS-approved Aviation Medical Examiners, and willingness to comply with all program requirements including complete abstinence and ongoing monitoring.</p>
            </div>
            
            <div class="feature">
                <h3>What are the costs of the HIMS program?</h3>
                <p>HIMS program costs vary significantly based on individual circumstances. Typical expenses include: initial HIMS AME evaluation ($500-2,000), FAA-approved treatment program ($5,000-50,000+), ongoing monitoring ($200-500/month), periodic AME consultations ($300-800 each), regular drug and alcohol testing ($50-200 per test), and related travel expenses. Many pilots invest $20,000-75,000 total over the full program duration.</p>
            </div>
            
            <div class="feature">
                <h3>What is a HIMS AME?</h3>
                <p>A HIMS AME (Aviation Medical Examiner) is an FAA-designated physician with specialized training and certification to evaluate and monitor pilots in the HIMS program. These medical professionals have expertise in substance abuse disorders, aviation medicine, and the specific requirements of the FAA medical certification process. They conduct initial evaluations, ongoing monitoring, and provide essential reports to the FAA throughout a pilot's program participation.</p>
            </div>
            
            <div class="feature">
                <h3>Can I continue flying during the HIMS program?</h3>
                <p>Flight status during HIMS participation depends on individual circumstances and program phase. Initially, pilots typically cannot exercise flight privileges until completing treatment and demonstrating sustained recovery. As pilots progress through the program and meet specific milestones, they may be eligible for special issuance medical certificates with monitoring requirements, allowing gradual return to flight operations under continued oversight.</p>
            </div>
            
            <div class="feature">
                <h3>What treatment is required?</h3>
                <p>HIMS participants must complete treatment at an FAA-approved facility. Treatment typically includes comprehensive substance abuse assessment, evidence-based therapy programs, individual and group counseling, education about addiction and recovery, development of relapse prevention strategies, family involvement when appropriate, and detailed aftercare planning. Treatment duration varies from 3-12 months depending on individual needs and program requirements.</p>
            </div>
            
            <div class="feature">
                <h3>What is the testing requirement?</h3>
                <p>HIMS participants undergo regular random drug and alcohol testing throughout the program. Testing is conducted through approved laboratories with strict chain-of-custody procedures. Participants must respond immediately to testing notifications, typically within 24 hours. Testing frequency varies by program phase but often includes multiple tests per month initially, gradually reducing as participants demonstrate sustained compliance and recovery.</p>
            </div>
            
            <div class="feature">
                <h3>Will my employer find out?</h3>
                <p>FAA medical certification records are confidential medical information protected by privacy regulations. However, pilots have obligations to report certain medical conditions to employers under company policies and union agreements. Each pilot should carefully review their employment contract and consult with aviation employment attorneys to understand their specific reporting obligations and rights while navigating medical certification issues.</p>
            </div>
            
            <div class="feature">
                <h3>What is the success rate?</h3>
                <p>Pilots who complete the HIMS program and maintain compliance with all requirements have high success rates for medical certificate reinstatement and return to flight operations. Studies and program data suggest success rates above 85-90% for pilots who remain engaged throughout the full program duration. Success depends heavily on complete compliance with monitoring, sustained abstinence, active participation in support programs, and maintaining open communication with HIMS AME and program coordinators.</p>
            </div>
            
            <div class="feature">
                <h3>Can I self-report to the HIMS program?</h3>
                <p>Yes, pilots can self-report substance abuse issues to initiate HIMS program participation. Self-reporting often provides better outcomes than reporting prompted by incidents or positive tests. Pilots considering self-reporting should consult with a HIMS-approved AME and possibly an aviation attorney to understand the process, timeline, and implications before taking action. Early intervention typically results in more favorable outcomes and potentially shorter program timelines.</p>
            </div>
            
            <div class="feature">
                <h3>What support is available during the program?</h3>
                <p>HIMS participants have access to multiple support resources including HIMS-approved AMEs for medical guidance, certified substance abuse professionals for treatment and counseling, peer support groups specifically for aviation professionals, experienced HIMS graduates who serve as mentors, aviation-focused recovery meetings, and professional online communities where pilots share experiences and provide mutual support throughout the program journey.</p>
            </div>
        </div>
        
        <div style="background:#fff3cd;border-left:5px solid #ffc107;padding:30px;margin:50px 0;border-radius:8px">
            <h3 style="color:#856404;margin-bottom:15px">Have More Questions?</h3>
            <p style="color:#856404;line-height:1.8;font-size:1.1em">Connect with experienced aviation professionals, HIMS-approved AMEs, and pilots who have successfully navigated the program. Our professional community provides detailed answers, real-world insights, and ongoing support for every stage of your HIMS journey.</p>
        </div>
    </div>
  `,
  ['FAA HIMS FAQ', 'HIMS program questions', 'pilot medical certification FAQ', 'aviation medical questions', 'HIMS program answers']
);

console.log('All SEO landing pages created successfully');
console.log(`Total pages created: 5 (including FAQ)`);
console.log(`Build #${buildNumber} completed at ${displayDate} UTC`);
