import cron from 'node-cron'
import { getAllApps } from './services/appService.js'
import { captureScreenshot } from './services/screenshotService.js'

const intervalHours = parseInt(process.env.SCREENSHOT_INTERVAL_HOURS || '6', 10)

export function startScheduler() {
    const cronExpression = `0 */${intervalHours} * * *`
    console.log(`Scheduler started: capturing screenshots every ${intervalHours} hours`)

    cron.schedule(cronExpression, async () => {
        console.log('Running scheduled screenshot capture...')
        await captureAllApps()
    })
}

async function captureAllApps() {
    try {
        const apps = await getAllApps()
        console.log(`Found ${apps.length} apps to capture`)

        for (const app of apps) {
            try {
                await captureScreenshot(app.id)
            } catch (err) {
                console.error(`Failed to capture ${app.name}:`, err)
            }
        }
    } catch (err) {
        console.error('Scheduler error:', err)
    }
}
