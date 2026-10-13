import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PaymentForm } from "@/components/PaymentForm";

export const metadata: Metadata = {
  title: "ชำระเงิน | Mini Payment UI",
  description: "เลือกช่องทางชำระเงินและตรวจสอบสรุปรายการสั่งซื้อ",
  robots: { index: false, follow: false },
};

export default function PaymentPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="text-sm font-medium text-brand-fg hover:underline">
          ← กลับไปหน้าติดตามออเดอร์
        </Link>
        <ThemeToggle />
      </div>
      <h1 className="mt-3 mb-6 text-2xl font-bold tracking-tight">ชำระเงิน</h1>
      <PaymentForm />
    </main>
  );
}
