<script setup lang="ts">
const todos = inject("todos");
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const task = todos.getTodo(props.id);
provide("task", task);
</script>
<template>
  <div
    class="todo-base-container w-full flex-col space-y-2 rounded-md border border-blue-100/50"
  >
    <div class="todo-base-header">
      <BodyTaskTaskpartsHeader />
    </div>
    <div class="px-4 pb-2 flex flex-col space-y-2 w-full">
      <div
        class="todo-base-label-actions flex items-center space-x-3 justify-between"
      >
        <BodyTaskTaskpartsLabel />
        <BodyTaskTaskpartsActions />
      </div>
      <div v-if="task.description.length" class="todo-base-content">
        <BodyTaskTaskpartsDescription />
      </div>
      <div v-if="task.users" class="todo-base-assignment">
        <BodyTaskTaskpartsAssignUser />
      </div>
      <div
        v-if="task.hasDueDate"
        class="todo-base-due-date flex items-center space-x-3 max"
      >
        <BodyTaskTaskpartsDueDate />
        <!-- task.hasDueDateAiInsight -->
        <BodyTaskTaskpartsAiDueDateInsights />
        <!-- AI notice ? -->
      </div>
      <div v-if="task.hasTags" class="todo-base-tags">
        <BodyTaskTaskpartsTags />
      </div>
      <!-- task.hasAiInsights -->
      <div v-if="true" class="todo-base-AI-insight w-full">
        <BodyTaskTaskpartsAIInsights />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
