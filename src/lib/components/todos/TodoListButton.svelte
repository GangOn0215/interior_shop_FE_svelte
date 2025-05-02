<script>
  import Icon from '@iconify/svelte';
  
  export let toggleComplete;
  export let todo;
  export let deleteTodo;
</script>

<div class="todo-manage">
  <!-- 완료/미완료 버튼 -->
  <button on:click={() => toggleComplete(todo.id)}>
    {#if todo.complete == 'Y'}
      <!-- 완료 -->
      <Icon icon="mdi:checkbox-marked-outline" width="28" height="28" />
    {:else}
      <!-- 미완료 -->
      <Icon icon="mdi:checkbox-blank-outline" width="28" height="28" />
    {/if}
  </button>

  <!-- 케밥 버튼 -->
  <div class="dropdown">
    <button class="kebab-button">
      <Icon icon="mdi:dots-vertical" width="28" height="28" />
    </button>
    <div class="dropdown-menu">
      <button class="dropdown-item">복사</button>
      <button class="dropdown-item" >수정</button>
      <button class="dropdown-item" on:click={() => deleteTodo(todo.id)}>삭제</button>
    </div>
  </div>
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

  .dropdown {
    position: relative;

    .kebab-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .dropdown-menu {
      display: none;
      position: absolute;
      top: 100%;
      left: 10px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 10;
      min-width: 8rem;

      .dropdown-item {
        padding: 0.5rem 1rem;
        text-align: left;
        background: none;
        border: none;
        width: 100%;
        cursor: pointer;
        font-size: 0.9rem;
        margin-left: 0;

        &:hover {
          background-color: #f0f0f0;
        }
      }
    }

    &:hover .dropdown-menu {
      display: block;
    }
  }
</style>