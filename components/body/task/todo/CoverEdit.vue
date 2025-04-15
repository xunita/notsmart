<script setup lang="ts">
const { $t } = inject("nls");
const emits = defineEmits(["update:cover"]);
const task = inject("task");
// cover
const toast = useToast();
const src = ref(task ? task.headImg : "/resources/img/cover.png");
const coverRef = ref(null);
const loadImage = () => {
  if (!coverRef.value) return;
  coverRef.value.inputRef.click();
};

const applyCover = (e, deletion = false) => {
  toast.clear();
  if (!deletion) {
    const file = e.target.files[0];
    const loadedFile = imageToBase64(file, (data) => {
      if (data.success) {
        src.value = data.base64;
        toast.add({
          title: $t("coverLoaded"),
        });
      } else {
        src.value = "/resources/img/cover.png";
        toast.add({
          title: $t("coverError"),
          color: "primary",
        });
      }
      emits("update:cover", {
        value: src.value,
        key: "headImg",
      });
    });
    if (!loadedFile?.image) {
      toast.add({
        title: $t("notValidImage"),
        color: "error",
      });
      emits("update:cover", {
        value: src.value,
        key: "headImg",
      });
    }
  } else {
    src.value = "/resources/img/cover.png";
    toast.add({
      title: $t("coverDeleted"),
      color: "info",
    });
    emits("update:cover", {
      value: src.value,
      key: "headImg",
    });
  }
};
// cover
</script>
<template>
  <div class="flex flex-col gap-4">
    <div class="relative border border-blue-100 rounded">
      <NuxtImg
        placeholder
        :src="src"
        alt="cover"
        class="todo-base-header-img w-full h-10 object-cover rounded"
      />
      <div class="flex items-center space-x-2 absolute top-1.5 right-1.5">
        <UButton
          class="rounded cursor-pointer"
          size="sm"
          color="neutral"
          variant="solid"
          icon="material-symbols:imagesmode"
          :label="$t('edit')"
          @click="loadImage"
        />
        <UButton
          v-if="src !== '/resources/img/cover.png'"
          class="rounded cursor-pointer"
          color="neutral"
          variant="solid"
          icon="mynaui:trash-one-solid"
          @click="applyCover($event, true)"
        />
      </div>
      <UInput ref="coverRef" class="hidden" type="file" @change="applyCover" />
    </div>
  </div>
</template>
<style scoped></style>
