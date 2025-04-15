<script setup lang="ts">
const emits = defineEmits(["update:no-task"]);
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
  emits("update:no-task");
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
      class="rounded-full m-1 p-2 self-end cursor-pointer absolute z-10 top-0 right-0"
      @click="closeTask"
    />
  </div>
</template>
<style scoped></style>
