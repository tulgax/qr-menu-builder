# Supabase Storage Setup Guide

## The Issue
You're getting "must be owner of table objects" error because you can't directly modify storage policies through SQL Editor as a regular user.

## ✅ Correct Solution: Use Supabase Dashboard

### Method 1: Through Storage Settings (Recommended)

1. **Go to your Supabase Dashboard**
2. **Navigate to Storage** (left sidebar)
3. **Click on your `menu-images` bucket**
4. **Go to "Policies" tab**
5. **Click "New Policy"**
6. **Create these 4 policies:**

#### Policy 1: Allow Upload
- **Policy name:** `Users can upload images to their business folder`
- **Allowed operation:** `INSERT`
- **Target roles:** `authenticated`
- **USING expression:** `bucket_id = 'menu-images'`
- **WITH CHECK expression:** 
```sql
bucket_id = 'menu-images' 
AND auth.role() = 'authenticated'
AND (storage.foldername(name))[1] IN (
  SELECT id::text FROM businesses WHERE user_id = auth.uid()
)
```

#### Policy 2: Allow Update
- **Policy name:** `Users can update images in their business folder`
- **Allowed operation:** `UPDATE`
- **Target roles:** `authenticated`
- **USING expression:**
```sql
bucket_id = 'menu-images' 
AND auth.role() = 'authenticated'
AND (storage.foldername(name))[1] IN (
  SELECT id::text FROM businesses WHERE user_id = auth.uid()
)
```

#### Policy 3: Allow Delete
- **Policy name:** `Users can delete images from their business folder`
- **Allowed operation:** `DELETE`
- **Target roles:** `authenticated`
- **USING expression:**
```sql
bucket_id = 'menu-images' 
AND auth.role() = 'authenticated'
AND (storage.foldername(name))[1] IN (
  SELECT id::text FROM businesses WHERE user_id = auth.uid()
)
```

#### Policy 4: Allow Public Read
- **Policy name:** `Public can view all menu images`
- **Allowed operation:** `SELECT`
- **Target roles:** `public`
- **USING expression:** `bucket_id = 'menu-images'`

### Method 2: Alternative - Use Service Role Key

If you have access to the service role key, you can use the Supabase CLI or create a temporary script with elevated permissions.

## Quick Test

After setting up the policies, test image upload in your app. It should work immediately!

## What These Policies Do

- ✅ Authenticated users can upload images to folders named with their business ID
- ✅ Users can only modify images in their own business folder
- ✅ Anyone can view images (for public menu display)
- ✅ Images are organized by business ID for security
