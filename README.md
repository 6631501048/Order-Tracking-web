# Mini Order Tracker + Mini Payment UI

โจทย์ทดสอบตำแหน่ง Intern (Design-to-Code) ทำด้วย **Next.js (App Router) + TypeScript + Tailwind CSS v4**
มี 2 หน้า ใน repo เดียว:

| หน้า | Path | โจทย์ |
| --- | --- | --- |
| Mini Order Tracker | `/` | ค้นหา/กรองเลขออเดอร์ + ปุ่ม Copy + Badge สถานะ |
| Mini Payment UI | `/payment` | เลือกช่องทางชำระเงิน + สรุปคำสั่งซื้อ + ปุ่มชำระเงิน |

## ลิงก์ส่งงาน

- Figma (View access): [ใส่ลิงก์ Figma]
- Live demo: [ใส่ลิงก์ Vercel]
- Source code: repo นี้

## วิธีรันโปรเจกต์

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # unit tests (Vitest)
npm run build && npm start
```

## Result (สิ่งที่ทำเสร็จ)

### หน้า Order Tracker (`/`)
- ช่องกรอกเลข `ORD-…` + ปุ่ม "ค้นหา" ถ้ามีข้อความที่ไม่ขึ้นต้นด้วย `ORD-` แสดงข้อความ **สีแดง** (`role="alert"`)
- **Filter แบบทันที** ขณะพิมพ์ (ไม่สนตัวพิมพ์เล็ก/ใหญ่ พิมพ์บางส่วนของเลขก็กรองได้) พร้อมตัวนับ "x จาก 5 รายการ"
- Mock data 5 รายการ: เลข Order, วันที่-เวลา (`21/08/2026 15:42 น.`) และ Badge สถานะ 4 แบบ (อยู่ในคิว / กำลังดำเนินการ / เสร็จสิ้น / รอชำระเงิน) ใช้ทั้งสี ไอคอน และข้อความ
- ปุ่ม **Copy** ข้างเลข Order คัดลอกลง Clipboard แล้วเปลี่ยนเป็นไอคอนติ๊ก + ข้อความ "คัดลอกแล้ว" (มี fallback ถ้า Clipboard API ใช้ไม่ได้)
- Empty state เมื่อกรองแล้วไม่พบ พร้อมปุ่ม "ล้างการค้นหา"

### หน้า Payment (`/payment`)
- ตัวเลือกชำระเงิน 3 แบบ (QR PromptPay, TrueMoney Wallet, บัตรเครดิต/เดบิต) เป็น radio group จริง
  **Active state**: ขอบหนาสีหลัก + พื้นหลังอ่อน + ไอคอนติ๊กถูก
- การ์ดสรุปคำสั่งซื้อ: ราคาสินค้า, ค่าธรรมเนียม (ตามช่องทางที่เลือก), ส่วนลด, **ยอดสุทธิ** ตัวใหญ่หนาสีเด่น
- ช่องโค้ดส่วนลด + ปุ่ม "ใช้โค้ด" (ลองโค้ด `WELCOME50` ลด 50 บาท หรือ `SAVE10` ลด 10%)
- ปุ่ม "ชำระเงิน" ด้านล่าง **Disabled** (สีเทา, `cursor-not-allowed`) จนกว่าจะเลือกช่องทาง และแสดงยอดบนปุ่มเมื่อพร้อมกด (บน Mobile ปุ่มเกาะติดขอบล่างจอ)

### Dark mode (ส่วนเสริม)
- ตามค่าระบบ (`prefers-color-scheme`) อัตโนมัติ และมีปุ่มสลับ ☀/🌙 ที่มุมขวาบนทุกหน้า จำค่าที่เลือกไว้ใน `localStorage`
- ใช้ design tokens ชุดเดียว: สลับค่าตัวแปรสีใน `globals.css` (`[data-theme="dark"]`) ทุก component จึงไม่ต้องเขียน `dark:` ซ้ำ
- สคริปต์เล็กๆ ใน `<head>` ตั้งธีมก่อนวาดหน้า จอจึงไม่กะพริบสว่างก่อนมืด
- สี Badge สถานะมีชุดสำหรับโหมดมืดแยก ยังคงมีไอคอนและข้อความกำกับ ตรวจ contrast ด้วย axe แล้วผ่านทั้งสองโหมด

### Tailwind / Library ที่เลือกใช้
- **Tailwind CSS v4** ล้วน กำหนด design tokens (สี, radius, shadow) ใน `@theme` ที่ `src/app/globals.css` และใช้ชื่อเดียวกับตัวแปรใน Figma
- ไม่ใช้ UI library เพิ่ม: ไอคอนเป็น inline SVG, ฟอนต์ Noto Sans Thai + Inter ผ่าน `next/font/local`
- ใช้ variant ของ Tailwind เช่น `has-[:focus-visible]`, `sm:` / `md:` สำหรับ Responsive แบบ Mobile First

### โครงสร้างโค้ด
```
src/
  app/            page.tsx (/), payment/page.tsx, layout.tsx, globals.css
  components/     OrderTracker, OrderSearch, OrderRow, StatusBadge, CopyButton, StatePanel,
                  PaymentForm, PaymentOptions, OrderSummary, icons
  lib/            order-no.ts (validation), filter-orders.ts, order-status.ts, format.ts, payment.ts
  data/           mock-orders.ts
tests/            Vitest: validation, filter, format, payment
```
Logic (validate, filter, คำนวณยอด) แยกเป็นฟังก์ชันล้วนใน `lib/` เพื่อเทสต์ง่าย ส่วน component รับ props อย่างเดียว

### Semantic HTML / Accessibility
`header/nav/main/section/footer`, ลำดับ heading H1→H2→H3, `<label>` ผูกกับ input, `<fieldset>/<legend>` + radio สำหรับช่องทางชำระเงิน, `<dl>` สำหรับสรุปราคา, `aria-live` แจ้งผล filter/copy/โค้ดส่วนลด, focus ring ชัดเจน ตรวจด้วย axe-core แล้วไม่พบ violation ทั้งสองหน้า

## Problem Solving (อุปสรรคและวิธีแก้)

| ปัญหา | วิธีแก้ |
| --- | --- |
| เวลา 30–60 นาที ต้องทำสองหน้า + Figma | แยก logic เป็นฟังก์ชันล้วน + ใช้ design tokens/ปุ่ม/ฟอนต์ร่วมกัน ไม่ทำ feature นอกโจทย์ (ไม่มี backend, ใช้ mock data) |
| `<form>` ซ้อนกัน (ช่องโค้ดส่วนลดอยู่ในฟอร์มชำระเงิน) ทำให้ React แจ้ง hydration error | ไม่ครอบด้วย `<form>` ใหญ่ ใช้ `<div>` และปุ่มชำระเงินเป็น `type="button"` |
| ปุ่ม Copy: label ของปุ่มไม่ตรงกับข้อความที่เห็น (axe `label-content-name-mismatch`) | ใช้ข้อความที่เห็นเป็นชื่อปุ่ม และเติมเลขออเดอร์เป็น sr-only |
| Radio แบบการ์ด ซ่อน input แล้วโฟกัสด้วยคีย์บอร์ดไม่เห็น | ซ่อน input ด้วย `sr-only` และวาด focus ring ที่การ์ดด้วย `has-[:focus-visible]` |
| วันที่ไม่ตรงกันระหว่าง server/browser (timezone) | จัดรูปแบบด้วย `Intl.DateTimeFormat` ระบุ `timeZone: "Asia/Bangkok"` |
| Mobile: เมนูบนสุดถูกบีบจนตัดคำไทยกลางคำ ทำให้สระ/วรรณยุกต์เพี้ยน | ใช้ `whitespace-nowrap` + line-height ที่พอสำหรับภาษาไทย และซ่อนลิงก์รองบนจอเล็ก |
| Mobile: ยอดสุทธิ/ปุ่มอยู่ไกลเกินต้องเลื่อนหา | ปุ่มชำระเงินเกาะขอบล่างจอ (`sticky bottom-0`) และแสดงยอดบนปุ่ม |

## ข้อจำกัด
- เป็นข้อมูลตัวอย่าง ไม่มีการเชื่อมต่อ API/ระบบชำระเงินจริง (กด "ชำระเงิน" แสดงข้อความตัวอย่างเท่านั้น)
- ปุ่ม Copy ต้องใช้บน HTTPS/localhost (ข้อจำกัดของ Clipboard API) มี fallback `execCommand` รองรับ

## การใช้ AI
ใช้ Claude ช่วยร่างโครงสร้าง component, เขียนโค้ด และตรวจสอบ (unit test, axe, Playwright) ผู้พัฒนาตรวจทานและปรับแก้เอง
