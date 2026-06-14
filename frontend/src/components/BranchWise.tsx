import { useState, useMemo, useEffect } from "react";
import { branches, courseMasterList } from "../../constants/courses";
import { useAuth } from "../hooks/useAuth";


import type { Course, CourseBasket } from "../../constants/types";
import type { Branch } from "../../constants/types";
import BranchPanel from "./BranchPanel";
import AllCoursesPanel from "./AllCoursesPanel";



// ─── SIDEBAR TABS ─────────────────────────────────────────────────────────────
type SidebarView = "branches" | "all-courses";

interface ExpandedBasketsState {
  [basketName: string]: boolean;
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function BranchCourses() {
  const { user,yourCourses } = useAuth();
  const branchNames = Object.keys(branches) as string[];

  // Sidebar state
  const [sidebarView, setSidebarView] = useState<SidebarView>("branches");
  const [selected, setSelected] = useState<string>(
    user?.details?.branch || branchNames[0],
  );

  useEffect(() => {
    if (user?.details?.branch) setSelected(user.details.branch);
  }, [user]);

  const [search, setSearch] = useState<string>("");
  const [courseQuery, setCourseQuery] = useState<string>("");
  const [allCoursesQuery, setAllCoursesQuery] = useState<string>("");
  const [expandedBaskets, setExpandedBaskets] = useState<ExpandedBasketsState>(
    {},
  );

  const filteredBranches = useMemo(
    (): string[] =>
      branchNames.filter((b) => b.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  const branch = branches[selected] as Branch;

  const filteredCore = useMemo(
    (): Course[] =>
      branch.disciplineCoreCourses.filter(
        (c) =>
          !courseQuery ||
          c.title.toLowerCase().includes(courseQuery.toLowerCase()) ||
          c.code.toLowerCase().includes(courseQuery.toLowerCase()),
      ),
    [branch, courseQuery],
  );

  const filteredBaskets = useMemo(
    (): CourseBasket[] =>
      branch.disciplineElectiveBaskets
        .map(
          (basket): CourseBasket => ({
            ...basket,
            courses: basket.courses.filter(
              (c: Course): boolean =>
                !courseQuery ||
                c.title.toLowerCase().includes(courseQuery.toLowerCase()) ||
                c.code.toLowerCase().includes(courseQuery.toLowerCase()),
            ),
          }),
        )
        .filter((b: CourseBasket): boolean => b.courses.length > 0),
    [branch, courseQuery],
  );

  const allCoursesFiltered = useMemo(() => {
    const q = allCoursesQuery.toLowerCase();
    return Object.entries(courseMasterList).filter(
      ([code, course]) =>
        !q ||
        code.toLowerCase().includes(q) ||
        course.title.toLowerCase().includes(q),
    );
  }, [allCoursesQuery]);

  const toggleBasket = (name: string): void =>
    setExpandedBaskets((prev) => ({ ...prev, [name]: !prev[name] }));

  const openElectives = Object.entries(branch.openElectiveRequirements)
    .map(([k, v]) => `${k.replace(/_/g, " ")}: ${v} cr`)
    .join(" · ");


  const yourCoursesDetails = useMemo(() => {
    if (!yourCourses) return [];
    return yourCourses
      .filter((code) => courseMasterList[code])
      .map((code) => ({ code, ...courseMasterList[code] }));
  }, [yourCourses]);

  const yourCoursesFiltered = useMemo(() => {
    const q = allCoursesQuery.toLowerCase();
    return yourCoursesDetails.filter(
      (c) =>
        !q ||
        c.code.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q),
    );
  }, [yourCoursesDetails, allCoursesQuery]);



  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 min-h-screen bg-[rgba(59,130,246,0.06)] font-sans overflow-x-hidden overflow-y-scroll h-fit md:h-dvh">
      {/* ── Sidebar ── */}
      <aside className="w-full md:w-64 shrink-0 flex flex-col gap-3">
        {/* Tab switcher */}
        <div className="flex rounded-xl overflow-hidden border border-gray-300 bg-[rgba(59,130,246,0.06)] shadow-sm">
          <button
            onClick={() => setSidebarView("branches")}
            className={`flex-1 py-2 text-xs font-semibold transition-colors
              ${sidebarView === "branches" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
            Branches
          </button>
          <button
            onClick={() => {
              setSidebarView("all-courses");
            }}
            className={`flex-1 py-2 text-xs font-semibold transition-colors
              ${sidebarView === "all-courses" ? "bg-violet-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
            All Courses
          </button>
        </div>

        {sidebarView === "branches" ? (
          <>
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
                placeholder="Search branches…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <ul className="flex flex-col gap-1">
              {filteredBranches.map((name) => {
                const b = branches[name as keyof typeof branches];
                const isActive = selected === name;
                const isUser = name === user?.details?.branch;
                return (
                  <li key={name}>
                    <button
                      onClick={() => setSelected(name)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center justify-between gap-2
                        ${isActive ? "bg-blue-600 text-white shadow-md" : "branchpanelsearch bg-[#ffffff11] hover:bg-blue-300 border border-gray-300"}`}>
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`text-xs font-bold px-1.5 py-0.5 rounded ${isActive ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"}`}>
                          {b.branchCode}
                        </span>
                        <span className="truncate font-medium">
                          {b.branchName}
                        </span>
                      </div>
                      {isUser && (
                        <span
                          className={`text-xs shrink-0 font-semibold px-1.5 py-0.5 rounded-full ${isActive ? "bg-white text-blue-600" : "bg-blue-100 text-blue-600"}`}>
                          You
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
              {filteredBranches.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">
                  No branches found
                </p>
              )}
            </ul>
          </>
        ) : (
          /* All Courses sidebar info — constrained for mobile */
          <div className="branchpanelsearch bg-[#ffffff11] rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3 w-full overflow-hidden">
            <div className="text-center">
              <div className="text-2xl font-bold ">
                {Object.keys(courseMasterList).length}
              </div>
              <div className="text-xs text-gray-500">Total Courses</div>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600">
                {(yourCourses?.length ?? 0)}
              </div>
              <div className="text-xs text-gray-500">Your Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600">
                {yourCoursesFiltered.reduce((sum, c) => sum + c.credits, 0)} cr
              </div>
              <div className="text-xs text-gray-500">Credits Completed</div>
            </div>
          </div>
        )}
      </aside>

      {/* ── Main Panel ── */}
      {sidebarView === "branches"
        ? <BranchPanel
          branch={branch}
          courseQuery={courseQuery}
          setCourseQuery={setCourseQuery}
          filteredCore={filteredCore}
          filteredBaskets={filteredBaskets}
          expandedBaskets={expandedBaskets}
          toggleBasket={toggleBasket}
          openElectives={openElectives}
        />

        : <AllCoursesPanel
          allCoursesQuery={allCoursesQuery}
          setAllCoursesQuery={setAllCoursesQuery}
          allCoursesFiltered={allCoursesFiltered}
          yourCoursesFiltered={yourCoursesFiltered}
          yourCourses={yourCourses}
        />}
    </div>
  );
}