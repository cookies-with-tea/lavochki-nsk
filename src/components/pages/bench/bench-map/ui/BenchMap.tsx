import styles from './styles.module.scss'
import { YandexMap } from '@/components/widgets/map'

export const BenchMap = () => {
  return (
    <div className={styles['bench-map']}>
      <YandexMap />
    </div>
  )
}
