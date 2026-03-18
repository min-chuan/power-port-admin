import type { SortType } from '@/types/document';
import { get } from '@/utils/http';

enum API {
  Document = '/document',
}

export function documentApi() {
  return get<undefined, SortType>(API.Document);
}
