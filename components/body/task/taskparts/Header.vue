<script setup lang="ts">
const task = inject("task");
</script>
<template>
  <div class="w-full relative">
    <NuxtImg
      placeholder
      :src="task.headImg"
      :alt="task.title"
      class="todo-base-header-img w-full h-14 object-cover rounded-t-md"
    />
    <div class="absolute top-1 right-1">
      <UDrawer class="z-20" :handle="false" direction="right">
        <BodyAskAIButton label="ask" variant="solid" size="sm" />
        <template #body>
          <UIcon name="healthicons:artificial-intelligence" size="18" />
        </template>
      </UDrawer>
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
