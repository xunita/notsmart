import { setAssistantResponse } from "./response";

const getAssistantResponse = (data = [], aiId) => {
  const config = useRuntimeConfig();
  const ASSSISTANT_BACKEND_ENDPOINT = config.public.ASSISTANT_ENDPOINT;
  //
  fetch(ASSSISTANT_BACKEND_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return {
        error: "failed to ask assistant",
      };
    })
    .then((responseJson) => {
      setAssistantResponse(responseJson, aiId);
    })
    .catch((error) => {
      const todos = useTodos();
      const aiMessage = todos.getMessage(aiId);
      if (aiMessage) {
        aiMessage.isThinking = false;
        aiMessage.content = {
          answer: "<span>Oops!</span>",
        };
        todos.saveMessagesToStorage();
      }
    });
};

export { getAssistantResponse };
