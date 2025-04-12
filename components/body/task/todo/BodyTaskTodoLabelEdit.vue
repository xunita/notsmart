<script setup lang="ts">
import { labels } from "~/constants/label";
import { labelColors } from "~/constants/labelColors";
const task = inject("task");
const { $t } = inject("nls");
const emits = defineEmits(["update:label"]);
const items = ref(labels.map((item) => $t(item)));
const value = ref($t(task?.label || "none"));
const labelKey = ref(task?.label || "none");
const applyLabel = (labelBy: string) => {
  const index = items.value.findIndex((item) => item === labelBy);
  const labelByKey = labels[index];
  if (labelByKey) {
    labelKey.value = labelByKey;
    emits("update:label", {
      key: "label",
      value: labelByKey,
    });
  }
};
</script>
<template>
  <div class="flex items-center gap-3 h-fit">
    <UFormField :label="$t('label')">
      <USelect
        v-model="value"
        size="sm"
        :items="items"
        variant="none"
        class="border max-w-32 border-blue-100 rounded"
        @update:model-value="applyLabel"
      />
    </UFormField>
    <div
      :class="[labelColors[labelKey]]"
      class="h-2 w-16 border border-blue-100 rounded-full self-end mb-3"
    ></div>
  </div>
</template>
<style scoped></style>
