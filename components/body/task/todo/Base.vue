<script setup lang="ts">
const todos = inject("todos");
const { lang, $t } = inject("nls");
const allTodos = computed(() => {
  if (
    todos.search.value.length &&
    todos.enableSearchAndSort.value &&
    todos.inTodo.value
  ) {
    return todos.getTodos.value.filter(
      (todo) =>
        todo.title.toLowerCase().includes(todos.search.value.toLowerCase()) ||
        todo.description
          .toLowerCase()
          .includes(todos.search.value.toLowerCase())
    );
  }
  return todos.getTodos.value;
});
</script>
<template>
  <div class="todo-todo-container">
    <div v-if="allTodos.length" class="todo-done-data flex flex-col gap-4">
      <BodyTaskTodoBaseModel
        v-for="todo of allTodos"
        :key="todo.id + 'todo'"
        :id="todo.id"
      />
    </div>
    <div
      v-else
      class="todo-todo-empty flex items-center space-x-1.5 justify-center"
    >
      <UIcon name="ic:baseline-check-circle" size="18" />
      <span class="text-sm font-semibold">
        {{ $t("empty") }}
      </span>
    </div>
  </div>
</template>
<style scoped></style>
