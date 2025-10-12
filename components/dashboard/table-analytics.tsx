'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Table as TableType, TableScan } from '@/types/database'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Users, Eye, Calendar } from 'lucide-react'
import { subDays, startOfDay, endOfDay } from 'date-fns'
import { cn } from '@/lib/utils'

interface TableAnalyticsProps {
  initialTables: TableType[]
  businessId: string
}

interface TableWithScans extends TableType {
  scanCount: number
  recentScans: TableScan[]
}

export function TableAnalytics({ initialTables, businessId }: TableAnalyticsProps) {
  const [tables, setTables] = useState<TableWithScans[]>([])
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState(7) // Last 7 days
  const supabase = createClient()

  const loadAnalytics = useCallback(async () => {
    setLoading(true)
    try {
      const startDate = startOfDay(subDays(new Date(), dateRange))
      const endDate = endOfDay(new Date())

      // Get scan counts for each table
      const tablesWithScans: TableWithScans[] = await Promise.all(
        initialTables.map(async (table) => {
          // Get scan count
          const { count } = await supabase
            .from('table_scans')
            .select('*', { count: 'exact', head: true })
            .eq('table_id', table.id)
            .gte('scanned_at', startDate.toISOString())
            .lte('scanned_at', endDate.toISOString())

          // Get recent scans
          const { data: recentScans } = await supabase
            .from('table_scans')
            .select('*')
            .eq('table_id', table.id)
            .order('scanned_at', { ascending: false })
            .limit(5)

          return {
            ...table,
            scanCount: count || 0,
            recentScans: (recentScans || []) as TableScan[],
          }
        })
      )

      // Sort by scan count
      tablesWithScans.sort((a, b) => b.scanCount - a.scanCount)
      setTables(tablesWithScans)
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setLoading(false)
    }
  }, [dateRange, initialTables, supabase])

  useEffect(() => {
    loadAnalytics()
  }, [loadAnalytics])

  const totalScans = tables.reduce((sum, t) => sum + t.scanCount, 0)
  const averageScans = tables.length > 0 ? Math.round(totalScans / tables.length) : 0
  const topTable = tables[0]

  return (
    <div className="space-y-6">
      {/* Date Range Selector */}
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm font-medium">Time Period:</span>
        <div className="flex gap-2">
          {[7, 14, 30, 90].map((days) => (
            <Badge
              key={days}
              variant={dateRange === days ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setDateRange(days)}
            >
              Last {days} days
            </Badge>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalScans}</div>
            <p className="text-xs text-muted-foreground">
              Across all tables
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Scans</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScans}</div>
            <p className="text-xs text-muted-foreground">
              Per table
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topTable?.name || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">
              {topTable?.scanCount || 0} scans
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Table List View with Scans */}
      <Card>
        <CardHeader>
          <CardTitle>Scans by Table</CardTitle>
          <CardDescription>
            View scan statistics for each table
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading analytics...
            </div>
          ) : tables.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No tables found. Create tables to start tracking scans.
            </div>
          ) : (
            <div className="space-y-3">
              {tables.map((table, index) => (
                <div
                  key={table.id}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg border",
                    index === 0 && table.scanCount > 0 && "border-primary bg-primary/5"
                  )}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted font-bold text-sm">
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{table.name}</p>
                        {!table.is_active && (
                          <Badge variant="secondary" className="text-xs">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {table.capacity} seats
                        </span>
                        {table.location && <span>{table.location}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{table.scanCount}</p>
                    <p className="text-xs text-muted-foreground">scans</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Floor Plan View with Heat Map */}
      <Card>
        <CardHeader>
          <CardTitle>Floor Plan Heat Map</CardTitle>
          <CardDescription>
            Visual representation of table performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="relative w-full bg-muted/30 rounded-lg border-2"
            style={{ height: '400px' }}
          >
            {tables.map((table) => {
              const maxScans = Math.max(...tables.map(t => t.scanCount), 1)
              const intensity = table.scanCount / maxScans
              
              // Convert percentage to pixels
              const leftPercent = table.position_x
              const topPercent = table.position_y
              
              return (
                <div
                  key={table.id}
                  className="absolute"
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className={cn(
                      "relative rounded-lg border-2 shadow-lg p-3 min-w-[100px] transition-all",
                      table.is_active
                        ? "border-primary"
                        : "border-muted-foreground/30 opacity-60"
                    )}
                    style={{
                      backgroundColor: table.is_active 
                        ? `rgba(139, 92, 246, ${0.1 + intensity * 0.4})`
                        : 'rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <p className="font-semibold text-sm">{table.name}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        <span className="font-bold">{table.scanCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-primary bg-primary/10" />
              <span>Lower activity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-primary bg-primary/50" />
              <span>Higher activity</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
