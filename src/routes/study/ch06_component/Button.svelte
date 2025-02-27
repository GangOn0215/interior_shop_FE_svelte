<script>
  let { text, primary } = $props();
  
  function handleClick() {
    console.log("Button Clicked");
  }
</script>

<button
  class={primary ? "primary" : "secondary"}
  onclick={handleClick}
>{text}</button>

<style>
    button {
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
  
  .primary {
    background-color: #4CAF50;
    color: white;
  }
  
  .secondary {
    background-color: #f1f1f1;
    color: #333;
  }
</style>