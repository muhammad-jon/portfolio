import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL ?? "http://localhost:4000";
const SESSION_STORAGE_KEY = "live-cursors-session-id";

function readStoredSessionId() {
  if (typeof window === "undefined") return "";
  const value = window.localStorage.getItem(SESSION_STORAGE_KEY) ?? "";
  return value.trim();
}

const initialSessionId = readStoredSessionId();

export const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket"],
  reconnection: true,
  auth: {
    sessionId: initialSessionId,
  },
});

export function persistSessionId(sessionId: string) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  }

  const currentAuth =
    socket.auth && typeof socket.auth === "object"
      ? (socket.auth as Record<string, unknown>)
      : {};

  socket.auth = {
    ...currentAuth,
    sessionId,
  };
}
