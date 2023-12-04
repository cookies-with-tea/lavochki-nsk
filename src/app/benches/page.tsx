import { Button } from '@/components/shared'
import styles from '@/styles/pages/benches.module.scss'
import { AllBenchesSort } from '@/components/pages/benches/all-benches-sort'
import { BENCHES_MOCK_DATA } from '@/shared/mocks/benches'
import { BenchCard } from '@/components/pages/benches/bench'

export default function BenchesPage() {
  return (
    <div className={styles['benches-page']}>
      <div className={'container'}>
        <div className={styles['benches-page__header']}>
          <div className={styles['benches-page__header-top']}>
            <h1 className={styles['benches-page__title']}>
              Все лавочки
            </h1>

            <Button appearance={'link-underline'}>Показать на карте</Button>
          </div>
        </div>

        <div className={styles['benches-page__content']}>
          <aside className={styles['benches-page__filters']}>
            Aside
          </aside>

          <div className={styles['benches-page__benches-content']}>
            <AllBenchesSort />

            <div className={styles['benches-page__list']}>
              {
                BENCHES_MOCK_DATA.items.map((bench) => (
                  <BenchCard key={bench.id} bench={bench} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
