import { Pagination } from '@/types/global';

export interface AccountSearchState extends Pagination {
  q: string;
  status: string;
  companyId: string;
  date: string[];
}

export interface AccountDetailState {
  id: string;
  visible: boolean;
}

export interface AccountResetState {
  id: string;
  visible: boolean;
}
