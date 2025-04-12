<script setup lang="ts">
const { lang, $t } = inject("nls");
const task = inject("task");
</script>
<template>
  <div class="todo-base-assign-users flex items-center space-x-1 w-fit">
    <UIcon name="ic:baseline-person" size="18" />
    <span class="text-xs font-semibold self-end">
      {{ task.users }}
      {{ task.assignments.length > 1 ? $t("peopleL") : "" }}</span
    >
  </div>
</template>
<style scoped></style>
