/**
 * Database Tables Test
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

async function testDatabase() {
  console.log('\n🔍 Testing Database Tables...\n')

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const supabase = createClient(url, key)

  const tables = ['businesses', 'categories', 'menu_items']
  let allTablesExist = true

  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(0)

      if (error) {
        console.log(`❌ ${table} table: NOT FOUND or ERROR`)
        console.log(`   Error: ${error.message}\n`)
        allTablesExist = false
      } else {
        console.log(`✅ ${table} table: EXISTS`)
      }
    } catch (err) {
      console.log(`❌ ${table} table: ERROR - ${err.message}`)
      allTablesExist = false
    }
  }

  if (allTablesExist) {
    console.log('\n✅ All database tables are set up correctly!')
    console.log('\n🎉 Your Supabase is fully configured!')
    console.log('\nYou can now run: npm run dev\n')
  } else {
    console.log('\n⚠️  Some tables are missing.')
    console.log('\nPlease run the SQL from supabase/schema.sql in your Supabase dashboard:')
    console.log('1. Go to SQL Editor in Supabase dashboard')
    console.log('2. Create a new query')
    console.log('3. Copy and paste the contents of supabase/schema.sql')
    console.log('4. Click Run\n')
  }
}

testDatabase()

