export type PaymentMethodId = "promptpay" | "truemoney" | "card";

export type PaymentMethod = {
  id: PaymentMethodId;
  name: string;
  description: string;
  /** ค่าธรรมเนียม (บาท) */
  fee: number;
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "promptpay", name: "QR PromptPay", description: "สแกนจ่ายผ่านแอปธนาคาร", fee: 0 },
  { id: "truemoney", name: "TrueMoney Wallet", description: "จ่ายด้วยยอดเงินในวอลเล็ท", fee: 5 },
  { id: "card", name: "บัตรเครดิต / เดบิต", description: "Visa, Mastercard, JCB", fee: 10 },
];

export const PRODUCT = { name: "แพ็กเกจเติมเกม 650 เพชร", price: 299 };

/** โค้ดส่วนลดตัวอย่าง: amount = ลดเป็นบาท, percent = ลดเป็นเปอร์เซ็นต์ของราคาสินค้า */
const DISCOUNTS: Record<string, { amount?: number; percent?: number }> = {
  WELCOME50: { amount: 50 },
  SAVE10: { percent: 10 },
};

export function discountFor(code: string, price: number): number | null {
  const rule = DISCOUNTS[code.trim().toUpperCase()];
  if (!rule) return null;
  const value = rule.amount ?? Math.round((price * (rule.percent ?? 0)) / 100);
  return Math.min(value, price);
}

export function calcTotal(price: number, fee: number, discount: number): number {
  return Math.max(price - discount + fee, 0);
}

export const baht = (n: number) =>
  `฿${n.toLocaleString("th-TH", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
