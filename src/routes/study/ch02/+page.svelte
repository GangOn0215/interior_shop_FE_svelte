<script>
  let name = $state('forn');
  let age = $state(15);

  function assign() {
    name = 'Heropy';
    age = 30;
  }
</script>

<h1>Hello {name}</h1>
<h2 class='check-age {age > 19 ? 'active' : ''}'> {age} </h2>

<input type="text" bind:value={name}>

<button onclick={assign}>
  Click
</button>

<style>
  .active {
    color: red;
  }
</style>