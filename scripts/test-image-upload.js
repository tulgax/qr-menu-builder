/**
 * Test Image Upload to Supabase Storage
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

async function testImageUpload() {
  console.log('\n🔍 Testing Image Upload...\n')

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const supabase = createClient(url, key)

  // Create a simple test image (1x1 pixel PNG)
  const testImageBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', 'base64')
  
  try {
    console.log('1. Uploading test image...\n')
    
    const fileName = `test/${Date.now()}-test.png`
    
    const { data, error } = await supabase.storage
      .from('menu-images')
      .upload(fileName, testImageBuffer, {
        contentType: 'image/png',
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.log('❌ Upload failed:', error.message)
      console.log('\nPossible issues:')
      console.log('- Bucket permissions not set correctly')
      console.log('- RLS policies blocking upload')
      console.log('- Storage bucket not public')
      return
    }

    console.log('✅ Upload successful!')
    console.log(`   File path: ${data.path}`)

    console.log('\n2. Getting public URL...\n')
    
    const { data: urlData } = supabase.storage
      .from('menu-images')
      .getPublicUrl(fileName)

    console.log('✅ Public URL generated:')
    console.log(`   ${urlData.publicUrl}`)

    console.log('\n3. Listing files in bucket...\n')
    
    const { data: files, error: listError } = await supabase.storage
      .from('menu-images')
      .list()

    if (listError) {
      console.log('⚠️  Cannot list files:', listError.message)
    } else {
      console.log('✅ Files in bucket:')
      files.forEach(file => {
        console.log(`   - ${file.name} (${file.metadata?.size} bytes)`)
      })
    }

    console.log('\n🎉 Image upload is working correctly!')
    console.log('\nIf images still don\'t show in your app, check:')
    console.log('1. Image URLs are being saved correctly in database')
    console.log('2. Image components are using the correct URL')
    console.log('3. CORS settings allow image access')

  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

testImageUpload()
