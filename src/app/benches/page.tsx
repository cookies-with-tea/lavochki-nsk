import { Button } from '@/components/shared'
import { TelegramAuth } from '@/components/features/telegram-auth'

export default function BenchesPage() {
  return (
    <div>
      <h1>
        Benches page
      </h1>

      <Button className={'mt-10'}>
        Смотреть все
      </Button>

      <Button appearance={'secondary'} size={'sm'}>
        Все лавочки
      </Button>

      <Button appearance={'secondary'} size={'xs'}>
        Открыть
      </Button>

      <Button appearance={'primary'} size={'xs'}>
        Открыть
      </Button>
    </div>
  )
}
