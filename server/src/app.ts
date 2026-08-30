import cors from "cors";
import express, { type Express } from "express";
import { nanoid } from "nanoid";
import { z } from "zod";
import { Store } from "./store.js";

const createSessionSchema = z.object({
  coachId: z.string().min(1),
  clientName: z.string().min(1, "clientName is required"),
  clientEmail: z.string().email("clientEmail must be a valid email"),
  scheduledAt: z
    .string()
    .refine((v) => !Number.isNaN(Date.parse(v)), "scheduledAt must be a date"),
  notes: z.string().max(2000).optional().default(""),
});

export function createApp(store: Store = new Store()): Express {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  app.get("/api/coaches", (_req, res) => {
    res.json(store.listCoaches());
  });

  app.get("/api/sessions", (_req, res) => {
    res.json(store.listSessions());
  });

  app.get("/api/sessions/:id", (req, res) => {
    const session = store.getSession(req.params.id);
    if (!session) {
      res.status(404).json({ error: "Session not found" });
      return;
    }
    res.json(session);
  });

  app.post("/api/sessions", (req, res) => {
    const parsed = createSessionSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: "Invalid request",
        details: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const { coachId, clientName, clientEmail, scheduledAt, notes } =
      parsed.data;

    if (!store.getCoach(coachId)) {
      res.status(400).json({ error: `Unknown coachId: ${coachId}` });
      return;
    }

    const session = store.addSession({
      id: nanoid(10),
      coachId,
      clientName,
      clientEmail,
      scheduledAt,
      notes,
      status: "requested",
      createdAt: new Date().toISOString(),
    });

    res.status(201).json(session);
  });

  return app;
}
