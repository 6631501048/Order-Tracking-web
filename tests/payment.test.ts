import { describe, expect, it } from "vitest";
import { calcTotal, discountFor } from "@/lib/payment";

describe("payment", () => {
  it("โค้ดส่วนลด: บาท / เปอร์เซ็นต์ / ไม่ถูกต้อง", () => {
    expect(discountFor("welcome50", 299)).toBe(50);
    expect(discountFor("SAVE10", 299)).toBe(30);
    expect(discountFor("nope", 299)).toBeNull();
  });
  it("ยอดสุทธิ = ราคา - ส่วนลด + ค่าธรรมเนียม และไม่ติดลบ", () => {
    expect(calcTotal(299, 5, 50)).toBe(254);
    expect(calcTotal(40, 0, 100)).toBe(0);
  });
});
