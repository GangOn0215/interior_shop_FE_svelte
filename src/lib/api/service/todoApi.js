import { API_URL, INSERT_TODO, SELECT_TODO } from '../config/apiURL.js';

// 할 일 목록을 서버에서 가져오는 함수
export async function fetchTodos() {
  const response = await fetch(`${API_URL}${SELECT_TODO.path}${SELECT_TODO.task}`);
  if (!response.ok) {
    throw new Error('API 요청 실패');
  }
  const todos = await response.json();
  return todos;
}

// 새로운 할 일을 서버에 추가하는 함수
export async function addTodo(newTodo) {
  const response = await fetch(`${API_URL}${INSERT_TODO.path}${INSERT_TODO.task}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTodo)
  });

  if (!response.ok) {
    throw new Error('API 요청 실패');
  }

  const result = await response.json();
  return result;
}