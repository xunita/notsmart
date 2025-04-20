<script setup lang="ts">
const todos = inject("todos");
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
const closeTask = () => {
  todos.setAITaskId(null);
};
</script>
<template>
  <div class="relative">
    <BodyTaskTodoBaseModel :id="props.id" :inAi="props.inAi" />
    <UButton
      size="md"
      color="neutral"
      variant="solid"
      icon="material-symbols:close-rounded"
      class="rounded-full m-1 p-1 self-end cursor-pointer absolute z-10 top-0 right-0"
      @click="closeTask"
    />
  </div>
</template>
<style scoped></style>
