// import { Todo } from '$lib/model/TodoModel.js';
import { map, update } from 'list';
import { Todo } from '../model/TodoModel.js';
import { findAll, insertTodo, updateTodo, serviceDeleteTodo } from '../service/todo/todo.js';

// TODO: Pagination 상태에서 추가 했을 때, 그 페이지 자체에서 그대로 추가만 되는 버그 발생
// * 해결 * //

/**
 * 
 * @param { Stirng } todoText 
 * @param { } todos 
 * @param { Int } lastSequence 
 * 
 * @returns 
 */
export async function createTodo(todoTitle, todoText, todos, lastSequence) {
  if(todoTitle === undefined || todoTitle === '') {
    alert('타이틀을 입력 해주세요.');
    return;
  }

  if(todoText === undefined || todoText === '') {
    alert('할 일을 입력 해주세요.');
    return;
  }

  const id = lastSequence;
  const title = todoTitle;
  const content = todoText;
  const user_id = 1;
  const created_id = 1;

  const todoItem = new Todo({id, title, content, user_id, created_id});

  // 1. 데이터베이스에 todo 데이터 추가
  const result = await insertTodo(todoItem);

  todoItem.id = result.id;

  const findAllList = await findAll();

  // 2. store에 데이터 추가 및 마지막 항목 제거
  todos.update(items => {
    // let result = null;

    // if(findAllList.pageInfo.currentPageNum === 1) {
    //   const updatedItems = [todoItem, ...items];
  
    //   updatedItems.pop();

    //   result = updatedItems;
    //   console.log(1);
    // } else {
    //   result = findAllList.newTodoList;

    //   console.log(2);
    // }

    return findAllList.newTodoList;

  });
}

export async function deleteTodo(id, todos) {
  const newList = await serviceDeleteTodo(id);

  todos.set(newList.newTodoList);
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