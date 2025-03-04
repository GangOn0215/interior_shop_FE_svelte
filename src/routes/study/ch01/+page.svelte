<!-- SFC(Single File Component) 방식  -->
<script>
  //  ! Legacy mode
  // let count = 0;

  // ! runes ( Svelte 5 ) svelte
  let count = $state(0);
</script>

<button onclick={() => count++}>
  clicks: {count}
</button>

<style>
</style>