<script>
  let name = $state('world');
  let toggle = $state(false);
</script>

<button onclick={() => toggle = !toggle}>
  Toggle
</button>

{#if toggle}
  <h1>Hello {name}!</h1>
{:else}
  <div>No name!</div>
{/if}

