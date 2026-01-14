import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { CardSkeleton } from '@/components/Skeleton'
import { useToast } from '@/components/Toast'
import { getApps, createApp, updateApp, deleteApp } from '@/lib/api'
import type { App } from '@/types'
import { Pencil, Trash2, Eye } from 'lucide-react'

export default function AppList() {
    const [apps, setApps] = useState<App[]>([])
    const [loading, setLoading] = useState(true)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingApp, setEditingApp] = useState<App | null>(null)
    const [url, setUrl] = useState('')
    const [name, setName] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const { showToast } = useToast()

    useEffect(() => {
        loadApps()
    }, [])

    async function loadApps() {
        try {
            const data = await getApps()
            setApps(data)
        } catch (err) {
            showToast('Failed to load apps')
        } finally {
            setLoading(false)
        }
    }

    function openAddDialog() {
        setEditingApp(null)
        setUrl('')
        setName('')
        setError('')
        setDialogOpen(true)
    }

    function openEditDialog(app: App) {
        setEditingApp(app)
        setUrl(app.playStoreUrl)
        setName(app.name)
        setError('')
        setDialogOpen(true)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        setSubmitting(true)
        try {
            if (editingApp) {
                await updateApp(editingApp.id, name)
                showToast('App updated', 'success')
            } else {
                await createApp(url, name || undefined)
                showToast('App added', 'success')
            }
            setDialogOpen(false)
            loadApps()
        } catch (err: any) {
            const msg = err.response?.data?.error || 'Failed to save'
            setError(msg)
        } finally {
            setSubmitting(false)
        }
    }

    async function handleDelete(app: App) {
        if (!confirm(`Delete ${app.name}?`)) return
        try {
            await deleteApp(app.id)
            showToast('App deleted', 'success')
            loadApps()
        } catch (err) {
            showToast('Failed to delete app')
        }
    }

    if (loading) {
        return (
            <div className="space-y-3">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Tracked Apps</h1>
                </div>
                <CardSkeleton />
                <CardSkeleton />
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Tracked Apps</h1>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={openAddDialog}>Add App</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingApp ? 'Edit App' : 'Add New App'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
                                    {error}
                                </div>
                            )}
                            {!editingApp && (
                                <div>
                                    <label className="block text-sm font-medium mb-1">Play Store URL</label>
                                    <Input
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="https://play.google.com/store/apps/details?id=..."
                                        required
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium mb-1">App Name (optional)</label>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="My App"
                                />
                            </div>
                            <Button type="submit" disabled={submitting} className="w-full">
                                {submitting ? 'Saving...' : (editingApp ? 'Update' : 'Add App')}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {apps.length === 0 ? (
                <Card>
                    <CardContent className="py-8 text-center">
                        <p className="text-muted-foreground">
                            No apps yet. Add your first app to start monitoring.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-3">
                    {apps.map((app) => (
                        <Card key={app.id}>
                            <CardContent className="py-4 flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium">{app.name}</h3>
                                    <p className="text-sm text-muted-foreground">{app.packageId}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Link to={`/apps/${app.id}`}>
                                        <Button variant="outline" size="icon">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button variant="outline" size="icon" onClick={() => openEditDialog(app)}>
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={() => handleDelete(app)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
