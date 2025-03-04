<script>
  import Children from './Children.svelte';
  
  let personName = "홍길동";
  let personAge = 20;
</script>

<Children name={personName} age={personAge} />
<Children name="김철수" />

<style>

</style>