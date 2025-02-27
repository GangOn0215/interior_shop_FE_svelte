<script>
  let name = $state("world");
  let isRed = $state(false);

  function enter() {
    name = "enter";
  }

  function leave() {
    name = "leave";
  }
</script>

<h1>Hello {name}</h1>
<div
  class="box"
  style="background-color: {isRed ? 'red' : 'orange'};"
  onclick={() => (isRed = !isRed)}
  onkeydown={(e) => (e.key === "Enter" || e.key === " ") && (isRed = !isRed)}
  onmouseenter={enter}
  onmouseleave={leave}
  role="button"
  tabindex="0"
>
  Box
</div>

<style>
  .box {
    width: 300px;
    height: 150px;
    background-color: orange;
  }
</style>
