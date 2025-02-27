<script>
  import Counter from './Counter.svelte';

  let totalCount = 0;
  
  function handleCountChange(event) {
    totalCount = event.detail.count;
  }
</script>

<Counter on:countChange={handleCountChange} />
<p>현재 카운트: {totalCount}</p>