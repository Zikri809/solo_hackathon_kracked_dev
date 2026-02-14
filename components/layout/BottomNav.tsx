import Link from "next/link";
import { Home, Map, AlertTriangle, User } from "lucide-react";

export function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background pb-safe md:hidden">
            <Link
                href="/"
                className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary"
            >
                <Home className="h-6 w-6" />
                <span className="text-xs">Home</span>
            </Link>
            <Link
                href="/routes"
                className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary"
            >
                <Map className="h-6 w-6" />
                <span className="text-xs">Routes</span>
            </Link>
            <Link
                href="/alerts"
                className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary"
            >
                <AlertTriangle className="h-6 w-6" />
                <span className="text-xs">Alerts</span>
            </Link>
            <Link
                href="/profile"
                className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-primary"
            >
                <User className="h-6 w-6" />
                <span className="text-xs">Profile</span>
            </Link>
        </nav>
    );
}
