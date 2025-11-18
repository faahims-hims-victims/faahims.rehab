# Contributing to FAA HIMS Program Community

Thank you for your interest in contributing to the FAA HIMS Program Community project. This document outlines our contribution process and guidelines.

## Overview

This project serves as an educational resource and community gateway for aviation professionals navigating FAA HIMS program requirements and medical certification. We maintain strict quality control to ensure accuracy and protect user privacy.

## Contribution Policy

**All contributions require manual review and approval by project maintainers before publication.**

We appreciate community contributions, but due to the sensitive nature of aviation medical information and privacy concerns, we implement a thorough review process for all changes.

## Types of Contributions

We welcome the following types of contributions:

### Accepted Contributions

- **Bug Reports**: Issues with site functionality, broken links, or display problems
- **Security Vulnerabilities**: See our [Security Policy](SECURITY.md)
- **Content Corrections**: Factual errors or outdated information
- **SEO Improvements**: Suggestions for better search engine optimization
- **Documentation**: Improvements to README, guides, or technical documentation
- **Accessibility**: Improvements to make the site more accessible

### Restricted Contributions

The following require extensive vetting and may not be accepted:

- **Forum Content**: We automatically scrape from the source forum
- **Medical Advice**: Must be reviewed by qualified professionals
- **Legal Information**: Requires verification and disclaimers
- **User Data**: We do not accept any contributions containing personal information

## How to Contribute

### 1. Reporting Issues

**For Bugs or Content Issues:**

1. Check if the issue already exists in our [Issues](https://github.com/faahims-hims-victims/faahims.rehab/issues)
2. Create a new issue with:
   - **Title**: Clear, descriptive summary
   - **Description**: Detailed explanation of the problem
   - **Steps to Reproduce**: If applicable
   - **Build Number**: From page footer (e.g., Build #288)
   - **Screenshots**: If relevant
   - **Expected Behavior**: What should happen
   - **Actual Behavior**: What actually happens

**For Security Issues:**

Do NOT create a public issue. Follow our [Security Policy](SECURITY.md) and report to:
- Email: vulnerability.landline252 [at] passmail.com
- GitHub Security Advisory (preferred)

### 2. Suggesting Changes

**Small Changes (Typos, Links, Minor Corrections):**

1. Open an issue describing the change
2. Wait for maintainer approval before proceeding
3. If approved, you may submit a pull request

**Large Changes (New Features, Major Rewrites):**

1. Open an issue describing your proposal in detail
2. Wait for discussion and maintainer approval
3. Maintainers will determine if external contributions are appropriate
4. If approved, follow the pull request process

### 3. Pull Request Process

**Before Submitting:**

- Ensure your changes align with project goals
- Test locally to verify functionality
- Review our code standards (see below)
- Obtain prior approval via an issue discussion

**Submitting a Pull Request:**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages: `git commit -m "Fix: Description of fix"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Open a Pull Request with:
   - **Title**: Clear description of changes
   - **Description**: Detailed explanation of what and why
   - **Related Issue**: Link to the approved issue
   - **Testing**: How you tested the changes
   - **Build Number**: Note if this affects specific build

**Pull Request Review:**

- All PRs require manual review by maintainers
- Maintainers may request changes or clarifications
- PRs may be rejected if they don't align with project goals
- Average review time: 3-7 business days
- Complex PRs may take longer

**Approval Process:**

1. Maintainer reviews code and tests locally
2. Maintainer may request changes
3. Once approved, maintainer will merge
4. Changes deploy in next 6-hour build cycle

## Code Standards

### General Guidelines

- **Clarity**: Code should be readable and well-commented
- **Security**: Follow secure coding practices
- **Privacy**: Never expose user data or private information
- **Performance**: Optimize for fast load times
- **Accessibility**: Follow WCAG 2.1 AA standards

### JavaScript

- Use modern ES6+ syntax
- Avoid inline scripts when possible
- No external dependencies without approval
- Comment complex logic

### HTML/CSS

- Semantic HTML5 elements
- Mobile-first responsive design
- Follow existing styling conventions
- Maintain accessibility attributes

### Content

- Professional tone, no emoticons
- Accurate aviation medical terminology
- Include citations for medical/legal claims
- Respect Safe Zone privacy protections

## Content Guidelines

### What We Accept

- Corrections to factual errors
- Updates to outdated information
- Improved clarity or readability
- Better SEO optimization
- Accessibility improvements

### What We Reject

- Medical advice without verification
- Legal advice without qualification
- Personal anecdotes or testimonials
- Promotional or commercial content
- Speculative or unverified claims
- Content that violates Safe Zone privacy

## Privacy and Safe Zones

**Critical Rule:** Never contribute content that:

- Contains personally identifiable information (PII)
- Reveals Safe Zone forum content
- Exposes private discussions or confidential information
- Could identify individual pilots or medical professionals
- Violates forum privacy policies

Our scraper automatically filters:
- `/board/3/`, `/board/4/`, `/board/5/` (Safe Zone boards)
- `/private/`, `/confidential/`, `/admin/`

## Testing Requirements

Before submitting a PR, test:

1. **Local Build**: Run `npm install` and test locally
2. **Cross-Browser**: Test in Chrome, Firefox, Safari, Edge
3. **Mobile**: Test on mobile devices or responsive mode
4. **Accessibility**: Run accessibility checker
5. **Performance**: Check Core Web Vitals
6. **Links**: Verify all links work

## Build and Deployment

- **Automated Builds**: Every 6 hours (00:00, 06:00, 12:00, 18:00 UTC)
- **Manual Builds**: Maintainers can trigger for urgent fixes
- **Deployment**: Via GitHub Actions to Cloudflare Pages
- **No Direct Access**: Contributors cannot deploy directly

## Commit Message Format

Use clear, descriptive commit messages:
```
Type: Brief description

Detailed explanation if needed

Fixes #issue-number
```

**Types:**
- `Fix:` Bug fixes
- `Feature:` New features
- `Update:` Content updates
- `Security:` Security patches
- `SEO:` SEO improvements
- `Docs:` Documentation changes
- `Style:` CSS/design changes
- `Refactor:` Code refactoring

**Examples:**
```
Fix: Correct broken link in FAQ page

The HIMS AME directory link was pointing to the wrong URL.
Updated to point to correct page.

Fixes #42
```
```
Update: Add 2025 HIMS program requirements

Updated requirements page with latest FAA guidance from
January 2025. Added new monitoring protocols.

Fixes #38
```

## Code Review Checklist

Maintainers will check:

- [ ] Code follows project standards
- [ ] No security vulnerabilities introduced
- [ ] No PII or private information exposed
- [ ] Tests pass locally
- [ ] No breaking changes
- [ ] Documentation updated if needed
- [ ] Commit messages are clear
- [ ] Related issue exists and is referenced

## What Happens After Submission

1. **Acknowledgment**: We'll acknowledge your PR within 3-5 business days
2. **Review**: Maintainer reviews code and tests locally
3. **Feedback**: You may receive requests for changes
4. **Decision**: PR will be approved, revised, or rejected
5. **Merge**: If approved, maintainer merges to main branch
6. **Deploy**: Changes go live in next 6-hour build cycle

## Maintainer Rights

Project maintainers reserve the right to:

- Reject any contribution for any reason
- Request changes before acceptance
- Close issues or PRs that don't follow guidelines
- Modify accepted contributions before merging
- Remove contributors who violate guidelines

## Recognition

Contributors who have their PRs accepted will be:

- Credited in the commit history
- Listed in humans.txt (with permission)
- Acknowledged in release notes for significant contributions

## Questions?

- **General Questions**: [Open an Issue](https://github.com/faahims-hims-victims/faahims.rehab/issues)
- **Security Questions**: See [Security Policy](SECURITY.md)
- **Project Discussion**: Comment on existing issues

## Project Scope

This project focuses on:

- Providing accurate FAA HIMS program information
- Serving as a gateway to the community forum
- SEO-optimized content for pilots seeking information
- Regular content updates from the forum (automated)

We do NOT accept contributions for:

- Forum management (handled by ProBoards)
- User authentication or accounts (we don't have any)
- Database or backend changes (static site only)
- Major architectural changes without prior approval

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (to be determined).

## Code of Conduct

### Expected Behavior

- Be respectful and professional
- Focus on constructive feedback
- Respect maintainer decisions
- Protect user privacy
- Provide accurate information

### Unacceptable Behavior

- Harassment or discrimination
- Sharing private information
- Spam or promotional content
- Malicious code or security exploits
- Repeatedly ignoring maintainer feedback

## Contact

- **GitHub Issues**: For bugs and feature requests
- **Security**: vulnerability.landline252 [at] passmail.com
- **Project**: [@faahims-hims-victims](https://github.com/faahims-hims-victims)

---

**Thank you for helping improve the FAA HIMS Program Community!**

**Remember:** All contributions require manual approval. We appreciate your patience during the review process.

**Last Updated:** November 18, 2025  
**Version:** 1.0
