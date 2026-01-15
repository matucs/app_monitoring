import puppeteer from 'puppeteer'
import path from 'path'
import { SCREENSHOTS_DIR, ensureScreenshotsDir } from '../utils/files.js'
import { PUPPETEER_ARGS, VIEWPORT, USER_AGENT } from '../config/puppeteer.js'

ensureScreenshotsDir()

export async function capturePlayStoreScreenshot(playStoreUrl: string, appId: string): Promise<string> {
    let browser
    try {
        browser = await puppeteer.launch({
            headless: 'new',
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
            args: PUPPETEER_ARGS,
            timeout: 60000
        })

        const page = await browser.newPage()
        await page.setViewport(VIEWPORT)
        await page.setUserAgent(USER_AGENT)
        await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' })

        await page.goto(playStoreUrl, { 
            waitUntil: 'networkidle2', 
            timeout: 30000 
        }).catch(() => {
            console.warn('Network idle timeout, continuing anyway...')
        })
        
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

        await page.close()
        return fileName
    } catch (error: any) {
        console.error('Screenshot capture error:', error)
        throw new Error(`Failed to capture screenshot: ${error.message || 'Unknown error'}`)
    } finally {
        if (browser) {
            try {
                await browser.close()
            } catch (err) {
                console.error('Error closing browser:', err)
            }
        }
    }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
