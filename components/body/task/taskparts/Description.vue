<script setup lang="ts">
const task = inject("task");
</script>
<template>
  <div class="todo-base-description flex flex-col space-y-1">
    <div class="todo-base-description-content">
      <UIcon name="circum:text-align-left" class="mr-1.5 size-5" />
      <span class="text-sm">{{ task.description }}</span>
    </div>
    <!-- <div class="todo-base-description-files flex items-center space-x-1.5">
      <UIcon name="tabler:paperclip" class="size-5" />
      <span class="text-xs font-semibold">2</span>
    </div> -->
  </div>
</template>
<style scoped></style>
