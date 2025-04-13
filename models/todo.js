import { labels } from "~/constants/label";
import { taskStatus } from "~/constants/task";
import Message from "./message";

class Todo {
  constructor(data) {
    this.id = data.id || new Date(Date.now()).getTime();
    this.title = data.title || "";
    this.headImg = data.headImg || "/resources/img/cover.png"; // img need to be base64
    this.label =
      (Object.hasOwn(data, "label") &&
        labels.includes(data.label) &&
        data.label) ||
      labels[0]; // default to "none" // label is a color
    this.description = data.description || "";
    this.assignments = data.assignments || []; // assignment of the task
    this.dueDate = data.dueDate
      ? typeof data.dueDate === "string"
        ? new Date(data.dueDate)
        : data.dueDate
      : null; // Due date of the task
    this.tags = data.tags || []; // tags of the task
    this.status = taskStatus.includes(data.status)
      ? data.status
      : taskStatus[0]; // default to "todo"
    this.lastStatus = data.lastStatus || this.status; // last status of the task
    this.statusUpdatedAt = data.statusUpdatedAt || null; // last status updated at timestamp
    this.createdAt = data.createdAt
      ? typeof data.createdAt === "string"
        ? new Date(data.createdAt)
        : data.createdAt
      : new Date(Date.now()); // created at timestamp
    this.updatedAt = this.createdAt; // updated at timestamp
    this.dueDateAiInsight = data.dueDateAiInsight || null; // Due date of the task
    this.aiInsights = data.aiInsights || null; // AI Insight of the task
    this.aiInsightsExpanded = false; // AI Insight of the task
    this.aiMessages = data.aiMessages || []; // old AI messages of the task
  }

  // Getters
  get users() {
    return this.assignments.length >= 1
      ? this.assignments.length === 1
        ? `@${this.assignments[0]}`
        : this.assignments.length > 99
        ? `+99`
        : `${this.assignments.length}`
      : null; // assignment of the task
  }
  get isOverdue() {
    return (
      this.dueDate && this.dueDate.getTime() < new Date(Date.now()).getTime()
    );
  }

  get getStatus() {
    return this.status;
  }

  get isDone() {
    return this.status === "done";
  }
  get isInProgress() {
    return this.status === "inprogress";
  }
  get isTodo() {
    return this.status === "todo";
  }
  get hasAiInsights() {
    return this.aiInsights !== null;
  }
  get hasDueDate() {
    return this.dueDate !== null;
  }
  get hasDueDateAiInsight() {
    return this.dueDateAiInsight !== null;
  }
  get hasTags() {
    return this.tags !== null || this.tags.length > 0;
  }
  get isAiInsightsExpanded() {
    return this.aiInsightsExpanded === true;
  }
  // functions
  update(data = {}) {
    for (const key in data) {
      if (key !== "id" && Object.hasOwn(this, key)) {
        this[key] = data[key];
      }
    }
    this.updatedAt = new Date(Date.now()); // updated at timestamp
  }
  expandAiInsights(dir) {
    if (typeof dir === "boolean") this.aiInsightsExpanded = dir; // AI Insight of the task
  }
  deleteAiInsights() {
    this.dueDateAiInsight = null; // Due date of the task
    this.aiInsights = null; // AI Insight of the task
  }
  moveTo(status) {
    if (!taskStatus.includes(status)) return false; // check if status is valid
    this.lastStatus = JSON.parse(JSON.stringify(this.status)); // last status of the task
    this.status = status;
    this.statusUpdatedAt = new Date(Date.now());
    return true;
  }

  addMessage = (m) => {
    const message = new Message(m);
    this.aiMessages.push(message);
  };

  getMessage = (id) => {
    return this.aiMessages.find((m) => m.id === id) ?? null;
  };

  getLast10Messages = () => {
    return this.aiMessages.slice(-10);
  };

  buildPrompt = (prompt) => {
    const last5Msg = this.getLast10Messages();
    const prompts = [];
    for (const msg of last5Msg) {
      if (msg.sender === "user") {
        prompts.push({
          role: "user",
          content: [
            {
              type: "text",
              text: msg.content,
            },
          ],
        });
      } else if (msg.sender === "ai" && !msg.isThinking && msg.content.length) {
        prompts.push({
          role: "assistant",
          content: [
            {
              type: "text",
              text: msg.content,
            },
          ],
        });
      }
    }
    return prompts;
  };

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      headImg: this.headImg,
      label: this.label,
      description: this.description,
      assignments: this.assignments,
      dueDate: this.dueDate,
      tags: this.tags,
      status: this.status,
      createdAt: this.createdAt,
      lastStatus: this.lastStatus,
      statusUpdatedAt: this.statusUpdatedAt,
      updatedAt: this.updatedAt,
      dueDateAiInsight: this.dueDateAiInsight,
      aiInsights: this.aiInsights,
      aiMessages: this.aiMessages,
    };
  }

  stringify() {
    return JSON.stringify(this.toJSON());
  }
}

export default Todo;
