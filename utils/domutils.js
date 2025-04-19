const scrollToBottomById = (id) => {
  return new Promise((resolve) => {
    const element = document.getElementById(id);
    // smooth scroll to bottom
    if (element) {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: "smooth",
      });
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

export { scrollToBottomById };
