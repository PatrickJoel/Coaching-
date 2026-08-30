export interface Coach {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  hourlyRate: number;
}

export type SessionStatus =
  | "requested"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface Session {
  id: string;
  coachId: string;
  clientName: string;
  clientEmail: string;
  scheduledAt: string;
  notes: string;
  status: SessionStatus;
  createdAt: string;
}

export interface NewSession {
  coachId: string;
  clientName: string;
  clientEmail: string;
  scheduledAt: string;
  notes?: string;
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message =
      body?.error ??
      (body?.details ? JSON.stringify(body.details) : `Request failed (${res.status})`);
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

export const api = {
  getCoaches: () => fetch("/api/coaches").then((r) => handle<Coach[]>(r)),
  getSessions: () => fetch("/api/sessions").then((r) => handle<Session[]>(r)),
  createSession: (payload: NewSession) =>
    fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((r) => handle<Session>(r)),
};
