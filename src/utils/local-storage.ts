export const getLocalItem = (key: string) => {
  const item = localStorage.getItem(key);
  if (!item) {
    return null;
  }

  return JSON.parse(item);
};

export const setLocalItem = <T>(value: T, key: string) => {
  const stringifyValue = JSON.stringify(value);
  localStorage.setItem(key, stringifyValue);
};
