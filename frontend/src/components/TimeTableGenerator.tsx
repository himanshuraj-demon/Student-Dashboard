import React, { useMemo } from "react";
import {type SlotRow,type CourseEntry,type EventColor,type ResolvedEvent,type EventCardProps} from "../../constants/timetabletypes"

const SLOT_ROWS: SlotRow[] = [
  { Slot: "8:30 - 9:50", M: "A1", T: "B1", W: "A2", Th: "C2", F: "B2" },
  { Slot: "10:00 - 11:20", M: "C1", T: "D1", W: "E1", Th: "D2", F: "E2" },
  { Slot: "11:30 - 12:50", M: "F1", T: "G1", W: "H2", Th: "F2", F: "G2" },
  { Slot: "13:00 - 14:00", M: "T1", T: "T2", W: "T3", Th: "O1", F: "O2" },
  { Slot: "14:00 - 15:20", M: "I1", T: "J1", W: "I2", Th: "K2", F: "J2" },
  { Slot: "15:30 - 16:50", M: "K1", T: "L1", W: "M1", Th: "L2", F: "M2" },
  { Slot: "17:00 - 18:20", M: "H1", T: "N1", W: "P1", Th: "N2", F: "P2" },
];


const DAY_KEYS: (keyof Omit<SlotRow, "Slot">)[] = ["M", "T", "W", "Th", "F"];
const DAY_LABELS: Record<string, string> = {
  M: "Mon",
  T: "Tue",
  W: "Wed",
  Th: "Thu",
  F: "Fri",
};
const COLOR_CYCLE: EventColor[] = [
  "blue",
  "purple",
  "green",
  "pink",
  "amber",
  "blue",
  "purple",
  "green",
  "pink",
  "amber",
];
const COLOR_STYLES: Record<
  EventColor,
  { card: string; time: string; title: string }
> = {
  blue: {
    card: "bg-blue-50 border border-dashed border-blue-200",
    time: "text-blue-500",
    title: "text-blue-900",
  },
  purple: {
    card: "bg-violet-50 border border-dashed border-violet-200",
    time: "text-violet-500",
    title: "text-violet-900",
  },
  green: {
    card: "bg-emerald-50 border border-dashed border-emerald-200",
    time: "text-emerald-500",
    title: "text-emerald-900",
  },
  pink: {
    card: "bg-pink-50 border border-dashed border-pink-200",
    time: "text-pink-500",
    title: "text-pink-900",
  },
  amber: {
    card: "bg-amber-50 border border-dashed border-amber-200",
    time: "text-amber-500",
    title: "text-amber-900",
  },
};

function parseTime(t: string): number {
  const [h, m] = t.trim().split(":").map(Number);
  return h + (m || 0) / 60;
}
function parseSlot(slot: string): { start: number; end: number } {
  const [s, e] = slot.split("-");
  return { start: parseTime(s), end: parseTime(e) };
}

function formatDecimalHour(h: number): string {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  const ap = hh >= 12 ? "PM" : "AM";
  const d = hh > 12 ? hh - 12 : hh === 0 ? 12 : hh;
  return mm === 0 ? `${d} ${ap}` : `${d}:${String(mm).padStart(2, "0")} ${ap}`;
}
function extractRoom(raw: string): string {
  const cleaned = raw.replace(/\n/g, " ").trim();
  const match = cleaned.match(/\(([^)]+)\)/);
  return match ? match[1].split(",")[0].trim() : "";
}
function buildSlotMap(courses: CourseEntry[]): Map<string, ResolvedEvent> {
  const map = new Map<string, ResolvedEvent>();
  let colorIdx = 0;

  courses.forEach((c) => {
    if (!c["Course Name"]) return;
    const color = COLOR_CYCLE[colorIdx % COLOR_CYCLE.length];
    colorIdx++;

    const process = (raw: string, type: "Lecture" | "Lab") => {
      const codesPart = raw.split(/\n|\(/)[0];
      const codes = codesPart
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const room = extractRoom(raw);

      codes.forEach((code) => {
        if (!map.has(code)) {
          map.set(code, {
            courseCode: c["Course Code"],
            courseName: c["Course Name"]!,
            slotCode: code,
            type,
            room,
            color,
          });
        }
      });
    };

    if (c.Lecture) process(c.Lecture, "Lecture");
    if (c.Lab) process(c.Lab, "Lab");
  });

  return map;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  slotTime,
  topPx,
  heightPx,
}) => {
  const { card, time, title } = COLOR_STYLES[event.color];
  const { start, end } = parseSlot(slotTime);

  return (
    <div
      className={`absolute left-1 right-1 rounded-lg px-2 py-2 overflow-hidden cursor-pointer hover:brightness-95 transition-all ${card} m-1`}
      style={{ top: topPx, height: heightPx }}>
      <p className={`text-[9px] font-semibold mb-0.5 ${time}`}>
        {formatDecimalHour(start)} – {formatDecimalHour(end)}
      </p>
      <p className={`text-sm font-semibold leading-snug ${title}`}>
        {event.courseName}
      </p>
      <p className={`text-[10px] mt-0.5 text-black`}>
        {event.courseCode}
        {event.room ? ` · ${event.room}` : ""}
        {" · "}
        <span className="italic">{event.type}</span>
      </p>
    </div>
  );
};

type TimeTableProp={
    courses:CourseEntry[]
}

const TimeTableGenerator: React.FC<TimeTableProp> = ({courses}) => {
  const slotMap = useMemo(() => buildSlotMap(courses), [courses]);

  const firstStart = parseSlot(SLOT_ROWS[0].Slot).start;
  const lastEnd = parseSlot(SLOT_ROWS[SLOT_ROWS.length - 1].Slot).end;
  const PX_PER_HOUR = 80;
  const totalHeight = (lastEnd - firstStart) * PX_PER_HOUR;

  const topFor = (slot: string) =>
    (parseSlot(slot).start - firstStart) * PX_PER_HOUR;
  const heightFor = (slot: string) =>
    (parseSlot(slot).end - parseSlot(slot).start) * PX_PER_HOUR - 4;

  return (
    <div className="universal p-2 md:p-2 w-dvw md:w-auto rounded-2xl m-2">
      <div className="timetable border border-gray-400 rounded-2xl overflow-hidden">
        <div className="flex overflow-x-auto">
          <div className="shrink-0 w-16 border-r border-gray-200 timetable">
            <div className="h-11 border-b border-gray-200 " />
            <div className="relative " style={{ height: totalHeight }}>
              {SLOT_ROWS.map((row) => (
                <div
                  key={row.Slot}
                  className="absolute right-2 flex items-center"
                  style={{ top: topFor(row.Slot) - 8 }}>
                  <span className="text-[11px] timetable font-medium whitespace-nowrap m-2 mt-5">
                    {row.Slot.split("-")[0].trim()}
                  </span>
                </div>
              ))}
              {SLOT_ROWS.map((row) => (
                <div
                  key={row.Slot}
                  className="absolute left-0 right-0 border-b border-gray-100"
                  style={{ top: topFor(row.Slot) }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-1 min-w-120">
            {DAY_KEYS.map((dayKey) => (
              <div
                key={dayKey}
                className="flex-1 border-r border-gray-200 last:border-r-0">
                <div className="h-11 flex flex-col items-center justify-center border-b border-gray-200">
                  <span className="text-base font-semibold timetable uppercase tracking-widest">
                    {DAY_LABELS[dayKey]}
                  </span>
                </div>
                <div
                  className="relative timetable"
                  style={{ height: totalHeight+10 }}>
                  {SLOT_ROWS.map((row) => (
                    <div
                      key={row.Slot}
                      style={{ top: topFor(row.Slot) }}
                      className="absolute left-0 right-0 border-b border-gray-100"
                    />
                  ))}

                  {SLOT_ROWS.map((row) => {
                    const slotCode = row[dayKey];
                    const event = slotMap.get(slotCode);
                    if (!event) return null;

                    return (
                      <EventCard
                        key={row.Slot}
                        event={event}
                        slotTime={row.Slot}
                        topPx={topFor(row.Slot)}
                        heightPx={heightFor(row.Slot)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTableGenerator;
