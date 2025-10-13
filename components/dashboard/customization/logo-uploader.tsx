'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface LogoUploaderProps {
  businessId: string
  currentLogoUrl?: string | null
  onUploadComplete: (url: string) => void
  onRemove: () => void
  type: 'logo' | 'favicon'
}

export function LogoUploader({ 
  businessId, 
  currentLogoUrl, 
  onUploadComplete, 
  onRemove,
  type 
}: LogoUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string>(currentLogoUrl || '')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB')
      return
    }

    setUploading(true)
    try {
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${businessId}/${type}.${fileExt}`

      // Delete old file if exists
      if (currentLogoUrl) {
        const oldPath = currentLogoUrl.split('/').slice(-2).join('/')
        await supabase.storage
          .from('business-assets')
          .remove([oldPath])
      }

      const { error: uploadError } = await supabase.storage
        .from('business-assets')
        .upload(fileName, file, {
          upsert: true,
        })

      if (uploadError) {
        toast.error('Failed to upload image')
        console.error(uploadError)
        return
      }

      const { data: { publicUrl } } = supabase.storage
        .from('business-assets')
        .getPublicUrl(fileName)

      onUploadComplete(publicUrl)
      toast.success(`${type === 'logo' ? 'Logo' : 'Favicon'} uploaded successfully!`)
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview('')
    onRemove()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-3">
      <Label>
        {type === 'logo' ? 'Business Logo' : 'Favicon'} 
        <span className="text-xs text-muted-foreground ml-2">
          (Max 2MB, PNG/JPG/WebP)
        </span>
      </Label>
      
      <div className="flex items-center gap-4">
        <div className={cn(
          "flex items-center justify-center rounded-lg border-2 border-dashed bg-muted/50",
          type === 'logo' ? "w-32 h-32" : "w-16 h-16"
        )}>
          {preview ? (
            <img
              src={preview}
              alt={type === 'logo' ? 'Logo preview' : 'Favicon preview'}
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          )}
        </div>

        <div className="flex-1 space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <Upload className="mr-2 h-4 w-4" />
              {uploading ? 'Uploading...' : preview ? 'Change' : 'Upload'}
            </Button>
            
            {preview && (
              <Button
                type="button"
                variant="outline"
                onClick={handleRemove}
                disabled={uploading}
              >
                <X className="mr-2 h-4 w-4" />
                Remove
              </Button>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            {type === 'logo' 
              ? 'Recommended: 400x400px, transparent background'
              : 'Recommended: 32x32px or 64x64px square'
            }
          </p>
        </div>
      </div>
    </div>
  )
}
