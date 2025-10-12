'use client'

import { useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, ExternalLink, Copy } from 'lucide-react'
import { toast } from 'sonner'

interface TableQRGeneratorProps {
  businessId: string
  tableId: string
  tableName: string
}

export function TableQRGenerator({ businessId, tableId, tableName }: TableQRGeneratorProps) {
  const qrRef = useRef<HTMLDivElement>(null)
  const menuUrl = `${window.location.origin}/menu/${businessId}?table=${tableId}`

  const downloadQR = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas')
      if (canvas) {
        const pngUrl = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        downloadLink.href = pngUrl
        downloadLink.download = `${tableName.replace(/\s/g, '-')}-qr-code.png`
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
        toast.success('QR Code downloaded!')
      }
    }
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(menuUrl)
    toast.success('URL copied to clipboard!')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code for {tableName}</CardTitle>
        <CardDescription>
          Customers can scan this to view your menu
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div ref={qrRef} className="bg-white p-6 rounded-lg">
          <QRCodeCanvas
            value={menuUrl}
            size={256}
            level="H"
            includeMargin
          />
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-sm font-medium">Table-Specific URL</p>
          <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-md text-sm">
            <code className="flex-1 truncate max-w-[250px]">
              {menuUrl}
            </code>
            <Button size="sm" variant="ghost" onClick={copyUrl}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="w-full space-y-2">
          <Button onClick={downloadQR} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download QR Code
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <a href={menuUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Test Menu View
            </a>
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>Print this QR code and place it on {tableName}</p>
          <p>When scanned, customers will see which table they&apos;re at</p>
        </div>
      </CardContent>
    </Card>
  )
}
