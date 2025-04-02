<script>
  export let pageInfo;
  export let maxBlock;
  export let currentPage;
</script>

<div class="todo-pagination">
  <!-- 이전  -->
  {#if pageInfo }
    {#each Array.from({ length: maxBlock }, (_, i) => i + 1) as num}
      <button 
        class:active={num === currentPage}
        on:click={() => currentPage.set(num)}
      >
        {num}
      </button>
    {/each}
  {/if}
</div>

<style type="scss">
  .todo-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.5rem 0;
    gap: 0.5rem;

    button {
      padding: 0.5rem 0.75rem;
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      color: #495057;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: #e9ecef;
        color: #212529;
      }

      &.active {
        background-color: #4263eb;
        color: white;
        border-color: #4263eb;
      }

      &:focus {
        outline: none;
        box-shadow: 0 0 0 0.2rem rgba(66, 99, 235, 0.25);
      }
    }
  }
</style>