<script setup lang="ts">
import { labelColors } from "@/constants/labelColors";
const task = inject("task");
</script>
<template>
  <div
    :class="[labelColors[task.label]]"
    class="todo-base-label h-1 w-18 rounded-md"
  ></div>
</template>
<style scoped></style>
