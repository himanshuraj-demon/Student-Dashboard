import { type JSX } from "react";
import type { Course, CourseType } from "../../constants/types";

const CATEGORY_COLORS = {
  core: {
    bg: "bg-blue-50",
    dot: "bg-blue-500",
  },
  elective: {
    bg: "bg-amber-50",
    dot: "bg-amber-500",
  },
  basket: {
    bg: "bg-emerald-50",
    dot: "bg-emerald-500",
  },
  your: {
    bg: "bg-violet-50",
    dot: "bg-violet-500",
  },
};

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
      className={`flex items-center justify-between px-3 py-2.5 rounded-lg ${c.bg}`}>
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <span
          className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 ${c.dot}`}
        />

        <span className="text-xs font-mono font-semibold text-gray-400 shrink-0">
          {course.code}
        </span>

        <span className="text-sm font-medium text-gray-700 truncate min-w-0">
          {highlight(course.title)}
        </span>
      </div>

      <span className="text-xs font-bold text-gray-500 shrink-0 ml-2">
        {course.credits} cr
      </span>
    </li>
  );
}


interface AllCoursesPanelProps {
  allCoursesQuery: string;
  setAllCoursesQuery: React.Dispatch<React.SetStateAction<string>>;
  allCoursesFiltered: [string, Course][];
  yourCoursesFiltered: Course[];
  yourCourses: string[] | null;
  isFetchingYourCourses: boolean;
}

export default function AllCoursesPanel({
  allCoursesQuery,
  setAllCoursesQuery,
  allCoursesFiltered,
  yourCoursesFiltered,
  yourCourses,
  isFetchingYourCourses,
}: AllCoursesPanelProps) {
  
  return (
    <main className="flex-1 min-w-0 overflow-hidden flex flex-col gap-4">
      {/* Header — sticky on both desktop and mobile */}
      <div className="sticky top-0 z-20 bg-[#ffffff11] branchpanelsearch rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-bold">All Courses</h1>
            <p className="text-sm mt-0.5 truncate">Complete course catalogue</p>
          </div>
        </div>
      </div>

      {/* Search — sticky just below the header */}
      <div className="sticky top-[72px] z-10 relative w-full">
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
          className="w-full pl-9 pr-8 py-2.5 text-sm rounded-xl border font-semibold border-gray-200 branchpanelsearch bg-[#ffffff11] shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-300 placeholder:text-gray-400"
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

      {/* Your Courses — scrolls independently */}
      <section className="branchpanelsearch bg-[#ffffff11] rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-w-0 flex flex-col">
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-50 shrink-0">
          <h2 className="font-semibold flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-500 inline-block shrink-0" />
            <span className="truncate">Your Courses</span>
          </h2>
          {yourCourses !== null && (
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <span className="text-xs bg-violet-100 text-violet-700 font-bold px-2 py-0.5 rounded-full">
                {yourCoursesFiltered.length} courses
              </span>
              <span className="text-xs bg-gray-100 font-bold px-2 py-0.5 rounded-full text-black">
                {yourCoursesFiltered.reduce((sum, c) => sum + c.credits, 0)} cr
              </span>
            </div>
          )}
        </div>

        {/* This inner div scrolls independently — capped height on mobile + desktop */}
        <div className="overflow-y-auto p-3 max-h-48 sm:max-h-64 md:max-h-72">
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

      {/* Course Catalogue — scrolls independently, takes remaining space on desktop */}
      <section className="branchpanelsearch bg-[#ffffff11] rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-w-0 flex flex-col flex-1 min-h-0">
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-50 shrink-0">
          <h2 className="font-semibold flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-400 inline-block shrink-0" />
            <span className="truncate">Course Catalogue</span>
          </h2>
          <span className="text-xs bg-gray-100 text-black font-bold px-2 py-0.5 rounded-full shrink-0 ml-2">
            {allCoursesFiltered.length} courses
          </span>
        </div>

        {/* This inner list scrolls independently — fills all remaining vertical space on desktop */}
        <ul className="flex flex-col gap-1.5 p-3 overflow-y-auto max-h-64 sm:max-h-80 md:flex-1 md:min-h-0">
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
}
