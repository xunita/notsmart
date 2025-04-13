export const getDayDifference = (date) => {
  const toLocalDateOnly = (date) => {
    const localDate = new Date(date);
    return new Date(
      localDate.getFullYear(),
      localDate.getMonth(),
      localDate.getDate()
    );
  };
  const inputDate = toLocalDateOnly(date);
  const today = toLocalDateOnly(new Date());

  const diffTime = Math.abs(inputDate - today);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (today > inputDate) return -1;
  if (diffDays > 3) return 4;
  return diffDays;
};
