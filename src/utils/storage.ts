export const setStorage = (name: string, value: any) => {
  window.localStorage.setItem(name, JSON.stringify(value));
};
export const getStorage = (name: string) => {
  return JSON.parse((window.localStorage.getItem(name) || ""));
}