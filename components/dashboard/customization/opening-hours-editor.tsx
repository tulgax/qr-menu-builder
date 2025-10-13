'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Clock, Copy } from 'lucide-react'

interface OpeningHoursEditorProps {
  values: {
    opening_hours: Record<string, string> | null
    show_opening_hours: boolean
  }
  onChange: (field: string, value: Record<string, string> | boolean | null) => void
}

const daysOfWeek = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
]

const timePresets = [
  '9:00 AM - 5:00 PM',
  '9:00 AM - 9:00 PM',
  '11:00 AM - 10:00 PM',
  '12:00 PM - 11:00 PM',
  '5:00 PM - 11:00 PM',
  'Closed',
]

export function OpeningHoursEditor({ values, onChange }: OpeningHoursEditorProps) {
  
  const hours = values.opening_hours || {}

  const updateHours = (day: string, time: string) => {
    const newHours = { ...hours, [day]: time }
    onChange('opening_hours', newHours)
  }

  const copyHours = (fromDay: string, toDay: string) => {
    if (hours[fromDay]) {
      updateHours(toDay, hours[fromDay])
    }
  }

  const applyToAll = (time: string) => {
    const newHours: Record<string, string> = {}
    daysOfWeek.forEach(day => {
      newHours[day.key] = time
    })
    onChange('opening_hours', newHours)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Opening Hours
          </CardTitle>
          <Switch
            checked={values.show_opening_hours}
            onCheckedChange={(checked) => onChange('show_opening_hours', checked)}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Label className="text-sm font-medium">Quick apply:</Label>
          {timePresets.map((preset) => (
            <Button
              key={preset}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => applyToAll(preset)}
            >
              {preset}
            </Button>
          ))}
        </div>

        {/* Days */}
        <div className="space-y-3">
          {daysOfWeek.map((day) => (
            <div key={day.key} className="flex items-center gap-3">
              <div className="w-20 text-sm font-medium">
                {day.label}
              </div>
              
              <div className="flex-1">
                <Input
                  value={hours[day.key] || ''}
                  onChange={(e) => updateHours(day.key, e.target.value)}
                  placeholder="e.g., 9:00 AM - 5:00 PM or Closed"
                  className="w-full"
                />
              </div>

              <Select
                value=""
                onValueChange={(preset) => updateHours(day.key, preset)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Preset" />
                </SelectTrigger>
                <SelectContent>
                  {timePresets.map((preset) => (
                    <SelectItem key={preset} value={preset}>
                      {preset}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Copy from another day */}
              <Select
                value=""
                onValueChange={(fromDay) => copyHours(fromDay, day.key)}
              >
                <SelectTrigger className="w-32">
                  <Copy className="h-4 w-4" />
                </SelectTrigger>
                <SelectContent>
                  {daysOfWeek
                    .filter(d => d.key !== day.key && hours[d.key])
                    .map((d) => (
                      <SelectItem key={d.key} value={d.key}>
                        Copy {d.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Tips:</strong> Use formats like &quot;9:00 AM - 5:00 PM&quot;, &quot;24/7&quot;, or &quot;Closed&quot;. 
            You can also add notes like &quot;9:00 AM - 5:00 PM (Kitchen closes at 4:30 PM)&quot;.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
