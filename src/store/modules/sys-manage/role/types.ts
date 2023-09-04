import { Pagination } from '@/types/global';

export interface RoleSearchState extends Pagination {
  q: string;
  status: string;
}

export interface RoleDetailState {
  id: string;
  visible: boolean;
}
