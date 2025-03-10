<script>
  /**
   * Author: 정준영
   * Date: 2025.03.04
   * [250305] 할 일 목록 추가 기능 구현
   * 
  */
  import { beforeUpdate, afterUpdate, onMount } from 'svelte';
  import { localStore } from '@stores/localStore.js';
  import Icon from '@iconify/svelte';
  import TodoInput from '$lib/components/todos/TodoInput.svelte';
  import TodoList from '$lib/components/todos/TodoList.svelte';

  let newTodo = '';
  let lastSequence = 0;
  
  const todos = localStore('todos', []);
  let todoValue = [];

  const unsubscribe = todos.subscribe(value => {
    todoValue = value;
    lastSequence = todoValue.length > 0 ? todoValue[todoValue.length - 1].id : 0;
  });

  beforeUpdate(() => {
    console.log('beforeUpdate');
  });
  
  onMount(() => {
    console.log('onMount');
  });

  afterUpdate(() => {
    console.log('afterUpdate');
  });

      return;
    }
    const id = ++lastSequence;
    const todo = newTodo;
    const complete = false;

    todos.update(items => [...items, {id, title, todo, complete}])

    newTodo = '';
  }

  // 할 일 삭제 함수
  function deleteTodo(id) {
    todos.update(items=>items.filter(item => item.id !== id));
  }

  // 할 일 완료 상태 토글 함수
  function toggleComplete(id) {
    // 1. 검색
    const target = todoValue.find(todo => todo.id === id);

    // 2. 찾은 할 일의 완료 상태 변경
    target.complete = !target.complete;
    
    // 3. 변경된 할 일 목록으로 업데이트
    todos.update(items => items.map (item => item.id === id ? target : item ));

    // 2,3 번의 단축 코드는 다음과 같음
    /*
    todos = todos.map(todo => {
      if(todo.id === id) {
        return { ...todo, complete: !todo.complete};
      }

      return todo;
    });
    */
  }
</script>

<div class="todo-container">
  <div class="todo-header">
    <h1>Todo List</h1>
  </div>
  <div class="todo-body">
    <!-- TODO: tood input -->
    <TodoInput 
      bind:newTodo
      createTodo={createTodo} 
    />
  </div>

  <!-- TODO: todo list  -->
  <div class="todo-ul">
    <TodoList 
      todoValue={todoValue} 
      toggleComplete={toggleComplete} 
      deleteTodo={deleteTodo}
    />
  </div>
</div>

<style lang="scss">
  .todo-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }

  .todo-header {
    margin-bottom: 1.5rem;
    text-align: center;
    
    h1 {
      font-size: 2rem;
      color: #333;
    }
  }
  
  .todo-body {
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
  }
  
  .todo-ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
</style>