import { Router } from 'express'
import { db } from '../db/index.js'
import { apps, screenshots } from '../db/schema.js'
import { eq, desc } from 'drizzle-orm'
import { capturePlayStoreScreenshot } from '../services/screenshot.js'

const router = Router()

router.get('/apps/:id/screenshots', async (req, res) => {
    try {
        const result = await db.select()
            .from(screenshots)
            .where(eq(screenshots.appId, req.params.id))
            .orderBy(desc(screenshots.takenAt))

        res.json(result)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch screenshots' })
    }
})

router.post('/apps/:id/screenshots', async (req, res) => {
    try {
        const appResult = await db.select().from(apps).where(eq(apps.id, req.params.id))
        if (appResult.length === 0) {
            return res.status(404).json({ error: 'App not found' })
        }

        const app = appResult[0]
        console.log(`Taking screenshot of ${app.name}...`)

        const fileName = await capturePlayStoreScreenshot(app.playStoreUrl, app.id)

        const result = await db.insert(screenshots).values({
            appId: app.id,
            fileName,
        }).returning()

        console.log(`Screenshot saved: ${fileName}`)
        res.status(201).json(result[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to capture screenshot' })
    }
})

export default router
