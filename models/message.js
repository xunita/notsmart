class Message {
  constructor({ sender, content, id, isThinking, hasError, data }) {
    this.id = id ?? new Date(Date.now()).getTime();
    this.sender = sender;
    this.content = content ?? "";
    this.isThinking = isThinking ?? false;
    this.hasError = hasError ?? false;
    this.data = data ?? null;
  }

  isFromAI() {
    return this.sender === "ai";
  }

  isFromUser() {
    return this.sender === "user";
  }

  appendContent(content) {
    this.content += content;
  }

  setContent(content) {
    this.content = content;
  }

  setIsThinking(isThinking) {
    this.isThinking = isThinking;
  }

  setHasError(hasError) {
    this.hasError = hasError;
  }

  setData(data) {
    this.data = data;
  }
}

export default Message;
