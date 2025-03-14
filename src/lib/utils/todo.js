// import { Todo } from '$lib/model/TodoModel.js';
import { map } from 'list';
import { Todo } from '../model/TodoModel.js';
import { findAll, insertTodo, updateTodo, serviceDeleteTodo } from '../service/todo/todo.js';

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

  // 2. store에 데이터 추가 및 마지막 항목 제거
  todos.update(items => {
    const updatedItems = [todoItem, ...items];

    updatedItems.pop();
    return updatedItems;
  });
}

export async function deleteTodo(id, todos) {
  const newList = await serviceDeleteTodo(id);

  // const updatedTodos = todos.update(items => items.filter(item => item.id !== id));

  // return updatedTodos;

  todos.set(newList);
}

export function toggleComplete(id, todos, todoValue) {
  let target = todoValue.find(todo => todo.id === id);

  if(target) {
    target.toggle();
    target.setLatest();

    // 데이터베이스 업데이트 (toggle 해줄 id 를 넘겨주자)
    updateTodo(target);

    // store 업데이트
    todos.update(items => items.map(item => item.id === id ? target : item));

    // Extract data from todos
    let currentTodos;
    todos.subscribe(value => {
      currentTodos = value;
    })();
  }
}