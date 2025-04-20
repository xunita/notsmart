<script setup lang="ts">
import { askAssistant } from "~/app/controller/assistant";
const todos = inject("todos");
const { $t } = inject("nls");
const task = inject("task");
const focused = ref(false);
const message = ref("");
const messageLength = computed(() => message.value.length);
const messageKey = ref(-1);

const sendMessage = () => {
  // Send message to the server
  if (!todos.aiIsThinking.value) {
    if (message.value.trim().length) {
      const userMessage = {
        sender: "user",
        content: {
          ui: JSON.parse(JSON.stringify(message.value)),
          prompt: `${JSON.parse(
            JSON.stringify(message.value)
          )} \n today: ${new Date().toISOString()} \n today_getTime: ${new Date().getTime()} \n ${
            task.value ? "unique task" : "list of tasks"
          }: ${
            task.value
              ? task.value.stringifyPrompt()
              : todos.getTodosStringifiedPrompt()
          }`,
        },
      };
      todos.addMessage(userMessage);
      const data = todos.buildPrompt();
      message.value = ""; // Clear the input
      messageKey.value++;
      //
      setTimeout(() => {
        const aiMessage = {
          sender: "ai",
          content: null,
          isThinking: true,
          id: new Date(Date.now()).getTime() + 1,
        };
        todos.addMessage(aiMessage);
        todos.setAiIsThinking(true);
        askAssistant(data, aiMessage.id); // Update the key to re-render the input
      }, 250);

      setTimeout(() => {
        scrollToBottomById("notsmarttodos-chat");
      }, 350);
    }
  }
  setTimeout(() => {
    const input = document.getElementById("nst-ai-sender-input");
    if (input) input.focus();
  }, 100);
};

onMounted(() => {
  // Focus on the input when the chat is opened
  setTimeout(() => {
    const input = document.getElementById("nst-ai-sender-input");
    if (input) input.focus();
  }, 100);
});
</script>
<template>
  <div
    :class="{
      'border border-blue-100/75': !focused,
      'border border-blue-100': focused,
    }"
    class="w-full rounded-bl-md rounded-br-md bg-white bg-dark-theme flex items-center relative h-fit"
  >
    <div
      id="nst-ai-sender-input"
      :key="messageKey"
      contenteditable="true"
      class="focus:outline-none rounded-bl-md z-10 px-2 text-sm overflow-y-scroll w-full break-words font-semibold max-h-24"
      @keypress.enter.exact="sendMessage"
      @keypress.shift.enter.exact="message += '\n'"
      @focus="focused = true"
      @blur="focused = false"
      @input="message = $event.target.innerText.trim()"
    ></div>
    <p v-if="!messageLength" class="absolute z-0 pl-2 inline-block">
      <span class="text-xs font-semibold line-clamp-1 pr-12">
        {{ $t("aiMessagePlaceholder") }}
      </span>
    </p>
    <UButton
      :disabled="todos.aiIsThinking.value"
      size="md"
      color="neutral"
      variant="solid"
      icon="iconoir:send-solid"
      class="rounded-md m-1 p-2 self-end cursor-pointer"
      @click="sendMessage"
    />
  </div>
</template>
