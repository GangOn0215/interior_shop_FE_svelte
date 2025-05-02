<script>
  /**
   * Author: 정준영
   * Date: 2025.03.04
   * [250305] 할 일 목록 추가 기능 구현
  */
  import { beforeUpdate, afterUpdate, onMount } from 'svelte';
  import { todoStore, currentPage, pageInfo, isModalOpenStore } from '$lib/stores/todoStore.js';
  import Icon from '@iconify/svelte';
  import TodoInput from '$lib/components/todos/TodoInput.svelte';
  import TodoList from '$lib/components/todos/TodoList.svelte';
  import { createTodo, deleteTodo, toggleComplete } from '$lib/utils/todo.js';
  import { findAll } from '$lib/service/todo/todo.js';
  import { fetchTodos } from '$lib/api/service/todoApi.js';
  import '$lib/styles/scss/todo.scss';
  import TodoPagination from '$lib/components/todos/TodoPagination.svelte';
  import TodoModal from '$lib/components/todos/TodoModal.svelte';
  
  export let data;

  // 데이터베이스 사용 유무
  const useDatabase = import.meta.env.VITE_USE_DATABASE;

  let { todoValue } = data;
  let newTitle = '';
  let newTodo = '';
  let newDate = '';
  let searchTerm = ''; // 검색어 변수 추가
  let lastSequence = 0;
  
  let startPageRange = 1;
  let maxBlock = 0;

  let todos;
  let selectedTodo = null;
  let isModalOpen = false;
  let isTodoUpdate = false;

  let updateTitle = '';
  let updateContent = '';

  // 날짜 상태 변수
  let date = '';
  
  // 날짜 포맷팅 함수
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  function triggerModal(todo) {
    isModalOpenStore.set(true);
    selectedTodo = todo;
    
    updateTitle = todo.title;
    updateContent = todo.content;
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

    currentPage.subscribe(async (page) => {
      const todoObj = await findAll(page);

      await todos.set(todoObj.newTodoList);
      await pageInfo.set(todoObj.pageInfo);
    });

    pageInfo.subscribe((pageInfo) => {
      console.log('pageInfo', pageInfo);

      maxBlock = pageInfo.maxBlock;
    });

    isModalOpenStore.subscribe((isOpen) => {
      isModalOpen = isOpen;
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
      <!-- 검색을 만들자 -->

      <div class="search-container">
        <div class="calendar-container">
          <!-- 날짜 -->
          <input type="date" name="" id="date-picker" bind:value={date} />
        </div>

        <!-- <button on:click={}>검색</button> -->
      </div>
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
          triggerModal={triggerModal}
        />
      </div>
    </div>

    <TodoPagination
      pageInfo={pageInfo}
      maxBlock={maxBlock}
      currentPage={currentPage}
    />

    <TodoModal 
      todos={todos}
      selectedTodo={selectedTodo}
      createTodo={handleCreateTodo}
      bind:updateTitle
      bind:updateContent
      bind:newTitle
      bind:newTodo
    />

    <!-- Modal 만들 예정 -->

    <!-- 계획 -->
    <!-- 1. todoListItem 클릭 시, TodoModal 창이 뜨게 한다.  -->
    <!-- 2. 기본적으로 Title과 Content가 보인다. -->
    <!-- 3. 수정 버튼을 누르면 Title은 "input" Content는 "textarea" 로 변경한다 -->
    <!-- 4. -->


  </div>
</div>

<style lang="scss">
.search-container {
  display: flex;
  align-items: center;
  gap: 1rem; /* 입력 필드와 버튼 사이 간격 */
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.calendar-container {
  display: flex;
  align-items: center;

  #date-picker {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-family: inherit;
    color: #333;
    background-color: transparent; /* 배경 제거 */
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      border-color: #007bff;
    }

    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
    }
  }
}

.search-container button {
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px); /* 살짝 위로 올라가는 효과 */
  }

  &:active {
    background-color: #004085;
    transform: translateY(0); /* 클릭 시 원래 위치로 돌아감 */
  }
}
</style>