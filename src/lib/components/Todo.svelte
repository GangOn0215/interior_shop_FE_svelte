<script>
  import { createTodo } from '../utils/todo.js';
  import { todos } from '../stores/todoStore.js';
  let todoText = '';
  let lastSequence = 1;
  let todoDate = ''; // Add a variable for the date input
</script>

<input type="date" bind:value={todoDate} class="date-input" />
<input type="text" bind:value={todoText} class="todo-input" placeholder="할 일을 입력하세요" />

<button on:click={() => createTodo(todoText, todos, lastSequence)}>추가</button>

<style>
  .date-input {
    margin-bottom: 10px;
  }
  .todo-input {
    margin-bottom: 10px;
  }
</style>
