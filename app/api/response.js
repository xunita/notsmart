const setAssistantResponse = (response, aiId) => {
  const todos = useTodos();
  const aiMessage = todos.getMessage(aiId);
  if (aiMessage) {
    if (response.error) {
      aiMessage.content = {
        answer: "<span>Oops!</span>",
      };
    } else {
      aiMessage.content = response.data;
      // set ai action if any
      if (Object.hasOwn(response.data, "action")) {
        todos.setAiAction(response.data.tasks, response.data.action);
      }
    }
    aiMessage.isThinking = false;
    todos.saveMessagesToStorage();
  }
};

export { setAssistantResponse };
