<script setup lang="ts">
const { $t } = inject("nls");
const emits = defineEmits(["update:ai-btn-click"]);
const props = defineProps({
  useLabel: {
    type: Boolean,
    default: true,
  },
  variant: {
    type: String,
    default: "ghost",
  },
  label: {
    type: String,
    default: "askAI",
  },
  size: {
    type: String,
    default: "md",
  },
});
const sendClick = () => {
  emits("update:ai-btn-click");
};
</script>
<template>
  <UButton
    class="rounded px-3 cursor-pointer"
    :size="size"
    color="neutral"
    :variant="variant"
    icon="healthicons:artificial-intelligence"
    :label="useLabel ? $t(label) : ''"
    @click="sendClick"
  />
</template>
