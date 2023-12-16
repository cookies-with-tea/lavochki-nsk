'use client'

import styles from './styles.module.scss'
import { Button, Icon, Input } from '@/components/shared'
import { BenchTypes } from '@/shared/types/bench'
import Image from 'next/image'
import cn from 'classnames'
import cb from 'classnames/bind'
import { useState } from 'react'

const cx = cb.bind(styles)

// TODO: Типизировать
interface IBenchCommentProps {
  comment: BenchTypes.Comment
}

export const BenchComment = ({ comment }: IBenchCommentProps) => {
  const [isReplyCommentVisible, setIsReplyCommentVisible] = useState(false)

  const nestedComments = comment.nested_comments?.map((_comment) => (
    <BenchComment comment={_comment} key={_comment.id} />
  ))

  return (
    <div className={styles['bench-comment']}>
      <div className={styles['bench-comment__header']}>
        <div className={styles['bench-comment__user-about']}>
          <div className={styles['bench-comment__user-avatar']}>
            <Image
              src={'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png'}
              alt={''}
              width={64}
              height={64}
            />
          </div>

          <div className={styles['bench-comment__user-info']}>
            <p className={styles['bench-comment__user-name']}>Аркадий</p>

            <p className={styles['bench-comment__user-date']}>10 ноября 2022, 17:50</p>
          </div>
        </div>

        {/* TODO: Добавить компонент тултипа */}
        <div className={styles['bench-comment__user-actions']}>
          <Icon name={'dots'} />
        </div>
      </div>

      <div className={styles['bench-comment__content']}>
        <p className={styles['bench-comment__text']}>
          { comment.content }
        </p>

        <div className={styles['bench-comment__likes']}>
          <button type={'button'}>
            <Icon name={'heart'} />
          </button>

          <span>3</span>
        </div>
      </div>

      <button
        type={'button'}
        className={styles['bench-comment__reply-button']}
        onClick={() => setIsReplyCommentVisible(!isReplyCommentVisible)}
      >
        Ответить
      </button>

      {
        isReplyCommentVisible && (
          <Input
            className={styles['bench-comment__reply-input']}
            placeholder={'Написать ответ...'}
            action={
              <Button appearance={'secondary'} size={'xs'}>
                Ответить
              </Button>
            }
          />
        )
      }

      {
        comment?.nested_comments && (
          <div className={styles['bench-comment__nested-comments']}>
            { nestedComments }
          </div>
        )
      }
    </div>
  )
}
