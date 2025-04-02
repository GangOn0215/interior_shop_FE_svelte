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
  let isModalOpen = false;

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

  function closeModal() {
    isModalOpenStore.set(false)
  }

  function toggleTodoUpdate() {
    isTodoUpdate = !isTodoUpdate;
  };

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

    <!-- Modal -->
    {#if isModalOpen}
      <div class="todo-modal-container">
        <div class="todo-modal">
          <div class="todo-modal-header">
            <h2>Todo Details</h2>
            <button class="close-button" on:click={closeModal}>&times;</button>
          </div>
          <div class="todo-modal-body">
            <!-- {#if isTodoUpdate } -->
              <input type="text" class="modify-title" bind:value={updateTitle} placeholder="제목을 입력하세요." disabled="{ isTodoUpdate ? false: true}" />
              <textarea name="" id="" class="modify-content" bind:value={updateContent} disabled="{ isTodoUpdate ? false : true }"></textarea>
            <!-- {:else} ->
               <div class="todo-detail-title">
                <h3 class="todo-detail-title-text">[ {selectedTodo?.title} ]</h3>
              </div>
              <div class="todo-detail-content">
                <p class="todo-detail-content-text">{selectedTodo?.content}</p>
              </div> -->
            <!-- {/if} -->

          </div>
          <div class="todo-modal-footer">
            
            {#if isTodoUpdate}
            <div class="todo-modify-button">
              <button class="save-button" on:click={handleUpdateTodo}>저장</button>
              <button class="cancel-button" on:click={toggleTodoUpdate}>취소</button>
            </div>
            {:else}
              <button class="modal-action-modify" on:click={toggleTodoUpdate}>수정</button>
            {/if}
          </div>
        </div>
      </div>
    {/if}

    <!-- Modal 만들 예정 -->

    <!-- 계획 -->
    <!-- 1. todoListItem 클릭 시, TodoModal 창이 뜨게 한다.  -->
    <!-- 2. 기본적으로 Title과 Content가 보인다. -->
    <!-- 3. 수정 버튼을 누르면 Title는 "input" Content는 "textarea" 로 변경한다 -->
    <!-- 4.  -->


  </div>
</div>

<style lang="scss">
  .todo-modal-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    &.hidden {
      display: none;
    }

    .todo-modal {
      background: #fff;
      padding: 1rem;
      border-radius: 0.25rem;
      width: 50%;
      max-width: 500px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      .todo-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        padding-bottom: 0.5rem;

        h2 {
          margin: 0;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
      }

      .todo-modal-body {
        margin: 1rem 0;

        .modify-title {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          font-size: 1rem;
          box-sizing: border-box;
          background-color: #fff;
          transition: border-color 0.3s ease;

          &:focus {
            border-color: #007bff;
            outline: none;
            background-color: #fff;
          }

          &:disabled {
            background-color: #fff;
          }
        }

        .modify-content {
          width: 100%;
          height: 150px;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          font-size: 1rem;
          box-sizing: border-box;
          background-color: #fff;
          resize: none; /* 사용자가 크기를 조정하지 못하도록 설정 */
          transition: border-color 0.3s ease;

          &:focus {
            border-color: #007bff;
            outline: none;
            background-color: #fff;
          }

          &:disabled {
            background-color: #fff;
          }
        }

        .todo-detail-title {
          background-color: #fff;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

          .todo-detail-title-text {
            font-weight: bold;
            color: #343a40;
            margin: 0;
          }
          &:disabled {
            background-color: #e9ecef;
            cursor: not-allowed;
          }
        }

        .todo-detail-content {
          background-color: #ffffff;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

          .todo-detail-content-text {
            font-size: 1rem;
            color: #495057;
            line-height: 1.5;
            margin: 0;
          }
        }
      }

      .todo-modal-footer {
        display: flex;
        justify-content: space-between;

        .modal-action-button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 0.25rem;
          background: #007bff;
          color: #fff;
          cursor: pointer;


        }

        .todo-modify-button {
            display: flex;
            gap: 0.5rem;

            .save-button {
              padding: 0.5rem 1rem;
              background-color: #28a745; /* 녹색 */
              color: #fff;
              border: none;
              border-radius: 0.25rem;
              font-size: 1rem;
              cursor: pointer;
              transition: background-color 0.3s ease;

              &:hover {
                background-color: #218838; /* 더 진한 녹색 */
              }
            }

            .cancel-button {
              padding: 0.5rem 1rem;
              background-color: #dc3545; /* 빨간색 */
              color: #fff;
              border: none;
              border-radius: 0.25rem;
              font-size: 1rem;
              cursor: pointer;
              transition: background-color 0.3s ease;

              &:hover {
                background-color: #c82333; /* 더 진한 빨간색 */
              }
            }
          }

          .modal-action-modify {
            padding: 0.5rem 1rem;
            background-color: #ffc107; /* 노란색 */
            color: #212529;
            border: none;
            border-radius: 0.25rem;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s ease;

            &:hover {
              background-color: #e0a800; /* 더 진한 노란색 */
            }
          }

          .modal-close-button {
            padding: 0.5rem 1rem;
            background-color: #6c757d; /* 회색 */
            color: #fff;
            border: none;
            border-radius: 0.25rem;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.3s ease;

            &:hover {
              background-color: #5a6268; /* 더 진한 회색 */
            }
          }
      }
    }
  }
</style>