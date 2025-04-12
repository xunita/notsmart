<script setup lang="ts">
const task = inject("task");
</script>
<template>
  <div
    :class="{
      'bg-green-600': !task.isOverdue || (task.isOverdue && task.isDone),
      'bg-red-500/90': task.isOverdue && !task.isDone,
    }"
    class="todo-base-due flex items-center space-x-1.5 w-fit border rounded p-1.5 text-white border-blue-100/50"
  >
    <UIcon name="material-symbols:event-upcoming" />
    <span class="text-xs font-semibold self-end">
      {{
        task.dueDate.toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      }}
    </span>
  </div>
</template>
<style scoped></style>
