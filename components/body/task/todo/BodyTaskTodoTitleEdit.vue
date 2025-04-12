<script setup lang="ts">
const { $t } = inject("nls");
const task = inject("task");
const emits = defineEmits(["update:title"]);
const editMode = inject("editMode");
const title = ref(editMode && task !== null ? task.title : "");
watch(title, (newTitle) => {
  emits("update:title", {
    value: newTitle,
    key: "title",
  });
});
onMounted(() => {
  // avoid empty title error
  emits("update:title", {
    value: title.value,
    key: "title",
  });
});
</script>
<template>
  <UFormField :label="$t('title')" required>
    <UInput
      v-model="title"
      class="border border-blue-100 rounded sm:w-2/4 max-sm:w-full"
      color="neutral"
      variant="none"
      :placeholder="$t('taskTitle')"
    />
  </UFormField>
</template>
<style scoped></style>
