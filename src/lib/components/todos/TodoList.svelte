<script>
  import Icon from '@iconify/svelte';
  import TodoListItem from './TodoListItem.svelte';
  import TodoListButton from './TodoListButton.svelte';

  export let todos;
  export let todoValue;
  export let toggleComplete;
  export let deleteTodo;
  export let triggerModal;
</script>

{#if todoValue.length === 0}
  <div class='todo-li'>        
      할 일이 없습니다.
  </div>
{:else}
  {#each todoValue as todo}
    <div class="todo-li">
      <TodoListItem 
        todo={todo} 
        triggerModal={triggerModal}
      />
      <TodoListButton 
        todo={todo} 
        toggleComplete={() => toggleComplete(todo.id, todos, todoValue )} 
        deleteTodo={() => deleteTodo(todo.id, todos)}
      />
    </div>
  {/each}
{/if}

<style lang="scss">
  .todo-li {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;
  }
</style>