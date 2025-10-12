'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Table as TableType } from '@/types/database'

interface TableFormProps {
  businessId: string
  table?: TableType
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function TableForm({ businessId, table, open, onOpenChange, onSuccess }: TableFormProps) {
  const [name, setName] = useState(table?.name || '')
  const [capacity, setCapacity] = useState(table?.capacity?.toString() || '')
  const [location, setLocation] = useState(table?.location || '')
  const [isActive, setIsActive] = useState(table?.is_active ?? true)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || !capacity) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      if (table) {
        // Update existing table
        const { error } = await supabase
          .from('tables')
          // @ts-expect-error Supabase type limitation
          .update({
            name,
            capacity: parseInt(capacity),
            location: location || null,
            is_active: isActive,
          })
          .eq('id', table.id)

        if (error) {
          toast.error(error.message)
        } else {
          toast.success('Table updated successfully!')
          onSuccess()
          onOpenChange(false)
          resetForm()
        }
      } else {
        // Create new table
        const { error } = await supabase
          .from('tables')
          // @ts-expect-error Supabase type limitation
          .insert({
            business_id: businessId,
            name,
            capacity: parseInt(capacity),
            location: location || null,
            is_active: isActive,
            position_x: 50,
            position_y: 50,
          })

        if (error) {
          toast.error(error.message)
        } else {
          toast.success('Table created successfully!')
          onSuccess()
          onOpenChange(false)
          resetForm()
        }
      }
    } catch {
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setName('')
    setCapacity('')
    setLocation('')
    setIsActive(true)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{table ? 'Edit Table' : 'Create Table'}</DialogTitle>
          <DialogDescription>
            {table ? 'Update table information' : 'Add a new table to your restaurant floor plan'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Table Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Table 1, Patio A, Booth 5"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity (seats) *</Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                max="50"
                placeholder="e.g., 4"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location/Area (optional)</Label>
              <Input
                id="location"
                placeholder="e.g., Main Floor, Patio, VIP Room"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="isActive">Active (available for use)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : table ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
