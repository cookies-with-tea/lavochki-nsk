import styles from './styles.module.scss'
import { LatestBenchSlider } from '@/components/pages/home/latest-bench/latest-bench-slider'
import { BENCHES_MOCK_DATA } from '@/shared/mocks/benches'

export const NearBenches = () => {
  return (
    <div className={styles['near-benches']}>
      <h2>Лавочки рядом</h2>

      <div className={styles['near-benches__content']}>
        {/* TODO: Вынести компонент с возможностью изменения конфига */}
        <LatestBenchSlider images={BENCHES_MOCK_DATA.items[0].images} />
      </div>
    </div>
  )
}
