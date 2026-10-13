import type { OrderStatus } from "@/lib/order-status";

export type Order = {
  orderNo: string;
  /** ISO 8601 พร้อม offset */
  createdAt: string;
  status: OrderStatus;
};

/** ข้อมูลตัวอย่างสำหรับสาธิต เรียงใหม่ไปเก่า */
export const MOCK_ORDERS: Order[] = [
  { orderNo: "ORD-2587965432159-458", createdAt: "2026-08-21T15:42:00+07:00", status: "IN_PROGRESS" },
  { orderNo: "ORD-2587965432871-102", createdAt: "2026-08-21T14:05:00+07:00", status: "PENDING_PAYMENT" },
  { orderNo: "ORD-2587965431990-337", createdAt: "2026-08-21T11:30:00+07:00", status: "QUEUED" },
  { orderNo: "ORD-2587965429655-204", createdAt: "2026-08-20T09:47:00+07:00", status: "COMPLETED" },
  { orderNo: "ORD-2587965428512-776", createdAt: "2026-08-19T18:22:00+07:00", status: "COMPLETED" },
];
