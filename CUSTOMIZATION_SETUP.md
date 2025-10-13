# Menu Customization Setup Guide

This guide covers setting up the complete menu customization system that allows business owners to personalize their public menu appearance.

## 🎯 Features Included

- **Visual Branding**: Logo upload, favicon, custom colors, fonts
- **Layout Options**: Multiple layout styles (Classic, Modern, Compact, Grid)
- **Contact Information**: Phone, email, address, website, social media links
- **Opening Hours**: Day-by-day schedule with flexible formatting
- **Additional Info**: WiFi password, custom notes/announcements
- **Real-time Preview**: Preview changes before publishing
- **Responsive Design**: Works on all screen sizes

## 📋 Prerequisites

1. Existing QR Menu Builder app setup
2. Supabase project with authentication
3. Node.js and npm installed

## 🚀 Setup Steps

### 1. Database Migration

Run the customization schema migration in your Supabase SQL Editor:

```bash
# Navigate to Supabase Dashboard > SQL Editor
# Copy and paste contents of: supabase/schema-customization.sql
```

This adds all customization columns to the `businesses` table.

### 2. Storage Bucket Setup

Create the `business-assets` storage bucket:

```bash
# Follow the guide: supabase/storage-business-assets-setup.md
# This creates a bucket for logos and favicons with proper RLS policies
```

### 3. Install Required Dependencies

The following Shadcn components should already be installed:
- `button`, `card`, `input`, `label`, `textarea`, `select`, `badge`
- `dialog`, `alert-dialog`, `tabs`, `switch`, `toaster`

If any are missing:
```bash
npx shadcn@latest add [component-name]
```

### 4. Environment Variables

Ensure your `.env.local` has the Supabase configuration:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🎨 Customization Features

### Visual Branding
- **Logo Upload**: Business logo displayed on menu and in QR codes
- **Favicon**: Custom browser tab icon
- **Colors**: Primary, background, text, card background with live preview
- **Typography**: Body and heading font selection with preview

### Layout Styles
1. **Classic**: Traditional single column layout
2. **Modern**: Grid layout with large images
3. **Compact**: Dense list view for mobile optimization
4. **Grid**: Pinterest-style masonry layout

### Contact & Info
- **Contact Details**: Phone (click-to-call), email (mailto), address (Google Maps), website
- **Social Media**: Facebook, Instagram, Twitter with branded icons
- **Opening Hours**: Flexible day-by-day scheduling with "Closed" options
- **WiFi & Notes**: Customer WiFi password, special announcements

### Display Controls
Toggle visibility of:
- Logo display
- Contact information section
- Social media links
- Opening hours
- Additional information

## 🔧 How It Works

### Customization Flow
1. Business owner navigates to **Dashboard > Customization**
2. Uses tabbed interface: Branding, Layout, Contact, Info
3. Makes changes with live preview feedback
4. Clicks "Preview Menu" to test in new tab
5. Saves changes when satisfied

### Theme Application
- CSS variables dynamically applied based on business settings
- Font loading handled automatically
- Layout classes applied conditionally
- Contact section renders based on display preferences

### File Structure
```
components/dashboard/customization/
├── color-picker.tsx          # Interactive color selection
├── font-selector.tsx         # Font family chooser
├── layout-selector.tsx       # Layout style cards
├── logo-uploader.tsx         # Image upload with optimization
├── contact-form.tsx          # Contact information fields
├── opening-hours-editor.tsx  # Day-by-day hours
└── customization-form.tsx    # Main form with tabs

components/menu/
├── themed-menu.tsx           # CSS variable wrapper
├── contact-section.tsx       # Contact info display
└── preview-banner.tsx        # Preview mode indicator

app/(dashboard)/dashboard/customization/
└── page.tsx                  # Main customization page
```

## 🎯 Usage Examples

### Setting Up Colors
1. Go to Customization > Branding tab
2. Click color swatches or use hex input
3. Use preset colors for quick selection
4. Reset button returns to defaults

### Configuring Opening Hours
1. Go to Customization > Info tab
2. Enable "Show Opening Hours" toggle
3. Use presets or custom text formats
4. Copy hours between days for consistency

### Preview Testing
1. Make customization changes
2. Click "Preview Menu" button
3. New tab opens with preview banner
4. Test on mobile and desktop
5. Return to close preview

## 🔒 Security & Performance

### File Upload Security
- 2MB size limit for images
- Image type validation (PNG, JPG, WebP)
- Automatic optimization and resizing
- Supabase RLS policies prevent unauthorized access

### Performance Optimization
- CSS variables for efficient theme switching
- Lazy loading of custom fonts
- Optimized image formats
- Minimal JavaScript for theme application

## 🐛 Troubleshooting

### Common Issues

1. **Storage bucket not found**
   - Verify `business-assets` bucket exists
   - Check RLS policies are correctly set
   - Ensure bucket is marked as public

2. **Theme not applying**
   - Check browser console for CSS errors
   - Verify custom colors are valid hex codes
   - Ensure JavaScript is enabled

3. **Fonts not loading**
   - Check network requests for font files
   - Verify font names are correctly mapped
   - Clear browser cache and reload

4. **Preview not working**
   - Check if popup blocker is enabled
   - Ensure localStorage is accessible
   - Verify preview URL parameters

### TypeScript Errors

The customization system uses `@ts-ignore` for Supabase type limitations:
```typescript
// This is expected due to dynamic schema updates
.update(formData as any)
```

## 📱 Mobile Responsiveness

The customization interface is fully responsive:
- **Tabs**: Stack vertically on mobile
- **Color pickers**: Touch-friendly swatches
- **Font previews**: Scaled for readability
- **Logo upload**: Mobile-optimized file selection

## 🎨 Extending Customization

### Adding New Color Options
1. Update `colorPresets` in `customization-form.tsx`
2. Add new CSS variables in `themed-menu.tsx`
3. Apply classes in menu components

### Adding New Fonts
1. Update `fonts` array in `font-selector.tsx`
2. Add font mapping in `getFontFamily()` function
3. Include font loading in Next.js config

### Adding New Layout Styles
1. Add layout option to `layouts` array
2. Create CSS classes in `themed-menu.tsx`
3. Apply conditional styling in menu components

## ✅ Testing Checklist

- [ ] Database migration applied successfully
- [ ] Storage bucket created with proper policies
- [ ] Logo upload works without errors
- [ ] Color changes apply immediately
- [ ] Font selection shows preview
- [ ] Contact form saves all fields
- [ ] Opening hours editor functions properly
- [ ] Preview opens in new tab correctly
- [ ] Mobile responsive design works
- [ ] All validation messages display
- [ ] Save functionality works
- [ ] Reset to defaults functions

## 🎉 Success Metrics

After setup, business owners can:
1. Upload and display custom logos
2. Match menu colors to their branding
3. Choose appropriate fonts for their style
4. Select optimal layout for their menu
5. Display complete contact information
6. Show accurate opening hours
7. Preview changes before publishing
8. Create a unique branded experience

## 📞 Support

If you encounter issues:
1. Check Supabase Dashboard for database/storage errors
2. Review browser console for JavaScript errors  
3. Verify all environment variables are set
4. Test with a clean browser session
5. Check network connectivity for API calls

The customization system provides a complete solution for menu personalization while maintaining excellent performance and user experience.
