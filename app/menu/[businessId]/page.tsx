import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { MenuView } from '@/components/menu/menu-view'
import { TableScanLogger } from '@/components/menu/table-scan-logger'
import { Business, Category, Table as TableType } from '@/types/database'

interface PublicMenuPageProps {
  params: Promise<{ businessId: string }>
  searchParams: Promise<{ table?: string }>
}

export default async function PublicMenuPage({
  params,
  searchParams,
}: PublicMenuPageProps) {
  const { businessId } = await params
  const { table: tableId } = await searchParams
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

  // Get table info if tableId is provided
  let table: TableType | null = null
  if (tableId) {
    const { data: tableData } = await supabase
      .from('tables')
      .select('*')
      .eq('id', tableId)
      .eq('business_id', businessId)
      .single()

    if (tableData) {
      table = tableData as TableType
    }
  }

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
    <>
      {table && <TableScanLogger tableId={table.id} />}
      <MenuView
        business={business}
        categories={categories || []}
        items={items || []}
        table={table}
      />
    </>
  )
}


