/** เลขออเดอร์ต้องขึ้นต้นด้วย ORD- เช่น ORD-2587965432159-458 */
export const ORDER_NO_PREFIX = "ORD-";
export const ORDER_NO_EXAMPLE = "ORD-2587965432159-458";
export const ORDER_NO_HELPER = `พิมพ์เลขออเดอร์ที่ขึ้นต้นด้วย ORD- (พิมพ์บางส่วนก็กรองได้) เช่น ${ORDER_NO_EXAMPLE}`;
export const ORDER_NO_ERROR = `รูปแบบไม่ถูกต้อง เลขออเดอร์ต้องขึ้นต้นด้วย ORD- เช่น ${ORDER_NO_EXAMPLE}`;

/** ตัดช่องว่างหัวท้ายและแปลงเป็นตัวพิมพ์ใหญ่ (พิมพ์ ord- ก็ใช้ได้) */
export function normalizeQuery(input: string): string {
  return input.trim().toUpperCase();
}

export type QueryCheck =
  | { ok: true; value: string }
  | { ok: false; message: string };

/** ช่องว่าง = แสดงทั้งหมด (ผ่าน), มีข้อความแต่ไม่ขึ้นต้น ORD- = ผิดรูปแบบ */
export function validateQuery(input: string): QueryCheck {
  const value = normalizeQuery(input);
  if (value !== "" && !value.startsWith(ORDER_NO_PREFIX)) {
    return { ok: false, message: ORDER_NO_ERROR };
  }
  return { ok: true, value };
}
