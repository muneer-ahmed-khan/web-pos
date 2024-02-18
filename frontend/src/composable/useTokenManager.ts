export function useTokenManager() {
  function setToken(token: any) {
    try {
      localStorage.setItem("tokenData", JSON.stringify(token));
    } catch (error) {
      console.error("Error setting token:", error);
    }
  }

  function getToken() {
    try {
      const token = localStorage.getItem("tokenData");
      return token ? JSON.parse(token) : null;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  }

  function clearToken() {
    try {
      localStorage.removeItem("tokenData");
    } catch (error) {
      console.error("Error clearing token:", error);
    }
  }

  return {
    setToken,
    getToken,
    clearToken,
  };
}
