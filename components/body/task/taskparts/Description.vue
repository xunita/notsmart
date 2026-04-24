<script setup lang="ts">
const task = inject("task");
const expanded = ref(false)

const isLong = computed(() => {
  // ~4 lines ≈ 300 chars, ajuste selon ta font-size/width
  return (task.description?.length ?? 0) > 300
})
</script>
<template>
  <div class="todo-base-description-content">
  <UIcon name="circum:text-align-left" class="mr-1.5 size-5 shrink-0 mt-0.5" />
  <span>
    <span class="text-sm" :class="expanded ? '' : 'line-clamp-4'">
      {{ task.description }}
    </span>
    <button
      v-if="isLong"
      class="text-xs font-semibold text-gray-500 hover:text-gray-400 mt-1 block"
      @click="expanded = !expanded"
    >
      {{ expanded ? 'Show less' : 'Show more' }}
    </button>
  </span>
</div>
</template>
<style scoped></style>
