<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let count = 0;

  function increment() {
    count += 1;
    dispatch("countChange", { count });
  }
</script>

<button onclick={increment}>
  Counter: {count}
</button>