/**
 * Fix Storage Policies for Image Upload
 * This script will help you apply the storage policies to your Supabase project
 */

console.log('\n🔧 Storage Policies Fix\n')
console.log('The image upload is failing because of Row Level Security (RLS) policies.')
console.log('You need to run the following SQL in your Supabase SQL Editor:\n')

console.log('-- Copy and paste this into Supabase SQL Editor:\n')
console.log(`
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
`)

console.log('\n📋 Steps to fix:\n')
console.log('1. Go to your Supabase Dashboard')
console.log('2. Navigate to SQL Editor')
console.log('3. Create a new query')
console.log('4. Copy and paste the SQL above')
console.log('5. Click "Run"')
console.log('\nAfter running this, your image uploads should work! 🎉\n')

console.log('💡 Alternative: You can also run this from the updated supabase/schema.sql file')
console.log('   Just copy the storage policies section and run it in SQL Editor.\n')
