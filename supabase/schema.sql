-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create businesses table
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create menu_items table
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_businesses_user_id ON businesses(user_id);
CREATE INDEX idx_categories_business_id ON categories(business_id);
CREATE INDEX idx_menu_items_category_id ON menu_items(category_id);

-- Enable Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for businesses table
CREATE POLICY "Users can view their own business"
  ON businesses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own business"
  ON businesses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own business"
  ON businesses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own business"
  ON businesses FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view all businesses"
  ON businesses FOR SELECT
  USING (true);

-- RLS Policies for categories table
CREATE POLICY "Users can view categories of their business"
  ON categories FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = categories.business_id
      AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert categories to their business"
  ON categories FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = categories.business_id
      AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update categories of their business"
  ON categories FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = categories.business_id
      AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete categories of their business"
  ON categories FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = categories.business_id
      AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view all categories"
  ON categories FOR SELECT
  USING (true);

-- RLS Policies for menu_items table
CREATE POLICY "Users can view menu items of their business"
  ON menu_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM categories
      JOIN businesses ON businesses.id = categories.business_id
      WHERE categories.id = menu_items.category_id
      AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert menu items to their business"
  ON menu_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM categories
      JOIN businesses ON businesses.id = categories.business_id
      WHERE categories.id = menu_items.category_id
      AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update menu items of their business"
  ON menu_items FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM categories
      JOIN businesses ON businesses.id = categories.business_id
      WHERE categories.id = menu_items.category_id
      AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete menu items of their business"
  ON menu_items FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM categories
      JOIN businesses ON businesses.id = categories.business_id
      WHERE categories.id = menu_items.category_id
      AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view all menu items"
  ON menu_items FOR SELECT
  USING (true);

-- Create storage bucket for menu images (run this in Supabase Dashboard -> Storage)
-- Bucket name: menu-images
-- Public: Yes

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Storage policies for menu-images bucket
CREATE POLICY "Users can upload images to their business folder"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'menu-images' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IN (
      SELECT id::text FROM businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update images in their business folder"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'menu-images' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IN (
      SELECT id::text FROM businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete images from their business folder"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'menu-images' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] IN (
      SELECT id::text FROM businesses WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view all menu images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'menu-images');

