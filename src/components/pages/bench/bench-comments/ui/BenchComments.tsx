import styles from './styles.module.scss'
import { Button, Form, Icon, Input } from '@/components/shared'
import { FormEvent } from 'react'
import { COMMENTS_MOCK_DATA } from '@/shared/mocks/benches'
import { BenchComment } from '@/components/pages/bench/bench-comment'
import { benchCommentsConfig } from '@/components/pages/bench/bench-comments/config'
import { NearBenches } from '@/components/pages/bench/near-benches'

export const BenchComments = () => {
  const InputFooter = () => {
    return (
      <div className={styles['bench-comments__send-footer']}>
        {/*  TODO: Добавить uploader */}
        <button type={'button'}>
          <Icon name={'image'} />
        </button>

        <Button appearance={'secondary'} size={'xs'}>
          Отправить
        </Button>
      </div>
    )
  }

  const benchComments = COMMENTS_MOCK_DATA.map((comment) => {
    return (
      <BenchComment comment={comment} key={comment.id} />
    )
  })

  return (
    <div className={styles['bench-comments']}>
      <div className={styles['bench-comments__header']}>
        <div className={styles['bench-comments__header-title']}>
          <h3>Комментарии</h3>

          <p>8</p>
        </div>

        {/* DEBT: Нет дизайна фильтров */}
        {/*<div className={styles['bench-comments__header-filter']}>*/}
        {/*  <Icon name={'filter'} />*/}
        {/*</div>*/}
      </div>

      <div className={styles['bench-comments__content']}>
        <Form>
          <Input placeholder={'Написать комментарий...'} footer={<InputFooter />} type={'textarea'} />
        </Form>

        <div className={styles['bench-comments__benches-list']}>
          { benchComments }
        </div>

        {/* TODO: Обговорить с Андреем логику показа комментов
            Добавить условие на то, закончились ли комменты, чтобы скрыть кнопку.
            COMMENTS_MOCK_DATA.length > benchCommentsConfig.VISIBLE_COMMENTS
         */}
        {
          COMMENTS_MOCK_DATA.length > 0 && (
            <Button appearance={'link-underline'} className={styles['bench-comments__show-more-button']}>Показать еще комментарии</Button>
          )
        }

        <NearBenches />
      </div>
    </div>
  )
}
