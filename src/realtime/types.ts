export interface CursorUpdatePayload {
  x: number;
  y: number;
  page: string;
}

export interface CursorMovePayload extends CursorUpdatePayload {
  id: string;
  name: string;
  color: string;
}

export interface CursorLeavePayload {
  id: string;
}

export type CursorStatePayload = CursorMovePayload[];

export interface CursorSnapshot extends CursorMovePayload {
  lastSeen: number;
}

export interface LiveCursorStore {
  subscribe: (listener: () => void) => () => void;
  getVersion: () => number;
  getCursors: () => Map<string, CursorSnapshot>;
}
