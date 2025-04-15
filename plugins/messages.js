import data from "@/mock/messages.json";
export default defineNuxtPlugin((nuxtApp) => {
  // mocking data
  const { addMessage } = useTodos();
  data.forEach((m) => {
    addMessage(m);
  });
});
