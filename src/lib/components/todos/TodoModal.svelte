<script>
  import { isModalOpenStore } from '$lib/stores/todoStore.js';
  import { getFullDate } from '$lib/utils/common.js';
  import { editTodo } from '$lib/utils/todo.js';

  export let selectedTodo;
  export let updateTitle;
  export let updateContent;
  export let todos;

  export let newTitle = '';
  export let newTodo = '';
  export let createTodo;

  let isModalOpen = false;
  let isTodoUpdate = false;

  isModalOpenStore.subscribe((isOpen) => {
    isModalOpen = isOpen;
  });

  function toggleTodoUpdate() {
    isTodoUpdate = !isTodoUpdate;
  }

  function toggleCloseModal() {
    isModalOpenStore.set(false);

    isModalOpen = false;
    isTodoUpdate = false;
  }

  async function handleUpdateTodo() {
    selectedTodo.title = updateTitle;
    selectedTodo.content = updateContent;

    await editTodo(selectedTodo, todos);

    isTodoUpdate = false;
  }

  function onClickCopy() {
    newTitle = updateTitle;
    newTodo = updateContent;

    createTodo();
    toggleCloseModal();
  }
</script>

<!-- 모달 창 외부 누르면 꺼지게 만들자. -->

<!-- Modal -->
{#if isModalOpen}
<div class="todo-modal-container">
  <div class="todo-modal">
    <div class="todo-modal-header">
      <h2>Todo Details</h2>
      <button class="close-button" on:click={toggleCloseModal}>&times;</button>
    </div>
    <div class="todo-modal-body">
      <input type="text" class="modify-calendar" value={getFullDate(new Date(selectedTodo.created_at))} disabled="true"/>
      <input type="text" class="modify-title" bind:value={updateTitle} placeholder="제목을 입력하세요." disabled="{ isTodoUpdate ? false: true}" />
      <textarea name="" id="" class="modify-content" bind:value={updateContent} disabled="{ isTodoUpdate ? false : true }"></textarea>
    </div>
    <div class="todo-modal-footer">
      
      {#if isTodoUpdate}
      <div class="todo-modify-button">
        <button class="save-button" on:click={handleUpdateTodo}>저장</button>
        <button class="cancel-button" on:click={toggleTodoUpdate}>취소</button>
      </div>
      {:else}
        <div>
          <button class="modal-action-modify" on:click={toggleTodoUpdate}>수정</button>
        </div>
        <!-- TODO : 복사 클릭하면 최상단에 추기 되게 만들자. -->
        <div>
          <button class="copy-button" on:click={onClickCopy}>복사</button>
        </div>
      {/if}
    </div>
  </div>
</div>
{/if}

<style type="scss">
.todo-modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .todo-modal {
    background: #fff;
    padding: 2rem;
    border-radius: 1rem;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);

    .todo-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;

      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #111;
        margin: 0;
      }

      .close-button {
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #666;
        cursor: pointer;

        &:hover {
          color: #111;
        }
      }
    }

    .todo-modal-body {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      input,
      textarea {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f9f9f9;
        font-size: 0.95rem;
        color: #222;
        box-sizing: border-box;

        &:focus {
          border-color: #000;
          outline: none;
          background-color: #fff;
        }

        &:disabled {
          background-color: #f0f0f0;
          color: #888;
        }
      }

      textarea {
        height: 140px;
        resize: none;
      }
    }

    .todo-modal-footer {
      margin-top: 1.5rem;
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;

      button {
        flex: 1;
        padding: 0.3rem 0.75rem;
        font-size: 0.95rem;
        font-weight: 500;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.2s ease, transform 0.2s ease;

        &.modal-action-modify {
          background: #000;
          color: #fff;

          &:hover {
            background: #333;
            transform: translateY(-2px);
          }

          &:active {
            transform: translateY(0);
          }
        }

        &.copy-button {
          background: #888;
          color: #fff;

          &:hover {
            background: #666;
          }
        }

        &.save-button {
          background: #111;
          color: #fff;

          &:hover {
            background: #333;
          }
        }

        &.cancel-button {
          background: #bbb;
          color: #000;

          &:hover {
            background: #999;
          }
        }
      }
    }
  }
}
</style>