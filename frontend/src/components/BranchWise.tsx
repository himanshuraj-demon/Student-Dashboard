import { useState, useMemo, type JSX, useEffect } from "react";
import { branches } from "../../constants/courses";
import { useAuth } from "../hooks/useAuth";

const CATEGORY_COLORS = {
  core: {
    bg: "bg-blue-50",
    dot: "bg-blue-500",
    badge: "bg-blue-100 text-blue-700",
  },
  elective: {
    bg: "bg-amber-50",
    dot: "bg-amber-500",
    badge: "bg-amber-100 text-amber-700",
  },
  basket: {
    bg: "bg-emerald-50",
    dot: "bg-emerald-500",
    badge: "bg-emerald-100 text-emerald-700",
  },
};

// ─── COURSE ROW ───────────────────────────────────────────────────────────────

interface Course {
  code: string;
  title: string;
  credits: number;
}

interface CourseBasket {
  basketName: string;
  minimumCredits: number;
  courses: Course[];
}

interface Branch {
  branchCode: string;
  branchName: string;
  totalCredits: number;
  coreCredits: number;
  electiveCredits: number;
  mandatoryScienceBasketRequirements: string;
  mandatoryMathBasketRequirements: string;
  openElectiveRequirements: Record<string, number>;
  projectRequirements: string;
  disciplineCoreCourses: Course[];
  disciplineElectiveBaskets: CourseBasket[];
}

type CourseType = "core" | "elective" | "basket";

function CourseRow({
  course,
  type,
  query,
}: {
  course: Course;
  type: CourseType;
  query: string;
}): JSX.Element {
  const c = CATEGORY_COLORS[type] || CATEGORY_COLORS.core;
  const highlight = (text: string): string | JSX.Element => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-yellow-200 text-yellow-900 rounded px-0.5">
          {text.slice(idx, idx + query.length)}
        </mark>
        {text.slice(idx + query.length)}
      </>
    );
  };

  return (
    <li
      className={`flex items-center justify-between px-3 py-2.5 rounded-lg ${c.bg} transition-all`}>
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 ${c.dot}`}
        />
        <span className="text-xs font-mono font-semibold text-gray-400 shrink-0">
          {course.code}
        </span>
        <span className="text-sm font-medium text-gray-700 truncate">
          {highlight(course.title)}
        </span>
      </div>
      <span className="text-xs font-bold text-gray-500 shrink-0 ml-2">
        {course.credits} cr
      </span>
    </li>
  );
}

interface ExpandedBasketsState {
  [basketName: string]: boolean;
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function BranchCourses() {
  // Simulate useAuth — replace with your actual hook
  const { user } = useAuth();
  const branchNames = Object.keys(branches) as string[];
  const [selected, setSelected] = useState<string>(
    user.details.branch || branchNames[0],
  );
  useEffect(() => {
    if (user?.details?.branch) {
      setSelected(user.details.branch);
    }
  }, [user]);
  const [search, setSearch] = useState<string>("");
  const [courseQuery, setCourseQuery] = useState<string>("");
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

  const toggleBasket = (name: string): void =>
    setExpandedBaskets((prev) => ({ ...prev, [name]: !prev[name] }));

  const openElectives = Object.entries(branch.openElectiveRequirements)
    .map(([k, v]) => `${k.replace(/_/g, " ")}: ${v} cr`)
    .join(" · ");

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 min-h-screen bg-gray-50 font-sans">
      {/* ── Sidebar ── */}
      <aside className="w-full md:w-64 shrink-0 flex flex-col gap-3">
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
            const isUser = name === user.details.branch;
            return (
              <li key={name}>
                <button
                  onClick={() => setSelected(name)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center justify-between gap-2
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-100"
                    }`}>
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`text-xs font-bold px-1.5 py-0.5 rounded ${isActive ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"}`}>
                      {b.branchCode}
                    </span>
                    <span className="truncate font-medium">{b.branchName}</span>
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
      </aside>

      {/* ── Main Panel ── */}
      <main className="flex-1 min-w-0 flex flex-col gap-4">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {branch.branchName}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Branch Code:{" "}
                <span className="font-semibold text-gray-700">
                  {branch.branchCode}
                </span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Total", value: branch.totalCredits },
                { label: "Core", value: branch.coreCredits },
                { label: "Elective", value: branch.electiveCredits },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="text-center bg-gray-50 rounded-xl px-4 py-2 border border-gray-100">
                  <div className="text-lg font-bold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-500">{label} cr</div>
                </div>
              ))}
            </div>
          </div>

          {/* Info pills */}
          <div className="mt-4 flex flex-col gap-1.5 text-xs text-gray-600">
            <div className="flex gap-1.5 items-start">
              <span className="shrink-0 font-semibold text-gray-400 uppercase tracking-wide w-16">
                Science
              </span>
              <span>{branch.mandatoryScienceBasketRequirements}</span>
            </div>
            <div className="flex gap-1.5 items-start">
              <span className="shrink-0 font-semibold text-gray-400 uppercase tracking-wide w-16">
                Math
              </span>
              <span>{branch.mandatoryMathBasketRequirements}</span>
            </div>
            <div className="flex gap-1.5 items-start">
              <span className="shrink-0 font-semibold text-gray-400 uppercase tracking-wide w-16">
                Open El.
              </span>
              <span>{openElectives}</span>
            </div>
            <div className="flex gap-1.5 items-start">
              <span className="shrink-0 font-semibold text-gray-400 uppercase tracking-wide w-16">
                Project
              </span>
              <span>{branch.projectRequirements}</span>
            </div>
          </div>
        </div>

        {/* Course search */}
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
            className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border text-black border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder:text-gray-400"
            placeholder="Filter courses by name or code…"
            value={courseQuery}
            onChange={(e) => setCourseQuery(e.target.value)}
          />
          {courseQuery && (
            <button
              onClick={() => setCourseQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              ✕
            </button>
          )}
        </div>

        {/* Core Courses */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              Mandatory Core Courses
            </h2>
            <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
              {filteredCore.length} courses
            </span>
          </div>
          <ul className="flex flex-col gap-1.5 p-3">
            {filteredCore.length > 0 ? (
              filteredCore.map((c) => (
                <CourseRow
                  key={c.code}
                  course={c}
                  type="core"
                  query={courseQuery}
                />
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center py-3">
                No matching courses
              </p>
            )}
          </ul>
        </section>

        {/* Elective Baskets */}
        {filteredBaskets.map((basket) => {
          const isOpen = expandedBaskets[basket.basketName] !== false; // default open
          return (
            <section
              key={basket.basketName}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => toggleBasket(basket.basketName)}
                className="w-full flex items-center justify-between px-5 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <h2 className="font-semibold text-gray-800 flex items-center gap-2 text-left">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shrink-0" />
                  {basket.basketName}
                  <span className="text-xs font-normal text-gray-400">
                    · min {basket.minimumCredits} cr
                  </span>
                </h2>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">
                    {basket.courses.length} courses
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {isOpen && (
                <ul className="flex flex-col gap-1.5 p-3">
                  {basket.courses.map((c) => (
                    <CourseRow
                      key={c.code}
                      course={c}
                      type="elective"
                      query={courseQuery}
                    />
                  ))}
                </ul>
              )}
            </section>
          );
        })}

        {filteredBaskets.length === 0 && courseQuery && (
          <p className="text-sm text-gray-400 text-center py-6">
            No elective courses match your search
          </p>
        )}
      </main>
    </div>
  );
}
