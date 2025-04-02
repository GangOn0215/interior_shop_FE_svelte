<script>
  import Icon from '@iconify/svelte';
  
  export let toggleComplete;
  export let todo;
  export let deleteTodo;
</script>
<div class="todo-manage">
  <button on:click={() => toggleComplete(todo.id)}>
    {#if todo.complete == 'Y'}
      <!-- 완료 -->
      <Icon icon="mdi:checkbox-marked-outline" width="28" height="28" />
    {:else}
      <!-- 미완료 -->
      <Icon icon="mdi:checkbox-blank-outline" width="28" height="28" />
    {/if}
  </button>

  <!-- 삭제 -->
  <!-- TODO: 삭제 할 때, 모든 리스트가 사라지는 버그 발생 -->
  <button on:click={() => deleteTodo(todo.id)}>
    <Icon icon="mdi:trash-can-outline" width="28" height="28" />
  </button>
</div>

<style lang="scss">
  .todo-manage {
    display: flex;
    flex-direction: row;
    align-items: center;
    
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