<script setup lang="ts">
import Message from "~/models/message";
const todos = inject("todos");
const { $t } = inject("nls");
const props = defineProps({
  message: {
    type: Message,
    required: true,
  },
});
const items = computed(() => {
  return props.message.content.tasks ?? [];
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
    <div v-if="message.isFromAI()" class="h-4 w-4">
      <UIcon name="healthicons:artificial-intelligence" />
    </div>
    <div
      class="text-[13px] rounded-md p-2"
      :class="{
        'bg-logo-color': message.isFromAI(),
        'bg-gray-100/80': message.isFromUser(),
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
        class="font-semibold text-[13px] w-full"
      >
        <div
          v-if="message.isFromAI()"
          class="flex flex-col gap-2.5 relative w-full"
        >
          <div v-html="message.content.answer"></div>
          <div
            v-if="items.length && message.content.action !== 'delete'"
            class="relative w-full flex flex-col items-center"
          >
            <UCarousel
              v-slot="{ item }"
              :dots="items.length > 1"
              :items="items"
              class="w-full max-w-56 h-fit my-0.5"
            >
              <BodyAiTodoMiniature
                v-if="todos.hasTodo(item.id)"
                :id="item.id"
                in-ai
              />
              <div
                v-else
                class="w-full p-5 border border-blue-100/75 text-center"
              >
                {{ $t("taskUnvailable") }}
              </div>
            </UCarousel>
          </div>
        </div>
        <span v-else>{{ message.content.ui }}</span>
      </div>
    </div>
  </div>
</template>
