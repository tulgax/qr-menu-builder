'use client'

import { Business } from '@/types/database'
import { Phone, Mail, MapPin, Globe, Facebook, Instagram, Twitter, Clock, Wifi, Info } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface ContactSectionProps {
  business: Business
}

export function ContactSection({ business }: ContactSectionProps) {
  const hasContactInfo = business.phone || business.email || business.address || business.website
  const hasSocialLinks = business.facebook_url || business.instagram_url || business.twitter_url
  const hasOpeningHours = business.opening_hours && Object.keys(business.opening_hours).length > 0
  const hasAdditionalInfo = business.wifi_password || business.additional_notes

  // Don't render if nothing to show
  if (!hasContactInfo && !hasSocialLinks && !hasOpeningHours && !hasAdditionalInfo) {
    return null
  }

  return (
    <div className="space-y-4 mt-8 pt-8 border-t border-border">
      {/* Contact Information */}
      {business.show_contact_info && hasContactInfo && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2 menu-category-title">
              <Phone className="h-5 w-5" />
              Contact Information
            </h3>
            
            <div className="space-y-2">
              {business.phone && (
                <a 
                  href={`tel:${business.phone}`}
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {business.phone}
                </a>
              )}
              
              {business.email && (
                <a 
                  href={`mailto:${business.email}`}
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {business.email}
                </a>
              )}
              
              {business.address && (
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(business.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm hover:text-primary transition-colors"
                >
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{business.address}</span>
                </a>
              )}
              
              {business.website && (
                <a 
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  {business.website.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Social Media Links */}
      {business.show_social_links && hasSocialLinks && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 menu-category-title mb-3">
              <Instagram className="h-5 w-5" />
              Follow Us
            </h3>
            
            <div className="flex gap-4">
              {business.facebook_url && (
                <a 
                  href={business.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                  Facebook
                </a>
              )}
              
              {business.instagram_url && (
                <a 
                  href={business.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  Instagram
                </a>
              )}
              
              {business.twitter_url && (
                <a 
                  href={business.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  Twitter
                </a>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Opening Hours */}
      {business.show_opening_hours && hasOpeningHours && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 menu-category-title mb-3">
              <Clock className="h-5 w-5" />
              Opening Hours
            </h3>
            
            <div className="space-y-1">
              {Object.entries(business.opening_hours || {}).map(([day, hours]) => (
                <div key={day} className="flex justify-between text-sm">
                  <span className="capitalize font-medium">{day}</span>
                  <span className={hours === 'Closed' ? 'text-muted-foreground' : ''}>
                    {hours}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Information */}
      {hasAdditionalInfo && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-lg flex items-center gap-2 menu-category-title">
              <Info className="h-5 w-5" />
              Additional Information
            </h3>
            
            <div className="space-y-3">
              {business.wifi_password && (
                <div className="flex items-center gap-3 text-sm">
                  <Wifi className="h-4 w-4" />
                  <span>
                    <strong>WiFi:</strong> {business.wifi_password}
                  </span>
                </div>
              )}
              
              {business.additional_notes && (
                <div className="text-sm">
                  <div className="whitespace-pre-wrap">{business.additional_notes}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
