import { fetchData, postData } from '$lib/api';

export async function GET() {
  
  return fetchData('/api/v1/todo/select00001');
}

export async function POST({ request }) {
  const data = await request.json();

  return postData('/api/v1/todo/insert', data);
}