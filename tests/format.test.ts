import { describe, expect, it } from "vitest";
import { formatThaiDateTime } from "@/lib/format";

describe("formatThaiDateTime", () => {
  it("แสดงรูปแบบ dd/mm/yyyy HH:mm น. ตามตัวอย่างในโจทย์", () => {
    expect(formatThaiDateTime("2026-08-21T15:42:00+07:00")).toBe("21/08/2026 15:42 น.");
  });

  it("แปลงเวลา UTC เป็นเวลาไทย (+7) ไม่ขึ้นกับ timezone ของเครื่อง", () => {
    expect(formatThaiDateTime("2026-08-21T08:42:00Z")).toBe("21/08/2026 15:42 น.");
  });

  it("ข้ามวันเมื่อเกินเที่ยงคืนเวลาไทย", () => {
    expect(formatThaiDateTime("2026-08-21T18:30:00Z")).toBe("22/08/2026 01:30 น.");
  });

  it("เที่ยงคืนแสดง 00 ไม่ใช่ 24", () => {
    expect(formatThaiDateTime("2026-08-21T17:00:00Z")).toBe("22/08/2026 00:00 น.");
  });
});
