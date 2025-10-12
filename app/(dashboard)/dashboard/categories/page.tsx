import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CategoryList } from '@/components/dashboard/category-list'
import { Business } from '@/types/database'

export default async function CategoriesPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { data: businessData } = await supabase
    .from('businesses')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!businessData) {
    redirect('/onboarding')
  }

  const business: Business = businessData

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('business_id', business.id)
    .order('display_order', { ascending: true })

  return <CategoryList initialCategories={categories || []} businessId={business.id} />
}


