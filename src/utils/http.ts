import service from './axios';

interface ResponseData<T> {
  code: number;
  message: string;
  data?: T;
}

export function get<T, U>(url: string, params?: T): Promise<ResponseData<U>> {
  return service.get(url, { params });
}

export function post<T, U>(url: string, data: T): Promise<ResponseData<U>> {
  return service.post(url, data);
}
