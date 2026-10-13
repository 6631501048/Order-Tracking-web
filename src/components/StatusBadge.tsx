import type { ReactNode } from "react";
import { STATUS_META, type OrderStatus } from "@/lib/order-status";
import { CheckIcon, ProgressIcon, QueueIcon, WalletIcon } from "./icons";

const STYLES: Record<OrderStatus, { classes: string; icon: ReactNode }> = {
  QUEUED: {
    classes:
      "bg-status-queued-bg text-status-queued-fg border-status-queued-line",
    icon: <QueueIcon />,
  },
  IN_PROGRESS: {
    classes:
      "bg-status-progress-bg text-status-progress-fg border-status-progress-line",
    icon: <ProgressIcon />,
  },
  COMPLETED: {
    classes: "bg-status-done-bg text-status-done-fg border-status-done-line",
    icon: <CheckIcon />,
  },
  PENDING_PAYMENT: {
    classes: "bg-status-pay-bg text-status-pay-fg border-status-pay-line",
    icon: <WalletIcon />,
  },
};

/**
 * ป้ายสถานะ: แยกแยะด้วย "สี + ไอคอน + ข้อความ" พร้อมกัน
 * (ไม่พึ่งสีอย่างเดียว ผู้ที่ตาบอดสีก็แยกได้)
 */
export function StatusBadge({ status }: { status: OrderStatus }) {
  const { classes, icon } = STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1 text-sm font-medium ${classes}`}
    >
      {icon}
      {STATUS_META[status].label}
    </span>
  );
}
