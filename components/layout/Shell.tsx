import { Sidebar } from "./Sidebar";
import { BottomNav } from "./BottomNav";

export function Shell({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <Sidebar />
            <main className="flex-1 pb-16 md:pb-0 relative overflow-y-auto h-screen">
                {children}
            </main>
            <BottomNav />
        </div>
    );
}
