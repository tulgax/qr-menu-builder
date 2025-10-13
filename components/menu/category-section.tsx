import { Category, MenuItem } from '@/types/database'
import { MenuItemCard } from './menu-item-card'

interface CategorySectionProps {
  category: Category
  items: MenuItem[]
}

export function CategorySection({ category, items }: CategorySectionProps) {
  const availableItems = items.filter(item => item.is_available)
  
  if (availableItems.length === 0) {
    return null
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold border-b pb-2 menu-category-title">{category.name}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {availableItems.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}


