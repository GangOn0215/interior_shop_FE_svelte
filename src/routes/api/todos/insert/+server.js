import { fetchData, postData } from '$lib/api';

export async function POST({ request }) {
  const data = await request.json();

  return postData('/api/v1/todo/insert', data);
}