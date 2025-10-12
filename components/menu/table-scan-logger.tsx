'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface TableScanLoggerProps {
  tableId: string
}

export function TableScanLogger({ tableId }: TableScanLoggerProps) {
  useEffect(() => {
    const logScan = async () => {
      const supabase = createClient()
      
      // Get user agent and try to get IP (note: IP detection is limited client-side)
      const userAgent = navigator.userAgent
      
      // Log the scan
      // @ts-expect-error Supabase type limitation
      await supabase.from('table_scans').insert({
        table_id: tableId,
        user_agent: userAgent,
        ip_address: null, // IP detection would need server-side implementation
      })
    }

    // Log scan on mount
    logScan()
  }, [tableId])

  return null // This component doesn't render anything
}
