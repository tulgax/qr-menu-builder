'use client'

import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { LayoutGrid, List, Grid3x3, Columns } from 'lucide-react'

interface LayoutSelectorProps {
  value: string
  onChange: (value: string) => void
}

const layouts = [
  {
    value: 'classic',
    label: 'Classic',
    description: 'Traditional single column with category sections',
    icon: List,
  },
  {
    value: 'modern',
    label: 'Modern',
    description: 'Grid layout with large images',
    icon: LayoutGrid,
  },
  {
    value: 'compact',
    label: 'Compact',
    description: 'Dense list view with smaller images',
    icon: Columns,
  },
  {
    value: 'grid',
    label: 'Grid',
    description: 'Pinterest-style masonry grid',
    icon: Grid3x3,
  },
]

export function LayoutSelector({ value, onChange }: LayoutSelectorProps) {
  return (
    <div className="space-y-3">
      <Label>Menu Layout Style</Label>
      <div className="grid gap-4 md:grid-cols-2">
        {layouts.map((layout) => {
          const Icon = layout.icon
          return (
            <Card
              key={layout.value}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                value === layout.value
                  ? "border-primary border-2 bg-primary/5"
                  : "border-border"
              )}
              onClick={() => onChange(layout.value)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    value === layout.value ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{layout.label}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {layout.description}
                    </p>
                  </div>
                  {value === layout.value && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-primary-foreground"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
