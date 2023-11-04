import { Space } from 'antd'
import { useGate, useUnit } from 'effector-react'

import styles from 'pages/tags/ui/styles.module.scss'

import { WTable } from 'widgets/w-table'

import { createBenchTagEvents } from 'features/tag/model'
import { FTagCreate } from 'features/tag/ui/create/FTagCreate'

import { $tags, tagsPageGates } from '../model/tags'

import { TagType } from '@/shared/types'
import { SButton, SIcon } from '@/shared/ui'


export const TagsPage = () => {
  useGate(tagsPageGates.TagsPageGate)

  return (
    <div className={'tags-page'}>
     <Space className={styles['tags-page__header']}>
        <h1>Теги</h1>

        <SButton
          appearance={'primary'}
          postfixIcon={
            <SIcon name={'plus'} />
          }
          onClick={() => createBenchTagEvents.dialogOpened()}
        >
          Создать тег
        </SButton>
      </Space>

      {/*TODO: Вынести в отдельный компонент*/}

      <WTable<TagType> rowKey={'id'} dataSource={useUnit($tags)} columns={[
        {
          title: 'ID',
          dataIndex: 'id',
        },
        {
          title: 'Название',
          dataIndex: 'title',
        }
      ]} />

      <FTagCreate title={'Создание лавочки'} />
    </div>
  )
}
