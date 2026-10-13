import Link from "next/link";
import { OrderTracker } from "@/components/OrderTracker";
import { BoxIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <>
      <header className="border-b border-line bg-surface">
        <nav
          aria-label="เมนูหลัก"
          className="mx-auto flex h-16 max-w-4xl items-center justify-between gap-4 px-4 sm:px-6"
        >
          <Link href="/" className="flex shrink-0 items-center gap-2 whitespace-nowrap font-semibold">
            <span className="grid size-9 place-items-center rounded-xl bg-brand text-on-brand">
              <BoxIcon width={20} height={20} />
            </span>
            <span>Order Tracker</span>
          </Link>
          <ul className="flex items-center gap-0.5 whitespace-nowrap text-sm leading-6 font-medium text-ink-muted sm:gap-1">
            <li>
              <a
                href="#search"
                className="rounded-lg px-2.5 py-2 hover:bg-brand-soft sm:px-3 hover:text-brand-fg"
              >
                ค้นหา
              </a>
            </li>
            <li>
              <Link
                href="/payment"
                className="rounded-lg px-2.5 py-2 hover:bg-brand-soft sm:px-3 hover:text-brand-fg"
              >
                ชำระเงิน
              </Link>
            </li>
            <li className="hidden sm:block">
              <a
                href="#orders"
                className="rounded-lg px-2.5 py-2 hover:bg-brand-soft sm:px-3 hover:text-brand-fg"
              >
                รายการออเดอร์
              </a>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          ติดตามออเดอร์
        </h1>
        <p className="mt-2 mb-6 max-w-2xl text-ink-muted sm:mb-8">
          ตรวจสอบสถานะออเดอร์ของคุณได้ทุกเวลา กรอกหมายเลขออเดอร์
          หรือดูรายการออเดอร์ด้านล่าง
        </p>

        <OrderTracker />
      </main>

      <footer className="mx-auto max-w-4xl px-4 pb-10 text-xs text-ink-muted sm:px-6">
        ข้อมูลในหน้านี้เป็นข้อมูลตัวอย่างสำหรับการสาธิต
      </footer>
    </>
  );
}
