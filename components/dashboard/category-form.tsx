'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Category } from '@/types/database'

interface CategoryFormProps {
  businessId: string
  category?: Category
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function CategoryForm({ businessId, category, open, onOpenChange, onSuccess }: CategoryFormProps) {
  const [name, setName] = useState(category?.name || '')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (category) {
        // Update existing category
        const { error } = await supabase
          .from('categories')
          // @ts-expect-error Supabase type limitation
          .update({ name })
          .eq('id', category.id)

        if (error) {
          toast.error(error.message)
        } else {
          toast.success('Category updated successfully!')
          onSuccess()
          onOpenChange(false)
          setName('')
        }
      } else {
        // Create new category
        // Get the max display_order
        const { data: maxOrderData } = await supabase
          .from('categories')
          .select('display_order')
          .eq('business_id', businessId)
          .order('display_order', { ascending: false })
          .limit(1)
          .single()

        // @ts-expect-error Supabase type limitation
        const nextOrder = maxOrderData ? maxOrderData.display_order + 1 : 0

        const { error } = await supabase
          .from('categories')
          // @ts-expect-error Supabase type limitation
          .insert({
            business_id: businessId,
            name,
            display_order: nextOrder,
          })

        if (error) {
          toast.error(error.message)
        } else {
          toast.success('Category created successfully!')
          onSuccess()
          onOpenChange(false)
          setName('')
        }
      }
    } catch {
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category ? 'Edit Category' : 'Create Category'}</DialogTitle>
          <DialogDescription>
            {category ? 'Update the category name' : 'Add a new category to organize your menu items'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Appetizers, Main Courses, Drinks"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : category ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


