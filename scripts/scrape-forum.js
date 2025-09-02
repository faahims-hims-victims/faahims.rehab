const https = require('https');
const http = require('http');
const { URL, URLSearchParams } = require('url');
const fs = require('fs');

class SOCKS5ProBoardsScraper {
  constructor() {
    this.cookies = '';
    this.baseUrl = 'https://hims-victims.freeforums.net';
    this.proxyConfig = null;
  }

  setSOCKS5Proxy(proxyUrl) {
    // Parse SOCKS5 URL: socks5://username:password@host:port
    const match = proxyUrl.match(/socks5:\/\/([^:]+):([^@]+)@([^:]+):(\d+)/);
    if (match) {
      this.proxyConfig = {
        username: match[1],
        password: match[2],
        host: match[3],
        port: parseInt(match[4]),
        type: 'socks5'
      };
      console.log(`✓ SOCKS5 proxy configured: ${this.proxyConfig.host}:${this.proxyConfig.port}`);
      return true;
    } else {
      console.error('❌ Invalid SOCKS5 proxy format');
      return false;
    }
  }

  async makeSOCKS5Request(url, options = {}) {
    // For SOCKS5, we'll use curl via child_process as a workaround
    // since Node.js doesn't have native SOCKS5 support without additional packages
    const { exec } = require('child_process');
    
    return new Promise((resolve, reject) => {
      const method = options.method || 'GET';
      const headers = options.headers || {};
      
      // Build curl command with SOCKS5 proxy
      let curlCmd = [
        'curl',
        '-s', // silent
        '-L', // follow redirects
        '--max-redirs', '5',
        '--connect-timeout', '30',
        '--max-time', '60',
        `--socks5-hostname`, `${this.proxyConfig.host}:${this.proxyConfig.port}`,
        `--proxy-user`, `${this.proxyConfig.username}:${this.proxyConfig.password}`,
        '-X', method
      ];

      // Add headers
      Object.entries(headers).forEach(([key, value]) => {
        curlCmd.push('-H', `"${key}: ${value}"`);
      });

      // Add cookies if present
      if (this.cookies) {
        curlCmd.push('-H', `"Cookie: ${this.cookies}"`);
      }

      // Add body data for POST
      if (options.body) {
        curlCmd.push('--data', `"${options.body}"`);
      }

      // Add URL
      curlCmd.push(`"${url}"`);

      // Include response headers to capture cookies
      curlCmd.push('-i'); // include headers in output

      const fullCommand = curlCmd.join(' ');
      console.log(`🔄 SOCKS5 request: ${method} ${url}`);

      exec(fullCommand, { maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`SOCKS5 request failed: ${error.message}`));
          return;
        }

        // Parse response headers and body
        const [headersPart, ...bodyParts] = stdout.split('\r\n\r\n');
        const body = bodyParts.join('\r\n\r\n');
        
        // Extract and store cookies from headers
        const cookieMatches = headersPart.match(/Set-Cookie: ([^;\r\n]+)/gi);
        if (cookieMatches) {
          const newCookies = cookieMatches.map(match => match.replace(/Set-Cookie: /i, '')).join('; ');
          this.cookies = this.cookies ? `${this.cookies}; ${newCookies}` : newCookies;
        }

        resolve(body);
      });
    });
  }

  async fetchPage(url, options = {}) {
    if (this.proxyConfig && this.proxyConfig.type === 'socks5') {
      return this.makeSOCKS5Request(url, options);
    } else {
      // Fallback to direct HTTPS (your original method)
      return this.makeDirectRequest(url, options);
    }
  }

  async makeDirectRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);
      
      const requestOptions = {
        hostname: urlObj.hostname,
        port: urlObj.port || 443,
        path: urlObj.pathname + urlObj.search,
        method: options.method || 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Cookie': this.cookies,
          ...options.headers
        }
      };

      const req = https.request(requestOptions, (res) => {
        if (res.headers['set-cookie']) {
          const newCookies = res.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join('; ');
          this.cookies = this.cookies ? `${this.cookies}; ${newCookies}` : newCookies;
        }

        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      });

      if (options.body) {
        req.write(options.body);
      }
      
      req.on('error', reject);
      req.end();
    });
  }

  async postData(url, data) {
    return this.fetchPage(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data),
        'Referer': this.baseUrl
      },
      body: data
    });
  }

  async login(username, password) {
    console.log('Logging into ProBoards forum...');
    
    try {
      const loginPageUrl = `${this.baseUrl}/login`;
      const loginPage = await this.fetchPage(loginPageUrl);
      
      const tokenMatch = loginPage.match(/name="token" value="([^"]+)"/);
      const token = tokenMatch ? tokenMatch[1] : '';
      
      const loginData = new URLSearchParams({
        username: username,
        password: password,
        token: token,
        submit: 'Login'
      });

      const loginResponse = await this.postData(`${this.baseUrl}/login/authenticate`, loginData.toString());
      
      if (this.cookies.includes('pb_session') || 
          loginResponse.includes('location.href') ||
          !loginResponse.includes('Invalid')) {
        console.log('✓ Login successful via SOCKS5');
        return true;
      } else {
        console.log('✗ Login failed');
        return false;
      }
      
    } catch (error) {
      console.error('Login error:', error.message);
      return false;
    }
  }
}

// [Rest of the createSEOOptimizedPage and other functions remain the same as before]

async function main() {
  const scraper = new SOCKS5ProBoardsScraper();
  
  // Get credentials
  const username = process.env.FORUM_USERNAME;
  const password = process.env.FORUM_PASSWORD;
  const proxyUrl = process.env.PROXY_URL; // Your full SOCKS5 URL
  
  if (!username || !password) {
    console.error('❌ Missing forum credentials');
    process.exit(1);
  }

  // Set up SOCKS5 proxy
  if (proxyUrl) {
    const proxySet = scraper.setSOCKS5Proxy(proxyUrl);
    if (!proxySet) {
      console.error('❌ Failed to configure proxy');
      process.exit(1);
    }
  }

  // Login and scrape...
  const loginSuccess = await scraper.login(username, password);
  if (!loginSuccess) {
    console.error('❌ Authentication failed');
    process.exit(1);
  }

  // [Rest of scraping logic...]
}

main().catch(console.error);
