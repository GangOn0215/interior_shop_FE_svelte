import { postData } from '$lib/api.js';
import { API_URL, SELECT_TODO } from '$lib/api/config/apiURL.js';

export async function load({ fetch }) {
  try {
    // const response = await fetch('/api/v1/todo/select00001', {

    const requestData = {
      pagination: {
        currentPageNum: page
      }, 
      searches: { 
        a: 1
      }
    };

    const response = await fetch(`/api/v1/todo/select00001`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    
    const data = await response.json();
    
    return {
      todoValue: data.res // 혹은 데이터 구조에 맞게 조정
    };
  } catch (error) {
    console.error('Error loading todos:', error);
    return {
      todos: [],
      todoValue: []
    };
  }
}