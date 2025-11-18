# Security Policy

## Overview

The FAA HIMS Program Community (faahims.rehab) is committed to maintaining the security and privacy of our users. This site serves as an educational resource and community gateway for aviation professionals navigating FAA HIMS program requirements and medical certification.

## Supported Versions

We maintain a continuously deployed static site with automated updates every 6 hours via GitHub Actions.

| Version | Status | Update Frequency | Support |
| ------- | ------ | ---------------- | ------- |
| Current production build | Actively maintained | Every 6 hours | Full security support |
| Previous builds | Superseded | Automatically replaced | No support (obsolete) |

**Update Schedule:**
- **Automated Builds**: GitHub Actions runs every 6 hours (00:00, 06:00, 12:00, 18:00 UTC)
- **Manual Builds**: Can be triggered immediately for critical security patches
- **Version Format**: Build numbers increment with each deployment (visible in page footer)
- **Content Refresh**: Forum content, SEO files, and all pages regenerated on each build
- **Zero Downtime**: Cloudflare Pages serves latest build automatically

**Build Information:**

To check the current build version, visit any page on the site. Each page footer displays the build number and timestamp:
```
Build #XXX • MM/DD/YYYY HH:MM UTC
```

You can also check:
- **Homepage footer**: https://faahims.rehab (scroll to bottom)
- **Sitemap lastmod date**: https://faahims.rehab/sitemap.xml
- **RSS feed pubDate**: https://faahims.rehab/feed.xml
- **GitHub Actions history**: [View latest builds](https://github.com/faahims-hims-victims/faahims.rehab/actions)

## Security Measures

### Current Protections

- HTTPS/TLS Encryption: All traffic encrypted via Cloudflare Pages
- Content Security Policy: Strict CSP headers prevent XSS attacks
- HSTS: HTTP Strict Transport Security enabled
- X-Frame-Options: Clickjacking protection enabled
- X-Content-Type-Options: MIME-sniffing protection
- Automated Dependency Updates: Regular security patches via GitHub Dependabot
- Static Site Architecture: No server-side code = reduced attack surface
- Privacy Protection: Safe Zone content filtering for user confidentiality

### Privacy Commitment

We take user privacy seriously:
- No tracking cookies or analytics
- No user data collection
- No authentication system (links to external forum)
- Forum content scraping respects privacy zones

## Reporting a Vulnerability

### Where to Report

If you discover a security vulnerability, please report it responsibly:

**Primary Contact:**
- **GitHub Security Advisory** (preferred): [Create Private Security Report](https://github.com/faahims-hims-victims/faahims.rehab/security/advisories/new)
- **Email**: vulnerability.landline252 [at] passmail.com

**Project Maintainer:**
- GitHub: [@faahims-hims-victims](https://github.com/faahims-hims-victims)
- Organization: FAA HIMS Community Project

**Please DO NOT:**
- Open public GitHub issues for security vulnerabilities
- Disclose vulnerabilities publicly before we've had time to address them
- Exploit vulnerabilities for malicious purposes

### What to Include

When reporting a vulnerability, please provide:

1. **Build Number**: Check page footer for current build number, or note the date/time you accessed the site
2. **Description**: Clear explanation of the vulnerability
3. **Impact**: Potential security impact (data exposure, XSS, etc.)
4. **Steps to Reproduce**: Detailed reproduction steps
5. **Proof of Concept**: Code, screenshots, or video demonstration
6. **Suggested Fix**: If you have recommendations
7. **Your Contact Info**: So we can follow up with questions

### Example Report Format
```
**Build Number/Date Accessed:** Build #288 (or "Accessed on 11/18/2025 at 14:30 UTC")

**Vulnerability Type:** [XSS / CSRF / Data Exposure / etc.]

**Affected Component:** [Specific page or feature]

**Description:** 
[Clear explanation of the issue]

**Steps to Reproduce:**
1. Navigate to https://faahims.rehab/[page]
2. [Step-by-step instructions]
3. Observe [security issue]

**Impact:**
[What an attacker could do with this vulnerability]

**Suggested Fix:**
[Your recommendations, if any]

**Contact:**
[Your email or GitHub username]
```

## Response Timeline

We are committed to addressing security issues promptly:

| Timeline | Action |
| -------- | ------ |
| 24 hours | Initial acknowledgment of your report |
| 72 hours | Preliminary assessment and severity classification |
| 7 days | Patch development and testing (for critical issues) |
| Next build cycle | Patch deployment (within 6 hours for critical issues, or immediate manual trigger) |

**Severity Classification:**

- **Critical**: Immediate data exposure, authentication bypass
  - Response: Immediate manual build trigger (within 1-2 hours)
  - Fix timeline: 24-48 hours
  
- **High**: XSS, CSRF, significant security bypass
  - Response: Fix deployed in next scheduled build or manual trigger
  - Fix timeline: 7 days
  
- **Medium**: Limited security impact
  - Response: Fix deployed within next few build cycles
  - Fix timeline: 14 days
  
- **Low**: Minor issues, hardening opportunities
  - Response: Fix scheduled for upcoming maintenance window
  - Fix timeline: 30 days

**Automatic Patch Deployment:**
Once a fix is committed to the main branch, it will be automatically deployed in the next 6-hour build cycle (or immediately via manual trigger for critical issues).

## Disclosure Policy

### Coordinated Disclosure

We follow responsible disclosure practices:

1. **Private Notification**: We acknowledge your report privately within 24 hours
2. **Patch Development**: We develop and test a fix
3. **Patch Deployment**: We deploy the fix via GitHub Actions build
4. **Public Disclosure**: After 90 days OR when patch is deployed (whichever comes first), we:
   - Credit the reporter (with permission)
   - Publish details in our changelog
   - Update this SECURITY.md if necessary
   - Document in GitHub release notes

### Credit and Recognition

Security researchers who report valid vulnerabilities will be:
- Credited in our changelog (with permission)
- Acknowledged in our humans.txt file
- Recognized in GitHub release notes
- Listed in Hall of Fame below

## Scope

### In Scope

Security issues affecting:
- faahims.rehab website (static content)
- GitHub Actions workflows and CI/CD pipeline
- Content scraping scripts (privacy violations)
- Client-side JavaScript security
- HTTP security headers and configurations
- Build automation scripts (scripts/scrape-forum.js)
- Dependency vulnerabilities (package.json)

### Out of Scope

The following are outside our control:
- The external forum (hims-victims.freeforums.net) - report to ProBoards
- Third-party CDNs (Cloudflare, npm, etc.)
- GitHub platform vulnerabilities
- Social engineering attacks
- Denial of Service (DoS) attacks - these affect our CDN, not us directly
- Issues requiring physical access to maintainer devices
- Rate limiting or automated scraping of our site (we're public static content)

## Security Best Practices

### For Users

- Always access via HTTPS: `https://faahims.rehab`
- Verify the SSL certificate before entering sensitive info (though we don't collect any)
- Check build number in page footer to ensure you're viewing latest version
- Keep your browser updated
- Use strong passwords for the external forum (separate system)

### For Contributors

If you contribute code to this project:

- Review our Contributing Guidelines (CONTRIBUTING.md)
- Never commit secrets, API keys, or credentials
- Use `.gitignore` for sensitive local files
- Run security linters before submitting PRs
- Follow secure coding practices (input validation, output encoding)
- Test changes locally before pushing
- All PRs must pass automated security checks

## Known Security Considerations

### Current Limitations

We want to be transparent about known limitations:

1. **Static Site Only**: We have no backend database or user authentication
2. **External Forum**: User data is managed by ProBoards (hims-victims.freeforums.net)
3. **Public Content**: All scraped forum content is already publicly accessible
4. **No PII Collection**: We intentionally do not collect personally identifiable information
5. **Build Delays**: Non-critical fixes deploy within 6-hour window
6. **Forum Dependency**: Content quality depends on source forum availability

### Safe Zone Protection

We implement privacy-protecting measures:
- Forum "Safe Zone" content is never scraped or displayed
- Private/confidential board content is filtered via URL patterns
- Specific boards (/board/3/, /board/4/, /board/5/) are excluded
- No user tracking or analytics
- No cookies or local storage

## Automated Security

### GitHub Security Features

We utilize:
- **Dependabot**: Automated dependency updates for npm packages
- **Code Scanning**: Automated vulnerability detection via GitHub Advanced Security
- **Secret Scanning**: Prevents accidental credential commits
- **Branch Protection**: Requires reviews before merging to main

### Continuous Monitoring

- Build logs monitored for suspicious activity
- Deployment logs reviewed regularly
- GitHub Actions workflows use pinned, verified actions
- Automated build status notifications
- Performance and security reports generated per build

### Scheduled Builds

Our GitHub Actions workflow runs on schedule:
```yaml
schedule:
  - cron: '0 */6 * * *'  # Every 6 hours at 00:00, 06:00, 12:00, 18:00 UTC
```

This ensures:
- Regular content updates
- Automatic security patch deployment
- Dependency vulnerability fixes
- Fresh SEO content generation

## Versioning System

### Build Numbers

- **Format**: Sequential integers assigned by GitHub Actions
- **Source**: GitHub Actions `GITHUB_RUN_NUMBER` environment variable
- **Visibility**: Displayed on every page footer
- **Tracking**: Available in [GitHub Actions history](https://github.com/faahims-hims-victims/faahims.rehab/actions)

### Checking Current Version

**Option 1: Visit the site**
Navigate to https://faahims.rehab and scroll to the page footer to see:
```
Build #XXX • MM/DD/YYYY HH:MM UTC
```

**Option 2: Check sitemap**
View https://faahims.rehab/sitemap.xml and check the `<lastmod>` dates

**Option 3: Check RSS feed**
View https://faahims.rehab/feed.xml and check the `<pubDate>` field

**Option 4: GitHub Actions**
View the [latest workflow runs](https://github.com/faahims-hims-victims/faahims.rehab/actions) to see build history

## Contact Information

### Security Team

**Primary Security Contact:**
- Email: vulnerability.landline252 [at] passmail.com
- GitHub Security: [Create Advisory](https://github.com/faahims-hims-victims/faahims.rehab/security/advisories/new)

**Project Repository:**
- GitHub: https://github.com/faahims-hims-victims/faahims.rehab
- Organization: [@faahims-hims-victims](https://github.com/faahims-hims-victims)

**Live Site:**
- Production: https://faahims.rehab
- Status: Monitor via GitHub Actions or Cloudflare Pages

### General Questions

For non-security questions:
- [Open a GitHub Issue](https://github.com/faahims-hims-victims/faahims.rehab/issues)
- Visit [faahims.rehab](https://faahims.rehab)
- Community Forum: [hims-victims.freeforums.net](https://hims-victims.freeforums.net)

### Expected Response Times

- **Security Reports**: Acknowledged within 24 hours
- **GitHub Issues**: Responded to within 3-5 business days
- **General Inquiries**: Responded to within 7 days

## Updates to This Policy

This security policy may be updated periodically. Changes will be:
- Committed to this repository with descriptive commit messages
- Reflected in our changelog (CHANGELOG.md)
- Announced via GitHub releases
- Automatically deployed in next 6-hour build cycle

**Version History:**
- v1.0 (November 18, 2025): Initial security policy

---

## Acknowledgments

We thank the security research community for helping keep the FAA HIMS community safe. Responsible disclosure helps protect aviation professionals seeking medical certification support.

### Hall of Fame

**Security Researchers:**
*No vulnerabilities reported yet - be the first to responsibly disclose.*

When vulnerabilities are reported and fixed, we will credit researchers here (with permission):
- [Reporter Name] - [Vulnerability Type] - [Date]

---

## Additional Resources

- **GitHub Repository**: https://github.com/faahims-hims-victims/faahims.rehab
- **Build Status**: Check [GitHub Actions tab](https://github.com/faahims-hims-victims/faahims.rehab/actions) for latest build status
- **Deployment History**: View Cloudflare Pages dashboard (maintainers only)
- **Dependencies**: See [package.json](https://github.com/faahims-hims-victims/faahims.rehab/blob/main/package.json) for current dependency versions
- **Security Advisories**: View [published advisories](https://github.com/faahims-hims-victims/faahims.rehab/security/advisories) (if any)

---

**Remember:** If you see something, say something. We appreciate responsible disclosure and take all security reports seriously.

**Contact for vulnerabilities:** vulnerability.landline252 [at] passmail.com  
**Build frequency:** Every 6 hours automatically  
**Manual builds:** Available for critical security patches
