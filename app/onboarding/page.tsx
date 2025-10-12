'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { Database } from '@/types/database'

type BusinessInsert = Database['public']['Tables']['businesses']['Insert']

export default function OnboardingPage() {
  const [businessName, setBusinessName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        
        // Check if business already exists
        const { data: existingBusiness } = await supabase
          .from('businesses')
          .select('id')
          .eq('user_id', user.id)
          .single()
        
        if (existingBusiness) {
          router.push('/dashboard')
        }
      } else {
        router.push('/login')
      }
    }
    getUser()
  }, [supabase, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!userId) {
      toast.error('User not authenticated')
      return
    }

    setLoading(true)

    try {
      const newBusiness: BusinessInsert = {
        user_id: userId,
        name: businessName,
        description: description || null,
      }
      
      const { error } = await supabase
        .from('businesses')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .insert(newBusiness)

      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Business created successfully!')
        router.push('/dashboard')
        router.refresh()
      }
    } catch {
      toast.error('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Set up your business</CardTitle>
          <CardDescription>Tell us about your restaurant or café</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                type="text"
                placeholder="My Restaurant"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Tell customers about your business..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
          <CardContent>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating...' : 'Continue to Dashboard'}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}


