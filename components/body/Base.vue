<script setup lang="ts">
const { $t } = inject("nls");
const todos = inject("todos");
const toast = useToast();
const openTaskEdit = ref(false);
const enableSearchAndSort = ref(false);
watch(
  () => todos.enableSearchAndSort.value,
  (newValue) => {
    enableSearchAndSort.value = newValue;
  },
  { immediate: true }
);
const closeTaskEdit = () => {
  openTaskEdit.value = false;
  toast.clear();
};
</script>
<template>
  <div class="todo-list flex flex-col gap-8 h-full">
    <div class="todo-list-header flex items-center justify-between">
      <BodyTitle />
      <div class="flex items-center gap-2">
        <UModal v-model:open="openTaskEdit" :title="$t('newTask')">
          <BodyAddTaskButton />
          <template #body>
            <BodyTaskTodoNewTask @update:close-task-edit="closeTaskEdit" />
          </template>
        </UModal>
        <UDrawer :handle="false" direction="right">
          <BodyAskAIButton label="ask" />
          <template #body>
            <BodyAiBase />
          </template>
        </UDrawer>
      </div>
    </div>
    <div class="w-full h-full flex items-center justify-center">
      <div
        :class="{
          'gap-4': !enableSearchAndSort,
        }"
        class="lg:w-2/4 md:w-3/5 sm:w-3/4 max-sm:w-full h-full flex flex-col justify-center"
      >
        <div class="sticky top-0 pt-4 z-10 bg-white">
          <BodyTodoStatus />
          <div
            v-if="enableSearchAndSort"
            class="flex items-center justify-between p-2 space-x-2"
          >
            <BodyTodoSearch />
            <BodyTodoSort />
          </div>
        </div>
        <!-- search and sort -->
        <BodyTaskBase />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
