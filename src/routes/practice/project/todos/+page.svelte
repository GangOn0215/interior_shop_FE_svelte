<script>
  /**
   * Author: 정준영
   * Date: 2025.03.04
   * [250305] 할 일 목록 추가 기능 구현
   * 
  */
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
  let lastSequence = 0;

  beforeUpdate(() => {
    console.log('beforeUpdate');
  });
  
  onMount(() => {
    console.log('onMount');

    lastSequence = todos.length > 0 ? todos[todos.length - 1].id : 0;
  });

  afterUpdate(() => {
    console.log('afterUpdate');
  });

  // Create Todo
  function createTodo() {
    if(newTodo === undefined || newTodo === '') {
      alert('할 일을 입력해주세요.');

      return;
    }

    const title = 'TODO';
    const id = ++lastSequence;
    const todo = newTodo;
    const complete = false;

    todos = [...todos, { id, title, todo, complete }];

    // 추가 후 입력창 초기화
    newTodo = '';
  }

  // TODO [250305]: 할 일 추가 함수
  function addTodo() {
    createTodo();
  }

  // 할 일 삭제 함수
  function deleteTodo(id) {
    const target = todos.find(todo => todo.id === id);

    todos = todos.filter(todo => todo.id !== id);
  }

  // 할 일 완료 상태 토글 함수
  function toggleComplete(id) {
    // 1. 검색
    const target = todos.find(todo => todo.id === id);

    // 2. 찾은 할 일의 완료 상태 변경
    target.complete = !target.complete;

    // 3. 변경된 할 일 목록으로 업데이트
    todos = todos.map(todo => todo.id === id ? target : todo);

    // 2,3 번의 단축 코드는 다음과 같음
    /*
    todos = todos.map(todo => {
      if(todo.id === id) {
        return { ...todo, complete: !todo.complete};
      }

      return todo;
    });
    */

    // 4. 변경된 할 일 목록 로컬 스토리지에 저장
  }

  // 엔터 키로 할 일 추가
  function handleKeypress() {
    if(event.key === 'Enter') {
      createTodo();
    }
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
    <input bind:value={newTodo} on:keypress={handleKeypress} placeholder="할 일을 입력해주세요." />
    <button on:click={addTodo}>
      <!-- 또는 Iconify 컴포넌트 사용 시: -->
      <Icon icon="mdi:plus-box-outline" width="28" height="28" />
    </button>
    <!-- 비우기 -->
    <button on:click={() => newTodo = ''}>
      <Icon icon="memory:checkbox-cross" width="28" height="28" />
    </button>
  </div>
  <!-- TODO: todo list  -->
  <div class="todo-ul">
    {#if todos.length === 0}
      <div class='todo-li'>        
          할 일이 없습니다.
      </div>
    {:else}
      {#each todos as todo}
        <div class="todo-li">
          <div class="todo-wrap" key={todo.id}>
            <div class="todo-item">
                <span class="todo-title">[ {todo.title} ]</span>
                <span class="todo-content">{todo.todo}</span> 
            </div>
          </div>
          <div class="todo-manage">
            <button on:click={() => toggleComplete(todo.id)}>
              {#if todo.complete}
                <Icon icon="mdi:checkbox-marked-outline" width="28" height="28" />
              {:else}
                <Icon icon="mdi:checkbox-blank-outline" width="28" height="28" />
              {/if}
            </button>

            <!-- 삭제 -->
            <button on:click={() => deleteTodo(todo.id)}>
              <Icon icon="mdi:trash-can-outline" width="28" height="28" />
            </button>
          </div>
        </div>
      {/each}
    {/if}
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
              display: flex;  /* 추가: flex 레이아웃 적용 */
              flex-direction: row; /* 추가: 가로 방향으로 배치 */
              align-items: center; /* 추가: 세로 중앙 정렬 */
              
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