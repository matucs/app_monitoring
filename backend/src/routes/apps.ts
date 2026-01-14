import { Router } from 'express'
import { db } from '../db/index.js'
import { apps } from '../db/schema.js'
import { eq } from 'drizzle-orm'

const router = Router()

function extractPackageId(url: string): string | null {
    const match = url.match(/id=([a-zA-Z0-9._]+)/)
    return match ? match[1] : null
}

router.get('/', async (req, res) => {
    try {
        const allApps = await db.select().from(apps)
        res.json(allApps)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch apps' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const result = await db.select().from(apps).where(eq(apps.id, req.params.id))
        if (result.length === 0) {
            return res.status(404).json({ error: 'App not found' })
        }
        res.json(result[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch app' })
    }
})

router.post('/', async (req, res) => {
    try {
        const { url, name } = req.body
        if (!url) {
            return res.status(400).json({ error: 'url is required' })
        }

        const packageId = extractPackageId(url)
        if (!packageId) {
            return res.status(400).json({ error: 'Invalid Play Store URL' })
        }

        const appName = name || packageId

        const result = await db.insert(apps).values({
            name: appName,
            packageId,
            playStoreUrl: url,
        }).returning()

        res.status(201).json(result[0])
    } catch (err: any) {
        console.error(err)
        if (err.code === '23505') {
            return res.status(409).json({ error: 'App already exists' })
        }
        res.status(500).json({ error: 'Failed to create app' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(400).json({ error: 'name is required' })
        }

        const result = await db.update(apps)
            .set({ name })
            .where(eq(apps.id, req.params.id))
            .returning()

        if (result.length === 0) {
            return res.status(404).json({ error: 'App not found' })
        }

        res.json(result[0])
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to update app' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const result = await db.delete(apps)
            .where(eq(apps.id, req.params.id))
            .returning()

        if (result.length === 0) {
            return res.status(404).json({ error: 'App not found' })
        }

        res.json({ success: true })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to delete app' })
    }
})

export default router
