import data from "@/mock/todo.json";
export default defineNuxtPlugin((nuxtApp) => {
  // mocking data
  const { addTodo } = useTodos();
  data.forEach((todo) => {
    addTodo(todo);
  });
});
