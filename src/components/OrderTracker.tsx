"use client";

import { useMemo, useState } from "react";
import { MOCK_ORDERS } from "@/data/mock-orders";
import { filterOrders } from "@/lib/filter-orders";
import { validateQuery } from "@/lib/order-no";
import { OrderListHeader, OrderRow } from "./OrderRow";
import { OrderSearch } from "./OrderSearch";
import { StatePanel } from "./StatePanel";

const EXAMPLES = ["ORD-2587965432159-458", "ORD-258796543"];

export function OrderTracker() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string>();

  // กรองทันทีที่พิมพ์ (ปุ่ม "ค้นหา" ใช้ตรวจรูปแบบและยืนยันคำค้น)
  const orders = useMemo(() => filterOrders(MOCK_ORDERS, query), [query]);

  function handleSubmit() {
    const check = validateQuery(query);
    setError(check.ok ? undefined : check.message);
  }

  function handleClear() {
    setQuery("");
    setError(undefined);
  }

  return (
    <>
      <section
        aria-labelledby="search-heading"
        id="search"
        className="scroll-mt-20 rounded-card border border-line bg-surface p-5 shadow-card sm:p-6"
      >
        <h2 id="search-heading" className="mb-4 text-lg font-semibold">
          ค้นหาออเดอร์
        </h2>
        <OrderSearch
          value={query}
          onChange={(v) => {
            setQuery(v);
            setError(undefined);
          }}
          onSubmit={handleSubmit}
          error={error}
          examples={EXAMPLES}
        />
      </section>

      <section aria-labelledby="orders-heading" id="orders" className="mt-8 scroll-mt-20">
        <h2 id="orders-heading" className="text-lg font-semibold">
          รายการออเดอร์
          <span className="ml-2 text-sm font-normal text-ink-muted" aria-live="polite">
            {orders.length} จาก {MOCK_ORDERS.length} รายการ
          </span>
        </h2>

        <div className="mt-4">
          {orders.length === 0 ? (
            <StatePanel
              tone="empty"
              title="ไม่พบออเดอร์"
              action={
                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-lg border border-line-strong bg-surface px-4 py-2 text-sm font-medium hover:border-brand hover:text-brand-fg"
                >
                  ล้างการค้นหา
                </button>
              }
            >
              ไม่มีออเดอร์ที่ตรงกับ “{query.trim()}”
            </StatePanel>
          ) : (
            <>
              <OrderListHeader />
              <ul className="space-y-3">
                {orders.map((order) => (
                  <OrderRow key={order.orderNo} order={order} />
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </>
  );
}
