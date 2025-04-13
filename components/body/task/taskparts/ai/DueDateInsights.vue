<script setup lang="ts">
const { $t } = inject("nls");
const task = inject("task");
</script>
<template>
  <div
    class="todo-base-duedate-aiinsight flex space-x-1.5 py-2 px-4 rounded bg-amber-50/75"
  >
    <span class="text-xs font-semibold self-end line-clamp-1">
      {{
        task.isOverdue
          ? `${$t("overdue")}`
          : task.isDueToday
          ? `${$t("dueToday")}`
          : task.dueDayDifference === 4
          ? `${$t("stillOnTime")}`
          : `${task.dueDayDifference} ${$t("daysLeftL")}`
      }}
    </span>
  </div>
</template>
<style scoped></style>
