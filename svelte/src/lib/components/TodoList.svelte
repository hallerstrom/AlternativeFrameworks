<script>
    import { activeTodos, completeTodo } from '../stores/todos';
    import TodoItem from './TodoItem.svelte';
  </script>
  
  <ul class="bg-white shadow rounded p-4">
    <li class="mb-2 font-semibold">Att göra:</li>
    {#each $activeTodos as todo (todo.id)}
      <TodoItem {todo} onDone={completeTodo} />
    {/each}
  </ul>
  