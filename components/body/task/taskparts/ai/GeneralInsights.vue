<script setup lang="ts">
const { lang, $t } = inject("nls");
const task = inject("task");
</script>
<template>
  <div
    class="todo-base-ai-generalinsight flex flex-col items-center space-y-1 px-4 rounded pt-2 pb-4 bg-amber-50/75 w-full"
  >
    <UIcon name="healthicons:artificial-intelligence" size="18" />
    <div class="todo-base-ai-generalinsight-insights w-full">
      <div v-html="task.aiInsights" class="!text-sm"></div>
    </div>
  </div>
</template>
<style scoped></style>
