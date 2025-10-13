-- Migration for menu customization feature
-- Run this in Supabase SQL Editor

-- Add customization columns to businesses table
ALTER TABLE businesses 
  -- Logo
  ADD COLUMN IF NOT EXISTS logo_url TEXT,
  ADD COLUMN IF NOT EXISTS favicon_url TEXT,
  
  -- Colors (stored as hex codes)
  ADD COLUMN IF NOT EXISTS primary_color TEXT DEFAULT '#8B5CF6',
  ADD COLUMN IF NOT EXISTS background_color TEXT DEFAULT '#FFFFFF',
  ADD COLUMN IF NOT EXISTS text_color TEXT DEFAULT '#000000',
  ADD COLUMN IF NOT EXISTS card_background_color TEXT DEFAULT '#F9FAFB',
  
  -- Typography
  ADD COLUMN IF NOT EXISTS font_family TEXT DEFAULT 'system',
  ADD COLUMN IF NOT EXISTS heading_font_family TEXT DEFAULT 'system',
  
  -- Layout
  ADD COLUMN IF NOT EXISTS layout_style TEXT DEFAULT 'classic',
  ADD COLUMN IF NOT EXISTS menu_width TEXT DEFAULT 'standard',
  
  -- Contact Info
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS address TEXT,
  ADD COLUMN IF NOT EXISTS website TEXT,
  
  -- Social Media
  ADD COLUMN IF NOT EXISTS facebook_url TEXT,
  ADD COLUMN IF NOT EXISTS instagram_url TEXT,
  ADD COLUMN IF NOT EXISTS twitter_url TEXT,
  
  -- Additional Info
  ADD COLUMN IF NOT EXISTS opening_hours JSONB,
  ADD COLUMN IF NOT EXISTS wifi_password TEXT,
  ADD COLUMN IF NOT EXISTS additional_notes TEXT,
  
  -- Display Options
  ADD COLUMN IF NOT EXISTS show_logo BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS show_contact_info BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS show_social_links BOOLEAN DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS show_opening_hours BOOLEAN DEFAULT FALSE,
  
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for businesses table
DROP TRIGGER IF EXISTS update_businesses_updated_at ON businesses;
CREATE TRIGGER update_businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Verify the columns were added
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'businesses'
  AND column_name IN (
    'logo_url', 'favicon_url', 'primary_color', 'background_color', 
    'text_color', 'card_background_color', 'font_family', 'heading_font_family',
    'layout_style', 'menu_width', 'phone', 'email', 'address', 'website',
    'facebook_url', 'instagram_url', 'twitter_url', 'opening_hours',
    'wifi_password', 'additional_notes', 'show_logo', 'show_contact_info',
    'show_social_links', 'show_opening_hours', 'updated_at'
  )
ORDER BY ordinal_position;


