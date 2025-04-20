<script setup lang="ts">
const todos = inject("todos");
const { $t } = inject("nls");
const task = inject("task");
const noSpecificTask = ref(false);
const messages = computed(() => {
  return todos.aiLast5Messages.value;
});
const closeTask = () => {
  noSpecificTask.value = true;
};
provide("noSpecificTask", noSpecificTask);
//
onMounted(() => {
  setTimeout(() => {
    scrollToBottomById("notsmarttodos-chat");
  }, 250);
});
</script>
<template>
  <div
    id="notsmarttodos-chat"
    :class="{
      'py-4': !task,
      'overflow-y-auto': messages.length,
    }"
    class="w-ful h-full relative my-1"
  >
    <div
      v-if="task && !noSpecificTask"
      :class="{
        'sticky top-0': messages.length,
        'absolute w-full': !messages.length,
      }"
      class="bg-white z-10 pt-4"
    >
      <BodyAiTodoMiniature
        :key="todos.reRender.value"
        in-ai
        :id="task.id"
        @update:no-task="closeTask"
      />
    </div>
    <div
      :class="{
        'items-center justify-center': !messages.length,
      }"
      class="ai-messages w-ful h-full flex flex-col py-4 px-1"
    >
      <div
        v-if="messages.length"
        class="ai-messages-content w-ful h-full flex flex-col space-y-3"
      >
        <BodyAiPartsMessage
          v-for="msg of messages"
          :key="msg.id + 'ai-msg'"
          class="max-w-96"
          :message="msg"
        />
      </div>
      <div
        v-else
        class="ai-messages-empty font-semibold text-sm italic text-center text-gray-600/95 px-4"
      >
        <span>{{ ` ${$t("startAConvWithAi")} ` }}</span>
      </div>
    </div>
  </div>
</template>
