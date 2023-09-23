import { BenchesTable } from 'pages/benches/ui/table/BenchesTable'
import { BenchesModerationTable } from 'pages/benches/ui/table/ModerationBenchesTable'

export const BENCHES_TABS = [
  {
    key: '1',
    label: 'Прошедшие модерацию',
    children: <BenchesTable />
  },
  {
    key: '2',
    label: 'На модерации',
    children: <BenchesModerationTable />
  },
]