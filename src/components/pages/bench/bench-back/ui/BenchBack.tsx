'use client'

import { Button, Icon } from '@/components/shared'
import { useRouter } from 'next/navigation'
import { useScreen } from '@/shared/lib/hooks'

export const BenchBack = () => {
  const { isMobile } = useScreen()

  const router = useRouter()

  return (
    <>
      {
        isMobile ? null : (
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
    </>
  )
}
