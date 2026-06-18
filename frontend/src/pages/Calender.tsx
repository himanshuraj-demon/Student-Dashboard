import { useState } from "react";
import Nav from "../services/Nav";
import {CALENDAR_DATA,MONTHS_MAP} from "../../constants/calender"

const CATEGORIES = {
  REGISTRATION: { label: "Registration", bg: "bg-blue-50 text-blue-700 border-blue-200/70", dot: "bg-blue-500" },
  CLASSES: { label: "Classes & Programs", bg: "bg-emerald-50 text-emerald-700 border-emerald-200/70", dot: "bg-emerald-500" },
  EXAMS: { label: "Examinations", bg: "bg-rose-50 text-rose-700 border-rose-200/70", dot: "bg-rose-500" },
  RECESS: { label: "Recess & Vacation", bg: "bg-amber-50 text-amber-700 border-amber-200/70", dot: "bg-amber-500" },
  DEADLINE: { label: "Deadlines & Ceremonies", bg: "bg-purple-50 text-purple-700 border-purple-200/70", dot: "bg-purple-500" },
};

export default function AcademicCalendar() {
  const [currentFilter, setCurrentFilter] = useState<string>("ALL");
  const [activeTab, setActiveTab] = useState<"Semester I" | "Semester II" | "Summer Term">("Semester I");
  const [currentMonthIdx, setCurrentMonthIdx] = useState<number>(1); // Defaults to August 2025
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null); // Interactive day click filtering

  const activeMonthConfig = MONTHS_MAP[currentMonthIdx];
  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOffset = (month: number, year: number) => new Date(year, month, 1).getDay();

  const totalDays = getDaysInMonth(activeMonthConfig.m, activeMonthConfig.y);
  const startOffset = getFirstDayOffset(activeMonthConfig.m, activeMonthConfig.y);
  
  const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
  const emptyBoxesBefore = Array.from({ length: startOffset }, (_, i) => i);

  // Parse formatting for Agenda block dates
  const formatDateRange = (startStr: string, endStr: string) => {
    if (startStr === endStr) {
      return new Date(startStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
    const s = new Date(startStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const e = new Date(endStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    return `${s} – ${e}`;
  };

  // Agenda List Filtering Engine
  const agendaEvents = CALENDAR_DATA.filter(event => {
    const matchesSemester = event.semester === activeTab;
    const matchesCategory = currentFilter === "ALL" || event.category === currentFilter;
    
    if (selectedDateStr) {
      // If a day cell is clicked, show items active on that exact day
      const matchesClickedDate = selectedDateStr >= event.startDate && selectedDateStr <= event.endDate;
      return matchesSemester && matchesCategory && matchesClickedDate;
    }
    
    return matchesSemester && matchesCategory;
  });

  return (
    <div className="main">
        <Nav/>
    <div className="h-dvh overflow-y-scroll bg-[#ffffff11] p-4 md:p-8  antialiased selection:bg-indigo-100">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight  sm:text-3xl">
              Academic Calendar Hub
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Click any calendar box day to filter the timeline feed to focus on specific dates.
            </p>
          </div>

          {/* Quick Tab Segment Control */}
          <div className="inline-flex rounded-xl bg-slate-200/80 p-1 shadow-inner self-start">
            {(["Semester I", "Semester II", "Summer Term"] as const).map((sem) => (
              <button
                key={sem}
                onClick={() => {
                  setActiveTab(sem);
                  setSelectedDateStr(null); // Clear micro-filter on tab change
                  if (sem === "Semester II" && currentMonthIdx < 5) setCurrentMonthIdx(6);
                  if (sem === "Semester I" && currentMonthIdx > 5) setCurrentMonthIdx(1);
                }}
                className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === sem ? "bg-white text-slate-950 shadow-xs" : "text-slate-600 hover:text-slate-900 hover:bg-gray-300"
                }`}
              >
                {sem}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Filtering Line */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setCurrentFilter("ALL"); setSelectedDateStr(null); }}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                currentFilter === "ALL" && !selectedDateStr ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              Reset Filters
            </button>
            {Object.entries(CATEGORIES).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setCurrentFilter(key)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-medium transition-colors bg-white hover:bg-slate-50 ${
                  currentFilter === key ? "ring-2 ring-slate-900/10 border-slate-400" : "border-slate-200"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${value.dot}`} />
                <span className="text-slate-700">{value.label}</span>
              </button>
            ))}
          </div>

          {/* Active Date Indicator Label */}
          {selectedDateStr && (
            <div className="inline-flex items-center gap-2 rounded-lg bg-indigo-50 border border-indigo-100 px-3 py-1 text-xs text-indigo-800">
              <span>Focusing Date: <strong>{new Date(selectedDateStr).toLocaleDateString("en-US", {month:'short', day:'numeric'})}</strong></span>
              <button onClick={() => setSelectedDateStr(null)} className="font-bold hover:text-indigo-950 ml-1">✕</button>
            </div>
          )}
        </div>

        {/* MASTER VIEWPORT GRID: Calendar Left (7 Columns) + Agenda Right (5 Columns) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: Complete Visual Grid Layout */}
          <div className="xl:col-span-8 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5 bg-slate-50/40">
              <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                {activeMonthConfig.name}
              </h2>
              <div className="flex items-center gap-1">
                <button
                  disabled={currentMonthIdx === 0}
                  onClick={() => setCurrentMonthIdx(prev => prev - 1)}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  disabled={currentMonthIdx === MONTHS_MAP.length - 1}
                  onClick={() => setCurrentMonthIdx(prev => prev + 1)}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200 text-center text-[11px] font-bold tracking-wider text-slate-400 py-2 uppercase">
              <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>

            <div className="grid grid-cols-7 bg-slate-200/50 gap-[1px]">
              {emptyBoxesBefore.map((val) => (
                <div key={`empty-${val}`} className="min-h-[110px] bg-slate-50/40" />
              ))}
              
              {daysArray.map((day) => {
                const dateStr = `${activeMonthConfig.y}-${String(activeMonthConfig.m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isSelected = selectedDateStr === dateStr;

                const dayEvents = CALENDAR_DATA.filter(e => {
                  const matchesRange = dateStr >= e.startDate && dateStr <= e.endDate;
                  const matchesFilter = currentFilter === "ALL" || e.category === currentFilter;
                  return matchesRange && matchesFilter;
                });

                return (
                  <div 
                    key={`day-${day}`} 
                    onClick={() => setSelectedDateStr(dateStr)}
                    className={`min-h-[115px] bg-white p-1.5 flex flex-col justify-between hover:bg-slate-50 transition-all cursor-pointer relative group ${
                      isSelected ? "ring-2 ring-indigo-600 ring-inset bg-indigo-50/20" : ""
                    }`}
                  >
                    <span className={`font-bold text-xs ${isSelected ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-900"}`}>
                      {day}
                    </span>

                    <div className="flex-1 space-y-1 mt-1 overflow-hidden">
                      {dayEvents.map((ev) => (
                        <div
                          key={ev.id}
                          className={`px-1 py-0.5 rounded-[4px] text-[9px] font-semibold tracking-tight border truncate leading-tight ${CATEGORIES[ev.category].bg}`}
                        >
                          {ev.subject}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Detailed Dashboard Agenda Panel */}
          <div className="xl:col-span-4 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col sticky top-6">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">Agenda Timeline Feed</h3>
                {selectedDateStr && (
                  <button 
                    onClick={() => setSelectedDateStr(null)} 
                    className="text-[11px] font-medium text-indigo-600 hover:text-indigo-900"
                  >
                    Show Full Term
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {selectedDateStr ? "Showing specific events for your selected cell date row." : `Showing current schedule for ${activeTab}`}
              </p>
            </div>

            <div className="divide-y divide-slate-100 max-h-[660px] overflow-y-auto">
              {agendaEvents.length === 0 ? (
                <div className="p-12 text-center text-slate-400 text-xs">
                  No active events mapped to this filter slice context.
                </div>
              ) : (
                agendaEvents.map((item) => {
                  const design = CATEGORIES[item.category];
                  return (
                    <div key={item.id} className="p-4 hover:bg-slate-50/40 transition-colors flex items-start gap-3">
                      <span className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${design.dot}`} />
                      <div className="space-y-0.5 flex-1">
                        <h4 className="text-xs font-semibold text-slate-900 leading-snug">
                          {item.subject}
                        </h4>
                        <p className="text-[11px] font-medium text-slate-600">
                          {formatDateRange(item.startDate, item.endDate)}
                        </p>
                        {item.audience && (
                          <span className="inline-block bg-slate-100 text-slate-600 text-[9px] font-bold px-1.5 py-0.5 rounded mt-1">
                            {item.audience}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
}