<script>
    export let todo;
    export let onDone;
  </script>
  
  <li class="flex justify-between items-center py-2 border-b">
    <span>{todo.todo}</span>
    <button
      on:click={() => onDone(todo.id)}
      class="text-red-500 hover:underline"
    >
      X
    </button>
  </li>
  