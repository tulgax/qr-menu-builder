import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { QrCode, Smartphone, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-primary">QR Menu Builder</div>
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
        <div className="text-center space-y-6 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold">
            Create Your Digital Menu
            <br />
            <span className="text-primary">In Minutes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The easiest way for restaurants and cafés to create beautiful, 
            contactless digital menus accessible via QR code.
          </p>
          <div className="flex items-center justify-center space-x-4 pt-4">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8">
                Start Building Free
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-20">
          <Card>
            <CardHeader>
              <QrCode className="h-12 w-12 text-primary mb-2" />
              <CardTitle>Generate QR Codes</CardTitle>
              <CardDescription>
                Create instant QR codes for your menu. Print and place them anywhere.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Smartphone className="h-12 w-12 text-primary mb-2" />
              <CardTitle>Mobile-First Design</CardTitle>
              <CardDescription>
                Beautiful, responsive menus that look great on any device.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-12 w-12 text-primary mb-2" />
              <CardTitle>Update in Real-Time</CardTitle>
              <CardDescription>
                Change prices, add items, or update descriptions instantly. No reprinting needed.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="bg-card rounded-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center space-y-3">
              <div className="rounded-full bg-primary text-primary-foreground h-12 w-12 flex items-center justify-center text-xl font-bold mx-auto">
                1
              </div>
              <h3 className="font-semibold">Sign Up</h3>
              <p className="text-sm text-muted-foreground">
                Create your free account in seconds
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="rounded-full bg-primary text-primary-foreground h-12 w-12 flex items-center justify-center text-xl font-bold mx-auto">
                2
              </div>
              <h3 className="font-semibold">Build Your Menu</h3>
              <p className="text-sm text-muted-foreground">
                Add categories and menu items with photos and prices
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="rounded-full bg-primary text-primary-foreground h-12 w-12 flex items-center justify-center text-xl font-bold mx-auto">
                3
              </div>
              <h3 className="font-semibold">Download QR Code</h3>
              <p className="text-sm text-muted-foreground">
                Generate and download your unique QR code
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="rounded-full bg-primary text-primary-foreground h-12 w-12 flex items-center justify-center text-xl font-bold mx-auto">
                4
              </div>
              <h3 className="font-semibold">Print & Share</h3>
              <p className="text-sm text-muted-foreground">
                Place QR codes on tables for instant access
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-muted-foreground">
            Join restaurants and cafés modernizing their menu experience
          </p>
          <Link href="/signup">
            <Button size="lg" className="text-lg px-12">
              Create Your Menu Now
            </Button>
          </Link>
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
