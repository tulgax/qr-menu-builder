'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, Mail, MapPin, Globe, Facebook, Instagram, Twitter, Wifi } from 'lucide-react'

interface ContactFormProps {
  values: {
    phone?: string | null
    email?: string | null
    address?: string | null
    website?: string | null
    facebook_url?: string | null
    instagram_url?: string | null
    twitter_url?: string | null
    wifi_password?: string | null
    additional_notes?: string | null
    show_contact_info: boolean
    show_social_links: boolean
  }
  onChange: (field: string, value: string | boolean | null) => void
}

export function ContactForm({ values, onChange }: ContactFormProps) {
  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact Information
            </CardTitle>
            <Switch
              checked={values.show_contact_info}
              onCheckedChange={(checked) => onChange('show_contact_info', checked)}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={values.phone || ''}
              onChange={(e) => onChange('phone', e.target.value)}
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={values.email || ''}
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="contact@restaurant.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address
            </Label>
            <Textarea
              id="address"
              value={values.address || ''}
              onChange={(e) => onChange('address', e.target.value)}
              placeholder="123 Main St, City, State 12345"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Website
            </Label>
            <Input
              id="website"
              type="url"
              value={values.website || ''}
              onChange={(e) => onChange('website', e.target.value)}
              placeholder="https://restaurant.com"
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Instagram className="h-5 w-5" />
              Social Media
            </CardTitle>
            <Switch
              checked={values.show_social_links}
              onCheckedChange={(checked) => onChange('show_social_links', checked)}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="facebook" className="flex items-center gap-2">
              <Facebook className="h-4 w-4" />
              Facebook
            </Label>
            <Input
              id="facebook"
              type="url"
              value={values.facebook_url || ''}
              onChange={(e) => onChange('facebook_url', e.target.value)}
              placeholder="https://facebook.com/yourpage"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram" className="flex items-center gap-2">
              <Instagram className="h-4 w-4" />
              Instagram
            </Label>
            <Input
              id="instagram"
              type="url"
              value={values.instagram_url || ''}
              onChange={(e) => onChange('instagram_url', e.target.value)}
              placeholder="https://instagram.com/yourpage"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="twitter" className="flex items-center gap-2">
              <Twitter className="h-4 w-4" />
              Twitter
            </Label>
            <Input
              id="twitter"
              type="url"
              value={values.twitter_url || ''}
              onChange={(e) => onChange('twitter_url', e.target.value)}
              placeholder="https://twitter.com/yourpage"
            />
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Wifi className="h-5 w-5" />
            Additional Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wifi" className="flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              WiFi Password
            </Label>
            <Input
              id="wifi"
              value={values.wifi_password || ''}
              onChange={(e) => onChange('wifi_password', e.target.value)}
              placeholder="Free WiFi password"
            />
            <p className="text-xs text-muted-foreground">
              This will be visible to customers on the menu
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={values.additional_notes || ''}
              onChange={(e) => onChange('additional_notes', e.target.value)}
              placeholder="Special announcements, dietary information, etc."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Use this for special announcements, dietary information, or any other important details
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}