/**
 * Supabase Connection Verification Script
 * 
 * Run this to verify your Supabase connection is working:
 * node scripts/verify-supabase.js
 */

require('dotenv').config({ path: '.env.local' })

async function verifySupabaseConnection() {
  console.log('\n🔍 Verifying Supabase Connection...\n')

  // Check environment variables
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error('❌ Error: Environment variables not found!')
    console.log('\nPlease create a .env.local file with:')
    console.log('NEXT_PUBLIC_SUPABASE_URL=your_url')
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key\n')
    process.exit(1)
  }

  console.log('✅ Environment variables found')
  console.log(`   URL: ${url}`)
  console.log(`   Key: ${key.substring(0, 20)}...\n`)

  try {
    // Try to import Supabase client
    const { createClient } = require('@supabase/supabase-js')
    const supabase = createClient(url, key)

    console.log('✅ Supabase client created\n')

    // Test connection by checking tables
    console.log('🔍 Checking database tables...\n')

    const { data: businesses, error: bizError } = await supabase
      .from('businesses')
      .select('count')
      .limit(0)

    if (bizError) {
      if (bizError.message.includes('relation') || bizError.message.includes('does not exist')) {
        console.log('⚠️  Tables not found. Please run the SQL schema from supabase/schema.sql')
      } else {
        console.log('❌ Database error:', bizError.message)
      }
    } else {
      console.log('✅ businesses table exists')
    }

    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('count')
      .limit(0)

    if (!catError) {
      console.log('✅ categories table exists')
    }

    const { data: menuItems, error: itemError } = await supabase
      .from('menu_items')
      .select('count')
      .limit(0)

    if (!itemError) {
      console.log('✅ menu_items table exists')
    }

    // Check storage bucket
    console.log('\n🔍 Checking storage bucket...\n')

    const { data: buckets, error: bucketError } = await supabase
      .storage
      .listBuckets()

    if (bucketError) {
      console.log('⚠️  Could not check storage:', bucketError.message)
    } else {
      const menuBucket = buckets.find(b => b.name === 'menu-images')
      if (menuBucket) {
        console.log('✅ menu-images bucket exists')
        console.log(`   Public: ${menuBucket.public ? 'Yes' : 'No'}`)
      } else {
        console.log('⚠️  menu-images bucket not found. Please create it in Supabase dashboard.')
      }
    }

    console.log('\n✅ Supabase connection verified!\n')
    console.log('You can now run: npm run dev\n')

  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('\nMake sure you have installed dependencies:')
    console.log('npm install\n')
    process.exit(1)
  }
}

verifySupabaseConnection()

