import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../src/app.js";
import { Store } from "../src/store.js";

function freshApp() {
  const dir = mkdtempSync(join(tmpdir(), "coaching-test-"));
  const store = new Store(join(dir, "db.json"));
  return createApp(store);
}

describe("coaching API", () => {
  let app: ReturnType<typeof createApp>;

  beforeEach(() => {
    app = freshApp();
  });

  it("reports health", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("seeds coaches", async () => {
    const res = await request(app).get("/api/coaches");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(3);
    expect(res.body[0]).toHaveProperty("name");
  });

  it("creates and retrieves a session", async () => {
    const create = await request(app).post("/api/sessions").send({
      coachId: "coach-amara",
      clientName: "Jordan Lee",
      clientEmail: "jordan@example.com",
      scheduledAt: "2026-09-15T15:00:00.000Z",
      notes: "Want help preparing for a promotion.",
    });
    expect(create.status).toBe(201);
    expect(create.body.status).toBe("requested");
    const id = create.body.id as string;

    const list = await request(app).get("/api/sessions");
    expect(list.body).toHaveLength(1);

    const fetched = await request(app).get(`/api/sessions/${id}`);
    expect(fetched.status).toBe(200);
    expect(fetched.body.clientName).toBe("Jordan Lee");
  });

  it("rejects invalid input", async () => {
    const res = await request(app).post("/api/sessions").send({
      coachId: "coach-amara",
      clientName: "",
      clientEmail: "not-an-email",
      scheduledAt: "nonsense",
    });
    expect(res.status).toBe(400);
    expect(res.body.details).toHaveProperty("clientEmail");
  });

  it("rejects unknown coach", async () => {
    const res = await request(app).post("/api/sessions").send({
      coachId: "coach-nope",
      clientName: "Sam",
      clientEmail: "sam@example.com",
      scheduledAt: "2026-09-15T15:00:00.000Z",
    });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain("Unknown coachId");
  });
});
