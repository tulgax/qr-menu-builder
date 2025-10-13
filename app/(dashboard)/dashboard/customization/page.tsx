import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { CustomizationForm } from '@/components/dashboard/customization/customization-form'
import { Business } from '@/types/database'

export default async function CustomizationPage() {
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
    <div className="space-y-6">
      <DashboardHeader 
        title="Menu Customization"
      />
      
      <CustomizationForm business={business} />
    </div>
  )
}
