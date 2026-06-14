import React, { useMemo, useState, useRef, useCallback } from "react";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import {
  type SlotRow,
  type CourseEntry,
  type EventColor,
  type ResolvedEvent,
  type EventCardProps,
} from "../../constants/timetabletypes";

const SLOT_ROWS: SlotRow[] = [
  { Slot: "8:30 - 9:50", M: "A1", T: "B1", W: "A2", Th: "C2", F: "B2" },
  { Slot: "10:00 - 11:20", M: "C1", T: "D1", W: "E1", Th: "D2", F: "E2" },
  { Slot: "11:30 - 12:50", M: "F1", T: "G1", W: "H2", Th: "F2", F: "G2" },
  { Slot: "13:00 - 14:00", M: "T1", T: "T2", W: "T3", Th: "O1", F: "O2" },
  { Slot: "14:00 - 15:20", M: "I1", T: "J1", W: "I2", Th: "K2", F: "J2" },
  { Slot: "15:30 - 16:50", M: "K1", T: "L1", W: "M1", Th: "L2", F: "M2" },
  { Slot: "17:00 - 18:20", M: "H1", T: "N1", W: "P1", Th: "N2", F: "P2" },
];
import { SlSizeFullscreen } from "react-icons/sl";
import { FaPlus, FaDownload } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

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
  red: {
    card: "bg-red-500 border border-dashed border-amber-200",
    time: "text-black",
    title: "text-black",
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

function buildSlotMap(courses: CourseEntry[]) {
  const slotMap = new Map<string, ResolvedEvent[]>();

  let colorIdx = 0;

  courses.forEach((course) => {
    if (!course["Course Name"]) return;

    const color = COLOR_CYCLE[colorIdx % COLOR_CYCLE.length];
    colorIdx++;

    const process = (raw: string, type: "Lecture" | "Lab" | "Tutorial") => {
      const room = extractRoom(raw);

      const codes = raw
        .split(/\n|\(/)[0]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      codes.forEach((code) => {
        const event: ResolvedEvent = {
          courseCode: course["Course Code"],
          courseName: course["Course Name"]!,
          slotCode: code,
          type,
          room,
          color,
        };

        if (!slotMap.has(code)) {
          slotMap.set(code, []);
        }

        slotMap.get(code)!.push(event);
      });
    };

    if (course.Lecture) process(course.Lecture, "Lecture");
    if (course.Lab) process(course.Lab, "Lab");
    if (course.Tutorial) process(course.Tutorial, "Tutorial");
  });

  return slotMap;
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
      className={`absolute left-1 right-1 rounded-lg px-2 py-2 overflow-hidden overflow-y-clip cursor-pointer hover:brightness-95 transition-all ${card} m-1`}
      style={{ top: topPx, height: heightPx }}>
      <p className={`md:text-[9px] text-[8px] font-semibold mb-0.5 ${time}`}>
        {formatDecimalHour(start)} – {formatDecimalHour(end)}
      </p>
      <p
        className={`md:text-sm text-[10px] font-semibold leading-snug ${title}`}>
        {event.courseName}
      </p>
      <p className={`md:text-[10px] text-[7px] mt-0.5 text-black`}>
        {event.courseCode}
        {event.room ? ` · ${event.room}` : ""}
        {" · "}
        <span className="italic">{event.type}</span>
      </p>
    </div>
  );
};

type TimeTableProp = {
  courses: CourseEntry[];
  setAdding: React.Dispatch<React.SetStateAction<boolean>>;
};

const TimeTableGenerator: React.FC<TimeTableProp> = ({
  courses,
  setAdding,
}) => {
  const slotMap = useMemo(() => buildSlotMap(courses), [courses]);
  const conflicts = [...slotMap.entries()].filter(
    ([_, events]) => events.length > 1,
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const handleFullscreen = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  const handleCloseFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  const downloadPNG = async () => {
    const node = document.getElementById("timetable");
    node.classList.add("export-mode");

    if (!node) return;

    try {
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 4,
        width: node.scrollWidth,
        height: node.scrollHeight,
      });

      const link = document.createElement("a");
      link.download = "timetable.png";
      link.href = dataUrl;
      link.click();
      node.classList.remove("export-mode");
    } catch (error) {
      console.error(error);
    }
  };

  const downloadPDF = async () => {
  const node = document.getElementById("timetable");
  node.classList.add("export-mode");

  if (!node) return;

  try {
    const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
        width: node.scrollWidth,
        height: node.scrollHeight,
      });

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const img = new Image();

    img.onload = () => {
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (img.height * imgWidth) / img.width;

      const y = Math.max(0, (pageHeight - imgHeight) / 2);

      pdf.addImage(dataUrl, "PNG", 0, y, imgWidth, imgHeight);
      pdf.save("timetable.pdf");
    };

    img.src = dataUrl;
    node.classList.remove("export-mode");
  } catch (error) {
    console.error(error);
  }
};

  const handleDownloadPDF = useCallback(() => {
    const printContents = printRef.current?.innerHTML;
    if (!printContents) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Timetable</title>
          <style>
            * { margin: 0; padding: 2; box-sizing: border-box; }
            body { font-family: sans-serif; background: white; }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          <div>${printContents}</div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() { window.close(); };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }, []);

  const firstStart = parseSlot(SLOT_ROWS[0].Slot).start;
  const lastEnd = parseSlot(SLOT_ROWS[SLOT_ROWS.length - 1].Slot).end;
  const PX_PER_HOUR = 70;
  const totalHeight = (lastEnd - firstStart) * PX_PER_HOUR;

  const topFor = (slot: string) =>
    (parseSlot(slot).start - firstStart) * PX_PER_HOUR;
  const heightFor = (slot: string) =>
    (parseSlot(slot).end - parseSlot(slot).start) * PX_PER_HOUR - 4;

  return (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-50 bg-black flex flex-col"
          : "universal p-2 md:p-2 w-dvw md:w-auto rounded-2xl bg-black"
      }>
      {!isFullscreen && (
        <div className="flex justify-between px-2 pt-1 pb-0">
          <button
            className="bg-blue-600 text-white rounded-2xl p-2 flex justify-center gap-2 mb-2 items-center"
            onClick={() => setAdding(true)}>
            <FaPlus /> Add Courses
          </button>
          <button
            onClick={handleFullscreen}
            title="Fullscreen"
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-all border border-white/20">
            <SlSizeFullscreen size={12} />
            Fullscreen
          </button>
        </div>
      )}
      {isFullscreen && (
        <div className="flex justify-end px-4 pt-3 pb-2 shrink-0">
          <button
            onClick={handleCloseFullscreen}
            title="Exit Fullscreen"
            className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-all border border-white/20">
            <IoClose size={20} />
            Close
          </button>
        </div>
      )}
      {courses.length == 0 && (
        <div className="mx-2 mb-2 flex items-start gap-3 bg-red-100 border border-red-300 text-red-900 rounded-xl px-4 py-3">
          <span className="text-red-500 mt-0.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold mb-0.5">
              No Courses Selected Please Select !!
            </p>
          </div>
        </div>
      )}
      {conflicts.length > 0 && (
        <div className="mx-2 mb-2 flex items-start gap-3 bg-red-100 border border-red-300 text-red-900 rounded-xl px-4 py-3">
          <span className="text-red-500 mt-0.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold mb-0.5">
              Slot Conflicts Detected (Color Red)
            </p>
            <p className="text-xs leading-relaxed">
              {conflicts.map(([slot, events], i) => (
                <span key={slot}>
                  {i > 0 && <span className="mx-1 opacity-40">·</span>}
                  <strong>{slot}</strong>
                  {": "}
                  {events.map((e) => `${e.courseCode} (${e.type})`).join(" ↔ ")}
                </span>
              ))}
            </p>
          </div>
        </div>
      )}

      <div
        ref={printRef}
        className={isFullscreen ? "flex-1 overflow-auto w-auto" : ""}
        id="timetable">
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
                    style={{ height: totalHeight + 10 }}>
                    {SLOT_ROWS.map((row) => (
                      <div
                        key={row.Slot}
                        style={{ top: topFor(row.Slot) }}
                        className="absolute left-0 right-0 border-b border-gray-100"
                      />
                    ))}
                    {SLOT_ROWS.map((row) => {
                      const slotCode = row[dayKey];
                      const events = slotMap.get(slotCode);
                      if (!events?.length) return null;
                      if (events.length > 1) events[0].color = "red";
                      const event = events[0];
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
      {isFullscreen && (
        <div className="flex justify-around px-4 py-3 shrink-0">
          <button
            onClick={handleDownloadPDF}
            title="Download as PDF"
            className="flex items-center gap-2 bg-white text-black text-sm font-semibold px-6 py-2.5 rounded-xl transition-all hover:bg-gray-100 shadow-lg">
            <FaDownload size={20} />
            Print PDF
          </button>
          <button
            onClick={downloadPNG}
            title="Download as PDF"
            className="flex items-center gap-2 bg-white text-black text-sm font-semibold px-6 py-2.5 rounded-xl transition-all hover:bg-gray-100 shadow-lg">
            <FaDownload size={20} />
            Download as PNG
          </button>
          <button
            onClick={downloadPDF}
            title="Download as PDF"
            className="flex items-center gap-2 bg-white text-black text-sm font-semibold px-6 py-2.5 rounded-xl transition-all hover:bg-gray-100 shadow-lg">
            <FaDownload size={20} />
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default TimeTableGenerator;
