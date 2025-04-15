<script setup lang="ts">
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
</script>
<template>
  <BodyTaskTodoBaseModel :id="props.id" :inAi="props.inAi" />
</template>
<style scoped></style>
