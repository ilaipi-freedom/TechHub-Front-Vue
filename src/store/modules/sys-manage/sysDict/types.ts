import { Pagination } from '@/types/global';

export interface SysDictSearchState extends Pagination {
  q: string;
  status: string;
}

export interface SysDictDetailState {
  id: string;
  visible: boolean;
}
