import { Table2 } from 'lucide-react'

interface TableIndicatorProps {
  tableName: string
}

export function TableIndicator({ tableName }: TableIndicatorProps) {
  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-3 mb-4">
      <div className="flex items-center gap-2">
        <Table2 className="h-5 w-5 text-primary" />
        <div>
          <p className="text-sm font-medium text-primary">You&apos;re viewing the menu for</p>
          <p className="text-lg font-bold">{tableName}</p>
        </div>
      </div>
    </div>
  )
}
