export function useLocalStorage() {
  // set local storage item
  function setLocal(key: string, data: any) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error setting local storage:", error);
    }
  }

  // get local storage item
  function getLocal(key: string) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting local storage:", error);
      return null;
    }
  }

  // remove local storage item
  function removeLocal(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing local storage:", error);
    }
  }

  return {
    setLocal,
    getLocal,
    removeLocal,
  };
}
