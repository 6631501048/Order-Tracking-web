import Image from "next/image";
import type { ReactNode } from "react";
import { AlertIcon } from "./icons";

type Props = {
  tone: "empty" | "error";
  title: string;
  children: ReactNode;
  action?: ReactNode;
};

/** Empty state (ไม่พบข้อมูล) และ Error state ใช้โครงเดียวกัน */
export function StatePanel({ tone, title, children, action }: Props) {
  const isError = tone === "error";
  return (
    <div
      role={isError ? "alert" : undefined}
      className={`flex flex-col items-center rounded-card border px-6 py-10 text-center ${
        isError
          ? "border-danger-line bg-danger-soft"
          : "border-dashed border-line-strong bg-surface"
      }`}
    >
      {isError ? (
        <AlertIcon width={40} height={40} className="text-danger" />
      ) : (
        <Image
          src="/illustrations/empty-box.svg"
          alt="ภาพกล่องพัสดุว่างเปล่า"
          width={160}
          height={120}
          className="h-auto w-32"
        />
      )}
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-ink-muted">{children}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
