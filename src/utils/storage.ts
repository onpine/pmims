export const setStorage = (name: string, value: string) => {
  window.localStorage.setItem(name, value);
};
export const getStorage = (name: string) => {
  return (window.localStorage.getItem(name) || "");
}