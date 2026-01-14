import { Router } from 'express'

const router = Router()

// placeholder routes - will implement in step 2
router.get('/apps/:id/screenshots', async (req, res) => {
    res.json([])
})

router.post('/apps/:id/screenshots', async (req, res) => {
    res.status(501).json({ error: 'Not implemented yet' })
})

export default router
