<script>
  /**
   * Author: 정준영
   * Date: 2025.03.04
   * [250305] 할 일 목록 추가 기능 구현
   * 
  */
  import { beforeUpdate, afterUpdate, onMount } from 'svelte';
  import { localStore } from '@stores/localStore.js';
  import { todoStore } from '@stores/todoStore.js';
  import Icon from '@iconify/svelte';
  import TodoInput from '$lib/components/todos/TodoInput.svelte';
  import TodoList from '$lib/components/todos/TodoList.svelte';
  import { createTodo, deleteTodo, toggleComplete } from '$lib/utils/todo.js';
  import '@scss/todo.scss';

  export let data;
  
  let { todos, todoValue } = data;

  let newTodo = '';
  let lastSequence = 0;
  
  // const todos = localStore('todos', []);
  
  // const unsubscribe = todos.subscribe(value => {
  //   todoValue = value;    
    
  //   lastSequence = todoValue.length > 0 ? todoValue[todoValue.length - 1].id : 0;
  // });

  beforeUpdate(() => {
    console.log('beforeUpdate');
  });
  
  onMount(() => {
    console.log('onMount');
  });

  afterUpdate(() => {
    console.log('afterUpdate');
  });
</script>

<div class="todo-container">
  <div class="todo-header">
    <h1>Todo List</h1>
  </div>
  <div class="todo-body">
    <TodoInput 
      bind:newTodo
      createTodo={() => createTodo(newTodo, todos, lastSequence)} 
    />
  </div>

  <div class="todo-ul">
    <TodoList 
      todos={todos}
      todoValue={todoValue} 
      toggleComplete={toggleComplete} 
      deleteTodo={deleteTodo}
    />
  </div>
</div>

<style lang="scss">
  
</style>