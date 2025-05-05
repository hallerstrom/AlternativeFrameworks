<script>
    import { randomTodo, todos } from '../stores/todos';
  
    function handleClick() {
      todos.update((currentTodos) => currentTodos);
    }
  </script>
  
  <div class="bg-yellow-100 p-4 rounded mb-4">
    {#if $randomTodo}
      <p>{$randomTodo.todo}</p>
    {:else}
      <p>Inga fler uppgifter!</p>
    {/if}
    <button
      on:click={handleClick}
      class="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
    >
      Visa ny 
    </button>
  </div>