export const sortTodoByDateDesc = (a, b) => {
  const aDate = a.updatedAt;
  const bDate = b.updatedAt;
  return bDate - aDate;
};

export const sortTodoByDateAsc = (a, b) => {
  const aDate = a.updatedAt;
  const bDate = b.updatedAt;
  return aDate - bDate;
};

export const sortTodoByDueDateDesc = (a, b) => {
  const aDate = a.dueDate ?? 0;
  const bDate = b.dueDate ?? 0;
  return bDate - aDate;
};

export const sortTodoByDueDateAsc = (a, b) => {
  const aDate = a.dueDate ?? 0;
  const bDate = b.dueDate ?? 0;
  return aDate - bDate;
};

export const sortTodoByTitleAZ = (a, b) => {
  const aTitle = a.title.toLowerCase();
  const bTitle = b.title.toLowerCase();
  if (aTitle < bTitle) return -1;
  if (aTitle > bTitle) return 1;
  return 0;
};

export const sortTodoByTitleZA = (a, b) => {
  const aTitle = a.title.toLowerCase();
  const bTitle = b.title.toLowerCase();
  if (aTitle < bTitle) return 1;
  if (aTitle > bTitle) return -1;
  return 0;
};

export const sortsFunctions = {
  "updatedAt-desc": sortTodoByDateDesc,
  "updatedAt-asc": sortTodoByDateAsc,
  "dueDate-desc": sortTodoByDueDateDesc,
  "dueDate-asc": sortTodoByDueDateAsc,
  "title-asc": sortTodoByTitleAZ,
  "title-desc": sortTodoByTitleZA,
};
