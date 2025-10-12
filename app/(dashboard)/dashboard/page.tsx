import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { QrCode, FolderOpen, ListOrdered } from 'lucide-react'
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{business.name}</h1>
        {business.description && (
          <p className="text-muted-foreground mt-2">{business.description}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoriesCount || 0}</div>
            <p className="text-xs text-muted-foreground">
              Total menu categories
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
              Total items in menu
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">QR Code</CardTitle>
            <QrCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/qr-code">
              <Button variant="outline" size="sm">
                View & Download
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your menu</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/dashboard/categories" className="block">
              <Button variant="outline" className="w-full justify-start">
                <FolderOpen className="mr-2 h-4 w-4" />
                Manage Categories
              </Button>
            </Link>
            <Link href="/dashboard/items" className="block">
              <Button variant="outline" className="w-full justify-start">
                <ListOrdered className="mr-2 h-4 w-4" />
                Manage Menu Items
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>Follow these steps to set up your menu</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start space-x-2">
              <div className="rounded-full bg-primary text-primary-foreground h-6 w-6 flex items-center justify-center text-sm font-bold">
                1
              </div>
              <p className="text-sm">Create categories for your menu</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="rounded-full bg-primary text-primary-foreground h-6 w-6 flex items-center justify-center text-sm font-bold">
                2
              </div>
              <p className="text-sm">Add menu items to each category</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="rounded-full bg-primary text-primary-foreground h-6 w-6 flex items-center justify-center text-sm font-bold">
                3
              </div>
              <p className="text-sm">Download and print your QR code</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


