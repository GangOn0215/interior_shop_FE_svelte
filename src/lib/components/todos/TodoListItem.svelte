<script>
  export let todo;
  export let triggerModal;
</script>

<!-- 
  on:click 이벤트를 주니깐 "a11y-click-events-have-key-events" 에러가 발생, 
  div에 클릭 이벤트를 사용해서 발생 >> role="none"을 주면 해결이 댐
-->
<div class="todo-wrap" key={todo.id} on:click={() => triggerModal(todo)} role="none">
  <div class="todo-item">
    <span class="todo-title">[ {todo.title} ]</span>
    <span class="todo-content">{todo.content}</span> 
  </div>
</div>

<div class="todo-modal-container">
  
</div>

<style lang="scss">
  .todo-wrap {
      display: flex;
      justify-content: space-between;
      width: 60%;
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