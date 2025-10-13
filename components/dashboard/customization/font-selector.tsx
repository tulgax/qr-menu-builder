'use client'

import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FontSelectorProps {
  label: string
  value: string
  onChange: (value: string) => void
  description?: string
}

const fonts = [
  { value: 'system', label: 'System Default', class: 'font-sans' },
  { value: 'inter', label: 'Inter', class: 'font-sans' },
  { value: 'roboto', label: 'Roboto', class: 'font-sans' },
  { value: 'playfair', label: 'Playfair Display', class: 'font-serif' },
  { value: 'montserrat', label: 'Montserrat', class: 'font-sans' },
  { value: 'lora', label: 'Lora', class: 'font-serif' },
  { value: 'poppins', label: 'Poppins', class: 'font-sans' },
  { value: 'opensans', label: 'Open Sans', class: 'font-sans' },
]

export function FontSelector({ label, value, onChange, description }: FontSelectorProps) {
  const selectedFont = fonts.find(f => f.value === value) || fonts[0]

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor={label}>{label}</Label>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a font" />
        </SelectTrigger>
        <SelectContent>
          {fonts.map((font) => (
            <SelectItem 
              key={font.value} 
              value={font.value}
              className={font.class}
            >
              <span className={font.class}>{font.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className={`p-4 border rounded-lg ${selectedFont.class}`}>
        <p className="text-lg font-semibold mb-2">Preview Text</p>
        <p className="text-sm">
          The quick brown fox jumps over the lazy dog. 0123456789
        </p>
      </div>
    </div>
  )
}
