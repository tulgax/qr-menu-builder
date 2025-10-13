# Business Assets Storage Bucket Setup

Follow these steps to create the `business-assets` bucket in Supabase Dashboard:

## Step 1: Create Bucket

1. Go to your Supabase Dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **"New bucket"** button
4. Enter bucket name: `business-assets`
5. Set **Public bucket**: ✅ Yes (check this box)
6. Click **"Create bucket"**

## Step 2: Configure RLS Policies

After creating the bucket, set up Row Level Security policies:

1. In the Storage section, click on the **`business-assets`** bucket
2. Click on the **"Policies"** tab
3. Click **"New policy"** and create the following policies:

### Policy 1: Users can upload to their business folder

- **Policy name**: `Users can upload to their business folder`
- **Allowed operation**: INSERT
- **Target roles**: authenticated
- **Policy definition**:

```sql
(bucket_id = 'business-assets'::text) 
AND (auth.role() = 'authenticated'::text) 
AND ((storage.foldername(name))[1] = ANY (
  SELECT (businesses.id)::text
  FROM businesses
  WHERE (businesses.user_id = auth.uid())
))
```

### Policy 2: Users can update their business assets

- **Policy name**: `Users can update their business assets`
- **Allowed operation**: UPDATE
- **Target roles**: authenticated
- **Policy definition**:

```sql
(bucket_id = 'business-assets'::text) 
AND (auth.role() = 'authenticated'::text) 
AND ((storage.foldername(name))[1] = ANY (
  SELECT (businesses.id)::text
  FROM businesses
  WHERE (businesses.user_id = auth.uid())
))
```

### Policy 3: Users can delete their business assets

- **Policy name**: `Users can delete their business assets`
- **Allowed operation**: DELETE
- **Target roles**: authenticated
- **Policy definition**:

```sql
(bucket_id = 'business-assets'::text) 
AND (auth.role() = 'authenticated'::text) 
AND ((storage.foldername(name))[1] = ANY (
  SELECT (businesses.id)::text
  FROM businesses
  WHERE (businesses.user_id = auth.uid())
))
```

### Policy 4: Public can view all business assets

- **Policy name**: `Public can view all business assets`
- **Allowed operation**: SELECT
- **Target roles**: public
- **Policy definition**:

```sql
bucket_id = 'business-assets'::text
```

## Step 3: Verify

After creating all policies, verify by checking that you have:
- ✅ 1 public bucket named `business-assets`
- ✅ 4 policies (INSERT, UPDATE, DELETE for authenticated users, SELECT for public)

## What This Bucket Stores

- Business logos (displayed on menu)
- Favicons (browser tab icons)
- Future: Banner images, custom graphics

## File Structure

Files will be stored in the following structure:
```
business-assets/
  ├── {business-id}/
  │   ├── logo.png
  │   ├── favicon.png
  │   └── ...
```

This ensures each business can only access their own assets.


