export default defineNuxtPlugin((nuxtApp) => {
  // mocking data
  const { code, setLang } = useLang();
  setLang(code.value);
});
