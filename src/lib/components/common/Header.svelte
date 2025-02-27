<script>
  let title = 'Todos';
  let navItems = [
    { id: 1, label: 'Home',   href: '/' },
    { id: 2, label: 'About',  href: '/about' },
    { id: 3, label: 'Todos',  href: '/practice/project/todos' },
  ];
</script>

<div class="todos-header">
  <h1>{title}</h1>
  <nav>
    <ul>
      {#each navItems as item (item.id) }
        <li><a href='{item.href}'>{item.label}</a></li>
      {/each}
    </ul>
  </nav>
</div>

<style lang="scss">
  @use "sass:color";
  
  // TodoList와 일치하는 변수 정의
  $primary-color: #3498db;
  $secondary-color: #2ecc71;
  $danger-color: #e74c3c;
  $text-color: #333;
  $border-radius: 5px;
  $box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  .todos-header {
    width: 100%;
    margin: 0 auto 20px auto;
    background-color: white;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    padding: 15px;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
    h1 {
      margin-top: 0;
      margin-bottom: 15px;
      color: $text-color;
      font-size: 24px;
      font-weight: 600;
    }
  }
  
  nav {
    ul {
      display: flex;
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    li {
      margin-right: 1.5rem;
      position: relative;
    }

    a {
      text-decoration: none;
      color: #555;
      font-weight: 400;
      transition: color 0.2s ease;
      font-size: 16px;
      
      &:hover {
        color: $primary-color;
      }
    }
  }
</style>