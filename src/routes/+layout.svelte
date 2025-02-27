<script></script>

<div class="app">
  Header

  <main>
    <slot></slot>
  </main>

  Footer
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }
  
  main {
    flex: 1;
    padding: 1rem;
  }
</style>