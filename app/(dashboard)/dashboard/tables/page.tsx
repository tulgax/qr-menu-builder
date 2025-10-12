import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { TableList } from '@/components/dashboard/table-list'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Business } from '@/types/database'

export default async function TablesPage() {
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

  const { data: tables } = await supabase
    .from('tables')
    .select('*')
    .eq('business_id', business.id)
    .order('created_at', { ascending: false })

  return (
    <>
      <DashboardHeader 
        title="Tables" 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tables" }
        ]}
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="space-y-2 mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Table Management</h1>
          <p className="text-muted-foreground">
            Create and manage your restaurant floor plan with individual QR codes for each table.
          </p>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList>
            <TabsTrigger value="list">Table List</TabsTrigger>
            <TabsTrigger value="floor-plan">Floor Plan</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-6">
            <TableList initialTables={tables || []} businessId={business.id} />
          </TabsContent>
          
          <TabsContent value="floor-plan" className="mt-6">
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">Floor plan coming soon...</p>
              <p className="text-sm text-muted-foreground mt-2">
                Drag and drop tables to create your restaurant layout
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">Analytics coming soon...</p>
              <p className="text-sm text-muted-foreground mt-2">
                View scan statistics and performance metrics for each table
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
