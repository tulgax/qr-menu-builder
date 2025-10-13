'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'

interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
  defaultValue: string
  description?: string
  presets?: string[]
}

export function ColorPicker({ 
  label, 
  value, 
  onChange, 
  defaultValue, 
  description,
  presets 
}: ColorPickerProps) {
  const handleReset = () => {
    onChange(defaultValue)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor={label}>{label}</Label>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="h-7"
        >
          <RotateCcw className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-lg border-2 border-border shadow-sm"
          style={{ backgroundColor: value }}
        />
        <div className="flex-1 flex items-center gap-2">
          <Input
            type="color"
            id={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-20 h-10 cursor-pointer"
          />
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#000000"
            className="flex-1 font-mono text-sm"
            pattern="^#[0-9A-Fa-f]{6}$"
          />
        </div>
      </div>

      {presets && presets.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">Quick picks:</span>
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => onChange(preset)}
              className="w-8 h-8 rounded-md border-2 border-border hover:scale-110 transition-transform"
              style={{ backgroundColor: preset }}
              title={preset}
            />
          ))}
        </div>
      )}
    </div>
  )
}

