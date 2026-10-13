import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// ฟอนต์โหลดจากไฟล์ในโปรเจกต์ (self-host) ไม่ขอ Google Fonts ตอนรันไทม์
// แยก Latin (ตัวเลข/อังกฤษ) กับ Thai เป็นสองฟามิลี browser เลือกต่อตัวอักษรเอง
const inter = localFont({
  variable: "--font-latin",
  display: "swap",
  src: [
    { path: "../fonts/inter-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/inter-latin-500-normal.woff2", weight: "500" },
    { path: "../fonts/inter-latin-600-normal.woff2", weight: "600" },
  ],
});

const notoSansThai = localFont({
  variable: "--font-thai",
  display: "swap",
  src: [
    { path: "../fonts/noto-sans-thai-thai-400-normal.woff2", weight: "400" },
    { path: "../fonts/noto-sans-thai-thai-500-normal.woff2", weight: "500" },
    { path: "../fonts/noto-sans-thai-thai-600-normal.woff2", weight: "600" },
  ],
});

export const metadata: Metadata = {
  title: "ติดตามออเดอร์ | ตรวจสอบสถานะออเดอร์ของคุณ",
  description:
    "กรอกหมายเลขออเดอร์เพื่อตรวจสอบสถานะ อยู่ในคิว กำลังดำเนินการ เสร็จสิ้น หรือรอชำระเงิน พร้อมดูรายการออเดอร์ปัจจุบันและที่ผ่านมา",
  // หน้านี้แสดงข้อมูลเฉพาะบุคคล จึงไม่ให้ search engine เก็บ (ดูเหตุผลใน README)
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#4338ca" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1020" },
  ],
  width: "device-width",
  initialScale: 1,
};

// ตั้งธีมที่ผู้ใช้เลือกไว้ก่อนวาดหน้า (กันจอกะพริบสว่างก่อนมืด)
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      suppressHydrationWarning
      className={`${inter.variable} ${notoSansThai.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
