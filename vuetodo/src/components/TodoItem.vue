<template>
    <li class="flex items-center justify-between border-b py-2">
      <span>{{ todo.todo }}</span>
      <button @click="itemDone" class="bg-red-500 text-white px-2 py-1 rounded">
        X
      </button>
    </li>
  </template>
  
  <script>
  export default {
    name: 'TodoItem',
    props: {
      todo: Object
    },
    methods: {
      itemDone() {
        this.$emit('doneItem', this.todo.id);
      }
    }
  };
  </script>
  