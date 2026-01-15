import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const SCREENSHOTS_DIR = path.join(__dirname, '../../screenshots')

export function ensureScreenshotsDir() {
    if (!fs.existsSync(SCREENSHOTS_DIR)) {
        fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true })
    }
}

export function deleteScreenshotFile(fileName: string) {
    const filePath = path.join(SCREENSHOTS_DIR, fileName)
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
    }
}
