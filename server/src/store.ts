import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export interface Coach {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  hourlyRate: number;
}

export type SessionStatus = "requested" | "confirmed" | "completed" | "cancelled";

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

interface Database {
  coaches: Coach[];
  sessions: Session[];
}

const SEED_COACHES: Coach[] = [
  {
    id: "coach-amara",
    name: "Amara Osei",
    specialty: "Leadership & Executive Coaching",
    bio: "Former VP of Engineering helping new managers grow into confident leaders.",
    hourlyRate: 180,
  },
  {
    id: "coach-diego",
    name: "Diego Fernández",
    specialty: "Career Transitions",
    bio: "Guides mid-career professionals through pivots into product and tech roles.",
    hourlyRate: 140,
  },
  {
    id: "coach-mei",
    name: "Mei Tanaka",
    specialty: "Performance & Wellbeing",
    bio: "Blends sports-psychology techniques with practical habit design.",
    hourlyRate: 120,
  },
];

/**
 * Minimal JSON-file backed store. Chosen over a native DB (e.g. better-sqlite3)
 * so the environment needs no compiler toolchain and boots quickly. The store
 * is intentionally tiny and synchronous; swap for a real database when scaling.
 */
export class Store {
  private readonly filePath: string;
  private data: Database;

  constructor(filePath?: string) {
    this.filePath =
      filePath ??
      process.env.DATA_FILE ??
      resolve(__dirname, "..", "data", "db.json");
    this.data = this.load();
  }

  private load(): Database {
    if (existsSync(this.filePath)) {
      try {
        const raw = readFileSync(this.filePath, "utf8");
        const parsed = JSON.parse(raw) as Partial<Database>;
        return {
          coaches: parsed.coaches?.length ? parsed.coaches : SEED_COACHES,
          sessions: parsed.sessions ?? [],
        };
      } catch {
        // Corrupt file: fall back to a fresh seeded database.
      }
    }
    const fresh: Database = { coaches: SEED_COACHES, sessions: [] };
    this.persist(fresh);
    return fresh;
  }

  private persist(data: Database = this.data): void {
    mkdirSync(dirname(this.filePath), { recursive: true });
    writeFileSync(this.filePath, JSON.stringify(data, null, 2), "utf8");
  }

  listCoaches(): Coach[] {
    return this.data.coaches;
  }

  getCoach(id: string): Coach | undefined {
    return this.data.coaches.find((c) => c.id === id);
  }

  listSessions(): Session[] {
    return [...this.data.sessions].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt),
    );
  }

  getSession(id: string): Session | undefined {
    return this.data.sessions.find((s) => s.id === id);
  }

  addSession(session: Session): Session {
    this.data.sessions.push(session);
    this.persist();
    return session;
  }
}
