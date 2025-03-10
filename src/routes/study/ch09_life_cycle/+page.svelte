<script>
  import { beforeUpdate, afterUpdate, onMount } from 'svelte';

  let count = 0;
  let prevCount = 0;
  let log = [];

  function addLog(message) {
    log = [ ...log, message ];
  }

  beforeUpdate(() => {
    console.log('beforeUpdate', count, prevCount);

    if(count !== prevCount) {
      
      addLog(`beforeUpdate - count: ${count}`);
    }

  })
  
  onMount(() => {
    console.log('onMount');

    addLog(`onMount - count: ${count}`);
  })

  afterUpdate(() => {
    console.log('afteUpdate');

    if(count !== prevCount) {
      prevCount = count;
      
      addLog(`afterUpdate - count: ${count}`);
    }
  })

  function clickButtonCounter() {
    count++;

    console.log(count);
  }
  
</script>

<div>
  <!-- 클릭 시 이벤트 발생 -->
  <button on:click={clickButtonCounter}>click ({count})</button>
</div>

<!-- Log 보여주는 곳 -->
<div>
  Logs
  <ul>
    {#each log as message}
      <li>{message}</li>  
    {/each}
    
  </ul>
</div>
