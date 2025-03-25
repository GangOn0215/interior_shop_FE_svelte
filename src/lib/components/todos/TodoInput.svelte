<script>
  import Icon from '@iconify/svelte';

  export let newTitle = '';
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
  <div class="todo-input-wrapper">
    <input type="text" class="common-input todo-input-title" bind:value={newTitle} placeholder="타이틀" />
    <input class="common-input todo-input" bind:value={newTodo} on:keypress={handleKeypress} placeholder="할 일을 입력해주세요." />
  </div>

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

    .todo-input-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 70%;
    }

    .common-input {
      height: 2.5rem;
      padding: 0 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      font-size: 1rem;
    }

    .todo-input {
      width: 70%;
    }

    .todo-input-title {
      width: 20%;
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