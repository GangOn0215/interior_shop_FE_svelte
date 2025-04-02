<script>
  /**
   * Author: 정준영
   * Date: 2025.03.04
   * [250305] 할 일 목록 추가 기능 구현
  */
  import { beforeUpdate, afterUpdate, onMount } from 'svelte';
  import { todoStore, currentPage, pageInfo } from '$lib/stores/todoStore.js';
  import Icon from '@iconify/svelte';
  import TodoInput from '$lib/components/todos/TodoInput.svelte';
  import TodoList from '$lib/components/todos/TodoList.svelte';
  import { createTodo, deleteTodo, toggleComplete } from '$lib/utils/todo.js';
  import { findAll } from '$lib/service/todo/todo.js';
  import { fetchTodos } from '$lib/api/service/todoApi.js';
  import '$lib/styles/scss/todo.scss';
  import TodoPagination from '$lib/components/todos/TodoPagination.svelte';
  
  export let data;

  // 데이터베이스 사용 유무
  const useDatabase = import.meta.env.VITE_USE_DATABASE;

  let { todoValue } = data;
  let newTitle = '';
  let newTodo = '';
  let searchTerm = ''; // 검색어 변수 추가
  let lastSequence = 0;
  
  let startPageRange = 1;
  let maxBlock = 0;

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
    
    // currentPage 초기화
    currentPage.set(1);  // <----- 페이지 초기화

    // todo database 사용
    todos = await todoStore('todos', []);
    
    todos.subscribe(value => {
      todoValue = value;
      
      lastSequence = todoValue.length > 0 ? (todoValue[0].id + 1) : 0;
    });

    // Fetch todos and set current page
    // await findAll(1, (page) => currentPage.set(page));
    await findAll();

    currentPage.subscribe(async (page) => {
      const todoObj = await findAll(page);

      await todos.set(todoObj.newTodoList);
      await pageInfo.set(todoObj.pageInfo);
    });

    pageInfo.subscribe((pageInfo) => {
      console.log('pageInfo', pageInfo);

      maxBlock = pageInfo.maxBlock
    });
  });

  afterUpdate(() => {
    console.log('afterUpdate');
  });

  async function handleCreateTodo() {
    await createTodo(newTitle, newTodo, todos, lastSequence);

    newTitle = '';
    newTodo = '';
  }
</script>

<div class="todo-container">
  <div class="todo-wrapper">
    <div class="todo-header">
      <h1>Todo List</h1>
      <TodoInput
        bind:newTitle
        bind:newTodo
        createTodo={handleCreateTodo}
      />
    </div>
  
    <div class="todo-body">
      <!-- Todo List -->
      <div class="todo-ul">
        <TodoList 
          todos={todos}
          todoValue={todoValue} 
          toggleComplete={toggleComplete} 
          deleteTodo={deleteTodo}
        />
      </div>
    </div>

    <TodoPagination
      pageInfo={pageInfo}
      maxBlock={maxBlock}
      currentPage={currentPage}
    />


  </div>
</div>
