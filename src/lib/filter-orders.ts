import type { Order } from "@/data/mock-orders";
import { normalizeQuery } from "@/lib/order-no";

/** กรองรายการที่เลขออเดอร์มีคำค้นอยู่ (ไม่สนตัวพิมพ์เล็ก/ใหญ่) ค่าว่าง = ทั้งหมด */
export function filterOrders(orders: Order[], query: string): Order[] {
  const q = normalizeQuery(query);
  if (q === "") return orders;
  return orders.filter((o) => o.orderNo.includes(q));
}
