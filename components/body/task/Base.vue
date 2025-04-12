<script setup lang="ts">
const todos = inject("todos");
</script>
<template>
  <div class="todo-state-container text-sm">
    <BodyTaskTodoBase v-show="todos.inTodo.value" />
    <BodyTaskInprogressBase v-show="todos.inInProgress.value" />
    <BodyTaskDoneBase v-show="todos.inDone.value" />
  </div>
</template>
<style scoped></style>
