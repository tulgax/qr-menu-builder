import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { QRGenerator } from '@/components/dashboard/qr-generator'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Business } from '@/types/database'

export default async function QRCodePage() {
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
    <>
      <DashboardHeader 
        title="QR Code" 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "QR Code" }
        ]}
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="max-w-2xl mx-auto">
          <QRGenerator businessId={business.id} businessName={business.name} />
        </div>
      </div>
    </>
  )
}


