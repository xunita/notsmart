<script setup lang="ts">
const task = inject("task");
const inAi = inject("inAi");
const todos = inject("todos");

const setOpenAIChat = () => {
  todos.setOpenAIChat(true);
  todos.setAITaskId(task.id);
};
</script>
<template>
  <div class="w-full relative">
    <NuxtImg
      placeholder
      :src="task.headImg"
      :alt="task.title"
      class="todo-base-header-img w-full h-10 object-cover rounded-t-md"
    />
    <div v-if="!inAi" class="absolute top-1.5 right-1.5">
      <BodyAskAIButton
        label="ask"
        variant="solid"
        size="sm"
        @update:ai-btn-click="setOpenAIChat"
      />
    </div>
    <div
      class="todo-base-header-title absolute bottom-0 left-4 mr-4 bg-white p-0.5 rounded-t-md"
    >
      <h1 class="text-sm font-bold max-w-56 line-clamp-1 px-2">
        {{ task.title }}
      </h1>
    </div>
  </div>
</template>
<style scoped></style>
