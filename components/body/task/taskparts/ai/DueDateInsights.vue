<script setup lang="ts">
const { lang, $t } = inject("nls");
const task = inject("task");
</script>
<template>
  <div
    class="todo-base-duedate-aiinsight flex space-x-1.5 p-2 rounded bg-amber-50/75"
  >
    <UIcon name="healthicons:artificial-intelligence" size="18" />
    <span class="text-xs font-semibold self-end line-clamp-1">
      {{ task.dueDateAiInsight }} Still on time
    </span>
  </div>
</template>
<style scoped></style>
