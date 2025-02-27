<script>
  let name = $state("Fruits");
  let fruits = $state([
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
    "Kiwi",
    "Lemon",
    "Mango",
    "Nectarine",
    "Orange",
    "Peach",
    "Quince",
    "Raspberry",
    "Strawberry",
    "Tangerine",
    "Ugli",
    "Vanilla",
    "Watermelon",
    "Xylocarp",
    "Yuzu",
    "Zucchini",
  ]);
  
  function defaultFruit() {
    fruits = fruits.slice(1);
  }
</script>

<h1>Hello {name}!</h1>
<ul>
  {#each fruits as fruit}
    <li>{fruit}</li>
  {/each}
</ul>

<button onclick={defaultFruit}> Default Fruits </button>

<style>
</style>
