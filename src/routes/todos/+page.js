import { postData } from '$lib/api.js';

export async function load({ fetch }) {
  try {
    const response = await fetch('/api/v1/todo/select00001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({pageNum: 1})
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