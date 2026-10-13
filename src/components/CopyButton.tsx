"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // fallback สำหรับ browser/บริบทที่ไม่รองรับ Clipboard API
    try {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(area);
      return ok;
    } catch {
      return false;
    }
  }
}

export function CopyButton({ value }: { value: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function handleCopy() {
    const ok = await copyText(value);
    setState(ok ? "copied" : "failed");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }

  const label =
    state === "copied" ? "คัดลอกแล้ว" : state === "failed" ? "คัดลอกไม่สำเร็จ" : "คัดลอก";

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line-strong bg-surface px-2.5 text-sm font-medium text-ink-muted transition-colors hover:border-brand hover:text-brand-fg"
      >
        {state === "copied" ? (
          <CheckIcon className="text-status-done-fg" />
        ) : (
          <CopyIcon />
        )}
        <span>{label}</span>
        <span className="sr-only"> เลขออเดอร์ {value}</span>
      </button>
      {/* ประกาศผลให้ screen reader */}
      <span role="status" className="sr-only">
        {state === "idle" ? "" : label}
      </span>
    </>
  );
}
