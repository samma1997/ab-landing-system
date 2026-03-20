import scrape from 'website-scraper'
import PuppeteerPlugin from 'website-scraper-puppeteer'

const url = process.argv[2] || 'https://lp.alfiobardolla.com/early-birds/'
const siteName = new URL(url).hostname.replace(/^www\./, '')
const pageName = new URL(url).pathname.replace(/\//g, '_').replace(/^_|_$/g, '') || 'home'
const OUT = `/Users/mac/Projects/ab-landing-system/reference/${siteName}_${pageName}`

console.log(`\n🔍 Scraping: ${url}`)
console.log(`📁 Output: ${OUT}\n`)

try {
  const result = await scrape({
    urls: [url],
    directory: OUT,
    recursive: false,
    maxDepth: 1,
    requestConcurrency: 5,
    urlFilter: (u) => {
      try {
        const host = new URL(u).hostname
        return host.includes('alfiobardolla')
          || host.includes('wp-content')
          || host.includes('fonts.googleapis.com')
          || host.includes('fonts.gstatic.com')
          || host.includes('elementor')
      } catch { return false }
    },
    sources: [
      { selector: 'img', attr: 'src' },
      { selector: 'img', attr: 'srcset' },
      { selector: 'link[rel="stylesheet"]', attr: 'href' },
      { selector: 'script', attr: 'src' },
      { selector: 'video source', attr: 'src' },
      { selector: 'video', attr: 'src' },
      { selector: 'video', attr: 'poster' },
      { selector: 'link[rel="icon"]', attr: 'href' },
      { selector: 'link[rel="preload"]', attr: 'href' },
      { selector: 'source', attr: 'src' },
      { selector: 'source', attr: 'srcset' },
    ],
    plugins: [
      new PuppeteerPlugin({
        launchOptions: {
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
        scrollToBottom: {
          timeout: 20000,
          viewportN: 10,
        },
        blockNavigation: false,
      }),
    ],
  })

  console.log(`\n✅ Done! Scraped ${result.length} page(s)`)
  console.log(`📁 Files saved to: ${OUT}`)
} catch (err) {
  console.error('❌ Error:', err.message)
  process.exit(1)
}
