'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { Palette, Layout, Phone, Clock, Eye, Save, RotateCcw } from 'lucide-react'
import { Business } from '@/types/database'
import { ColorPicker } from './color-picker'
import { FontSelector } from './font-selector'
import { LayoutSelector } from './layout-selector'
import { LogoUploader } from './logo-uploader'
import { ContactForm } from './contact-form'
import { OpeningHoursEditor } from './opening-hours-editor'

interface CustomizationFormProps {
  business: Business
}

const colorPresets = {
  primary: ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5A2B'],
  background: ['#FFFFFF', '#F9FAFB', '#F3F4F6', '#1F2937', '#111827'],
  text: ['#000000', '#374151', '#6B7280', '#FFFFFF', '#F9FAFB'],
  card: ['#FFFFFF', '#F9FAFB', '#F3F4F6', '#E5E7EB', '#374151'],
}

export function CustomizationForm({ business }: CustomizationFormProps) {
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    logo_url: business.logo_url,
    favicon_url: business.favicon_url,
    primary_color: business.primary_color,
    background_color: business.background_color,
    text_color: business.text_color,
    card_background_color: business.card_background_color,
    font_family: business.font_family,
    heading_font_family: business.heading_font_family,
    layout_style: business.layout_style,
    menu_width: business.menu_width,
    phone: business.phone,
    email: business.email,
    address: business.address,
    website: business.website,
    facebook_url: business.facebook_url,
    instagram_url: business.instagram_url,
    twitter_url: business.twitter_url,
    opening_hours: business.opening_hours,
    wifi_password: business.wifi_password,
    additional_notes: business.additional_notes,
    show_logo: business.show_logo,
    show_contact_info: business.show_contact_info,
    show_social_links: business.show_social_links,
    show_opening_hours: business.show_opening_hours,
  })

  const supabase = createClient()

  const updateField = (field: string, value: string | boolean | null | Record<string, string>) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Type assertion needed because TypeScript doesn't know about new columns yet
      const updateData = {
        logo_url: formData.logo_url,
        favicon_url: formData.favicon_url,
        primary_color: formData.primary_color,
        background_color: formData.background_color,
        text_color: formData.text_color,
        card_background_color: formData.card_background_color,
        font_family: formData.font_family,
        heading_font_family: formData.heading_font_family,
        layout_style: formData.layout_style,
        menu_width: formData.menu_width,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        website: formData.website,
        facebook_url: formData.facebook_url,
        instagram_url: formData.instagram_url,
        twitter_url: formData.twitter_url,
        opening_hours: formData.opening_hours,
        wifi_password: formData.wifi_password,
        additional_notes: formData.additional_notes,
        show_logo: formData.show_logo,
        show_contact_info: formData.show_contact_info,
        show_social_links: formData.show_social_links,
        show_opening_hours: formData.show_opening_hours,
      }
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase.from('businesses') as any)
        .update(updateData)
        .eq('id', business.id)

      if (error) {
        toast.error('Failed to save customization')
        console.error(error)
        return
      }

      toast.success('Customization saved successfully!')
    } catch (error) {
      console.error('Save error:', error)
      toast.error('Failed to save customization')
    } finally {
      setSaving(false)
    }
  }

  const handlePreview = () => {
    // Store current form data in localStorage for preview
    localStorage.setItem('preview-customization', JSON.stringify(formData))
    // Open menu in new tab with preview mode
    const url = `/menu/${business.id}?preview=true`
    window.open(url, '_blank')
  }

  const resetToDefaults = () => {
    setFormData({
      logo_url: null,
      favicon_url: null,
      primary_color: '#8B5CF6',
      background_color: '#FFFFFF',
      text_color: '#000000',
      card_background_color: '#F9FAFB',
      font_family: 'system',
      heading_font_family: 'system',
      layout_style: 'classic',
      menu_width: 'standard',
      phone: null,
      email: null,
      address: null,
      website: null,
      facebook_url: null,
      instagram_url: null,
      twitter_url: null,
      opening_hours: null,
      wifi_password: null,
      additional_notes: null,
      show_logo: true,
      show_contact_info: true,
      show_social_links: true,
      show_opening_hours: false,
    })
    toast.success('Reset to default settings')
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="branding" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="branding" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Contact
          </TabsTrigger>
          <TabsTrigger value="info" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Info
          </TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Logo Upload */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <LogoUploader
                  businessId={business.id}
                  currentLogoUrl={formData.logo_url}
                  onUploadComplete={(url) => updateField('logo_url', url)}
                  onRemove={() => updateField('logo_url', null)}
                  type="logo"
                />
                
                <LogoUploader
                  businessId={business.id}
                  currentLogoUrl={formData.favicon_url}
                  onUploadComplete={(url) => updateField('favicon_url', url)}
                  onRemove={() => updateField('favicon_url', null)}
                  type="favicon"
                />
              </CardContent>
            </Card>

            {/* Colors */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <ColorPicker
                  label="Primary Color"
                  value={formData.primary_color}
                  onChange={(value) => updateField('primary_color', value)}
                  defaultValue="#8B5CF6"
                  description="Used for buttons, links, and accents"
                  presets={colorPresets.primary}
                />
                
                <ColorPicker
                  label="Background Color"
                  value={formData.background_color}
                  onChange={(value) => updateField('background_color', value)}
                  defaultValue="#FFFFFF"
                  description="Main page background"
                  presets={colorPresets.background}
                />
                
                <ColorPicker
                  label="Text Color"
                  value={formData.text_color}
                  onChange={(value) => updateField('text_color', value)}
                  defaultValue="#000000"
                  description="Main text color"
                  presets={colorPresets.text}
                />
                
                <ColorPicker
                  label="Card Background"
                  value={formData.card_background_color}
                  onChange={(value) => updateField('card_background_color', value)}
                  defaultValue="#F9FAFB"
                  description="Background for menu item cards"
                  presets={colorPresets.card}
                />
              </CardContent>
            </Card>

            {/* Typography */}
            <Card className="lg:col-span-2">
              <CardContent className="p-6 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <FontSelector
                    label="Body Font"
                    value={formData.font_family}
                    onChange={(value) => updateField('font_family', value)}
                    description="Used for menu descriptions and general text"
                  />
                  
                  <FontSelector
                    label="Heading Font"
                    value={formData.heading_font_family}
                    onChange={(value) => updateField('heading_font_family', value)}
                    description="Used for restaurant name and category titles"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <LayoutSelector
                value={formData.layout_style}
                onChange={(value) => updateField('layout_style', value)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <ContactForm
            values={{
              phone: formData.phone,
              email: formData.email,
              address: formData.address,
              website: formData.website,
              facebook_url: formData.facebook_url,
              instagram_url: formData.instagram_url,
              twitter_url: formData.twitter_url,
              wifi_password: formData.wifi_password,
              additional_notes: formData.additional_notes,
              show_contact_info: formData.show_contact_info,
              show_social_links: formData.show_social_links,
            }}
            onChange={updateField}
          />
        </TabsContent>

        <TabsContent value="info" className="space-y-6">
          <OpeningHoursEditor
            values={{
              opening_hours: formData.opening_hours,
              show_opening_hours: formData.show_opening_hours,
            }}
            onChange={updateField}
          />
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="sticky bottom-0 bg-background border-t p-4 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={resetToDefaults}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset to Defaults
        </Button>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePreview}
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview Menu
          </Button>
          
          <Button
            onClick={handleSave}
            disabled={saving}
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  )
}
