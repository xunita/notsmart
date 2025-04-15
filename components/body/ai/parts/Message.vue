<script setup lang="ts">
import Message from "~/models/message";

const props = defineProps({
  message: {
    type: Message,
    required: true,
  },
});
</script>
<template>
  <div
    v-if="message.sender"
    v-motion-fade
    :class="{
      'self-start': message.isFromAI(),
      'self-end': message.isFromUser(),
    }"
    class="flex"
  >
    <div class="h-4 w-4">
      <UIcon
        v-if="message.isFromAI()"
        name="healthicons:artificial-intelligence"
      />
    </div>
    <div
      class="text-[13px] rounded-md p-2"
      :class="{
        'bg-logo-color': message.isFromAI(),
        'bg-gray-100 dark:bg-gray-700/50': message.isFromUser(),
      }"
    >
      <div
        v-if="message.isThinking && message.isFromAI()"
        class="flex space-x-1 justify-center items-center pt-1"
      >
        <div
          class="h-1.5 w-1.5 bg-black/50 rounded-full animate-bounce [animation-delay:-0.3s]"
        ></div>
        <div
          class="h-1.5 w-1.5 bg-black/50 rounded-full animate-bounce [animation-delay:-0.15s]"
        ></div>
        <div class="h-1.5 w-1.5 bg-black/50 rounded-full animate-bounce"></div>
      </div>
      <div
        v-else
        :class="{
          'border rounded border-blue-100/75 p-2': message.isFromAI(),
        }"
        class="font-semibold text-[13px]"
      >
        <span>{{ message.content }}</span>
        <!-- <div v-if="message.isFromAI()" v-html="message.content"></div>
        <span v-else>{{ message.content }}</span> -->
      </div>
    </div>
  </div>
</template>
