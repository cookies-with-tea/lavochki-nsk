import { SlideType } from '@/shared/types/base'

export type BenchTagType = {
  id: string;
  title: string;
  active?: boolean;
};

export type BenchType = {
  id: string;
  lat: number | string;
  lng: number | string;
  images: (string | SlideType | File)[];
  owner: string;
  is_active: boolean;
  tags: BenchTagType[];
  address?: string;
};

export type ApiBenchesResponseType = {
  count: number;
  count_all_pages: number;
  count_in_page: number;
  items: BenchType[];
};
