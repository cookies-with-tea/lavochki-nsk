import { Metadata } from 'next'
import styles from '@/styles/pages/bench.module.scss'
import { BenchSlider } from '@/components/pages/bench/bench-slider'
import { BenchMap } from '@/components/pages/bench/bench-map'
import { Button, Icon } from '@/components/shared'
import Link from 'next/link'
import { BenchTypes } from '@/shared/types/bench'
import { BENCHES_MOCK_DATA } from '@/shared/mocks/benches'
import { BenchComments } from '@/components/pages/bench/bench-comments'
import { BenchBack } from '@/components/pages/bench/bench-back'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
  title: 'Детальная лавочка',
  openGraph: {
    title: 'Детальная лавочка',
  },
}

// export async function generateMetadata({ params }: Props): Promise<Promise<Metadata> | any> {
//   const id = params.id
//
//     return {
//     id,
//   }
// }

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Promise<Metadata> | any> {
//   // read route params
//   const id = params.id
//
//   // // fetch data
//   // const product = await fetch(`https://.../${id}`).then((res) => res.json())
//   //
//   // // optionally access and extend (rather than replace) parent metadata
//   // const previousImages = (await parent).openGraph?.images || []
//   //
//   // return {
//   //   title: product.title,
//   //   openGraph: {
//   //     images: ['/some-specific-page-image.jpg', ...previousImages],
//   //   },
//   // }
//
//   return {
//     id,
//   }
// }
export default function DetailBench({ params }: Props) {
  const bench = BENCHES_MOCK_DATA.items.find((_bench) => params.id === _bench.id)

  return (
    <div className={styles['bench-page']}>
      <div className={'container'}>
        <div className={styles['bench-page__header']}>
          <h1>Лавочка №1</h1>

          <BenchBack />
        </div>


        <div className={styles['bench-page__create-info']}>
          <p>Добавлено: 15 октября 2022</p>

          <p>Автор: Дмитрий</p>
        </div>

        <div className={styles['bench-page__create-tags']}>
          <Button as={Link} appearance={'link'} size={'sm'} href={'/benches?tags=nearShops'} className={styles['bench-page__create-tag']}>
            #Магазин рядом
          </Button>

          <Button as={Link} appearance={'link'} size={'sm'} href={'/benches?tags=nearShops'} className={styles['bench-page__create-tag']}>
            #Магазин рядом
          </Button>
        </div>

        <div>
          <BenchSlider images={bench.images} />

          <BenchMap />

          <BenchComments />
        </div>
      </div>
    </div>
  )
}
