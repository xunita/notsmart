<script setup lang="ts">
const { $t } = inject("nls");
const task = inject("task");
const emits = defineEmits(["update:description"]);
const editMode = inject("editMode");
const description = ref(editMode && task !== null ? task.description : "");
watch(description, (newDescription) => {
  emits("update:description", {
    value: newDescription,
    key: "description",
  });
});
</script>
<template>
  <UFormField :label="$t('description')">
    <UTextarea
      v-model="description"
      color="neutral"
      variant="none"
      class="w-full border border-blue-100 rounded"
      :maxrows="4"
      autoresize
    />
  </UFormField>
</template>
<style scoped></style>
