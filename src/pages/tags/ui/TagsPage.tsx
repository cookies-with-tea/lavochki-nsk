import { Space } from 'antd'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'

import styles from 'pages/tags/ui/styles.module.scss'

import { WTable } from 'widgets/w-table'

import { $isOpenModal, closeModal, openModal } from '../model/create-tag'
import { $tags, getTagsFx } from '../model/tags'

import { TagFormCreate } from './create/TagFormCreate'

import { TagType } from '@/shared/types'
import { SButton, SDialog, SIcon } from '@/shared/ui'


export const TagsPage = () => {
  const [isModalOpen] = useUnit([$isOpenModal])

  const showModal = () => {
    openModal()
  }

  const handleOk = () => {
    closeModal()
  }

  const handleCancel = () => {
    closeModal()
  }

  useEffect(() => {
    // TODO: Это плохо. Вынести запрос из useEffect
    getTagsFx()
  }, [])

  return (
    <div className={'tags-page'}>
     <Space className={styles['tags-page__header']}>
        <h1>Теги</h1>

        <SButton
          appearance={'primary'}
          postfixIcon={
            <SIcon name={'plus'} />
          }
          onClick={showModal}
          >
          Создать тег
        </SButton>
      </Space>
      
      <WTable<TagType> dataSource={useUnit($tags)} columns={[
        {
          key: 'id',
          title: 'ID',
          dataIndex: 'id',
        },
        {
          key: 'title',
          title: 'Название',
          dataIndex: 'title',
        }
      ]} />

      <SDialog title={'Создание лавочки'} open={isModalOpen}
onSuccess={handleOk} onCancel={handleCancel}>
        <TagFormCreate />
      </SDialog>
    </div>
  )
}