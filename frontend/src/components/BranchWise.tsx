import { useState, useMemo, type JSX, useEffect } from "react";
import { branches, courseMasterList } from "../../constants/courses";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

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
  your: {
    bg: "bg-violet-50",
    dot: "bg-violet-500",
    badge: "bg-violet-100 text-violet-700",
  },
};

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

type CourseType = "core" | "elective" | "basket" | "your";

// ─── COURSE ROW ───────────────────────────────────────────────────────────────
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

function SelectableCourseRow({
  code,
  course,
  selected,
  onToggle,
  query,
}: {
  code: string;
  course: { title: string; credits: number };
  selected: boolean;
  onToggle: (code: string) => void;
  query: string;
}): JSX.Element {
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
      onClick={() => onToggle(code)}
      className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all border
        ${
          selected
            ? "bg-violet-50 border-violet-300"
            : "bg-gray-50 border-transparent hover:bg-gray-100"
        }`}>
      <div className="flex items-center gap-2.5 min-w-0">
        <span
          className={`inline-block w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-all
          ${selected ? "bg-violet-500 border-violet-500" : "border-gray-300 bg-white"}`}>
          {selected && (
            <svg
              className="w-2.5 h-2.5 text-white"
              fill="none"
              viewBox="0 0 12 12"
              stroke="currentColor"
              strokeWidth={2.5}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2 6l3 3 5-5"
              />
            </svg>
          )}
        </span>
        <span className="text-xs font-mono font-semibold text-gray-400 shrink-0">
          {code}
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

// ─── SIDEBAR TABS ─────────────────────────────────────────────────────────────
type SidebarView = "branches" | "all-courses";

interface ExpandedBasketsState {
  [basketName: string]: boolean;
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function BranchCourses() {
  const { user } = useAuth();
  const branchNames = Object.keys(branches) as string[];

  // Sidebar state
  const [sidebarView, setSidebarView] = useState<SidebarView>("branches");
  const [selected, setSelected] = useState<string>(
    user.details.branch || branchNames[0],
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

  // Your courses state (fetched from backend GET)
  const [yourCourses, setYourCourses] = useState<string[] | null>(null); // null = not yet loaded
  const [isFetchingYourCourses, setIsFetchingYourCourses] = useState(false);

  // Add Courses mode state
  const [isAddingCourses, setIsAddingCourses] = useState(false);
  const [pendingSelection, setPendingSelection] = useState<Set<string>>(
    new Set(),
  );
  const [isSaving, setIsSaving] = useState(false);

  // Fetch your courses on first load of "Your Courses" / All Courses view
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

  // All courses master list filtered
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

  // ── Add courses handlers ──
  const handleStartAdding = () => {
    setPendingSelection(new Set(yourCourses ?? []));
    setIsAddingCourses(true);
  };

  const handleCancelAdding = () => {
    setIsAddingCourses(false);
    setPendingSelection(new Set());
  };

  const handleToggleCourse = (code: string) => {
    setPendingSelection((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);

    try {
      const updatedCourses = Array.from(pendingSelection);
      await api.post("/user/your-courses", {
        codes: updatedCourses,
      });
      setYourCourses(updatedCourses);
      setIsAddingCourses(false);
      setPendingSelection(new Set());
    } catch (err) {
      console.error("Failed to save courses", err);
    } finally {
      setIsSaving(false);
    }
  };

  // ── Your courses derived data (for display) ──
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

  // ── All-Courses panel with Add / Edit mode ──
  const renderAllCoursesPanel = () => {
    if (isAddingCourses) {
      return (
        <main className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Header with Cancel / Save */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Add Courses</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                  Select courses you have completed.{" "}
                  <span className="font-semibold text-violet-600">
                    {pendingSelection.size} selected
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancelAdding}
                  className="px-4 py-2 text-sm font-semibold rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="px-4 py-2 text-sm font-semibold rounded-xl bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-60 transition-colors flex items-center gap-1.5">
                  {isSaving ? (
                    <>
                      <svg
                        className="w-3.5 h-3.5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Saving…
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>

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
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border text-black border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-300 placeholder:text-gray-400"
              placeholder="Search courses by name or code…"
              value={allCoursesQuery}
              onChange={(e) => setAllCoursesQuery(e.target.value)}
            />
            {allCoursesQuery && (
              <button
                onClick={() => setAllCoursesQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                ✕
              </button>
            )}
          </div>

          {/* Selectable course list */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-500 inline-block" />
                All Courses
              </h2>
              <span className="text-xs bg-violet-100 text-violet-700 font-bold px-2 py-0.5 rounded-full">
                {allCoursesFiltered.length} courses
              </span>
            </div>
            <ul className="flex flex-col gap-1.5 p-3 max-h-[60vh] overflow-y-auto">
              {allCoursesFiltered.length > 0 ? (
                allCoursesFiltered.map(([code, course]) => (
                  <SelectableCourseRow
                    key={code}
                    code={code}
                    course={course}
                    selected={pendingSelection.has(code)}
                    onToggle={handleToggleCourse}
                    query={allCoursesQuery}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center py-3">
                  No courses match your search
                </p>
              )}
            </ul>
          </section>
        </main>
      );
    }

    // Normal All Courses view
    return (
      <main className="flex-1 min-w-0 flex flex-col gap-4">
        {/* Header — no credit stats, just title + Add Courses button */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900">All Courses</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Complete course catalogue
              </p>
            </div>
            <button
              onClick={handleStartAdding}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Courses
            </button>
          </div>
        </div>

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
            className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border text-black border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-300 placeholder:text-gray-400"
            placeholder="Search courses by name or code…"
            value={allCoursesQuery}
            onChange={(e) => setAllCoursesQuery(e.target.value)}
          />
          {allCoursesQuery && (
            <button
              onClick={() => setAllCoursesQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              ✕
            </button>
          )}
        </div>

        {/* Your Courses section */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500 inline-block" />
              Your Courses
            </h2>
            {yourCourses !== null && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs bg-violet-100 text-violet-700 font-bold px-2 py-0.5 rounded-full">
                  {yourCoursesFiltered.length} courses
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-full">
                  {yourCoursesFiltered.reduce((sum, c) => sum + c.credits, 0)}{" "}
                  cr
                </span>
              </div>
            )}
          </div>
          <div className="p-3">
            {isFetchingYourCourses ? (
              <div className="flex items-center justify-center gap-2 py-6 text-sm text-gray-400">
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Loading your courses…
              </div>
            ) : yourCoursesFiltered.length > 0 ? (
              <ul className="flex flex-col gap-1.5">
                {yourCoursesFiltered.map((c) => (
                  <CourseRow
                    key={c.code}
                    course={c}
                    type="your"
                    query={allCoursesQuery}
                  />
                ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-gray-400">
                  {allCoursesQuery
                    ? "No completed courses match your search"
                    : 'No courses added yet. Click "Add Courses" to get started.'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* All Courses master list */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-400 inline-block" />
              Course Catalogue
            </h2>
            <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-full">
              {allCoursesFiltered.length} courses
            </span>
          </div>
          <ul className="flex flex-col gap-1.5 p-3 max-h-[60vh] overflow-y-auto">
            {allCoursesFiltered.length > 0 ? (
              allCoursesFiltered.map(([code, course]) => (
                <CourseRow
                  key={code}
                  course={{ code, ...course }}
                  type="basket"
                  query={allCoursesQuery}
                />
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center py-3">
                No courses match your search
              </p>
            )}
          </ul>
        </section>
      </main>
    );
  };

  // ── Branches panel (unchanged) ──
  const renderBranchesPanel = () => (
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
        const isOpen = expandedBaskets[basket.basketName] !== false;
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
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 min-h-screen bg-gray-50 font-sans">
      {/* ── Sidebar ── */}
      <aside className="w-full md:w-64 shrink-0 flex flex-col gap-3">
        {/* Tab switcher */}
        <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
          <button
            onClick={() => setSidebarView("branches")}
            className={`flex-1 py-2 text-xs font-semibold transition-colors
              ${sidebarView === "branches" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}>
            Branches
          </button>
          <button
            onClick={() => {
              setSidebarView("all-courses");
              setIsAddingCourses(false);
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
                const isUser = name === user.details.branch;
                return (
                  <li key={name}>
                    <button
                      onClick={() => setSelected(name)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center justify-between gap-2
                        ${isActive ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-100"}`}>
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
          /* All Courses sidebar info */
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {Object.keys(courseMasterList).length}
              </div>
              <div className="text-xs text-gray-500">Total Courses</div>
            </div>
            <div className="h-px bg-gray-100" />
            <div className="text-center">
              <div className="text-2xl font-bold text-violet-600">
                {isFetchingYourCourses ? "—" : (yourCourses?.length ?? 0)}
              </div>
              <div className="text-xs text-gray-500">Your Completed</div>
            </div>
            {!isAddingCourses && (
              <button
                onClick={handleStartAdding}
                className="mt-1 w-full flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Courses
              </button>
            )}
          </div>
        )}
      </aside>

      {/* ── Main Panel ── */}
      {sidebarView === "branches"
        ? renderBranchesPanel()
        : renderAllCoursesPanel()}
    </div>
  );
}
