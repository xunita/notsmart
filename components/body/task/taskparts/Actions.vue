<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
const { $t } = inject("nls");
const task = inject("task");
const todos = inject("todos");
const openTaskEdit = ref(false);
const openDeleteModal = ref(false);
const isTodo = computed(() => task.isTodo);
const isInProgress = computed(() => task.isInProgress);
const isDone = computed(() => task.isDone);
//
const moveAndSave = (to) => {
  if (task.moveTo(to)) {
    todos.saveTodosToStorage();
  }
  // trigger Ai insights
};
const closeTaskEdit = () => {
  openTaskEdit.value = false;
};

const removeTask = (conf) => {
  if (conf) {
    // remove task from todos
    todos.removeTodo(task.id);
  }
  openDeleteModal.value = false;
  // trigger Ai insights
};
const menuItems: DropdownMenuItem[] = [
  {
    label: `${$t("addTo")} "${$t("toDo")}"`,
    class: "cursor-pointer text-xs font-semibold",
    active: isTodo,
    activeClass: "text-green-600",
    icon: "material-symbols:checklist",
    onSelect: () => {
      if (task.isTodo) return;
      moveAndSave("todo");
    },
  },
  {
    label: `${$t("addTo")} "${$t("inProgress")}"`,
    class: "cursor-pointer text-xs font-semibold",
    active: isInProgress,
    activeClass: "text-green-600",
    icon: "material-symbols:play-arrow",
    onSelect: () => {
      if (task.isInProgress) return;
      moveAndSave("inprogress");
    },
  },
  {
    label: `${$t("addTo")} "${$t("done")}"`,
    class: "cursor-pointer text-xs font-semibold",
    active: isDone,
    activeClass: "text-green-600",
    icon: "material-symbols:check-circle",
    onSelect: () => {
      if (task.isDone) return;
      moveAndSave("done");
    },
  },
];
</script>
<template>
  <UButtonGroup class="todo-base-actions">
    <UDropdownMenu :items="menuItems">
      <UButton
        class="cursor-pointer"
        color="neutral"
        variant="ghost"
        icon="mdi:dots-vertical"
      />
    </UDropdownMenu>
    <UModal v-model:open="openTaskEdit" :title="$t('editTask')">
      <UButton
        class="cursor-pointer"
        color="neutral"
        variant="ghost"
        icon="heroicons:pencil-solid"
      />
      <template #body>
        <BodyTaskTodoNewTask
          :id="task.id"
          :edit-mode="true"
          @update:close-task-edit="closeTaskEdit"
        />
      </template>
    </UModal>
    <UModal v-model:open="openDeleteModal" :title="$t('confirmDeletion')">
      <UButton
        class="cursor-pointer"
        color="neutral"
        variant="ghost"
        icon="fluent:delete-16-filled"
      />
      <template #body>
        <BodyTaskTodoDeleteModal @update:confirm-deletion="removeTask" />
      </template>
    </UModal>
  </UButtonGroup>
</template>
<style scoped></style>
