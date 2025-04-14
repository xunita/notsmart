export const sortTodoByDateDesc = (a, b) => {
  const aDate = a.createdAt;
  const bDate = b.createdAt;
  return bDate - aDate;
};

export const sortTodoByDateAsc = (a, b) => {
  const aDate = a.createdAt;
  const bDate = b.createdAt;
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
  "createdAt-desc": sortTodoByDateDesc,
  "createdAt-asc": sortTodoByDateAsc,
  "dueDate-desc": sortTodoByDueDateDesc,
  "dueDate-asc": sortTodoByDueDateAsc,
  "title-asc": sortTodoByTitleAZ,
  "title-desc": sortTodoByTitleZA,
};
