<script setup lang="ts">
const emits = defineEmits(["update:close-task-edit"]);
const { $t } = inject("nls");
const toast = useToast();
const todos = inject("todos");
const props = defineProps({
  editMode: {
    type: Boolean,
    required: false,
  },
  id: {
    type: Number,
    default: null,
  },
});
// this is for edit mode
const task = computed(() => {
  return props.id !== null && props.editMode ? todos.getTodo(props.id) : null;
});
const todo = ref({});
const updateTodo = (data) => {
  todo.value = data;
};
provide("task", task.value);
provide("editMode", props.editMode);
const confirmTask = (conf) => {
  if (conf) {
    toast.clear();
    if (!todo.value.title || todo.value.title === "") {
      toast.add({
        title: $t("taskTitleRequired"),
        color: "error",
      });
      return;
    } else {
      if (props.editMode) {
        todo.value["id"] = props.id;
        todos.updateTodo(todo.value);
        toast.add({
          title: $t("taskUpdated"),
        });
        // update task
      } else {
        todos.addTodo(todo.value);
        toast.add({
          title: $t("taskAdded"),
        });
        // create task
      }
    }
  }
  emits("update:close-task-edit");
};
</script>
<template>
  <div class="flex flex-col gap-3">
    <!-- body -->
    <BodyTaskTodoNewTaskBody @update:todo="updateTodo" />
    <!-- footer -->
    <BodyTaskTodoNewTaskFooter @update:confirm-task="confirmTask" />
  </div>
</template>
<style scoped></style>
