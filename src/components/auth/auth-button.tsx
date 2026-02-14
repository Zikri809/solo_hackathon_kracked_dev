'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogIn, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/auth/auth-provider'
import { toast } from 'sonner'

export function AuthButton() {
    const { user, loading } = useAuth()
    const router = useRouter()

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            toast.success('Signed out successfully')
            router.refresh()
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error('Error signing out')
            }
        }
    }

    if (loading) {
        return (
            <Button variant="ghost" size="sm" disabled>
                Loading...
            </Button>
        )
    }

    if (user) {
        return (
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
            </Button>
        )
    }

    return (
        <Button variant="ghost" size="sm" asChild>
            <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
            </Link>
        </Button>
    )
}
