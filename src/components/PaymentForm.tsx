"use client";

import { useState } from "react";
import {
  PAYMENT_METHODS,
  PRODUCT,
  baht,
  calcTotal,
  type PaymentMethodId,
} from "@/lib/payment";
import { OrderSummary } from "./OrderSummary";
import { PaymentOptions } from "./PaymentOptions";

export function PaymentForm() {
  const [method, setMethod] = useState<PaymentMethodId | null>(null);
  const [discount, setDiscount] = useState(0);
  const [paid, setPaid] = useState(false);

  const fee = PAYMENT_METHODS.find((m) => m.id === method)?.fee ?? null;
  const total = calcTotal(PRODUCT.price, fee ?? 0, discount);

  return (
    // ไม่ใช้ <form> ครอบ เพราะช่องโค้ดส่วนลดมี <form> ของตัวเอง (form ซ้อนกันไม่ได้)
    <div className="space-y-6">
      <PaymentOptions
        value={method}
        onChange={(id) => {
          setMethod(id);
          setPaid(false);
        }}
      />
      <OrderSummary
        fee={fee}
        discount={discount}
        total={total}
        onApplyDiscount={setDiscount}
      />

      <div className="sticky bottom-0 -mx-4 border-t border-line bg-canvas/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0">
        <button
          type="button"
          onClick={() => method && setPaid(true)}
          disabled={method === null}
          className="w-full rounded-xl bg-brand py-3.5 text-base font-semibold text-on-brand transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:bg-disabled-bg disabled:text-disabled-fg"
        >
          ชำระเงิน {method ? baht(total) : ""}
        </button>
        <p aria-live="polite" className="mt-2 text-center text-sm empty:hidden">
          {method === null ? (
            <span className="text-ink-muted">กรุณาเลือกช่องทางชำระเงินก่อน</span>
          ) : paid ? (
            <span className="font-medium text-status-done-fg">
              ทำรายการสำเร็จ (ตัวอย่างสาธิต ไม่มีการตัดเงินจริง)
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
}
