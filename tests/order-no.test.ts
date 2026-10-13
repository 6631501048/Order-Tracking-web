import { describe, expect, it } from "vitest";
import { MOCK_ORDERS } from "@/data/mock-orders";
import { filterOrders } from "@/lib/filter-orders";
import { normalizeQuery, validateQuery } from "@/lib/order-no";

describe("validateQuery", () => {
  it("ค่าว่างผ่าน (แสดงทั้งหมด)", () => {
    expect(validateQuery("   ")).toEqual({ ok: true, value: "" });
  });
  it("ขึ้นต้น ORD- ผ่าน ไม่สนตัวพิมพ์และช่องว่าง", () => {
    expect(validateQuery(" ord-2587 ")).toEqual({ ok: true, value: "ORD-2587" });
    expect(normalizeQuery(" ord- ")).toBe("ORD-");
  });
  it.each(["2587965432159", "ORX-123", "ORD123", "hello"])("ปฏิเสธ %s", (v) => {
    expect(validateQuery(v).ok).toBe(false);
  });
});

describe("filterOrders", () => {
  it("ค่าว่าง = ทั้งหมด และมี mock 3–5 รายการ", () => {
    expect(filterOrders(MOCK_ORDERS, "")).toHaveLength(MOCK_ORDERS.length);
    expect(MOCK_ORDERS.length).toBeGreaterThanOrEqual(3);
    expect(MOCK_ORDERS.length).toBeLessThanOrEqual(5);
  });
  it("กรองตามบางส่วนของเลข ไม่สนตัวพิมพ์", () => {
    expect(filterOrders(MOCK_ORDERS, "ord-2587965432159-458")).toHaveLength(1);
    expect(filterOrders(MOCK_ORDERS, "-102")).toHaveLength(1);
  });
  it("ไม่พบ = อาร์เรย์ว่าง", () => {
    expect(filterOrders(MOCK_ORDERS, "ORD-0000")).toEqual([]);
  });
});
