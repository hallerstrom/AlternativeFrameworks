<template>
  <div class="bg-yellow-100 p-4 rounded mb-4">
    <p v-if="todo">{{ todo.todo }}</p>
    <p v-else>Inga fler uppgifter!</p>
    <button @click="showNewRandomTodo" class="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
      Visa ny
    </button>
  </div>
</template>

<script>
import { todosService } from '../services/todosService';
import { ref, onMounted } from 'vue';

export default {
  name: 'DailyTodo',
  setup() {
    const todo = ref(null);

    const loadRandomTodo = async () => {
      todo.value = await todosService.getRandomTodo();
    };

    const showNewRandomTodo = async () => {
      await loadRandomTodo();
    };

    onMounted(loadRandomTodo);

    return {
      todo,
      showNewRandomTodo
    };
  }
};
</script>