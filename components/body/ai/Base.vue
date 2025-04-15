<script setup lang="ts"></script>
<template>
  <div class="min-w-80 h-full flex flex-col items-center">
    <UIcon name="healthicons:artificial-intelligence" size="18" />
    <div class="w-full h-full">
      <div class="h-full w-full pt-4">
        <div class="flex flex-col w-full h-full border-t border-blue-100/75">
          <div class="flex flex-col h-full overflow-hidden">
            <BodyAiPartsMessagesBody />
          </div>
          <BodyAiPartsSender />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
