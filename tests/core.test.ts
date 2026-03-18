import { describe, it, expect } from "vitest";
import { Podcar } from "../src/core.js";
describe("Podcar", () => {
  it("init", () => { expect(new Podcar().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Podcar(); await c.manage(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Podcar(); await c.manage(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
