import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AppList() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Tracked Apps</h1>
                <Button>Add App</Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>No apps yet</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Add your first app to start monitoring its Play Store listing.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
