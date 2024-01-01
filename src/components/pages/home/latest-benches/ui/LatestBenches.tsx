'use client'

import { Button, Icon } from '@/components/shared'
import Link from 'next/link'
import { LatestBench } from '@/components/pages/home/latest-bench'
import styles from './styles.module.scss'
import { BENCHES_MOCK_DATA } from '@/shared/mocks/benches'
import { useScreen } from '@/shared/lib/hooks'

export const LatestBenches = () => {
  const { isMobile } = useScreen()

  const latestBenches = BENCHES_MOCK_DATA.items.map((bench, index) => (
    <LatestBench key={index} bench={bench} />
  ))

  const LatestBenchesHeaderDesktop = () => {
    return (
      <div className={styles['latest-benches__header']}>
        <h3>Последние добавленные</h3>

        <Button as={Link} href={'/benches'} size={isMobile ? 'xs' : 'md'}>Смотреть все</Button>
      </div>
    )
  }

  const LatestBenchesHeaderMobile = () => {
    return (
      <Link href={'/benches'} className={styles['latest-benches__header']}>
        <h3>Последние добавленные</h3>

        <Icon name={'arrow'} />
      </Link>
    )
  }

  return (
    <section className={styles['latest-benches']}>
      { isMobile ? <LatestBenchesHeaderMobile /> : <LatestBenchesHeaderDesktop /> }

      <div className={styles['latest-benches__content']}>
        { latestBenches }
      </div>
    </section>
  )
}
