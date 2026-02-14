'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Bus, Map as MapIcon, TriangleAlert, User, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuthButton } from '@/components/auth/auth-button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const navigation = [
    { name: 'Home', href: '/', icon: Bus },
    { name: 'Live Map', href: '/map', icon: MapIcon },
    { name: 'Prices', href: '/prices', icon: DollarSign },
]

export function Header() {
    const pathname = usePathname()

    return (
        <header className="px-4 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                        <Bus className="h-6 w-6" />
                        <span>KomunitiKita</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 ml-6">
                        {navigation.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex">
                        <AuthButton />
                    </div>

                    <div className="md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {navigation.map((item) => (
                                    <DropdownMenuItem key={item.href} asChild>
                                        <Link href={item.href} className="flex items-center gap-2 w-full cursor-pointer">
                                            <item.icon className="h-4 w-4" />
                                            {item.name}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                                <div className="border-t my-1" />
                                <div className="p-2">
                                    <AuthButton />
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    )
}
