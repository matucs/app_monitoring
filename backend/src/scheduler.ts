import cron from 'node-cron'
import { db } from '../db/index.js'
import { apps, screenshots } from '../db/schema.js'
import { capturePlayStoreScreenshot } from '../services/screenshot.js'

const intervalHours = parseInt(process.env.SCREENSHOT_INTERVAL_HOURS || '6', 10)

export function startScheduler() {
    // run every N hours
    const cronExpression = `0 */${intervalHours} * * *`

    console.log(`Scheduler started: capturing screenshots every ${intervalHours} hours`)

    cron.schedule(cronExpression, async () => {
        console.log('Running scheduled screenshot capture...')
        await captureAllApps()
    })
}

export async function captureAllApps() {
    try {
        const allApps = await db.select().from(apps)
        console.log(`Found ${allApps.length} apps to capture`)

        for (const app of allApps) {
            try {
                console.log(`Capturing ${app.name}...`)
                const fileName = await capturePlayStoreScreenshot(app.playStoreUrl, app.id)

                await db.insert(screenshots).values({
                    appId: app.id,
                    fileName,
                })

                console.log(`Done: ${fileName}`)
            } catch (err) {
                console.error(`Failed to capture ${app.name}:`, err)
            }
        }
    } catch (err) {
        console.error('Scheduler error:', err)
    }
}
