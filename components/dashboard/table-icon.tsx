'use client'

import Draggable from 'react-draggable'
import { Table as TableType } from '@/types/database'
import { Users, Edit2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TableIconProps {
  table: TableType
  onDragStop: (tableId: string, x: number, y: number) => void
  onEdit: (table: TableType) => void
  scale?: number
}

export function TableIcon({ table, onDragStop, onEdit, scale = 1 }: TableIconProps) {
  const handleDrag = (_e: unknown, data: { x: number; y: number }) => {
    // Convert pixel position to percentage for responsive storage
    const canvas = document.getElementById('floor-plan-canvas')
    if (!canvas) return

    const canvasWidth = canvas.offsetWidth
    const canvasHeight = canvas.offsetHeight

    const percentX = (data.x / canvasWidth) * 100
    const percentY = (data.y / canvasHeight) * 100

    onDragStop(table.id, percentX, percentY)
  }

  // Convert percentage position to pixels
  const canvas = document.getElementById('floor-plan-canvas')
  const canvasWidth = canvas?.offsetWidth || 800
  const canvasHeight = canvas?.offsetHeight || 600

  const pixelX = (table.position_x / 100) * canvasWidth
  const pixelY = (table.position_y / 100) * canvasHeight

  return (
    <Draggable
      position={{ x: pixelX, y: pixelY }}
      onStop={handleDrag}
      scale={scale}
      bounds="parent"
    >
      <div
        className={cn(
          "absolute cursor-move select-none group",
          "transition-transform hover:scale-105"
        )}
        style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
      >
        <div
          className={cn(
            "relative rounded-lg border-2 shadow-lg p-3 min-w-[100px]",
            table.is_active
              ? "bg-primary/10 border-primary hover:bg-primary/20"
              : "bg-muted border-muted-foreground/30 opacity-60"
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1">
              <p className="font-semibold text-sm truncate">{table.name}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>{table.capacity}</span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit(table)
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-background/80 rounded"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          </div>
          {table.location && (
            <p className="text-xs text-muted-foreground mt-1 truncate">
              {table.location}
            </p>
          )}
        </div>
      </div>
    </Draggable>
  )
}
