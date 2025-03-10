export async function load({ fetch }) {
  try {
    const response = await fetch('/api/v1/todo/select00001');
    
    if (!response.ok) {
      throw new Error('API 요청 실패');
    }
    
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