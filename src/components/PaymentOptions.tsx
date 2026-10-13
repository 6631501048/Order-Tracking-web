import type { ReactNode } from "react";
import { PAYMENT_METHODS, baht, type PaymentMethodId } from "@/lib/payment";
import { CardIcon, CheckIcon, QrIcon, WalletIcon } from "./icons";

const ICONS: Record<PaymentMethodId, ReactNode> = {
  promptpay: <QrIcon width={22} height={22} />,
  truemoney: <WalletIcon width={22} height={22} />,
  card: <CardIcon width={22} height={22} />,
};

type Props = {
  value: PaymentMethodId | null;
  onChange: (id: PaymentMethodId) => void;
};

/** radio group จริง (keyboard/screen reader ใช้ได้) ตกแต่งเป็นการ์ด */
export function PaymentOptions({ value, onChange }: Props) {
  return (
    <fieldset>
      <legend className="mb-3 text-lg font-semibold">เลือกช่องทางชำระเงิน</legend>
      <div className="grid gap-3 sm:grid-cols-3">
        {PAYMENT_METHODS.map((m) => {
          const selected = value === m.id;
          return (
            <label
              key={m.id}
              className={`relative flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand sm:flex-col sm:items-start ${
                selected
                  ? "border-brand bg-brand-soft"
                  : "border-line bg-surface hover:border-line-strong"
              }`}
            >
              <input
                type="radio"
                name="payment-method"
                value={m.id}
                checked={selected}
                onChange={() => onChange(m.id)}
                className="sr-only"
              />
              <span
                className={`grid size-11 shrink-0 place-items-center rounded-xl ${
                  selected ? "bg-brand text-on-brand" : "bg-canvas text-ink-muted"
                }`}
              >
                {ICONS[m.id]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{m.name}</span>
                <span className="block text-sm text-ink-muted">{m.description}</span>
                <span className="mt-1 block text-xs text-ink-muted">
                  ค่าธรรมเนียม {m.fee === 0 ? "ฟรี" : baht(m.fee)}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`grid size-6 shrink-0 place-items-center rounded-full sm:absolute sm:right-3 sm:top-3 ${
                  selected ? "bg-brand text-on-brand" : "border-2 border-line-strong"
                }`}
              >
                {selected ? <CheckIcon width={16} height={16} /> : null}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
