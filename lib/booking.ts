/** Booking helpers shared by the form UI and server validation. */

/** 30-minute appointment slots from 08:00 to 17:30 (inclusive). */
export function getTimeSlots(): string[] {
  const slots: string[] = [];
  for (let m = 8 * 60; m <= 17 * 60 + 30; m += 30) {
    const h = String(Math.floor(m / 60)).padStart(2, "0");
    const min = String(m % 60).padStart(2, "0");
    slots.push(`${h}:${min}`);
  }
  return slots;
}

export const timeSlots = getTimeSlots();

/** Today's date as YYYY-MM-DD for the date input's min attribute. */
export function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}
