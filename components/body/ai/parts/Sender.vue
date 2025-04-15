<script setup lang="ts">
const todos = inject("todos");
const { $t } = inject("nls");
const focused = ref(false);
const message = ref("");
const messageLength = computed(() => message.value.length);
const messageKey = ref(-1);

const sendMessage = () => {
  // Send message to the server
  if (!todos.aiIsThinking.value) {
    if (message.value.trim().length) {
      console.log("Sending message:", message.value);
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
    class="w-full rounded-bl-md rounded-br-md bg-white bg-dark-theme flex items-center relative"
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
