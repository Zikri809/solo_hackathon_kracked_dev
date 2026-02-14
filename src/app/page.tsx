
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Users, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center space-y-10 py-24 text-center md:py-32 lg:py-40 bg-gradient-to-b from-background to-muted/20">
        <div className="container flex flex-col items-center gap-6 px-4 md:px-6">
          <div className="space-y-4 max-w-[800px]">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 animate-in fade-in zoom-in duration-500">
              Komuniti<span className="text-foreground">Kita</span>
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              Community-driven price reporting. Join thousands of users tracking and sharing real-time grocery prices to help everyone save money.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Link href="/prices">
              <Button size="lg" className="h-12 px-8 text-base group">
                Browse Prices
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-12 md:py-24 lg:py-32">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 rounded-full bg-primary/10">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Real-Time Updates</h3>
            <p className="text-muted-foreground">
              Get the latest price information instantly. Our live feed ensures you never miss a deal or a price hike.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 rounded-full bg-primary/10">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Community Driven</h3>
            <p className="text-muted-foreground">
              Built by the people, for the people. Contribute prices from your local stores and help your neighbors save.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
            <div className="p-3 rounded-full bg-primary/10">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Smart Insights</h3>
            <p className="text-muted-foreground">
              Track price trends over time. Make informed decisions on when and where to buy your essentials.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
