<template>
  <ul class="mb-4">
    <li><h3 class="text-xl font-semibold mb-2">Att göra:</h3></li>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @doneItem="itemDone"
    />
  </ul>
</template>

<script>
import TodoItem from './TodoItem.vue';
import { todosService } from '../services/todosService';
import { ref, onMounted } from 'vue'; 

export default {
  name: 'TodoList',
  components: { TodoItem },
  setup() {
    const todos = ref([]); 

    const loadTodos = async () => {
      todos.value = await todosService.getAllTodos();
    };

    const itemDone = async (id) => {
      await todosService.completeTodo(id);
      await loadTodos(); 
    };

    onMounted(loadTodos); 

    return {
      todos,
      itemDone
    };
  }
};
</script>