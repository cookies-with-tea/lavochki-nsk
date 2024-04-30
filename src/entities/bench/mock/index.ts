export const BENCHES_MOCK_DATA: BenchTypes.Response = {
  items: [
    {
      id: '1',
      lat: 64.333,
      lng: 66.666,
      images: [],
      owner: 'user-uuid',
      is_active: true,
      tags: [],
      street: 'Пушкина',
    },
    {
      id: '2',
      lat: 64.333,
      lng: 66.666,
      images: [],
      owner: 'user-uuid',
      is_active: true,
      tags: [],
      street: 'Пушкина',
    },
    {
      id: '3',
      lat: 64.333,
      lng: 66.666,
      images: [],
      owner: 'user-uuid',
      is_active: true,
      tags: [],
      street: 'Пушкина',
    },
  ],
  pagination: {
    count: 100,
    count_all_pages: 10,
    current_page: 1,
    per_page: 10,
  },
}

export const BENCH_TAGS_MOCK_DATA: BenchTypes.AllTags = [
  {
    id: '1',
    title: 'Классная лавочка',
    active: true,
  },
  {
    id: '2',
    title: 'Рядом урна',
    active: true,
  },
]
