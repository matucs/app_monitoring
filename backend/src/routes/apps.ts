import { Router } from 'express'

const router = Router()

// placeholder routes - will implement in step 2
router.get('/', async (req, res) => {
    res.json([])
})

router.post('/', async (req, res) => {
    res.status(501).json({ error: 'Not implemented yet' })
})

router.put('/:id', async (req, res) => {
    res.status(501).json({ error: 'Not implemented yet' })
})

router.delete('/:id', async (req, res) => {
    res.status(501).json({ error: 'Not implemented yet' })
})

export default router
