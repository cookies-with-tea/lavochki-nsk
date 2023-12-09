import { BenchTypes } from '@/shared/types/bench'

export const BENCHES_MOCK_DATA: BenchTypes.Response = {
  items: [
    // Предыдущие объекты данных...
    {
      id: '3',
      lat: 55.0415,
      lng: 82.9346,
      images: [
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png'
      ],
      owner: 'Alex Johnson',
      is_active: true,
      tags: [
        { id: 'tag5', title: 'Scenic View' },
        { id: 'tag6', title: 'Social Gathering' },
      ],
      street: 'Red Square',
    },
    {
      id: '4',
      lat: 54.9630,
      lng: 82.9371,
      images: [
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png'
      ],
      owner: 'Elena Petrova',
      is_active: false,
      tags: [
        { id: 'tag7', title: 'Historic' },
        { id: 'tag8', title: 'Bustling' },
      ],
      street: 'Soviet Street',
    },
    {
      id: '5',
      lat: 54.9630,
      lng: 82.9371,
      images: [
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png'
      ],
      owner: 'Elena Petrova',
      is_active: false,
      tags: [
        { id: 'tag7', title: 'Historic' },
        { id: 'tag8', title: 'Bustling' },
      ],
      street: 'Soviet Street',
    },
    {
      id: '6',
      lat: 54.9630,
      lng: 82.9371,
      images: [
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png'
      ],
      owner: 'Elena Petrova',
      is_active: false,
      tags: [
        { id: 'tag7', title: 'Historic' },
        { id: 'tag8', title: 'Bustling' },
      ],
      street: 'Soviet Street',
    },
    {
      id: '7',
      lat: 54.9630,
      lng: 82.9371,
      images: [
        'https://gas-kvas.com/uploads/posts/2023-01/1673412890_gas-kvas-com-p-ulibayushchayasya-devushka-risunki-anime-37.png',
      ],
      owner: 'Elena Petrova',
      is_active: false,
      tags: [
        { id: 'tag7', title: 'Historic' },
        { id: 'tag8', title: 'Bustling' },
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
