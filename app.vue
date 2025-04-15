<script setup lang="ts">
const todos = useTodos();
const open = ref(true);
const { lang, code, $t, setLangCode } = useLang();
provide("todos", todos);
provide("nls", {
  lang,
  code,
  $t,
  setLangCode,
});
const closeAlert = (close) => {
  open.value = close;
};
</script>
<template>
  <UApp>
    <div class="nst-app h-full flex flex-col justify-center items-center">
      <UAlert
        v-if="open"
        v-motion-pop-visible
        class="w-fit m-2 font-semibold text-center"
        :description="$t('clearLocalstorageIfNeedMoreSpace')"
        color="neutral"
        variant="outline"
        close
        @update:open="closeAlert"
      />
      <main class="h-full w-full">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </main>
    </div>
  </UApp>
</template>
