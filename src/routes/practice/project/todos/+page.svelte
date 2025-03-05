<script>
  import { beforeUpdate, afterUpdate, onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  // 할 일 목록 더미데이터
  let todos = [
  { id: 1, title: '연애', todo: '여자친구 생일 선물 사기', complete: true },
  { id: 2, title: '운동', todo: '헬스장에서 1시간 운동하기', complete: false },
  { id: 3, title: '공부', todo: 'Todos - addTodo 완성하기', complete: false },
  { id: 4, title: '청소', todo: '방 청소 및 빨래 정리하기', complete: false },
  { id: 5, title: '미팅', todo: '프로젝트 팀 화상 회의 참석', complete: false },
  { id: 6, title: '독서', todo: '새로 산 소설책 30페이지 읽기', complete: false },
  { id: 7, title: '요리', todo: '저녁 식사 준비하기', complete: false },
  { id: 8, title: '연락', todo: '부모님께 전화하기', complete: false },
  { id: 9, title: '계획', todo: '다음 주 일정 계획 세우기', complete: false },
  { id: 10, title: '취미', todo: '기타 연습 30분 하기', complete: false }
];

  let newTodo = '';

  beforeUpdate(() => {
    console.log('beforeUpdate');
  });
  
  onMount(() => {
    console.log('onMount');

  });

  // 할 일 추가 함수
  function addTodo() {
    if(newTodo === undefined || newTodo === '') {
      return;
    }

    console.log(newTodo);

    debugger;
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
  </div>
  <div class="todo-body">
    <!-- TODO: tood input -->
    <input bind:value={newTodo} >
    <button on:click={addTodo}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="2" stroke="black" stroke-width="2"></rect>
        <path d="M12 7V17" stroke="black" stroke-width="2"></path>
        <path d="M7 12H17" stroke="black" stroke-width="2"></path>
      </svg>
    </button>
    
  </div>
  <!-- TODO: todo list  -->
  <div class="todo-ul">
    {#each todos as todo}
      <div class="todo-li">
        <div class="todo-wrap" key={todo.id}>
          <div class="todo-item">
              <span class="todo-title">[ {todo.title} ]</span>
              <span class="todo-content">{todo.todo}</span> 
          </div>
        </div>
        <div class="todo-manage">
          <button on:click={toggleComplete}>
            {#if todo.complete}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="2" stroke="black" stroke-width="2"></rect>
                <path d="M7 12L10 15L17 8" stroke="black" stroke-width="2"></path>
              </svg>
            {:else}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="2" stroke="black" stroke-width="2"></rect>
              </svg>
            {/if}
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .todo-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;

      .todo-body {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;
    
        input {
          width: 70%;
          height: 2.5rem;
          padding: 0 0.5rem;
          border: 1px solid #ccc;
          border-radius: 0.25rem;
          font-size: 1rem;
        }
    
        button {
          height: 2.5rem;
          width: 2.5rem;
          margin-left: 0.5rem;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #ccc;
          border-radius: 0.25rem;
          background-color: #fff;
          cursor: pointer;
        }
      }
    
      .todo-ul {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
        width: 100%;
        
        .todo-li {
          display: flex;
          width: 100%;
          justify-content: center;
          align-items: center;
          margin-bottom: 0.5rem;

            .todo-wrap {
              display: flex;
              justify-content: space-between;
              width: 70%;
              padding: 0.5rem;
              border: 1px solid #ccc;
              border-radius: 0.25rem;
              
              .todo-item {
                width: 100%;
                
                .todo-title {
                  font-weight: bold;
                  margin-right: 0.5rem;
                }
                
                .todo-content {
                  color: #333;
                }
              }
            }

            .todo-manage {
              button {
                height: 2.5rem;
                width: 2.5rem;
                margin-left: 0.5rem;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #ccc;
                border-radius: 0.25rem;
                background-color: #fff;
                cursor: pointer;

                &:hover {
                  background-color: #f0f0f0;
                }
              }
            }
        }
      }
  }
</style>