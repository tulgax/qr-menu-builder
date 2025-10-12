import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import Link from 'next/link'
import { QrCode, FolderOpen, ListOrdered, Eye } from 'lucide-react'
import { Business } from '@/types/database'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { data: businessData } = await supabase
    .from('businesses')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!businessData) {
    redirect('/onboarding')
  }

  const business: Business = businessData

  const { count: categoriesCount } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true })
    .eq('business_id', business.id)

  const { count: itemsCount } = await supabase
    .from('menu_items')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', business.id)

  return (
    <>
      <DashboardHeader title="Dashboard" />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
          <p className="text-muted-foreground">
            Here&apos;s an overview of your menu management for {business.name}.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categoriesCount || 0}</div>
              <p className="text-xs text-muted-foreground">
                Menu categories created
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
              <ListOrdered className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{itemsCount || 0}</div>
              <p className="text-xs text-muted-foreground">
                Total menu items
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">QR Code</CardTitle>
              <QrCode className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ready</div>
              <p className="text-xs text-muted-foreground">
                Generate and print QR code
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Menu Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Customer views this month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks to manage your menu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard/categories">
                <Button variant="outline" className="w-full justify-start">
                  <FolderOpen className="mr-2 h-4 w-4" />
                  Manage Categories
                </Button>
              </Link>
              <Link href="/dashboard/items">
                <Button variant="outline" className="w-full justify-start">
                  <ListOrdered className="mr-2 h-4 w-4" />
                  Manage Menu Items
                </Button>
              </Link>
              <Link href="/dashboard/qr-code">
                <Button variant="outline" className="w-full justify-start">
                  <QrCode className="mr-2 h-4 w-4" />
                  Generate QR Code
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Menu Preview</CardTitle>
              <CardDescription>
                See how your menu looks to customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-muted/50 aspect-video rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Eye className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Menu Preview</p>
                </div>
              </div>
              <Link href={`/menu/${business.id}`} target="_blank">
                <Button className="w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  View Live Menu
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}