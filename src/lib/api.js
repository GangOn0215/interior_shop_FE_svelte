import { json } from '@sveltejs/kit';

export async function fetchData(url) {
  try {
    const response = await fetch(url); // ?

    if (!response.ok) {
      const responseFail = new Response(JSON.stringify({ error: 'API 요청 실패' }), {
        status: response.status
      });

      return responseFail;
    }

    console.log(">>> Get Api Success");

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

    console.log(">>> Post Api Success");

    const responseData = await response.json();
    return json(responseData);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500
    });
  }
}

// {{
//   import { SELECT_TODO } from '../api/apiURL.js';

//     // const API_URL = import.meta.env.VITE_API_PATH; //?
//     const API_URL = process.env.VITE_API_PATH;
    
//     // const API_URL = 'http://localhost:8080/api/v1';

//   // fetchData(`${API_URL}${SELECT_TODO.path}${SELECT_TODO.task}`).then((res) => { 
//   //   console.log(res);
//   // });
  
// }}