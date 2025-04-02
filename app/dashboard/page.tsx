import { requireUser } from '@/lib/hooks'
import React from 'react'

const DashboardPage = async () => {
    const session = await requireUser()
  return (
    <div>
      Hello from dashboard
    </div>
  )
}

export default DashboardPage
