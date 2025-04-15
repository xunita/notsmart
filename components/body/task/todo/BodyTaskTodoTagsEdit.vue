<script setup lang="ts">
const { $t } = inject("nls");
const toast = useToast();
const task = inject("task");
const emits = defineEmits(["update:tags"]);
const editMode = inject("editMode");
const tagInput = ref("");
const tags = ref(editMode && task !== null ? task.tags : []);

watch(
  () => tags.value,
  (newtags) => {
    emits("update:tags", {
      value: newtags,
      key: "tags",
    });
  },
  { deep: true }
);
const addTag = () => {
  if (
    tagInput.value.trim() !== "" &&
    !tags.value.includes(tagInput.value.trim())
  ) {
    if (tags.value.length < 10) {
      tags.value.push(tagInput.value.trim());
      tagInput.value = "";
    } else {
      toast.clear();
      toast.add({
        title: $t("maxTagsAllowedReached"),
        color: "error",
      });
    }
  }
};
const removeTag = (tag) => {
  tags.value = tags.value.filter((u) => u !== tag);
};
</script>
<template>
  <div class="flex flex-col">
    <UFormField :label="$t('tags')">
      <UInput
        v-model="tagInput"
        :ui="{ trailing: 'pe-0' }"
        leading-icon="ic:outline-tag"
        :placeholder="$t('addTag')"
        class="border border-blue-100 rounded sm:w-2/4 max-sm:w-full"
        color="neutral"
        variant="none"
        @keyup.enter="addTag()"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            class="cursor-pointer"
            icon="material-symbols:add-circle"
            @click="addTag()"
          />
        </template>
      </UInput>
    </UFormField>
    <div class="flex items-center space-x-3 flex-wrap">
      <div
        v-for="tag in tags"
        :key="tag + 'newTask'"
        class="text-xs bg-blue-100/25 py-1 px-2.5 rounded m-1.5 flex items-center gap-1"
      >
        <span class="font-semibold text-xs"> #{{ tag }} </span>
        <UButton
          class="rounded-full cursor-pointer"
          size="xs"
          color="neutral"
          variant="none"
          icon="material-symbols:close-rounded"
          @click="removeTag(tag)"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
