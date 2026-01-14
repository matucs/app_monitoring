import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function AppMonitor() {
    const { id } = useParams()

    return (
        <div>
            <div className="mb-6">
                <Link to="/">
                    <Button variant="ghost">← Back to Apps</Button>
                </Link>
            </div>
            <h1 className="text-2xl font-bold mb-6">App Screenshots</h1>
            <Card>
                <CardContent className="py-8">
                    <p className="text-center text-muted-foreground">
                        No screenshots yet for app {id}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
