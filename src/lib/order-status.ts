/** ชื่อสถานะตรงกับ API Order Tracking (โจทย์ข้อ 2) เพื่อต่อ API จริงได้ภายหลัง */
export const ORDER_STATUSES = [
  "PENDING_PAYMENT",
  "QUEUED",
  "IN_PROGRESS",
  "COMPLETED",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

type StatusMeta = {
  /** ข้อความไทยที่แสดงบน badge */
  label: string;
  /** ชื่ออังกฤษ ใช้ใน Figma / title / ตรวจสอบ */
  labelEn: string;
};

export const STATUS_META: Record<OrderStatus, StatusMeta> = {
  PENDING_PAYMENT: { label: "รอชำระเงิน", labelEn: "Pending Payment" },
  QUEUED: { label: "อยู่ในคิว", labelEn: "In Queue" },
  IN_PROGRESS: { label: "กำลังดำเนินการ", labelEn: "In Progress" },
  COMPLETED: { label: "เสร็จสิ้น", labelEn: "Completed" },
};
