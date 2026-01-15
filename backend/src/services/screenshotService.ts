import { db } from '../db/index.js'
import { screenshots } from '../db/schema.js'
import { eq, desc } from 'drizzle-orm'
import { capturePlayStoreScreenshot } from './screenshot.js'
import { getAppById } from './appService.js'
import { AppError } from '../utils/errors.js'

export async function getScreenshotsByAppId(appId: string) {
    return db.select()
        .from(screenshots)
        .where(eq(screenshots.appId, appId))
        .orderBy(desc(screenshots.takenAt))
}

export async function captureScreenshot(appId: string) {
    const app = await getAppById(appId)
    console.log(`Capturing screenshot for ${app.name}...`)

    const fileName = await capturePlayStoreScreenshot(app.playStoreUrl, app.id)
    const result = await db.insert(screenshots).values({
        appId: app.id,
        fileName,
    }).returning()

    console.log(`Screenshot saved: ${fileName}`)
    return result[0]
}
