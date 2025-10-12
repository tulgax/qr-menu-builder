'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Table as TableType } from '@/types/database'
import { TableIcon } from './table-icon'
import { TableForm } from './table-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ZoomIn, ZoomOut, RotateCcw, Grid3x3, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface FloorPlanCanvasProps {
  initialTables: TableType[]
  businessId: string
}

export function FloorPlanCanvas({ initialTables, businessId }: FloorPlanCanvasProps) {
  const [tables, setTables] = useState<TableType[]>(initialTables)
  const [selectedTable, setSelectedTable] = useState<TableType | undefined>()
  const [formOpen, setFormOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const [showGrid, setShowGrid] = useState(true)
  const supabase = createClient()

  const refreshTables = async () => {
    const { data } = await supabase
      .from('tables')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })

    if (data) {
      setTables(data)
    }
  }

  const handleDragStop = async (tableId: string, x: number, y: number) => {
    // Update position in database
    const { error } = await supabase
      .from('tables')
      // @ts-expect-error Supabase type limitation
      .update({
        position_x: x,
        position_y: y,
      })
      .eq('id', tableId)

    if (error) {
      toast.error('Failed to save position')
      console.error(error)
    } else {
      // Update local state
      setTables(tables.map(t => 
        t.id === tableId 
          ? { ...t, position_x: x, position_y: y }
          : t
      ))
    }
  }

  const handleEdit = (table: TableType) => {
    setSelectedTable(table)
    setFormOpen(true)
  }

  const handleCreate = () => {
    setSelectedTable(undefined)
    setFormOpen(true)
  }

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5))
  }

  const handleResetView = () => {
    setScale(1)
  }

  const handleResetPositions = async () => {
    if (!confirm('Reset all table positions to center? This cannot be undone.')) {
      return
    }

    // Reset all tables to center position
    for (const table of tables) {
      await supabase
        .from('tables')
        // @ts-expect-error Supabase type limitation
        .update({
          position_x: 50,
          position_y: 50,
        })
        .eq('id', table.id)
    }

    toast.success('All positions reset')
    refreshTables()
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Floor Plan</CardTitle>
              <CardDescription>
                Drag tables to arrange your restaurant layout
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Add Table
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {tables.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground mb-4">
                No tables yet. Create your first table to start building your floor plan.
              </p>
              <Button onClick={handleCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Create Table
              </Button>
            </div>
          ) : (
            <>
              {/* Controls */}
              <div className="flex items-center justify-between mb-4 p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleZoomOut}
                    disabled={scale <= 0.5}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium min-w-[60px] text-center">
                    {Math.round(scale * 100)}%
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleZoomIn}
                    disabled={scale >= 2}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetView}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={showGrid ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowGrid(!showGrid)}
                  >
                    <Grid3x3 className="h-4 w-4 mr-2" />
                    Grid
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetPositions}
                  >
                    Reset Positions
                  </Button>
                </div>
              </div>

              {/* Canvas */}
              <div className="relative border-2 rounded-lg overflow-hidden bg-background">
                <div
                  id="floor-plan-canvas"
                  className={cn(
                    "relative w-full bg-muted/30",
                    showGrid && "bg-grid-pattern"
                  )}
                  style={{
                    height: '600px',
                    backgroundSize: showGrid ? '40px 40px' : undefined,
                  }}
                >
                  {tables.map((table) => (
                    <TableIcon
                      key={table.id}
                      table={table}
                      onDragStop={handleDragStop}
                      onEdit={handleEdit}
                      scale={scale}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 text-sm text-muted-foreground space-y-1">
                <p>💡 <strong>Tips:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Drag tables to position them on your floor plan</li>
                  <li>Use zoom controls to get a better view</li>
                  <li>Click the edit icon on a table to modify its details</li>
                  <li>Positions are saved automatically</li>
                </ul>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <TableForm
        businessId={businessId}
        table={selectedTable}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSuccess={refreshTables}
      />

      <style jsx global>{`
        .bg-grid-pattern {
          background-image:
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
        }
        
        .dark .bg-grid-pattern {
          background-image:
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
      `}</style>
    </>
  )
}
