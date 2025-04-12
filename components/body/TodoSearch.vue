<script setup lang="ts">
const { $t } = inject("nls");
const todos = inject("todos");
const search = ref(todos.search);
</script>
<template>
  <UInput
    v-model="search"
    size="sm"
    class="border border-blue-100 rounded font-semibold"
    color="neutral"
    icon="i-lucide-search"
    variant="none"
    :placeholder="$t('searchPlaceholder')"
  />
</template>
<style scoped></style>
