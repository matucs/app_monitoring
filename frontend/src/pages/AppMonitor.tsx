import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScreenshotSkeleton } from '@/components/Skeleton'
import { useToast } from '@/components/Toast'
import { getApp, getScreenshots, captureScreenshot } from '@/lib/api'
import type { App, Screenshot } from '@/types'
import { Camera, ArrowLeft } from 'lucide-react'

export default function AppMonitor() {
    const { id } = useParams<{ id: string }>()
    const [app, setApp] = useState<App | null>(null)
    const [screenshots, setScreenshots] = useState<Screenshot[]>([])
    const [loading, setLoading] = useState(true)
    const [capturing, setCapturing] = useState(false)
    const { showToast } = useToast()

    useEffect(() => {
        if (id) loadData()
    }, [id])

    async function loadData() {
        try {
            const [appData, screenshotsData] = await Promise.all([
                getApp(id!),
                getScreenshots(id!),
            ])
            setApp(appData)
            setScreenshots(screenshotsData)
        } catch (err) {
            showToast('Failed to load app data')
        } finally {
            setLoading(false)
        }
    }

    async function handleCapture() {
        if (!id) return
        setCapturing(true)
        try {
            await captureScreenshot(id)
            showToast('Screenshot captured', 'success')
            const data = await getScreenshots(id)
            setScreenshots(data)
        } catch (err) {
            showToast('Failed to capture screenshot')
        } finally {
            setCapturing(false)
        }
    }

    function formatDate(dateStr: string) {
        return new Date(dateStr).toLocaleString()
    }

    if (loading) {
        return (
            <div>
                <div className="mb-6">
                    <Link to="/">
                        <Button variant="ghost" className="gap-2">
                            <ArrowLeft className="h-4 w-4" /> Back to Apps
                        </Button>
                    </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <ScreenshotSkeleton />
                    <ScreenshotSkeleton />
                    <ScreenshotSkeleton />
                </div>
            </div>
        )
    }

    if (!app) {
        return (
            <div>
                <div className="mb-6">
                    <Link to="/">
                        <Button variant="ghost" className="gap-2">
                            <ArrowLeft className="h-4 w-4" /> Back to Apps
                        </Button>
                    </Link>
                </div>
                <Card>
                    <CardContent className="py-8 text-center">
                        <p className="text-muted-foreground">App not found</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div>
            <div className="mb-6">
                <Link to="/">
                    <Button variant="ghost" className="gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back to Apps
                    </Button>
                </Link>
            </div>

            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl font-bold">{app.name}</h1>
                    <p className="text-muted-foreground">{app.packageId}</p>
                </div>
                <Button onClick={handleCapture} disabled={capturing} className="gap-2">
                    <Camera className="h-4 w-4" />
                    {capturing ? 'Capturing...' : 'Capture Now'}
                </Button>
            </div>

            {screenshots.length === 0 ? (
                <Card>
                    <CardContent className="py-8 text-center">
                        <p className="text-muted-foreground">
                            No screenshots yet. Click "Capture Now" to take the first one.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {screenshots.map((screenshot) => (
                        <Card key={screenshot.id} className="overflow-hidden">
                            <div className="p-3 border-b bg-muted/50">
                                <p className="text-sm font-medium">{formatDate(screenshot.takenAt)}</p>
                            </div>
                            <a
                                href={`/screenshots/${screenshot.fileName}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={`/screenshots/${screenshot.fileName}`}
                                    alt={`Screenshot from ${formatDate(screenshot.takenAt)}`}
                                    className="w-full h-auto"
                                />
                            </a>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
