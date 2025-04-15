<script setup lang="ts">
const { lang, $t } = inject("nls");
const task = inject("task");
</script>
<template>
  <div
    class="todo-base-AI-insight w-full flex flex-col gap-2 items-center relative"
  >
    <!-- insights here -->
    <div
      :class="{
        'max-h-24 overflow-hidden after:absolute after:bottom-0 after:left-0 after:w-full after:h-10 after:bg-gradient-to-t after:from-white after:to-transparent':
          !task.isAiInsightsExpanded,
      }"
      class="rounded w-full"
    >
      <BodyTaskTaskpartsAiGeneralInsights />
    </div>
    <UButton
      :class="{
        'absolute bottom-4': !task.isAiInsightsExpanded,
      }"
      class="cursor-pointer rounded-full"
      :icon="
        task.isAiInsightsExpanded
          ? 'ic:sharp-keyboard-arrow-up'
          : 'ic:sharp-keyboard-arrow-down'
      "
      size="sm"
      color="neutral"
      variant="solid"
      :label="$t('aiInsights')"
      @click="task.expandAiInsights(!task.isAiInsightsExpanded)"
    />
  </div>
</template>
<style scoped></style>
