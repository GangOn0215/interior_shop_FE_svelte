import { Todo } from './TodoModel.js';

export function createTodo(newTodo, todos, lastSequence) {
  if(newTodo === undefined || newTodo === '') {
    alert('할 일을 입력해주세요.');
    return;
  }

  const id = ++lastSequence;
  const todoItem = new Todo(id, 'Todo', newTodo);
  todos.update(items => [...items, todoItem]);

  newTodo = '';
}

export function deleteTodo(id, todos) {
  todos.update(items => items.filter(item => item.id !== id));
}

export function toggleComplete(id, todos, todoValue) {
  let target = todoValue.find(todo => todo.id === id);
  target = new Todo(
    target.id,
    target.title,
    target.todo,
    target.complete
  );

  if(target) {
    target.toggle();
    todos.update(items => items.map(item => item.id === id ? target : item));
  }
}