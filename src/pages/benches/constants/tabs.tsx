import { BenchesTable } from 'pages/benches/ui/table/BenchesTable'
import { BenchesModerationTable } from 'pages/benches/ui/table/ModerationBenchesTable'

export const BENCHES_TABS = [
  {
    key: 'benches',
    label: 'Прошедшие модерацию',
    children: <BenchesTable />
  },
  {
    key: 'moderation-benches',
    label: 'На модерации',
    children: <BenchesModerationTable />
  },
]
