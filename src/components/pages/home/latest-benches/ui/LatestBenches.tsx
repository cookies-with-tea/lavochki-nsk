import { Button } from '@/components/shared'
import Link from 'next/link'
import { LatestBench } from '@/components/pages/home/latest-bench'
import styles from './styles.module.scss'

export const LatestBenches = () => {
  return (
    <section className={styles['latest-benches']}>
      <div className={styles['latest-benches__header']}>
        <h3>Последние добавленные</h3>

        <Button as={Link} href={'/benches'}>Смотреть все</Button>
      </div>

      <div className="latest-benches__content">
        <LatestBench />
      </div>
    </section>
  )
}
