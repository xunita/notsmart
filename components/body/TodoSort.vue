<script setup lang="ts">
import { sortByArray } from "~/constants/sort";
const todos = inject("todos");
const { $t } = inject("nls");
const items = ref(sortByArray.map((item) => $t(item)));
const value = ref($t(todos.sortBy.value));
const applySort = (sortBy: string) => {
  const index = items.value.findIndex((item) => item === sortBy);
  const sortByKey = sortByArray[index];
  if (sortByKey) {
    todos.setSortBy(sortByKey);
  }
};
</script>
<template>
  <USelect
    v-model="value"
    size="sm"
    :items="items"
    variant="none"
    class="border max-w-32 border-blue-100 rounded font-semibold"
    @update:model-value="applySort"
  />
</template>
<style scoped></style>
