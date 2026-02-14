import { PriceEntry } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Store, Scale } from 'lucide-react'
import { timeAgo } from '@/lib/utils'

interface PriceCardProps {
    entry: PriceEntry
    isLowest: boolean
}

export function PriceCard({ entry, isLowest }: PriceCardProps) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold line-clamp-1 pr-2" title={entry.product_name}>
                    {entry.product_name}
                </CardTitle>
                {isLowest && (
                    <Badge variant="secondary" className="bg-green-500/10 text-green-600 hover:bg-green-500/20 whitespace-nowrap">
                        Lowest
                    </Badge>
                )}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold mb-4 text-primary">RM {entry.price.toFixed(2)}</div>
                <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Scale className="h-4 w-4 shrink-0" />
                        <span>{entry.unit}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Store className="h-4 w-4 shrink-0" />
                        <span>{entry.store_name}</span>
                    </div>
                    {(entry.city || entry.state) && (
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 shrink-0" />
                            <span>
                                {entry.city}, {entry.state}
                            </span>
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="line-clamp-1" title={entry.location}>{entry.location}</span>
                    </div>
                    <div className="pt-4 text-xs text-right border-t mt-4">
                        {entry.created_at ? `Posted ${timeAgo(entry.created_at)}` : 'Posted recently'}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
