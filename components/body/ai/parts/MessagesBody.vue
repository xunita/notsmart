<script setup lang="ts">
const todos = inject("todos");
const messages = computed(() => {
  return todos.aiLast5Messages.value;
});
</script>
<template>
  <div
    id="notsmarttodos-chat"
    class="flex flex-col w-ful h-full space-y-4 overflow-y-auto p-4"
  >
    <BodyAiPartsMessage
      v-for="msg of messages"
      :key="msg.id + 'ai-msg'"
      class="max-w-96"
      :message="msg"
    />
  </div>
</template>
