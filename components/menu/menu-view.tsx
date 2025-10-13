import { Business, Category, MenuItem, Table as TableType } from '@/types/database'
import { CategorySection } from './category-section'
import { TableIndicator } from './table-indicator'
import { ContactSection } from './contact-section'

interface MenuViewProps {
  business: Business
  categories: Category[]
  items: MenuItem[]
  table?: TableType | null
}

export function MenuView({ business, categories, items, table }: MenuViewProps) {
  return (
    <div className="min-h-screen">
      <header className="border-b menu-item-card">
        <div className="container mx-auto px-4 py-8">
          {business.show_logo && business.logo_url && (
            <img
              src={business.logo_url}
              alt={business.name}
              className="h-16 mb-4"
            />
          )}
          <h1 className="text-4xl font-bold menu-category-title">{business.name}</h1>
          {business.description && (
            <p className="text-muted-foreground mt-2">{business.description}</p>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {table && <TableIndicator tableName={table.name} />}
        {categories.length === 0 || items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Menu coming soon! Please check back later.
            </p>
          </div>
        ) : (
          categories.map((category) => {
            const categoryItems = items.filter(
              item => item.category_id === category.id
            )
            return (
              <CategorySection
                key={category.id}
                category={category}
                items={categoryItems}
              />
            )
          })
        )}
        
        <ContactSection business={business} />
      </main>

      <footer className="border-t bg-card mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Powered by QR Menu Builder</p>
        </div>
      </footer>
    </div>
  )
}


