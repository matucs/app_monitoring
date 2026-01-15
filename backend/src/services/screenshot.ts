import puppeteer from 'puppeteer'
import path from 'path'
import { SCREENSHOTS_DIR, ensureScreenshotsDir } from '../utils/files.js'
import { PUPPETEER_ARGS, VIEWPORT, USER_AGENT } from '../config/puppeteer.js'

ensureScreenshotsDir()

export async function capturePlayStoreScreenshot(playStoreUrl: string, appId: string): Promise<string> {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
        args: PUPPETEER_ARGS
    })

    try {
        const page = await browser.newPage()
        await page.setViewport(VIEWPORT)
        await page.setUserAgent(USER_AGENT)
        await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' })

        await page.goto(playStoreUrl, { waitUntil: 'networkidle2', timeout: 30000 })
        await delay(2000)

        await page.evaluate(() => {
            const meta = document.createElement('meta')
            meta.name = 'viewport'
            meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
            document.head.appendChild(meta)
        })

        await delay(2000)
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2))
        await delay(1000)
        await page.evaluate(() => window.scrollTo(0, 0))
        await delay(1000)

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

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
