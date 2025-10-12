'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CategoryForm } from './category-form'
import { toast } from 'sonner'
import { Category } from '@/types/database'
import { Pencil, Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface CategoryListProps {
  initialCategories: Category[]
  businessId: string
}

export function CategoryList({ initialCategories, businessId }: CategoryListProps) {
  const [categories, setCategories] = useState(initialCategories)
  const [formOpen, setFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | undefined>()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null)
  const supabase = createClient()

  const refreshCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .eq('business_id', businessId)
      .order('display_order', { ascending: true })

    if (data) {
      setCategories(data)
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setFormOpen(true)
  }

  const handleDelete = async () => {
    if (!deletingCategory) return

    try {
      // First, delete all menu items in this category
      await supabase
        .from('menu_items')
        .delete()
        .eq('category_id', deletingCategory.id)

      // Then delete the category
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', deletingCategory.id)

      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Category deleted successfully!')
        refreshCategories()
        setDeleteDialogOpen(false)
        setDeletingCategory(null)
      }
    } catch {
      toast.error('An unexpected error occurred')
    }
  }

  const openDeleteDialog = (category: Category) => {
    setDeletingCategory(category)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Button onClick={() => {
          setEditingCategory(undefined)
          setFormOpen(true)
        }}>
          Add Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No categories yet. Create your first category to get started!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{category.name}</span>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(category)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDeleteDialog(category)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      <CategoryForm
        businessId={businessId}
        category={editingCategory}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSuccess={refreshCategories}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the category &quot;{deletingCategory?.name}&quot; and all its menu items.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}


