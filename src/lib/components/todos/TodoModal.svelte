<script>
  import { isModalOpenStore } from '$lib/stores/todoStore.js';
  import { getFullDate } from '$lib/utils/common.js';
  import { editTodo } from '$lib/utils/todo.js';

  export let selectedTodo;
  export let updateTitle;
  export let updateContent;
  export let todos;

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
</script>

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
        <button class="modal-action-modify" on:click={toggleTodoUpdate}>수정</button>
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
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;


    .todo-modal {
      background: #fff;
      padding: 1rem;
      border-radius: 0.25rem;
      width: 50%;
      max-width: 500px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      .todo-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        padding-bottom: 0.5rem;

        h2 {
          margin: 0;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
      }

      .todo-modal-body {
        margin: 1rem 0;

        .modify-title, .modify-calendar {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          font-size: 1rem;
          box-sizing: border-box;
          background-color: #fff;
          transition: border-color 0.3s ease;

          &:focus {
            border-color: #007bff;
            outline: none;
            background-color: #fff;
          }

          &:disabled {
            background-color: #fff;
          }
        }

        .modify-content {
          width: 100%;
          height: 150px;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          font-size: 1rem;
          box-sizing: border-box;
          background-color: #fff;
          resize: none; /* 사용자가 크기를 조정하지 못하도록 설정 */
          transition: border-color 0.3s ease;

          &:focus {
            border-color: #007bff;
            outline: none;
            background-color: #fff;
          }

          &:disabled {
            background-color: #fff;
          }
        }
      }

      .todo-modal-footer {
        display: flex;
        justify-content: space-between;

        .todo-modify-button {
            display: flex;
            gap: 0.5rem;

            .save-button {
              padding: 0.5rem 1rem;
              background-color: #28a745; /* 녹색 */
              color: #fff;
              border: none;
              border-radius: 0.25rem;
              font-size: 1rem;
              cursor: pointer;
              transition: background-color 0.3s ease;

              &:hover {
                background-color: #218838; /* 더 진한 녹색 */
              }
            }

            .cancel-button {
              padding: 0.5rem 1rem;
              background-color: #dc3545; /* 빨간색 */
              color: #fff;
              border: none;
              border-radius: 0.25rem;
              font-size: 1rem;
              cursor: pointer;
              transition: background-color 0.3s ease;

              &:hover {
                background-color: #c82333; /* 더 진한 빨간색 */
              }
            }
        }

        .modal-action-modify {
          padding: 0.5rem 1rem;
          background-color: #ffc107; /* 노란색 */
          color: #212529;
          border: none;
          border-radius: 0.25rem;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #e0a800; /* 더 진한 노란색 */
          }
        }

      }
    }
  }
</style>