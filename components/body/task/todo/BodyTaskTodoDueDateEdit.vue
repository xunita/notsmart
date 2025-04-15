<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";
import type { RadioGroupItem, RadioGroupValue } from "@nuxt/ui";
const { $t } = inject("nls");
const editMode = inject("editMode");
const task = inject("task");
const dueDate = ref(editMode && task !== null ? task.dueDate : null);
const arrayDate = [
  dueDate.value ? dueDate.value.getFullYear() : new Date().getFullYear(),
  dueDate.value ? dueDate.value.getMonth() + 1 : new Date().getMonth() + 1,
  dueDate.value ? dueDate.value.getDate() : new Date().getDate(),
];
const date = ref(new CalendarDate(...arrayDate));
const items = ref<RadioGroupItem[]>([$t("noDueDate"), $t("addDueDate")]);
const value = ref<RadioGroupValue>(
  dueDate.value ? $t("addDueDate") : $t("noDueDate")
);
const emits = defineEmits(["update:duedate"]);
watch(
  value,
  (addValue) => {
    dueDate.value =
      addValue === $t("addDueDate")
        ? new Date(date.value.year, date.value.month - 1, date.value.day)
        : dueDate.value;
    emits("update:duedate", {
      value: addValue === $t("noDueDate") ? null : dueDate.value,
      key: "dueDate",
    });
  },
  { deep: true }
);

const setDueDate = (newDate: CalendarDate) => {
  if (newDate) {
    dueDate.value = new Date(newDate.year, newDate.month - 1, newDate.day);
    emits("update:duedate", {
      value: dueDate.value,
      key: "dueDate",
    });
  }
};
</script>
<template>
  <div class="flex flex-col gap-3">
    <UFormField :label="$t('dueDate')">
      <URadioGroup
        v-model="value"
        class="pt-1"
        size="sm"
        variant="list"
        color="neutral"
        :items="items"
      />
    </UFormField>
    <div
      v-if="value === $t('addDueDate')"
      v-motion-pop-visible
      class="rounded border border-blue-100 p-2 w-fit"
    >
      <UCalendar
        v-model="date"
        class="max-w-64"
        size="xs"
        @update:modelValue="setDueDate"
      />
    </div>
  </div>
</template>
<style scoped></style>
