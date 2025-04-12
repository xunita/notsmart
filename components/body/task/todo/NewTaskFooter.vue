<script setup lang="ts">
const { $t } = inject("nls");
const emits = defineEmits(["update:confirm-task"]);
const confirmTask = (conf) => {
  emits("update:confirm-task", conf);
};
</script>
<template>
  <div class="p-2 bg-white w-full flex flex-col">
    <div class="flex items-center gap-3 self-end">
      <UButton
        class="cursor-pointer"
        color="neutral"
        variant="ghost"
        :label="$t('cancel')"
        @click="confirmTask(false)"
      />
      <UButton
        class="cursor-pointer"
        color="neutral"
        variant="solid"
        :label="$t('save')"
        @click="confirmTask(true)"
      />
    </div>
  </div>
</template>
<style scoped></style>
