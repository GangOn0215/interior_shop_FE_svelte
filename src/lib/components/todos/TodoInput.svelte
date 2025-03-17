<script>
  import Icon from '@iconify/svelte';

  export let newTodo = '';
  export let createTodo;

  function handleKeypress() {
    if(event.key === 'Enter') {
      createTodo();
    }
  }

  function addTodo() {
    createTodo();
  }
</script>

<div class="todo-input-container">
  <input class="todo-input" bind:value={newTodo} on:keypress={handleKeypress} placeholder="할 일을 입력해주세요." />

  <button on:click={addTodo}>
    <Icon icon="mdi:plus-box-outline" width="28" height="28" />
  </button>
  <!-- 비우기 -->
  <button on:click={() => newTodo = ''}>
    <Icon icon="memory:checkbox-cross" width="28" height="28" />
  </button>
</div>

<style lang="scss">
  .todo-input-container {
    display: flex;
    justify-content: center;
    
    .todo-input {
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
      
      &:hover {
        background-color: #f0f0f0;
      }
    }

  }
</style>