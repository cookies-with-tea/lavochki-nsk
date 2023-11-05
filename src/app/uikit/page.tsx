import { BaseButton } from '@/components/shared'
import { BaseIcon } from '@/components/shared/icon'

export default function Uikit() {
  return (
    <div className={'uikit'}>
      <div className="d-flex" style={{ gap: 30, alignItems: 'center' }}>
        <BaseButton className={'mt-10'}>
          Смотреть все
        </BaseButton>

        <BaseButton appearance={'secondary'} size={'sm'}>
          Все лавочки
        </BaseButton>

        <BaseButton appearance={'secondary'} size={'xs'}>
          Открыть
        </BaseButton>

        <BaseButton appearance={'primary'} size={'xs'}>
          Открыть
        </BaseButton>
      </div>

      <div className="d-flex" style={{ gap: 30, alignItems: 'center' }}>
        <BaseButton icon={<BaseIcon name={'arrow'} />} />
        <BaseButton icon={<BaseIcon reversed name={'arrow'} />} />
      </div>

      <div className="d-flex" style={{ gap: 30, alignItems: 'center' }}>
        <BaseIcon name={'profile'} />
        <BaseIcon name={'profile'} />
        <BaseIcon name={'arrow'} />
        <BaseIcon reversed name={'arrow'} className={'color-dark'} />
      </div>
    </div>
  )
}
