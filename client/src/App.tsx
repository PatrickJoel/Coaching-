import { useEffect, useMemo, useState } from "react";
import { api, type Coach, type Session } from "./api";

function currency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function defaultSlot(): string {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  d.setHours(15, 0, 0, 0);
  // Format for <input type="datetime-local">
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}

export function App() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedCoachId, setSelectedCoachId] = useState<string>("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [scheduledAt, setScheduledAt] = useState(defaultSlot());
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "saving">(
    "loading",
  );
  const [flash, setFlash] = useState<string | null>(null);

  const coachById = useMemo(
    () => Object.fromEntries(coaches.map((c) => [c.id, c])),
    [coaches],
  );

  async function refresh() {
    const [c, s] = await Promise.all([api.getCoaches(), api.getSessions()]);
    setCoaches(c);
    setSessions(s);
    if (!selectedCoachId && c.length) setSelectedCoachId(c[0].id);
  }

  useEffect(() => {
    refresh()
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : String(e)),
      )
      .finally(() => setStatus("idle"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("saving");
    try {
      const created = await api.createSession({
        coachId: selectedCoachId,
        clientName,
        clientEmail,
        scheduledAt: new Date(scheduledAt).toISOString(),
        notes,
      });
      setFlash(
        `Session requested with ${coachById[created.coachId]?.name ?? "coach"}!`,
      );
      setClientName("");
      setClientEmail("");
      setNotes("");
      await refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setStatus("idle");
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <div className="brand">
          <img src="/vite.svg" alt="" width={40} height={40} />
          <span>Coaching</span>
        </div>
        <h1>Book a coaching session</h1>
        <p>
          Choose a coach, pick a time, and send a request. Real coaches, real
          growth.
        </p>
      </header>

      <main className="layout">
        <section className="panel">
          <h2>1 · Choose your coach</h2>
          <div className="coach-grid">
            {coaches.map((coach) => (
              <button
                type="button"
                key={coach.id}
                className={
                  "coach-card" +
                  (coach.id === selectedCoachId ? " selected" : "")
                }
                onClick={() => setSelectedCoachId(coach.id)}
                aria-pressed={coach.id === selectedCoachId}
              >
                <div className="coach-top">
                  <span className="coach-name">{coach.name}</span>
                  <span className="coach-rate">
                    {currency(coach.hourlyRate)}/hr
                  </span>
                </div>
                <span className="coach-specialty">{coach.specialty}</span>
                <p className="coach-bio">{coach.bio}</p>
              </button>
            ))}
          </div>

          <h2>2 · Your details</h2>
          <form className="form" onSubmit={onSubmit}>
            <label>
              Full name
              <input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Jordan Lee"
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="jordan@example.com"
                required
              />
            </label>
            <label>
              Preferred time
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                required
              />
            </label>
            <label>
              What would you like to work on?
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="e.g. Preparing for a promotion conversation"
              />
            </label>

            {error && <p className="error">{error}</p>}
            {flash && <p className="flash">{flash}</p>}

            <button
              className="submit"
              type="submit"
              disabled={status === "saving" || !selectedCoachId}
            >
              {status === "saving" ? "Requesting…" : "Request session"}
            </button>
          </form>
        </section>

        <aside className="panel sessions">
          <h2>Requested sessions</h2>
          {status === "loading" ? (
            <p className="muted">Loading…</p>
          ) : sessions.length === 0 ? (
            <p className="muted">No sessions yet. Book your first one!</p>
          ) : (
            <ul className="session-list">
              {sessions.map((s) => (
                <li key={s.id} className="session">
                  <div className="session-head">
                    <strong>{coachById[s.coachId]?.name ?? s.coachId}</strong>
                    <span className={`badge badge-${s.status}`}>
                      {s.status}
                    </span>
                  </div>
                  <div className="session-meta">
                    {s.clientName} · {formatDateTime(s.scheduledAt)}
                  </div>
                  {s.notes && <p className="session-notes">“{s.notes}”</p>}
                </li>
              ))}
            </ul>
          )}
        </aside>
      </main>

      <footer className="footer">
        <span>Coaching platform demo · {coaches.length} coaches available</span>
      </footer>
    </div>
  );
}
