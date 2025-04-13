<script setup lang="ts">
const task = inject("task");
</script>
<template>
  <div class="todo-base-tags flex items-center space-x-3 flex-wrap">
    <span
      v-for="tag in task.tags"
      :key="tag + task.id"
      class="text-xs font-semibold bg-blue-100/25 py-1 px-2.5 rounded-full m-1.5"
    >
      #{{ tag }}</span
    >
  </div>
</template>
<style scoped></style>
