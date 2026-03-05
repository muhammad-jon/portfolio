export interface SessionPayload {
  sessionId: string;
  name: string;
  color: string;
}

export interface CursorUpdatePayload {
  x: number;
  y: number;
  page: string;
  ts: number;
}

export interface CursorMovePayload extends CursorUpdatePayload {
  id: string;
  sessionId: string;
  name: string;
  color: string;
}

export type CursorStatePayload = CursorMovePayload[];

export interface CursorLeavePayload {
  id: string;
  sessionId?: string;
}

export interface CursorSnapshot extends CursorMovePayload {
  lastSeen: number;
}

export interface SelfIdentity {
  sessionId: string;
  name: string;
  color: string;
}

export interface LiveCursorsStore {
  subscribe: (listener: () => void) => () => void;
  getVersion: () => number;
  getCursors: () => Map<string, CursorSnapshot>;
  getSelf: () => SelfIdentity | null;
}
