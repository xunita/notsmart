<script setup lang="ts">
const todos = inject("todos");
const { lang, $t } = inject("nls");
const allInProgress = computed(() => {
  if (
    todos.search.value.length &&
    todos.enableSearchAndSort.value &&
    todos.inInProgress.value
  ) {
    return todos.getInProgressTodos.value.filter(
      (todo) =>
        todo.title.toLowerCase().includes(todos.search.value.toLowerCase()) ||
        todo.description
          .toLowerCase()
          .includes(todos.search.value.toLowerCase())
    );
  }
  return todos.getInProgressTodos.value;
});
</script>
<template>
  <div class="todo-inprogress-container">
    <div v-if="allInProgress.length" class="todo-done-data flex flex-col gap-4">
      <BodyTaskTodoBaseModel
        v-for="todo of allInProgress"
        :key="todo.id + 'inprogress'"
        :id="todo.id"
      />
    </div>
    <div
      v-else
      class="todo-inprogress-empty flex items-center space-x-1.5 justify-center"
    >
      <UIcon name="ic:baseline-check-circle" size="18" />
      <span class="text-sm font-semibold">
        {{ $t("empty") }}
      </span>
    </div>
  </div>
</template>
<style scoped></style>
