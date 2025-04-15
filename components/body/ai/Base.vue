<script setup lang="ts"></script>
<template>
  <div class="max-w-96 h-full flex flex-col items-center overflow-hidden">
    <div>
      <UIcon name="healthicons:artificial-intelligence" size="18" /> {{ ` ` }}
    </div>
    <div class="w-full h-full overflow-hidden">
      <div class="h-full w-full pt-2 overflow-hidden">
        <div
          class="flex flex-col w-full h-full border-t border-blue-100/75 overflow-hidden"
        >
          <div class="flex flex-col gap-3 h-full overflow-hidden">
            <BodyAiPartsMessagesBody />
          </div>
          <BodyAiPartsSender />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
