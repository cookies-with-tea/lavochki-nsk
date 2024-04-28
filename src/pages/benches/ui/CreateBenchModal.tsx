import { Flex, Modal, NumberInput, Group } from '@mantine/core'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react'
import { SyntheticEvent } from 'react'

import { createBenchSelectors, createBenchEvents, createBenchForm } from '#pages/benches/model/create-bench'

import { UiButton } from '#shared/ui'

export const CreateBenchModal = () => {
  const { fields, submit } = useForm(createBenchForm)

  const closed = useUnit(createBenchEvents.dialogClosed)
  // states
  const [open] = useUnit([createBenchSelectors.isDialogOpen])

  const formSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    submit()
  }

  return (
    <Modal opened={open} onClose={closed} centered title={'Добавление лавочки'}>
      <form onSubmit={formSubmit}>
        <Flex gap={'sm'}>
          <div>
            <NumberInput
              label={'Широта'}
              withAsterisk
              value={fields.lat.value}
              onChange={(value) => fields.lat.onChange(+value)}
            />
            <div>
              {fields.lat.errorText({
                email: 'you must enter a valid email address',
              })}
            </div>
          </div>

          <div>
            <NumberInput
              label={'Долгота'}
              withAsterisk
              value={fields.lng.value}
              onChange={(value) => fields.lng.onChange(+value)}
            />
            <div>
              {fields.lng.errorText({
                email: 'you must enter a valid email address',
              })}
            </div>
          </div>
        </Flex>

        <Group justify="center" mt="sm">
          <UiButton type="submit">Создать</UiButton>
        </Group>
      </form>
    </Modal>
  )
}
