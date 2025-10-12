'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MenuItemForm } from './menu-item-form'
import { toast } from 'sonner'
import { MenuItem, Category } from '@/types/database'
import { Pencil, Trash2, ImageOff } from 'lucide-react'
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

interface MenuItemListProps {
  initialItems: MenuItem[]
  categories: Category[]
  businessId: string
}

export function MenuItemList({ initialItems, categories, businessId }: MenuItemListProps) {
  const [items, setItems] = useState(initialItems)
  const [formOpen, setFormOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | undefined>()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deletingItem, setDeletingItem] = useState<MenuItem | null>(null)
  const supabase = createClient()

  const refreshItems = async () => {
    const { data } = await supabase
      .from('menu_items')
      .select('*')
      .in('category_id', categories.map(c => c.id))
      .order('display_order', { ascending: true })

    if (data) {
      setItems(data)
    }
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setFormOpen(true)
  }

  const handleDelete = async () => {
    if (!deletingItem) return

    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', deletingItem.id)

      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Menu item deleted successfully!')
        refreshItems()
        setDeleteDialogOpen(false)
        setDeletingItem(null)
      }
    } catch {
      toast.error('An unexpected error occurred')
    }
  }

  const openDeleteDialog = (item: MenuItem) => {
    setDeletingItem(item)
    setDeleteDialogOpen(true)
  }

  // Group items by category
  const itemsByCategory = categories.map(category => ({
    category,
    items: items.filter(item => item.category_id === category.id)
  }))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Menu Items</h2>
        <Button onClick={() => {
          setEditingItem(undefined)
          setFormOpen(true)
        }}>
          Add Menu Item
        </Button>
      </div>

      {categories.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No categories yet. Create a category first to add menu items!</p>
          </CardContent>
        </Card>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No menu items yet. Add your first menu item to get started!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {itemsByCategory.map(({ category, items: categoryItems }) => (
            categoryItems.length > 0 && (
              <div key={category.id}>
                <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {categoryItems.map((item) => (
                    <Card key={item.id} className={!item.is_available ? 'opacity-60' : ''}>
                      <CardHeader>
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-40 object-cover rounded-md mb-2"
                          />
                        ) : (
                          <div className="w-full h-40 bg-muted rounded-md mb-2 flex items-center justify-center">
                            <ImageOff className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                        <CardTitle className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span>{item.name}</span>
                              <span className="text-sm font-normal text-muted-foreground">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {item.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {!item.is_available && (
                            <Badge variant="destructive" className="text-xs">
                              Unavailable
                            </Badge>
                          )}
                          <div className="flex space-x-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(item)}
                              className="flex-1"
                            >
                              <Pencil className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openDeleteDialog(item)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )}

      <MenuItemForm
        businessId={businessId}
        categories={categories}
        item={editingItem}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSuccess={refreshItems}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &quot;{deletingItem?.name}&quot;. This action cannot be undone.
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


