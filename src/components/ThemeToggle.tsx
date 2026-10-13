"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "./icons";

type Theme = "light" | "dark";
const KEY = "theme";

function currentTheme(): Theme {
  const set = document.documentElement.dataset.theme;
  if (set === "light" || set === "dark") return set;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", cb);
  return () => {
    listeners.delete(cb);
    mq.removeEventListener("change", cb);
  };
}

/**
 * ปุ่มสลับ Light/Dark — ค่าเริ่มต้นตามระบบ, เมื่อกดจะจำค่าไว้ใน localStorage
 * (สคริปต์ใน layout ตั้ง data-theme ก่อนวาดหน้า เพื่อไม่ให้จอกะพริบ)
 */
export function ThemeToggle() {
  // server snapshot = null → SSR กับ hydrate ตรงกัน แล้วจึงแสดงค่าจริง
  const theme = useSyncExternalStore<Theme | null>(subscribe, currentTheme, () => null);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* โหมด private: ใช้ได้เฉพาะรอบนี้ */
    }
    listeners.forEach((l) => l());
  }

  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === null ? undefined : dark}
      aria-label="โหมดมืด"
      title={dark ? "สลับเป็นโหมดสว่าง" : "สลับเป็นโหมดมืด"}
      className="grid size-10 shrink-0 place-items-center rounded-lg text-ink-muted hover:bg-brand-soft hover:text-brand-fg"
    >
      {theme === null ? null : dark ? (
        <SunIcon width={20} height={20} />
      ) : (
        <MoonIcon width={20} height={20} />
      )}
    </button>
  );
}
