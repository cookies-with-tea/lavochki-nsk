'use client'

import { Button, Icon } from '@/components/shared'
import { useRouter } from 'next/navigation'

export const BenchBack = () => {
  const router = useRouter()

  return (
    <Button
      appearance={'secondary'}
      size={'sm'}
      prefixIcon={<Icon reversed name={'arrow'} />}
      onClick={() => router.back()}
    >
      Назад
    </Button>
  )
}
