import { Flex, Modal, NumberInput, Group, MultiSelect } from '@mantine/core'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'
import { SyntheticEvent } from 'react'

import { UiButton } from '#shared/ui'

import { createBenchSelectors, createBenchEvents, createBenchForm } from './model/create-bench'

export const CreateBenchModal = () => {
  const { fields, submit } = useForm(createBenchForm)

  // events
  const closed = useUnit(createBenchEvents.modalClosed)

  // selectors
  const [tagsOptions] = useUnit([createBenchSelectors.tagsOptions])

  // states
  const [open] = useUnit([createBenchSelectors.isModalOpen])

  const onSubmitForm = (event: SyntheticEvent) => {
    event.preventDefault()

    submit()
  }

  return (
    <Modal
      opened={open}
      onClose={closed}
      centered
      title={'Добавление лавочки'}
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      <form onSubmit={onSubmitForm}>
        <Flex gap={'sm'}>
          <div>
            <NumberInput
              label={'Широта'}
              withAsterisk
              value={fields.lat.value}
              onChange={(value) => fields.lat.onChange(+value)}
            />
            <div>{fields.lat.errorText()}</div>
          </div>

          <div>
            <NumberInput
              label={'Долгота'}
              withAsterisk
              value={fields.lng.value}
              onChange={(value) => fields.lng.onChange(+value)}
            />
            <div>{fields.lng.errorText()}</div>
          </div>
        </Flex>

        <MultiSelect
          className={'mt-8'}
          label="Теги"
          data={tagsOptions}
          value={fields.tags.value}
          comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
          onChange={(value) => fields.tags.onChange(value)}
        />

        <Group justify="center" mt="sm">
          <UiButton type="submit">Создать</UiButton>
        </Group>
      </form>
    </Modal>
  )
}
