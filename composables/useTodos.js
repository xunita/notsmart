import { sortByArray } from "~/constants/sort";
import { taskStatus } from "~/constants/task";
import { sortsFunctions } from "~/utils/sort";
import Todo from "~/models/todo";
import Message from "~/models/message";

export const useTodos = () => {
  const storage = useStorage();
  // unmutable state by external code
  const _todoPageState = storage.useLocalStorage(
    "nst-todoPageState",
    taskStatus[0]
  );
  const _aiLast5Messages = storage.useLocalStorage("nst-aiLast5Messages", []);
  const _search = storage.useLocalStorage("nst-search", "");
  const _sortBy = storage.useLocalStorage("nst-sortBy", "createdAt-desc");
  const _todos = useState("_todos", () => new Map());
  // load todos from localStorage
  const loadStorageTodos = () => {
    let todos = localStorage.getItem("nst-todos");
    if (todos) {
      todos = JSON.parse(todos);
      todos.forEach((todo) => {
        const newTodo = new Todo(todo);
        _todos.value.set(newTodo.id, newTodo);
      });
    }
  };
  loadStorageTodos();
  // computed state
  const search = computed({
    // getter
    get() {
      return _search.value.toLowerCase().trim();
    },
    // setter
    set(newValue) {
      _search.value = newValue;
    },
  });

  const aiLast5Messages = computed(() => {
    return _aiLast5Messages.value;
  });

  const enableSearchAndSort = computed(() => {
    return (
      (inTodo.value && hasAtLeastTwoTodoTask.value) ||
      (inInProgress.value && hasAtLeastTwoInProgressTask.value) ||
      (inDone.value && hasAtLeastTwoDoneTask.value)
    );
  });

  const hasAnyTask = computed(() => {
    return _todos.value.size > 0;
  });

  const hasAtLeastTwoTodoTask = computed(() => {
    return getTodos.value.length > 1;
  });

  const hasAtLeastTwoInProgressTask = computed(() => {
    return getInProgressTodos.value.length > 1;
  });

  const hasAtLeastTwoDoneTask = computed(() => {
    return getDoneTodos.value.length > 1;
  });

  const sortBy = computed(() => {
    return _sortBy.value;
  });
  const todos = computed(() => {
    return _todos.value;
  });
  const todoPageState = computed(() => {
    return _todoPageState.value;
  });
  const inTodo = computed(() => {
    return _todoPageState.value === "todo";
  });
  const inInProgress = computed(() => {
    return _todoPageState.value === "inprogress";
  });
  const inDone = computed(() => {
    return _todoPageState.value === "done";
  });

  const getTodos = computed(() => {
    // return all WITH STATUS todo
    return Array.from(_todos.value.values())
      .filter((todo) => todo.isTodo)
      .sort(sortsFunctions[sortBy.value]);
  });

  const getInProgressTodos = computed(() => {
    // return all WITH STATUS inprogress
    return Array.from(_todos.value.values())
      .filter((todo) => todo.isInProgress)
      .sort(sortsFunctions[sortBy.value]);
  });

  const getDoneTodos = computed(() => {
    // return all WITH STATUS done
    return Array.from(_todos.value.values())
      .filter((todo) => todo.isDone)
      .sort(sortsFunctions[sortBy.value]);
  });
  // mutable functions

  const addMessage = (m) => {
    const message = new Message(m);
    _aiLast5Messages.value.push(message);
  };

  const getMessage = (id) => {
    return _aiLast5Messages.value.find((m) => m.id === id) ?? null;
  };

  const getLast10Messages = () => {
    return _aiLast5Messages.value.slice(-20);
  };

  const buildPrompt = (prompt) => {
    const last5Msg = getLast10Messages();
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

  const saveTodosToStorage = () => {
    localStorage.setItem("nst-todos", getTodosStringified());
  };

  const getTodosStringified = () => {
    return JSON.stringify(
      Array.from(_todos.value.values()).map((todo) => todo.toJSON())
    );
  };

  const removeTodoFromStorage = (id) => {
    if (hasTodo(id)) {
      _todos.value.delete(id);
      localStorage.setItem(
        "nst-todos",
        JSON.stringify(
          Array.from(_todos.value.values()).map((todo) => todo.toJSON())
        )
      );
    }
  };

  const deleteAllStorageTodos = () => {
    localStorage.removeItem("nst-todos");
  };

  /**
   * Sets the state of the todo page.
   *
   * @param {string} state - The new state to set. Must be one of "todo", "done", or "inprogress".
   */
  const setTodoPageState = (state) => {
    if (taskStatus.includes(state.toLowerCase())) {
      _todoPageState.value = state;
      _search.value = ""; // reset search when changing page state
    }
  };

  const setSortBy = (sort) => {
    if (sortByArray.includes(sort)) {
      _sortBy.value = sort;
    }
  };

  /**
   * Adds a new todo item to the collection if it has a valid ID and does not already exist.
   *
   * @param {Object} todo - The todo item to add.
   * @param {string|number} todo.id - The unique identifier for the todo item.
   */
  const addTodo = (todo) => {
    const newTodo = new Todo(todo);
    if (!hasTodo(newTodo.id)) {
      _todos.value.set(newTodo.id, newTodo);
      saveTodosToStorage();
    }
  };
  /**
   * Updates an existing todo item in the collection if it exists.
   *
   * @param {Object} todo - The todo item to update.
   * @param {number|string} todo.id - The unique identifier of the todo item.
   * @param {Map} _todos - A reactive map containing all todo items.
   */
  const updateTodo = (todo, no_ai = true) => {
    if (todo.id && hasTodo(todo.id)) {
      const existingTodo = getTodo(todo.id);
      if (existingTodo) {
        if (no_ai) {
          existingTodo.update(todo);
        } else existingTodo.updateAiInsights(todo);
      }
      saveTodosToStorage();
    }
  };

  /**
   * Retrieves a todo item by its ID.
   *
   * @param {string|number} id - The unique identifier of the todo item.
   * @returns {Object|null} The todo item if found, otherwise null.
   */
  const getTodo = (id) => {
    return _todos.value.get(id) ?? null;
  };

  /**
   * Removes a todo item from the collection by its ID.
   *
   * @param {string|number} id - The unique identifier of the todo item to be removed.
   */
  const removeTodo = (id) => {
    if (_todos.value.has(id)) {
      _todos.value.delete(id);
      if (_todos.value.size === 0) {
        deleteAllStorageTodos();
      } else {
        saveTodosToStorage();
      }
    }
  };

  const hasTodo = (id) => {
    return _todos.value.has(id);
  };

  // return state and functions
  return {
    todos,
    todoPageState,
    inTodo,
    inInProgress,
    inDone,
    getTodos,
    getInProgressTodos,
    getDoneTodos,
    sortBy,
    aiLast5Messages,
    enableSearchAndSort,
    hasAnyTask,
    hasAtLeastTwoTodoTask,
    hasAtLeastTwoInProgressTask,
    hasAtLeastTwoDoneTask,
    search,
    addMessage,
    getMessage,
    getLast10Messages,
    buildPrompt,
    getTodo,
    hasTodo,
    setTodoPageState,
    addTodo,
    updateTodo,
    removeTodo,
    removeTodoFromStorage,
    deleteAllStorageTodos,
    saveTodosToStorage,
    setSortBy,
    getTodosStringified,
  };
};
