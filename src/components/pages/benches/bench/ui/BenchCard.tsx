import styles from './styles.module.scss'
import { BenchTypes } from '@/shared/types/bench'

interface IBenchCardProps {
  bench: BenchTypes.One
}

export const BenchCard = ({ bench }: IBenchCardProps) => {
  return (
    <div className={styles['bench-card']}>
      Лавочка #{bench.id}
    </div>
  )
}
