<script setup lang="ts">
const todos = inject("todos");
</script>
<template>
  <div class="todo-state-container text-sm">
    <BodyTaskTodoBase :key="todos.reRender.value" v-show="todos.inTodo.value" />
    <BodyTaskInprogressBase
      :key="todos.reRender.value"
      v-show="todos.inInProgress.value"
    />
    <BodyTaskDoneBase :key="todos.reRender.value" v-show="todos.inDone.value" />
  </div>
</template>
<style scoped></style>
