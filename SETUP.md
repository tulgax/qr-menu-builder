# QR Menu Builder - Supabase Setup Guide

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Select your project (or create a new one)
3. Go to **Project Settings** > **API**
4. Copy these values:
   - **Project URL** (starts with `https://...supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 2: Add Environment Variables

Create or update `.env.local` in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 3: Create Database Tables

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents from `supabase/schema.sql`
4. Click **Run** to execute the SQL

This will create:
- `businesses` table
- `categories` table  
- `menu_items` table
- All necessary indexes
- Row Level Security (RLS) policies

## Step 4: Create Storage Bucket for Images

1. In Supabase dashboard, go to **Storage**
2. Click **New bucket**
3. Name it: `menu-images`
4. **Make it public** (check the public bucket option)
5. Click **Create bucket**

## Step 5: Configure Storage Policies (Optional but Recommended)

In the Storage section, click on `menu-images` bucket, then **Policies**:

### Allow authenticated users to upload:
```sql
CREATE POLICY "Authenticated users can upload menu images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'menu-images');
```

### Allow public read access:
```sql
CREATE POLICY "Public can view menu images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'menu-images');
```

### Allow users to update their own images:
```sql
CREATE POLICY "Users can update their own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'menu-images');
```

### Allow users to delete their own images:
```sql
CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'menu-images');
```

## Step 6: Test the Setup

1. Run your development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000

3. Try to:
   - Sign up for a new account
   - Create your business profile
   - Add a category
   - Add a menu item with an image
   - Generate and download QR code
   - View your public menu at `/menu/[your-business-id]`

## Troubleshooting

### "Invalid API key" error
- Double-check your `.env.local` file has the correct credentials
- Restart your dev server after updating environment variables

### "Permission denied" errors
- Make sure you ran the RLS policies from `supabase/schema.sql`
- Check that the Storage bucket is set to public

### Images not uploading
- Verify the `menu-images` bucket exists and is public
- Check Storage policies are set correctly

### Build errors with TypeScript
- Make sure `.env.local` exists with valid credentials
- The Supabase client needs environment variables to properly type the database

## Next Steps

Once everything is working:

1. Customize your business profile
2. Add your menu categories and items
3. Download your QR code
4. Print and place QR codes on your tables
5. Test scanning the QR code with your phone

## Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

Your menu will be live and accessible via QR codes!

