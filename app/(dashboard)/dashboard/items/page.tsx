import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { MenuItemList } from '@/components/dashboard/menu-item-list'
import { Business, Category } from '@/types/database'

export default async function MenuItemsPage() {
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

  const { data: categoriesData } = await supabase
    .from('categories')
    .select('*')
    .eq('business_id', business.id)
    .order('display_order', { ascending: true })

  const categories: Category[] = categoriesData || []
  const categoryIds = categories.map(c => c.id)

  const { data: items } = categoryIds.length > 0 
    ? await supabase
        .from('menu_items')
        .select('*')
        .in('category_id', categoryIds)
        .order('display_order', { ascending: true })
    : { data: [] }

  return (
    <MenuItemList 
      initialItems={items || []} 
      categories={categories || []}
      businessId={business.id}
    />
  )
}


