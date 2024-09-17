import axios from 'axios';

export async function fetcher<T>(url: string): Promise<T> {
  const res = await axios.get<T>(url);

  return res.data;
}

export async function createResource<T, R>(
  url: string,
  { arg }: { arg: T }
): Promise<R> {
  const res = await axios.post<R>(url, arg);

  return res.data;
}

export async function updateResource<T, R>(
  url: string,
  { arg }: { arg: T }
): Promise<R> {
  const res = await axios.put<R>(url, arg);

  return res.data;
}

export async function deleteResource(url: string): Promise<void> {
  await axios.delete(url);
}
