// import { Todo } from '$lib/model/TodoModel.js';
import { Todo } from '../model/TodoModel.js';
import { insertTodo } from '../service/todo/todo.js';

export function createTodo(todoText, todos, lastSequence) {
  if(todoText === undefined || todoText === '') {
    alert('할 일을 입력해주세요.');
    return;
  }

  const id = lastSequence;
  const title = 'Todo';
  const content = todoText;
  const user_id = 1;
  const created_id = 1;

  const todoItem = new Todo({id, title, content, user_id, created_id});

  // 1. 데이터베이스에 todo 데이터 추가
  insertTodo(todoItem);

  // 2. store에 데이터 추가
  todos.update(items => [todoItem, ...items]);
}

export function deleteTodo(id, todos) {
  todos.update(items => items.filter(item => item.id !== id));
}

export function toggleComplete(id, todos, todoValue) {
  let target = todoValue.find(todo => todo.id === id);

  if(target) {
    target.toggle();
    todos.update(items => items.map(item => item.id === id ? target : item));

    // 데이터베이스와 연결 후 데이터베이스 수정 함수를 만들어주자 (item id만 알면 댐)
  }
}