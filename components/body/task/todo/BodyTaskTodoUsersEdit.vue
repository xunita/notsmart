<script setup lang="ts">
const { $t } = inject("nls");
const task = inject("task");
const emits = defineEmits(["update:users"]);
const editMode = inject("editMode");
const userInput = ref("");
const users = ref(editMode && task !== null ? task.assignments : []);

watch(
  () => users.value,
  (newUsers) => {
    emits("update:users", {
      value: newUsers,
      key: "assignments",
    });
  },
  { deep: true }
);
const addUser = () => {
  if (
    userInput.value.trim() !== "" &&
    !users.value.includes(userInput.value.trim())
  ) {
    users.value.push(userInput.value.trim());
    userInput.value = "";
  }
};
const removeUser = (user) => {
  users.value = users.value.filter((u) => u !== user);
};
</script>
<template>
  <div class="flex flex-col">
    <UFormField :label="$t('contributors')">
      <UInput
        v-model="userInput"
        leading-icon="i-lucide-at-sign"
        :placeholder="$t('addContributors')"
        class="border border-blue-100 rounded sm:w-2/4 max-sm:w-full"
        color="neutral"
        variant="none"
        @keyup.enter="addUser()"
      />
    </UFormField>
    <div class="flex items-center space-x-3 flex-wrap">
      <div
        v-for="user in users"
        :key="user + 'newTask'"
        class="text-xs bg-blue-100/25 py-1 px-2.5 rounded m-1.5 flex items-center gap-1"
      >
        <span class="font-semibold text-xs"> @{{ user }} </span>
        <UButton
          class="rounded-full cursor-pointer"
          size="xs"
          color="neutral"
          variant="none"
          icon="material-symbols:close-rounded"
          @click="removeUser(user)"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
