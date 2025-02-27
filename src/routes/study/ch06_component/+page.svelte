<script>
  import Button from "./Button.svelte";

  let buttonText = 'Save It';
  
</script>
  <div>
    <h1>Svelte Component Example</h1>
    
    <Button text={buttonText} primary={true} />
    <Button text="취소하기"  />
  </div>
<style>

</style>