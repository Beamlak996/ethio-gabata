import { Heading } from '@/components/heading'
import { PackageCard } from '@/components/package-card'
import { PackagesList } from '@/components/packages-list'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { currentRole } from '@/lib/auths'
import { UserRole } from '@prisma/client'
import { Plus } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import { PackageHeader } from '../_components/package-header'

const PackagesPage = async () => {
  const userRole = await currentRole()

  if(userRole !== UserRole.ADMIN) {
    return redirect('/')
  }

  return (
    <div className='p-6 bg-slate-50' >
        <PackageHeader />
        <Separator className='mt-4 mb-6' />
        <PackagesList />
    </div>
  )
}

export default PackagesPage