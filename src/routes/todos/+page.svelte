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
  
  export let data;

  // 데이터베이스 사용 유무
  const useDatabase = import.meta.env.VITE_USE_DATABASE;

  let { todoValue } = data;
  let newTodo = '';
  let searchTerm = ''; // 검색어 변수 추가
  let lastSequence = 0;
  
  let startPageRange = 1;
  let endPageRange = 10;

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
    await findAll(1);

    currentPage.subscribe(async (page) => {
      const todoObj = await findAll(page);

      await todos.set(todoObj.newTodoList);
      await pageInfo.set(todoObj.pageInfo);
    });

    pageInfo.subscribe((pageInfo) => {
      console.log('pageInfo', pageInfo);
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
      <TodoInput
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


    <div class="todo-pagination">
      <!-- 이전  -->
      {#if pageInfo }
        {#each Array.from({ length: endPageRange }, (_, i) => i + 1) as num}
          <button 
            class:active={num === currentPage}
            on:click={() => currentPage.set(num)}
          >
            {num}
          </button>
        {/each}
      {/if}
    </div>

    <!--
    <div class="todo-footer">
      <div class="todo-search">
        <input type="text" placeholder="검색어를 입력하세요" bind:value={searchTerm} />
        <button>검색</button>
      </div>
    </div>
    -->

  </div>
</div>

<style lang="scss">
  .todo-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.5rem 0;
    gap: 0.5rem;

    button {
      padding: 0.5rem 0.75rem;
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      color: #495057;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: #e9ecef;
        color: #212529;
      }

      &.active {
        background-color: #4263eb;
        color: white;
        border-color: #4263eb;
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 0.2rem rgba(66, 99, 235, 0.25);
      }
    }
  }

  .todo-footer {
    margin-top: 1rem;
    padding: 1rem 0;
    border-top: 1px solid #e9ecef;

    .todo-search {
      display: flex;
      gap: 0.5rem;
      
      input {
        flex: 1;
        padding: 0.5rem 0.75rem;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        
        &:focus {
          outline: none;
          border-color: #4263eb;
          box-shadow: 0 0 0 0.2rem rgba(66, 99, 235, 0.25);
        }
      }
      
      button {
        padding: 0.5rem 1rem;
        background-color: #4263eb;
        color: white;
        border: none;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
        
        &:hover {
          background-color: #3b5bdb;
        }
        
        &:focus {
          outline: none;
          box-shadow: 0 0 0 0.2rem rgba(66, 99, 235, 0.25);
        }
      }
    }
  }
</style>