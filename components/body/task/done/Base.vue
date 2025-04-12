<script setup lang="ts">
const todos = inject("todos");
const { lang, $t } = inject("nls");
const allDone = computed(() => {
  if (
    todos.search.value.length &&
    todos.enableSearchAndSort.value &&
    todos.inDone.value
  ) {
    return todos.getDoneTodos.value.filter(
      (todo) =>
        todo.title.toLowerCase().includes(todos.search.value.toLowerCase()) ||
        todo.description
          .toLowerCase()
          .includes(todos.search.value.toLowerCase())
    );
  }
  return todos.getDoneTodos.value;
});
</script>
<template>
  <div class="todo-done-container">
    <div v-if="allDone.length" class="todo-done-data flex flex-col gap-4">
      <BodyTaskTodoBaseModel
        v-for="todo of allDone"
        :key="todo.id + 'done'"
        :id="todo.id"
      />
    </div>
    <div
      v-else
      class="todo-done-empty flex items-center space-x-1.5 justify-center"
    >
      <UIcon name="ic:baseline-check-circle" size="18" />
      <span class="text-sm font-semibold">
        {{ $t("empty") }}
      </span>
    </div>
  </div>
</template>
<style scoped></style>
