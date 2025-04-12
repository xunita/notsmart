<script setup lang="ts">
const todos = useTodos();
const { lang, code, $t, setLangCode } = useLang();
provide("todos", todos);
provide("nls", {
  lang,
  code,
  $t,
  setLangCode,
});
</script>
<template>
  <UApp>
    <div class="nst-app h-full">
      <main class="h-full">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </main>
    </div>
  </UApp>
</template>
