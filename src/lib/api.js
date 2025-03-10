import { json } from '@sveltejs/kit';

export async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'API 요청 실패' }), {
        status: response.status
      });
    }

    const data = await response.json();
    return json(data);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
}

export async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'API 요청 실패' }), {
        status: response.status
      });
    }

    const responseData = await response.json();
    return json(responseData);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
}