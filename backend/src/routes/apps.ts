import { Router } from 'express'
import { handleAsync } from '../utils/errors.js'
import * as appService from '../services/appService.js'

const router = Router()

router.get('/', handleAsync(async (req, res) => {
    const allApps = await appService.getAllApps()
    res.json(allApps)
}))

router.get('/:id', handleAsync(async (req, res) => {
    const app = await appService.getAppById(req.params.id)
    res.json(app)
}))

router.post('/', handleAsync(async (req, res) => {
    const { url, name } = req.body
    if (!url) {
        return res.status(400).json({ error: 'url is required' })
    }
    const app = await appService.createApp(url, name)
    res.status(201).json(app)
}))

router.put('/:id', handleAsync(async (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ error: 'name is required' })
    }
    const app = await appService.updateApp(req.params.id, name)
    res.json(app)
}))

router.delete('/:id', handleAsync(async (req, res) => {
    await appService.deleteApp(req.params.id)
    res.json({ success: true })
}))

export default router
