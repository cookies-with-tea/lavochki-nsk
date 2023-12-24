import styles from './styles.module.scss'
import { BenchTypes } from '@/shared/types/bench'
import { BaseImage } from '@/components/shared/image'
import { Button } from '@/components/shared'
import Link from 'next/link'
import cn from 'classnames'

interface IBenchCardProps {
  bench: BenchTypes.One
}

export const BenchCard = ({ bench }: IBenchCardProps) => {
  const tagsList = bench.tags.map((tag) => (
    <button className={styles['bench-card__tag']} key={tag.id}>
      #{ tag.title }
    </button>
  ))

  return (
    <article className={cn('bench-card', styles['bench-card'])}>
      <BaseImage
        priority
        src={bench.images[0]}
        alt={''}
        width={300}
        height={202}
      />

      <div className={styles['bench-card__content']}>
        <h5 className={styles['bench-card__title']}>Лавочка #{bench.id}</h5>

        <div className={styles['bench-card__tags']}>
          { tagsList }
        </div>

        <Button appearance={'secondary'} size={'xs'} as={Link} href={`/bench/${bench.id}`} className={styles['bench-card__open-link']}>
          Открыть
        </Button>
      </div>
    </article>
  )
}
