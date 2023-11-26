import { BenchTypes } from '@/shared/types/bench'

export const BENCHES_MOCK_DATA: BenchTypes.Response = {
  items: [
    // Предыдущие объекты данных...
    {
      id: '3',
      lat: 55.0415,
      lng: 82.9346,
      images: ['image5.jpg', 'image6.jpg'],
      owner: 'Alex Johnson',
      is_active: true,
      tags: [
        { id: 'tag5', title: 'Scenic View', active: true },
        { id: 'tag6', title: 'Social Gathering', active: true },
      ],
      street: 'Red Square',
    },
    {
      id: '4',
      lat: 54.9630,
      lng: 82.9371,
      images: ['image7.jpg', 'image8.jpg'],
      owner: 'Elena Petrova',
      is_active: false,
      tags: [
        { id: 'tag7', title: 'Historic', active: true },
        { id: 'tag8', title: 'Bustling', active: true },
      ],
      street: 'Soviet Street',
    },
    // Добавьте еще объектов данных по необходимости
  ],
  pagination: {
    count: 17, // Общее количество элементов
    count_all_pages: 2, // Количество страниц
    current_page: 1, // Текущая страница
    per_page: 10, // Количество элементов на странице
  },
}
