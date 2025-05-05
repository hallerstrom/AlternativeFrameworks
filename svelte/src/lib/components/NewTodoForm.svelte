<script>
    import { addTodo } from '../stores/todos';
    let newTodo = '';
  </script>
  
  <form
    on:submit|preventDefault={() => {
      if (newTodo.trim()) {
        addTodo(newTodo.trim());
        newTodo = '';
      }
    }}
    class="mb-6"
  >
    <label for="new-todo" class="block mb-2 font-semibold">Ny uppgift:</label>
    <input
      id="new-todo"
      bind:value={newTodo}
      type="text"
      class="border px-2 py-1 mr-2"
    />
    <button type="submit" class="bg-green-500 text-white px-4 py-1 rounded">
      Spara
    </button>
  </form>
  