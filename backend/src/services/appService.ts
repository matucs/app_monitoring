import { db } from '../db/index.js'
import { apps, screenshots } from '../db/schema.js'
import { eq } from 'drizzle-orm'
import { extractPackageId } from '../utils/url.js'
import { deleteScreenshotFile } from '../utils/files.js'
import { AppError } from '../utils/errors.js'

export async function getAllApps() {
  return db.select().from(apps)
}

export async function getAppById(id: string) {
  const result = await db.select().from(apps).where(eq(apps.id, id))
  if (result.length === 0) {
    throw new AppError(404, 'App not found')
  }
  return result[0]
}

export async function createApp(url: string, name?: string) {
  const packageId = extractPackageId(url)
  if (!packageId) {
    throw new AppError(400, 'Invalid Play Store URL')
  }

  try {
    const result = await db.insert(apps).values({
      name: name || packageId,
      packageId,
      playStoreUrl: url,
    }).returning()
    return result[0]
  } catch (err: any) {
    if (err.code === '23505') {
      throw new AppError(409, 'App already exists')
    }
    throw err
  }
}

export async function updateApp(id: string, name: string) {
  const result = await db.update(apps)
    .set({ name })
    .where(eq(apps.id, id))
    .returning()

  if (result.length === 0) {
    throw new AppError(404, 'App not found')
  }
  return result[0]
}

export async function deleteApp(id: string) {
  const appScreenshots = await db.select()
    .from(screenshots)
    .where(eq(screenshots.appId, id))

  const result = await db.delete(apps)
    .where(eq(apps.id, id))
    .returning()

  if (result.length === 0) {
    throw new AppError(404, 'App not found')
  }

  for (const screenshot of appScreenshots) {
    try {
      deleteScreenshotFile(screenshot.fileName)
    } catch (err) {
      console.error(`Failed to delete ${screenshot.fileName}:`, err)
    }
  }

  return { success: true }
}
