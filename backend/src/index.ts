import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import appsRouter from './routes/apps.js'
import screenshotsRouter from './routes/screenshots.js'
import { errorHandler } from './utils/errors.js'
import { startScheduler } from './scheduler.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use('/screenshots', express.static('screenshots'))

app.use('/api/apps', appsRouter)
app.use('/api', screenshotsRouter)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  startScheduler()
})
