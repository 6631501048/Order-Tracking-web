"use client";

import { useId, type FormEvent } from "react";
import {
  ORDER_NO_EXAMPLE,
  ORDER_NO_HELPER,
} from "@/lib/order-no";
import { AlertIcon, SearchIcon } from "./icons";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  error?: string;
  /** ตัวอย่างเลขออเดอร์ให้กดเติมลงช่อง (สะดวกต่อการตรวจงาน) */
  examples?: string[];
};

export function OrderSearch({
  value,
  onChange,
  onSubmit,
  error,
  examples = [ORDER_NO_EXAMPLE],
}: Props) {
  const uid = useId();
  const inputId = `${uid}-order-no`;
  const helperId = `${uid}-helper`;
  const errorId = `${uid}-error`;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit} noValidate role="search" aria-label="ค้นหาออเดอร์">
      <label htmlFor={inputId} className="block text-sm font-medium">
        หมายเลขออเดอร์ (Order Number)
        <span className="ml-0.5 text-danger" aria-hidden="true">*</span>
        <span className="sr-only"> (จำเป็นต้องกรอก)</span>
      </label>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <SearchIcon
            width={18}
            height={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
          />
          <input
            id={inputId}
            name="orderNo"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="ORD-0000000000000-000"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            maxLength={30}
            aria-required="true"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${helperId} ${errorId}` : helperId}
            className={`h-12 w-full rounded-xl border bg-surface pl-11 pr-4 font-mono text-base outline-offset-2 placeholder:text-placeholder ${
              error ? "border-danger bg-danger-soft" : "border-line-strong"
            }`}
          />
        </div>
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-brand px-7 text-base font-semibold text-on-brand transition-colors hover:bg-brand-hover"
        >
          ค้นหา
        </button>
      </div>

      <p id={helperId} className="mt-2 text-sm text-ink-muted">
        {ORDER_NO_HELPER}
      </p>

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-sm font-medium text-danger"
        >
          <AlertIcon className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : null}

      {examples.length > 0 ? (
        <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
          <span>ลองค้นหา:</span>
          {examples.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => onChange(ex)}
              className="rounded-lg border border-line-strong bg-surface px-2.5 py-1 font-mono text-xs text-ink hover:border-brand hover:text-brand-fg"
            >
              {ex}
            </button>
          ))}
        </p>
      ) : null}
    </form>
  );
}
