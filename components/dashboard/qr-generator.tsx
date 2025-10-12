'use client'

import { useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

interface QRGeneratorProps {
  businessId: string
  businessName: string
}

export function QRGenerator({ businessId, businessName }: QRGeneratorProps) {
  const qrRef = useRef<HTMLDivElement>(null)
  const menuUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/menu/${businessId}`

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas')
    if (canvas) {
      const url = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = url
      link.download = `${businessName.replace(/\s+/g, '-').toLowerCase()}-qr-menu.png`
      link.click()
      toast.success('QR code downloaded!')
    }
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(menuUrl)
    toast.success('URL copied to clipboard!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">QR Code</h2>
        <p className="text-muted-foreground mt-1">
          Download and print this QR code for your customers to scan
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your QR Code</CardTitle>
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
            <Button onClick={downloadQR} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download QR Code
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Menu URL</CardTitle>
            <CardDescription>
              Share this link directly with your customers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg break-all text-sm">
              {menuUrl}
            </div>
            <div className="flex space-x-2">
              <Button onClick={copyUrl} variant="outline" className="flex-1">
                Copy URL
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(menuUrl, '_blank')}
                className="flex-1"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="rounded-full bg-primary text-primary-foreground h-6 w-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
              1
            </div>
            <p className="text-sm">Download the QR code using the button above</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="rounded-full bg-primary text-primary-foreground h-6 w-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
              2
            </div>
            <p className="text-sm">Print the QR code on table cards, posters, or stickers</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="rounded-full bg-primary text-primary-foreground h-6 w-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
              3
            </div>
            <p className="text-sm">Place them on your tables or at the entrance</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="rounded-full bg-primary text-primary-foreground h-6 w-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
              4
            </div>
            <p className="text-sm">Customers scan the code with their phone camera to view your menu</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


