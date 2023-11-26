import styles from '@/styles/pages/home-page.module.scss'
import { generateClassNames } from '@/shared/lib/utils'
import { YandexMap } from '@/components/widgets/map'
import { LatestBenches } from '@/components/pages/home/latest-benches'

export default function Home() {
  return (
    <div className={generateClassNames([styles['home-page'], 'container'])}>
      <div>
        <h1 className={'mt-62'}>
          Расположение лавочек
        </h1>

        <YandexMap className={'mt-40'} />

        <LatestBenches />
      </div>
    </div>
  )
}
