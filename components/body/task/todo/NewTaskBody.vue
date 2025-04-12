<script setup lang="ts">
const { $t } = inject("nls");
const todo = reactive({});
const emits = defineEmits(["update:todo"]);
const setData = (data: object) => {
  todo[data.key] = data.value;
  emits("update:todo", todo);
};
</script>
<template>
  <div class="flex flex-col gap-3">
    <BodyTaskTodoCoverEdit @update:cover="setData" />
    <!-- title -->
    <BodyTaskTodoTitleEdit @update:title="setData" />
    <!-- label -->
    <BodyTaskTodoLabelEdit @update:label="setData" />
    <!-- description -->
    <BodyTaskTodoDescriptionEdit @update:description="setData" />
    <!-- users -->
    <BodyTaskTodoUsersEdit @update:users="setData" />
    <!-- duedate -->
    <BodyTaskTodoDueDateEdit @update:duedate="setData" />
    <!-- tags -->
    <BodyTaskTodoTagsEdit @update:tags="setData" />
  </div>
</template>
<style scoped></style>
