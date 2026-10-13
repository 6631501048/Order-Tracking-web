import type { Order } from "@/data/mock-orders";
import { formatThaiDateTime } from "@/lib/format";
import { CopyButton } from "./CopyButton";
import { StatusBadge } from "./StatusBadge";

/** หัวคอลัมน์ (เฉพาะ Desktop) — ซ่อนจาก screen reader เพราะแต่ละแถวมี label ของตัวเอง */
export function OrderListHeader() {
  return (
    <div
      aria-hidden="true"
      className="hidden grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,0.8fr)] gap-6 px-5 pb-2 text-xs font-medium text-ink-muted md:grid"
    >
      <span>รหัสรายการ</span>
      <span>วันและเวลาที่ทำรายการ</span>
      <span>สถานะ</span>
    </div>
  );
}

export function OrderRow({ order }: { order: Order }) {
  return (
    <li className="rounded-card border border-line bg-surface p-4 shadow-card sm:px-5 md:grid md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,0.8fr)] md:items-center md:gap-6">
      <div>
        <p className="text-xs text-ink-muted md:sr-only">รหัสรายการ</p>
        <div className="mt-1 flex flex-wrap items-center gap-2 md:mt-0">
          <span className="font-mono text-[0.95rem] font-medium tracking-tight">
            {order.orderNo}
          </span>
          <CopyButton value={order.orderNo} />
        </div>
      </div>

      <div className="mt-3 md:mt-0">
        <p className="text-xs text-ink-muted md:sr-only">วันและเวลาที่ทำรายการ</p>
        <time
          dateTime={order.createdAt}
          className="mt-1 block text-sm tabular-nums text-ink md:mt-0"
        >
          {formatThaiDateTime(order.createdAt)}
        </time>
      </div>

      <div className="mt-3 md:mt-0">
        <p className="mb-1 text-xs text-ink-muted md:sr-only">สถานะ</p>
        <StatusBadge status={order.status} />
      </div>
    </li>
  );
}
