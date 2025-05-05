<template>
    <form @submit.prevent="formSubmit" class="mb-4">
      <div class="mb-2 font-semibold">Ny uppgift:</div>
      <input
        v-model="newTodoInput"
        type="text"
        class="border p-2 mr-2"
        placeholder="Skriv en uppgift"
      />
      <button type="submit" class="bg-green-500 text-white px-3 py-1 rounded">
        Spara
      </button>
    </form>
  </template>
  
  <script>
  import { todosService } from '../services/todosService';
  
  export default {
    name: 'NewTodoForm',
    data() {
      return {
        newTodoInput: ''
      };
    },
    methods: {
      formSubmit() {
        if (this.newTodoInput.trim()) {
          todosService.addTodo(this.newTodoInput.trim());
          this.newTodoInput = '';
          this.$emit('todo-added');
        }
      }
    }
  };
  </script>
  