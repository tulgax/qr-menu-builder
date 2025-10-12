import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { QrCode, Smartphone, Zap, ArrowRight, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
              <QrCode className="size-5" />
            </div>
            QR Menu Builder
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 mb-20">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Digital Menus Made
              <br />
              <span className="text-primary">Simple</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform your restaurant with beautiful, contactless digital menus. 
              No apps required - just scan and order.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8 h-12">
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 h-12">
                Sign In
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>No app required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Mobile optimized</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-20">
          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <QrCode className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Generate QR Codes</CardTitle>
              <CardDescription className="text-base">
                Create instant QR codes for your menu. Print and place them anywhere.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Mobile-First Design</CardTitle>
              <CardDescription className="text-base">
                Beautiful, responsive menus that look great on any device.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Update in Real-Time</CardTitle>
              <CardDescription className="text-base">
                Change prices, add items, or update descriptions instantly. No reprinting needed.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="bg-card rounded-xl p-8 md:p-12 border shadow-sm">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get your digital menu up and running in just 4 simple steps
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center space-y-4">
              <div className="rounded-full bg-primary text-primary-foreground h-14 w-14 flex items-center justify-center text-xl font-bold mx-auto shadow-lg">
                1
              </div>
              <h3 className="font-semibold text-lg">Sign Up</h3>
              <p className="text-muted-foreground">
                Create your free account in seconds
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="rounded-full bg-primary text-primary-foreground h-14 w-14 flex items-center justify-center text-xl font-bold mx-auto shadow-lg">
                2
              </div>
              <h3 className="font-semibold text-lg">Build Your Menu</h3>
              <p className="text-muted-foreground">
                Add categories and menu items with photos and prices
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="rounded-full bg-primary text-primary-foreground h-14 w-14 flex items-center justify-center text-xl font-bold mx-auto shadow-lg">
                3
              </div>
              <h3 className="font-semibold text-lg">Download QR Code</h3>
              <p className="text-muted-foreground">
                Generate and download your unique QR code
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="rounded-full bg-primary text-primary-foreground h-14 w-14 flex items-center justify-center text-xl font-bold mx-auto shadow-lg">
                4
              </div>
              <h3 className="font-semibold text-lg">Print & Share</h3>
              <p className="text-muted-foreground">
                Place QR codes on tables for instant access
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of restaurants and cafés modernizing their menu experience
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-12 h-12">
                Create Your Menu Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 h-12">
                Already have an account?
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 QR Menu Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
