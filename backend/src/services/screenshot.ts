import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SCREENSHOTS_DIR = path.join(__dirname, '../../screenshots')

if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true })
}

export async function capturePlayStoreScreenshot(playStoreUrl: string, appId: string): Promise<string> {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    try {
        const page = await browser.newPage()

        // mobile viewport
        await page.setViewport({ width: 390, height: 844 })
        await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1')

        await page.goto(playStoreUrl, { waitUntil: 'networkidle2', timeout: 30000 })

        // wait a bit for any lazy loaded content
        await new Promise(r => setTimeout(r, 2000))

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
        const fileName = `${appId}_${timestamp}.png`
        const filePath = path.join(SCREENSHOTS_DIR, fileName)

        await page.screenshot({
            path: filePath,
            fullPage: true
        })

        return fileName
    } finally {
        await browser.close()
    }
}
