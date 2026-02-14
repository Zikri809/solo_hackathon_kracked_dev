'use client'

import { usePrices } from '@/hooks/usePrices'
import { PriceCard } from '@/components/prices/PriceCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useMemo, useState } from 'react'
import { useAuth } from '@/components/auth/auth-provider'
import { Button } from '@/components/ui/button'
import { Plus, Filter, X } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { SubmitPriceForm } from '@/components/prices/SubmitPriceForm'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { MALAYSIA_LOCATIONS, State } from '@/lib/locations'

export default function PricesPage() {
    const { prices, isLoading, error } = usePrices()
    const { user } = useAuth()
    const [open, setOpen] = useState(false)
    const [selectedState, setSelectedState] = useState<State | "all">("all")
    const [selectedCity, setSelectedCity] = useState<string | "all">("all")

    const filteredPrices = useMemo(() => {
        return prices.filter(p => {
            if (selectedState !== "all" && p.state !== selectedState) return false
            if (selectedCity !== "all" && p.city !== selectedCity) return false
            return true
        })
    }, [prices, selectedState, selectedCity])

    const lowestPrices = useMemo(() => {
        const minPrices: Record<string, number> = {}
        filteredPrices.forEach(p => {
            if (minPrices[p.product_name] === undefined || p.price < minPrices[p.product_name]) {
                minPrices[p.product_name] = p.price
            }
        })
        return minPrices
    }, [filteredPrices])

    const availableCities = useMemo(() => {
        if (selectedState === "all") return []
        return MALAYSIA_LOCATIONS[selectedState as State] || []
    }, [selectedState])

    const handleStateChange = (value: string) => {
        setSelectedState(value as State | "all")
        setSelectedCity("all")
    }

    if (isLoading) {
        return (
            <div className="container py-8 px-4">
                <h1 className="text-3xl font-bold mb-6">Live Grocery Prices</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex flex-col space-y-3">
                            <Skeleton className="h-[125px] w-full rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container py-8 text-center text-red-500">
                Error loading prices: {(error as Error).message}
            </div>
        )
    }

    return (
        <div className="container py-8 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold">Live Grocery Prices</h1>

                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <Select value={selectedState} onValueChange={handleStateChange}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="All States" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All States</SelectItem>
                            {Object.keys(MALAYSIA_LOCATIONS).map((state) => (
                                <SelectItem key={state} value={state}>
                                    {state}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={selectedCity}
                        onValueChange={setSelectedCity}
                        disabled={selectedState === "all"}
                    >
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="All Cities" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Cities</SelectItem>
                            {availableCities.map((city) => (
                                <SelectItem key={city} value={city}>
                                    {city}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {user && (
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Price
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Submit New Price</DialogTitle>
                                </DialogHeader>
                                <SubmitPriceForm onSuccess={() => setOpen(false)} />
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>

            {filteredPrices.length === 0 ? (
                <div className="text-center py-20 bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground text-lg">No price entries found.</p>
                    {(selectedState !== "all" || selectedCity !== "all") && (
                        <Button
                            variant="link"
                            onClick={() => {
                                setSelectedState("all")
                                setSelectedCity("all")
                            }}
                            className="mt-2"
                        >
                            Clear Filters
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredPrices.map((entry) => (
                        <PriceCard
                            key={entry.id}
                            entry={entry}
                            isLowest={entry.price === lowestPrices[entry.product_name]}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
