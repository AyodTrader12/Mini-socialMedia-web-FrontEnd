import axios from "axios";

const TOKEN_KEY = "token";

export const tokenStore = {
  get(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set(token: string) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      // storage blocked: user will need to log in again after a refresh
    }
  },
  clear() {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      // ignore
    }
  },
};

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// Attach the token to every request
api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// If the server says our session is dead, tell the app to log out
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && tokenStore.get()) {
      const status = error.response?.status;
      const message: string = error.response?.data?.message ?? "";
      const sessionDead = status === 401 || (status === 403 && message.includes("suspended"));
      if (sessionDead) window.dispatchEvent(new Event("auth:logout"));
    }
    return Promise.reject(error);
  }
);

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) return "Can't reach the server. Check your connection.";
    return error.response.data?.message ?? "Something went wrong";
  }
  return "Something went wrong";
}