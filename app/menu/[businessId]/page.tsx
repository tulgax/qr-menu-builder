import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { MenuView } from '@/components/menu/menu-view'
import { Business, Category } from '@/types/database'

export default async function PublicMenuPage({
  params,
}: {
  params: Promise<{ businessId: string }>
}) {
  const { businessId } = await params
  const supabase = await createClient()

  const { data: businessData } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', businessId)
    .single()

  if (!businessData) {
    notFound()
  }

  const business: Business = businessData

  const { data: categoriesData } = await supabase
    .from('categories')
    .select('*')
    .eq('business_id', businessId)
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
    <MenuView
      business={business}
      categories={categories || []}
      items={items || []}
    />
  )
}


