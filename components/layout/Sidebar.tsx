import Link from "next/link";
import { Home, Map, AlertTriangle, User } from "lucide-react";

export function Sidebar() {
    return (
        <aside className="hidden w-64 flex-col border-r bg-sidebar px-4 py-6 md:flex text-sidebar-foreground">
            <div className="mb-8 px-2">
                <h1 className="text-2xl font-bold text-primary">TransitPulse</h1>
            </div>
            <nav className="flex flex-1 flex-col gap-2">
                <Link
                    href="/"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                    <Home className="h-5 w-5" />
                    Home
                </Link>
                <Link
                    href="/routes"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                    <Map className="h-5 w-5" />
                    Routes
                </Link>
                <Link
                    href="/alerts"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                    <AlertTriangle className="h-5 w-5" />
                    Alerts
                </Link>
                <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                    <User className="h-5 w-5" />
                    Profile
                </Link>
            </nav>
        </aside>
    );
}
