import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table as TableType, Business, TableScan } from '@/types/database'
import { Users, MapPin, TrendingUp } from 'lucide-react'
import { TableQRGenerator } from '@/components/dashboard/table-qr-generator'
import Link from 'next/link'

interface TableDetailPageProps {
  params: Promise<{ tableId: string }>
}

export default async function TableDetailPage({ params }: TableDetailPageProps) {
  const { tableId } = await params
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

  const { data: tableData } = await supabase
    .from('tables')
    .select('*')
    .eq('id', tableId)
    .eq('business_id', business.id)
    .single()

  if (!tableData) {
    notFound()
  }

  const table: TableType = tableData

  // Get scan count for this table
  const { count: scanCount } = await supabase
    .from('table_scans')
    .select('*', { count: 'exact', head: true })
    .eq('table_id', tableId)

  // Get recent scans
  const { data: recentScansData } = await supabase
    .from('table_scans')
    .select('*')
    .eq('table_id', tableId)
    .order('scanned_at', { ascending: false })
    .limit(10)

  const recentScans: TableScan[] = recentScansData || []

  return (
    <>
      <DashboardHeader 
        title={table.name} 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tables", href: "/dashboard/tables" },
          { label: table.name }
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{table.name}</h1>
              <Badge variant={table.is_active ? 'default' : 'secondary'}>
                {table.is_active ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            {table.location && (
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {table.location}
              </p>
            )}
          </div>
          <Button variant="outline" asChild>
            <Link href="/dashboard/tables">Back to Tables</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Table Information</CardTitle>
                <CardDescription>
                  Details about this table
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Capacity</p>
                    <p className="text-2xl font-bold">{table.capacity} seats</p>
                  </div>
                </div>
                {table.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-lg">{table.location}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Total Scans</p>
                    <p className="text-2xl font-bold">{scanCount || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Scans</CardTitle>
                <CardDescription>
                  Latest menu views from this table
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!recentScans || recentScans.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    <p>No scans yet</p>
                    <p className="text-sm mt-1">
                      Share the QR code to start tracking views
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentScans.map((scan) => (
                      <div key={scan.id} className="flex items-center justify-between text-sm border-b pb-2">
                        <span className="text-muted-foreground">
                          {new Date(scan.scanned_at).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <TableQRGenerator 
              businessId={business.id}
              tableId={table.id}
              tableName={table.name}
            />
          </div>
        </div>
      </div>
    </>
  )
}
