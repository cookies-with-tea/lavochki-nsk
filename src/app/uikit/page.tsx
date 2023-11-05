import { BaseButton } from '@/components/shared'

export default function Uikit() {
  return (
	<div className={'uikit'}>
		<div className="d-flex" style={{ gap: 30, alignItems: 'center' }}>
			<BaseButton>
				Смотреть все
			</BaseButton>

			<BaseButton appearance={'secondary'} size={'sm'}>
				Все лавочки
			</BaseButton>
		</div>
	</div>
  )
}
