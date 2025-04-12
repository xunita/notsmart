<script setup lang="ts">
const { lang, $t } = inject("nls");
const props = defineProps({
  useLabel: {
    type: Boolean,
    default: true,
  },
  variant: {
    type: String,
    default: "ghost",
  },
});
</script>
<template>
  <UButton
    class="rounded px-3 cursor-pointer"
    size="md"
    color="neutral"
    :variant="variant"
    icon="ic:round-add-task"
    :label="useLabel ? $t('newTask') : ''"
  />
</template>
