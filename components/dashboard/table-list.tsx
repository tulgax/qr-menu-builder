'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TableForm } from './table-form'
import { toast } from 'sonner'
import { Table as TableType } from '@/types/database'
import { Pencil, Trash2, QrCode, Users, MapPin, Plus } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import Link from 'next/link'

interface TableListProps {
  initialTables: TableType[]
  businessId: string
}

export function TableList({ initialTables, businessId }: TableListProps) {
  const [tables, setTables] = useState<TableType[]>(initialTables)
  const [selectedTable, setSelectedTable] = useState<TableType | undefined>()
  const [formOpen, setFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [tableToDelete, setTableToDelete] = useState<TableType | null>(null)
  const supabase = createClient()

  const refreshTables = async () => {
    const { data } = await supabase
      .from('tables')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })

    if (data) {
      setTables(data)
    }
  }

  const handleEdit = (table: TableType) => {
    setSelectedTable(table)
    setFormOpen(true)
  }

  const handleCreate = () => {
    setSelectedTable(undefined)
    setFormOpen(true)
  }

  const handleDeleteClick = (table: TableType) => {
    setTableToDelete(table)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!tableToDelete) return

    const { error } = await supabase
      .from('tables')
      .delete()
      .eq('id', tableToDelete.id)

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Table deleted successfully')
      refreshTables()
    }
    setDeleteDialogOpen(false)
    setTableToDelete(null)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tables</CardTitle>
              <CardDescription>
                Manage your restaurant tables and floor plan
              </CardDescription>
            </div>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Table
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {tables.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No tables yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first table to get started with your floor plan
              </p>
              <Button onClick={handleCreate}>Create Table</Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tables.map((table) => (
                <Card key={table.id} className={!table.is_active ? 'opacity-60' : ''}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{table.name}</CardTitle>
                        {table.location && (
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {table.location}
                          </CardDescription>
                        )}
                      </div>
                      <Badge variant={table.is_active ? 'default' : 'secondary'}>
                        {table.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{table.capacity} seats</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/tables/${table.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <QrCode className="mr-2 h-4 w-4" />
                          View QR
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(table)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteClick(table)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <TableForm
        businessId={businessId}
        table={selectedTable}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSuccess={refreshTables}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &quot;{tableToDelete?.name}&quot; and all its scan history.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
