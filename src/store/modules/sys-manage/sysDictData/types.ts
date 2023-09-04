import { Pagination } from '@/types/global';

export interface SysDictDataSearchState extends Pagination {
  q: string;
  status: string;
}

export interface SysDictDataDetailState {
  id: string;
  visible: boolean;
}
