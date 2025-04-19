import { getAssistantResponse } from "../api/sender";

const askAssistant = (data = [], aiId) => {
  getAssistantResponse(data, aiId);
};

export { askAssistant };
