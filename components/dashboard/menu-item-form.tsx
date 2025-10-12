'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { MenuItem, Category } from '@/types/database'
import { X, Upload } from 'lucide-react'

interface MenuItemFormProps {
  businessId: string
  categories: Category[]
  item?: MenuItem
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function MenuItemForm({ businessId, categories, item, open, onOpenChange, onSuccess }: MenuItemFormProps) {
  const [name, setName] = useState(item?.name || '')
  const [description, setDescription] = useState(item?.description || '')
  const [price, setPrice] = useState(item?.price?.toString() || '')
  const [categoryId, setCategoryId] = useState(item?.category_id || '')
  const [isAvailable, setIsAvailable] = useState(item?.is_available ?? true)
  const [tags, setTags] = useState<string[]>(item?.tags || [])
  const [tagInput, setTagInput] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>(item?.image_url || '')
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async () => {
    if (!imageFile) return item?.image_url || null

    setUploading(true)
    try {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${businessId}/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('menu-images')
        .upload(fileName, imageFile)

      if (uploadError) {
        toast.error('Failed to upload image')
        return null
      }

      const { data: { publicUrl } } = supabase.storage
        .from('menu-images')
        .getPublicUrl(fileName)

      return publicUrl
    } catch {
      toast.error('Error uploading image')
      return null
    } finally {
      setUploading(false)
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!categoryId) {
      toast.error('Please select a category')
      return
    }

    setLoading(true)

    try {
      const imageUrl = await uploadImage()

      const itemData = {
        name,
        description,
        price: parseFloat(price),
        category_id: categoryId,
        is_available: isAvailable,
        tags,
        image_url: imageUrl,
      }

      if (item) {
        // Update existing item
        const { error } = await supabase
          .from('menu_items')
          // @ts-expect-error Supabase type limitation
          .update(itemData)
          .eq('id', item.id)

        if (error) {
          toast.error(error.message)
        } else {
          toast.success('Menu item updated successfully!')
          onSuccess()
          onOpenChange(false)
          resetForm()
        }
      } else {
        // Create new item
        const { data: maxOrderData } = await supabase
          .from('menu_items')
          .select('display_order')
          .eq('category_id', categoryId)
          .order('display_order', { ascending: false })
          .limit(1)
          .single()

        // @ts-expect-error Supabase type limitation
        const nextOrder = maxOrderData ? maxOrderData.display_order + 1 : 0

        const { error } = await supabase
          .from('menu_items')
          // @ts-expect-error Supabase type limitation
          .insert({
            ...itemData,
            display_order: nextOrder,
          })

        if (error) {
          toast.error(error.message)
        } else {
          toast.success('Menu item created successfully!')
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
    setDescription('')
    setPrice('')
    setCategoryId('')
    setIsAvailable(true)
    setTags([])
    setTagInput('')
    setImageFile(null)
    setImagePreview('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item ? 'Edit Menu Item' : 'Create Menu Item'}</DialogTitle>
          <DialogDescription>
            {item ? 'Update the menu item details' : 'Add a new item to your menu'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={categoryId} onValueChange={setCategoryId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Item Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Margherita Pizza"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your menu item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image (optional)</Label>
              <div className="flex items-center space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Image
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="h-16 w-16 object-cover rounded" />
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (optional)</Label>
              <div className="flex space-x-2">
                <Input
                  id="tags"
                  placeholder="e.g., Vegetarian, Spicy, Gluten-free"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddTag()
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={handleAddTag}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isAvailable"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
                className="h-4 w-4"
              />
              <Label htmlFor="isAvailable">Available</Label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || uploading}>
              {loading || uploading ? 'Saving...' : item ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


