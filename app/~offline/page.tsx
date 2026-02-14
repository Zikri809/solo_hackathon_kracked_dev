"use client";

import { WifiOff } from "lucide-react";

export default function OfflinePage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
            <div className="rounded-full bg-muted p-4">
                <WifiOff className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight">You're Offline</h1>
            <p className="mt-2 text-muted-foreground">
                Please check your internet connection and try again.
            </p>
            <button
                onClick={() => window.location.reload()}
                className="mt-6 rounded-full bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90"
            >
                Retry
            </button>
        </div>
    );
}
