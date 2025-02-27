<script>
  import { onMount } from 'svelte';

  // 할 일 목록 데이터
  let todos = [];
  let newTodo = '';

  // 할 일 추가 함수
  function addTodo() {

  }

  // 할 일 삭제 함수
  function deleteTodo(id) {

  }

  // 할 일 완료 상태 토글 함수
  function toggleComplete() {
    
  }

  // 엔터 키로 할 일 추가
  function handleKeypress() {

  }

  // 로컬 스토리지에서 할 일 불러오기

  // 할 일 목록 변경 시 로컬 스토리지에 저장
</script>

<div class="todo-container">
  <div class="todo-header">
    <h1>Todo List</h1>
    <div class="todo-input-area">
      <input 
        type="text" 
        bind:value={newTodo} 
        placeholder="할 일을 입력하세요" 
        on:keypress={handleKeypress}
      >
      <button on:click={addTodo}>추가</button>
    </div>
  </div>

  <div class="todo-list">
    {#if todos.length === 0}
      <p class="empty-message">할 일이 없습니다. 새로운 할 일을 추가해보세요!</p>
    {:else}
      <ul>
        {#each todos as todo (todo.id)}
          <li class={todo.completed ? 'completed' : ''}>
            <input 
              type="checkbox" 
              checked={todo.completed}
              on:change={() => toggleComplete(todo.id)}
            >
            <span class="todo-text">{todo.text}</span>
            <button class="delete-btn" on:click={() => deleteTodo(todo.id)}>
              삭제
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style lang="scss">
  @use "sass:color";

  // 변수 정의
  $primary-color: #3498db;
  $secondary-color: #2ecc71;
  $danger-color: #e74c3c;
  $border-radius: 5px;
  $box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  // 전체 컨테이너
  .todo-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  // 헤더 영역 (제목 + 입력 영역)
  .todo-header {
    background-color: white;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    padding: 15px;
    margin-bottom: 20px;

    h1 {
      margin-top: 0;
      margin-bottom: 15px;
      color: #333;
      font-size: 24px;
    }
  }

  // 입력 영역
  .todo-input-area {
    display: flex;
    gap: 10px;

    input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: $border-radius;
      font-size: 16px;
      outline: none;
      transition: border-color 0.3s;

      &:focus {
        border-color: $primary-color;
      }
    }

    button {
      background-color: $primary-color;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: $border-radius;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;

    }
  }

  // 할 일 목록 영역
  .todo-list {
    background-color: white;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    padding: 15px;

    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    li {
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }

      &.completed .todo-text {
        text-decoration: line-through;
        color: #999;
      }

      input[type="checkbox"] {
        margin-right: 10px;
        cursor: pointer;
      }

      .todo-text {
        flex: 1;
        font-size: 16px;
      }

      .delete-btn {
        background-color: transparent;
        color: $danger-color;
        border: 1px solid $danger-color;
        padding: 5px 10px;
        border-radius: $border-radius;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background-color: $danger-color;
          color: white;
        }
      }
    }
  }

  // 할 일이 없을 때 메시지
  .empty-message {
    text-align: center;
    color: #999;
    font-style: italic;
    padding: 15px 0;
  }
</style>