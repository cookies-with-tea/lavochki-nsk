import styles from './styles.module.scss'
import { YandexMap } from '@/components/widgets/map'
import { Button } from '@/components/shared'
import Link from 'next/link'

export const BenchMap = () => {
  return (
    <div className={styles['bench-map']}>
      {/* DEBT: Узнать что будет происходить */}
      {/*<Button as={Link} appearance={'link-underline'} href={'/'}>Смотреть на карте</Button>*/}

      <YandexMap />

      <p className={styles['bench-map__coordinates']}>
        55.0415, 82.9346
      </p>
    </div>
  )
}
