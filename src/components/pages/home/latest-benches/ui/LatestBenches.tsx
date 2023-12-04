import { Button } from '@/components/shared'
import Link from 'next/link'
import { LatestBench } from '@/components/pages/home/latest-bench'
import styles from './styles.module.scss'
import { BENCHES_MOCK_DATA } from '@/shared/mocks/benches'

export const LatestBenches = () => {
  return (
    <section className={styles['latest-benches']}>
      <div className={styles['latest-benches__header']}>
        <h3>Последние добавленные</h3>

        <Button as={Link} href={'/benches'}>Смотреть все</Button>
      </div>

      <div className={styles['latest-benches__content']}>
        { BENCHES_MOCK_DATA.items.map((bench, index) => (
          <LatestBench key={index} bench={bench} />
        )) }
      </div>
    </section>
  )
}
