import { Router } from 'express'
import { handleAsync } from '../utils/errors.js'
import * as screenshotService from '../services/screenshotService.js'

const router = Router()

router.get('/apps/:id/screenshots', handleAsync(async (req, res) => {
  const screenshots = await screenshotService.getScreenshotsByAppId(req.params.id)
  res.json(screenshots)
}))

router.post('/apps/:id/screenshots', handleAsync(async (req, res) => {
  const screenshot = await screenshotService.captureScreenshot(req.params.id)
  res.status(201).json(screenshot)
}))

export default router
