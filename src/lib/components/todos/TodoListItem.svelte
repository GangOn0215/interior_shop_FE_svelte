<script>
  export let todo;
</script>

<div class="todo-wrap" key={todo.id}>
  <div class="todo-item">
      <span class="todo-title">[ {todo.title} ]</span>
      <span class="todo-content">{todo.content}</span> 
  </div>
</div>

<style lang="scss">
  .todo-wrap {
      display: flex;
      justify-content: space-between;
      width: 70%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 0.25rem;
      
      .todo-item {
        width: 100%;
        
        .todo-title {
          font-weight: bold;
          margin-right: 0.5rem;
        }
        
        .todo-content {
          color: #333;
        }
      }
    }
</style>