export const useStorage = () => {
  const allStorageStates = useState("allStorageStates", () => new Map());
  //
  const watchStorageState = (key) => {
    if (typeof key !== "string") {
      throw new Error("Key must be a string");
    }
    const item = allStorageStates.value.get(key);
    if (item) {
      watch(
        () => item.value,
        (itemValue) => {
          if (allStorageStates.value.has(key)) {
            localStorage.setItem(key, JSON.stringify(itemValue));
          }
        },
        { deep: true }
      );
    } else {
      console.warn(`No storage state found for key: ${key}`);
    }
  };
  //
  const useLocalStorage = (key, data = null, force = false) => {
    if (typeof key !== "string") {
      throw new Error("Key must be a string");
    }
    // check if the key already exists in localStorage
    const existingItem = localStorage.getItem(key);
    // create a new state for the key using useState
    const item = useState(key, () => data ?? null);
    //
    if (existingItem) {
      // if it exists, parse it and set the initial value
      item.value = force ? data : JSON.parse(existingItem);
      if (force) {
        localStorage.setItem(key, JSON.stringify(data));
      }
    } else {
      localStorage.setItem(key, JSON.stringify(item.value));
    }
    // set the ref and the key in the allStorageStates map for tracking
    allStorageStates.value.set(key, item);
    // watch for changes in the item and update localStorage accordingly
    watchStorageState(key);
    return item;
  };

  const deleteLocalStorage = (key, defaultValue = null) => {
    if (typeof key !== "string") {
      throw new Error("Key must be a string");
    }
    localStorage.removeItem(key);
    // remove the item from the allStorageStates map
    // and reset its value to null
    const item = allStorageStates.value.get(key);
    if (item) {
      allStorageStates.value.delete(key);
      item.value = defaultValue ?? null; // reset the state to given default value or null
    }
  };
  return {
    useLocalStorage,
    deleteLocalStorage,
  };
};
