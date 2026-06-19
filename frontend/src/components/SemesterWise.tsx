import { useState, useMemo, useCallback } from "react";
import { branches ,instituteRequirements} from "../../constants/courses";
import { useAuth } from "../hooks/useAuth";
import { Semsterdetails } from "../../constants/semesterplan";

import RemainingCourses from "./RemainingCourses";
import SemesterPanel, { type SemesterData } from "./SemesterPanel";
type BranchKey = keyof typeof branches;

function semNameToNum(name: string): number {
  const m = name.match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SemesterWise() {
  const { user,yourCourses,setYourCourses } = useAuth();
  const semesterItems: string[] = Semsterdetails;
  const selectedBranch = user?.details?.branch ||"Artificial Intelligence";

  const [selected, setSelected] = useState<string>(semesterItems[0]);
  const [search, setSearch] = useState<string>("");
  const [, setSemesterRecords] = useState<
    Record<number, SemesterData>
  >({});

  /** Called by SemesterPanel after a successful save */
  const handleSemesterSaved = useCallback(
    (semNum: number, data: SemesterData) => {
      setSemesterRecords((prev) => ({ ...prev, [semNum]: data }));
    },
    [],
  );

  const handleCoursesAdded = useCallback((newCodes: string[]) => {
    setYourCourses((prev) => {
      if (!prev) return newCodes;
      const merged = Array.from(new Set([...prev, ...newCodes]));
      return merged;
    });
  }, [setYourCourses]);

  // ── Derived lists ──────────────────────────────────────────────────────────

  const filteredSemesters = useMemo(
    () =>
      semesterItems.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, semesterItems],
  );

  const remainingCoreCourses = useMemo(() => {
    if (!yourCourses || !selectedBranch) return [];
    const completedSet = new Set(yourCourses);
    return branches[selectedBranch as BranchKey].disciplineCoreCourses.filter(
      (course) => !completedSet.has(course.code),
    );
  }, [yourCourses, selectedBranch]);

  const remainingMandatoryCourses = useMemo(() => {
  if (!yourCourses) return [];

  const completedSet = new Set(yourCourses);

  const mandatoryCourses = [
    ...instituteRequirements.hssBasket.mandatoryCourses,
    ...instituteRequirements.mathBasket.mandatoryCourses,
  ];

  return mandatoryCourses.filter(
    (course) => !completedSet.has(course.code),
  );
}, [yourCourses]);



  // ── Which panel to show ────────────────────────────────────────────────────
  const isRemaining =
    selected === "Remaining Courses" ||
    selected === semesterItems[0];

  const activeSemNum = isRemaining ? null : semNameToNum(selected);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 min-h-screen bg-[rgba(59,130,246,0.06)] font-sans overflow-x-hidden overflow-y-scroll h-fit md:h-dvh">
      {/* ── Sidebar ── */}
      <aside className="w-full md:w-64 shrink-0 flex flex-col gap-3">
        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border text-black border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400"
            placeholder="Search semesters…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Semester list */}
        <ul className="flex flex-col gap-1 h-60 md:h-auto overflow-y-scroll md:overflow-hidden">
          {filteredSemesters.map((name) => {
            const isActive = selected === name;
            return (
              <li key={name}>
                <button
                  onClick={() => setSelected(name)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center justify-between gap-2 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "branchpanelsearch bg-[#ffffff11] hover:bg-blue-300 border border-gray-300"
                  }`}>
                  <span className="truncate font-medium">{name}</span>
                </button>
              </li>
            );
          })}

          {filteredSemesters.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">
              No semesters found
            </p>
          )}
        </ul>
      </aside>

      {/* ── Main panel ── */}
      {isRemaining ? (
        <RemainingCourses
          remainingMandatoryCourses={remainingMandatoryCourses}
          yourCourses={remainingCoreCourses}
        />
      ) : (
        activeSemNum !== null && (
          <SemesterPanel
            key={activeSemNum}            
            semesterName={selected}
            semesterNum={activeSemNum}
            existingCodes={yourCourses ?? []}
            onSaved={handleSemesterSaved}
            onCoursesAdded={handleCoursesAdded}
          />
        )
      )}
    </div>
  );
}