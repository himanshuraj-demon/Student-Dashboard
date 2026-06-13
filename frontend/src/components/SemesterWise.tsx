import { useState, useMemo, useEffect, useCallback } from "react";
import { branches } from "../../constants/courses";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";
import { Semsterdetails } from "../../constants/semesterplan";

import RemainingCourses from "./RemainingCourses";
import SemesterPanel, { type SemesterData } from "./SemesterPanel";


function semNameToNum(name: string): number {
  const m = name.match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SemesterWise() {
  const { user } = useAuth();
  const semesterItems: string[] = Semsterdetails;
  const selectedBranch = user?.details?.branch ||"Artificial Intelligence";

  const [selected, setSelected] = useState<string>(semesterItems[0]);
  const [search, setSearch] = useState<string>("");
  const [allCoursesQuery, setAllCoursesQuery] = useState<string>("");

  // ── Course-codes state (fetched once from GET /user/your-courses) ──────────
  const [yourCourses, setYourCourses] = useState<string[] | null>(null);
  const [isFetchingYourCourses, setIsFetchingYourCourses] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      if (yourCourses !== null || isFetchingYourCourses) return;
      try {
        setIsFetchingYourCourses(true);
        const res = await api.get("/user/your-courses");
        setYourCourses(res.data.codes ?? []);
      } catch (err) {
        console.error(err);
        setYourCourses([]);
      } finally {
        setIsFetchingYourCourses(false);
      }
    };
    fetchCourses();
  }, [yourCourses, isFetchingYourCourses]);

  const [semesterRecords, setSemesterRecords] = useState<
    Record<number, SemesterData>
  >({});

  /** Called by SemesterPanel after a successful save */
  const handleSemesterSaved = useCallback(
    (semNum: number, data: SemesterData) => {
      setSemesterRecords((prev) => ({ ...prev, [semNum]: data }));
    },
    [],
  );

  /** Called by SemesterPanel after a successful POST /user/course-codes
   *  so RemainingCourses stays in sync without a full re-fetch */
  const handleCoursesAdded = useCallback((newCodes: string[]) => {
    setYourCourses((prev) => {
      if (!prev) return newCodes;
      const merged = Array.from(new Set([...prev, ...newCodes]));
      return merged;
    });
  }, []);

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
    return branches[selectedBranch].disciplineCoreCourses.filter(
      (course) => !completedSet.has(course.code),
    );
  }, [yourCourses, selectedBranch]);



  // ── Which panel to show ────────────────────────────────────────────────────
  const isRemaining =
    selected === "Remaining Courses" ||
    selected === semesterItems[0];

  const activeSemNum = isRemaining ? null : semNameToNum(selected);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 min-h-screen bg-[rgba(59,130,246,0.06)] font-sans overflow-x-hidden overflow-y-scroll h-dvh">
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
        <ul className="flex flex-col gap-1 h-40 md:h-auto overflow-y-scroll md:overflow-hidden">
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
          allCoursesQuery={allCoursesQuery}
          setAllCoursesQuery={setAllCoursesQuery}
          yourCoursesFiltered={remainingCoreCourses}
          yourCourses={remainingCoreCourses}
          isFetchingYourCourses={isFetchingYourCourses}
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