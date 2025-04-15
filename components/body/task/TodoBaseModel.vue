<script setup lang="ts">
const todos = inject("todos");
const { lang, $t } = inject("nls");
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  inAi: {
    type: Boolean,
    default: false,
  },
});
const inAi = computed(() => props.inAi);
const task = todos.getTodo(props.id);
provide("task", task);
provide("inAi", inAi);
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
      <div
        class="todo-base-collapsable-content flex flex-col space-y-2 w-full relative"
      >
        <div
          :class="{
            'max-h-10 overflow-hidden after:absolute after:bottom-0 after:left-0 after:w-full after:h-10 after:bg-gradient-to-t after:from-white after:to-transparent':
              !task.isExpanded && inAi,
          }"
          class="todo-base-collapsable-content-inner flex flex-col space-y-2 w-full"
        >
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
            <BodyTaskTaskpartsAiDueDateInsights v-if="!inAi" />
            <!-- AI notice ? -->
          </div>
          <div v-if="task.hasTags" class="todo-base-tags">
            <BodyTaskTaskpartsTags />
          </div>
          <!-- task.hasAiInsights -->
          <div
            v-if="task.hasAiInsights && !inAi"
            class="todo-base-AI-insight w-full"
          >
            <BodyTaskTaskpartsAIInsights />
          </div>
        </div>
        <UButton
          v-if="inAi"
          :class="{
            'absolute bottom-0': !task.isExpanded,
          }"
          class="cursor-pointer self-center rounded-full"
          :icon="
            task.isExpanded
              ? 'ic:sharp-keyboard-arrow-up'
              : 'ic:sharp-keyboard-arrow-down'
          "
          size="xs"
          color="neutral"
          variant="solid"
          :label="task.isExpanded ? $t('collapse') : $t('expand')"
          @click="task.expandContent(!task.isExpanded)"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
