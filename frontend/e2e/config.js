module.exports = {
  baseUrl: 'http://localhost:3000',
  apiUrl: 'http://localhost:8000',
  selenium: {
    server: 'http://localhost:4444',
    capabilities: {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--headless',
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--window-size=1920,1080'
        ]
      }
    }
  },
  timeout: {
    implicit: 5000,
    pageLoad: 10000,
    script: 10000
  },
  viewport: {
    width: 1920,
    height: 1080
  }
}; 