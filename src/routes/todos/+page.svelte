<script>
  /**
   * Author: 정준영
   * Date: 2025.03.04
   * [250305] 할 일 목록 추가 기능 구현
  */
  import { beforeUpdate, afterUpdate, onMount } from 'svelte';
  import { todoStore } from '$lib/stores/todoStore.js';
  import Icon from '@iconify/svelte';
  import TodoInput from '$lib/components/todos/TodoInput.svelte';
  import TodoList from '$lib/components/todos/TodoList.svelte';
  import { createTodo, deleteTodo, toggleComplete } from '$lib/utils/todo.js';
  import { findAll } from '$lib/service/todo/todo.js';
  import { fetchTodos } from '$lib/api/service/todoApi.js';
  import '$lib/styles/scss/todo.scss';
  
  export let data;
  
  let { todoValue } = data; 
  let newTodo = '';
  let searchTerm = ''; // 검색어 변수 추가
  let lastSequence = 0;
  
  let todos;

   // 날짜 상태 변수
   let date = '';
  
  // 날짜 포맷팅 함수
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  beforeUpdate(() => {
    console.log('beforeUpdate');
  });
  
  onMount(async () => {
    console.log('onMount');
    
    // todo database 사용
    todos = await todoStore('todos', []);
    
    todos.subscribe(value => {
      todoValue = value;
      lastSequence = todoValue.length > 0 ? (todoValue[0].id + 1) : 0;
    });
  });

  afterUpdate(() => {
    console.log('afterUpdate');
  });

  async function handleCreateTodo() {
    await createTodo(newTodo, todos, lastSequence);
    newTodo = '';
  }
</script>

<div class="todo-container">
  <div class="todo-wrapper">
    <div class="todo-header">
      <h1>Todo List</h1>
    </div>
  
    <div class="todo-body">
        <TodoInput 
          bind:newTodo
          createTodo={handleCreateTodo}
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
</div>

<style lang="scss">

</style>