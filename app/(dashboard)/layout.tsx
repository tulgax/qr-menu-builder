import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Business } from '@/types/database'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

  return (
    <SidebarProvider>
      <AppSidebar 
        businessName={business.name}
        userName={user.email?.split('@')[0] || 'User'}
        userEmail={user.email || ''}
      />
      <SidebarInset>
        <main className="flex flex-1 flex-col">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}


