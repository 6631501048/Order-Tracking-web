"use client";

import { useId, useState, type FormEvent } from "react";
import { PRODUCT, baht, discountFor } from "@/lib/payment";
import { AlertIcon } from "./icons";

type Props = {
  fee: number | null;
  discount: number;
  total: number;
  onApplyDiscount: (amount: number) => void;
};

export function OrderSummary({ fee, discount, total, onApplyDiscount }: Props) {
  const uid = useId();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  function apply(e: FormEvent) {
    e.preventDefault();
    const amount = discountFor(code, PRODUCT.price);
    if (amount === null) {
      onApplyDiscount(0);
      setMessage({ ok: false, text: "โค้ดส่วนลดไม่ถูกต้อง" });
    } else {
      onApplyDiscount(amount);
      setMessage({ ok: true, text: `ใช้โค้ดสำเร็จ ลด ${baht(amount)}` });
    }
  }

  return (
    <section
      aria-labelledby="summary-heading"
      className="rounded-card border border-line bg-surface p-5 shadow-card"
    >
      <h2 id="summary-heading" className="text-lg font-semibold">
        สรุปรายการสั่งซื้อ
      </h2>

      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt>{PRODUCT.name}</dt>
          <dd className="tabular-nums">{baht(PRODUCT.price)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-muted">ค่าธรรมเนียม</dt>
          <dd className="tabular-nums">
            {fee === null ? "เลือกช่องทางชำระเงิน" : fee === 0 ? "ฟรี" : baht(fee)}
          </dd>
        </div>
        {discount > 0 ? (
          <div className="flex justify-between gap-4 text-status-done-fg">
            <dt>ส่วนลด</dt>
            <dd className="tabular-nums">-{baht(discount)}</dd>
          </div>
        ) : null}
        <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
          <dt className="text-base font-semibold">ยอดชำระสุทธิ</dt>
          <dd className="text-2xl font-bold tabular-nums text-brand-fg">{baht(total)}</dd>
        </div>
      </dl>

      <form onSubmit={apply} className="mt-5 border-t border-line pt-5">
        <label htmlFor={`${uid}-code`} className="block text-sm font-medium">
          โค้ดส่วนลด
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id={`${uid}-code`}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="เช่น WELCOME50"
            autoComplete="off"
            aria-describedby={`${uid}-msg`}
            className="h-11 min-w-0 flex-1 rounded-xl border border-line-strong bg-surface px-3 text-base uppercase placeholder:normal-case placeholder:text-placeholder"
          />
          <button
            type="submit"
            disabled={code.trim() === ""}
            className="h-11 shrink-0 rounded-xl border border-brand px-4 text-sm font-semibold text-brand-fg hover:bg-brand-soft disabled:cursor-not-allowed disabled:border-line-strong disabled:text-placeholder disabled:hover:bg-transparent"
          >
            ใช้โค้ด
          </button>
        </div>
        <p
          id={`${uid}-msg`}
          aria-live="polite"
          className={`mt-2 flex items-center gap-1.5 text-sm empty:hidden ${
            message?.ok ? "text-status-done-fg" : "text-danger"
          }`}
        >
          {message ? (
            <>
              {message.ok ? null : <AlertIcon />}
              {message.text}
            </>
          ) : null}
        </p>
      </form>
    </section>
  );
}
