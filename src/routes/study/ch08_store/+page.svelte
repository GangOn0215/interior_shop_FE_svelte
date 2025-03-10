<script>
  import { increment, decrement, reset } from "@stores/simple.js";
  import Counter from "./Counter.svelte";

</script>

<Counter />

<button onclick={increment}>Add Counter</button>
<button onclick={decrement}>Sub Counter</button>
<button onclick={reset}>Reset</button>

<style lang="scss">
  
</style>