<script>
    import Header from '$lib/components/Header.svelte';
    import DailyTodo from '$lib/components/DailyTodo.svelte';
    import NewTodoForm from '$lib/components/NewTodoForm.svelte';
    import TodoList from '$lib/components/TodoList.svelte';
  </script>
  
  <main class="max-w-xl mx-auto mt-10 px-4">
    <Header />
    <DailyTodo />
    <NewTodoForm />
    <TodoList />
    
  </main>
  
<style lang="postcss">
    @reference "tailwindcss";
    :global(html) {
      background-color: theme(--color-gray-100);
    }
  </style>