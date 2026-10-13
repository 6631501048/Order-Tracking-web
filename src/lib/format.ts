const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Bangkok",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/**
 * แสดงวันเวลาเป็น "21/08/2026 15:42 น." (เวลาไทย, ปี ค.ศ. ตามตัวอย่างในโจทย์)
 * ระบุ timeZone ตายตัว เพื่อให้ server กับ browser แสดงตรงกัน (ไม่เกิด hydration mismatch)
 */
export function formatThaiDateTime(iso: string): string {
  const parts = Object.fromEntries(
    formatter.formatToParts(new Date(iso)).map((p) => [p.type, p.value]),
  );
  return `${parts.day}/${parts.month}/${parts.year} ${parts.hour}:${parts.minute} น.`;
}
