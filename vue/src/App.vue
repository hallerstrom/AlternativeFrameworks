<template>
  <main class="max-w-xl mx-auto mt-10 px-4">
    <AppHeader />
    <DailyTodo />
    <NewTodoForm @todo-added="refreshTodos" />
    <TodoList ref="todoList" />
  </main>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import DailyTodo from './components/DailyTodo.vue';
import NewTodoForm from './components/NewTodoForm.vue';
import TodoList from './components/TodoList.vue';
import { todosService } from './services/todosService';

export default {
  name: 'App',
  components: {
    AppHeader,
    DailyTodo,
    NewTodoForm,
    TodoList
  },
  methods: {
    async refreshTodos() { 
      if (this.$refs.todoList) {
        this.$refs.todoList.todos = await todosService.getAllTodos(); 
      }
    }
  }
};
</script>