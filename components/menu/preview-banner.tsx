'use client'

import { Eye, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PreviewBanner() {
  const handleClose = () => {
    window.close()
  }

  return (
    <div className="bg-yellow-500 text-yellow-900 px-4 py-2 text-center text-sm font-medium sticky top-0 z-50">
      <div className="flex items-center justify-center gap-2">
        <Eye className="h-4 w-4" />
        <span>Preview Mode - This is how your menu will look</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="ml-4 h-6 w-6 p-0 text-yellow-900 hover:text-yellow-700 hover:bg-yellow-400"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
