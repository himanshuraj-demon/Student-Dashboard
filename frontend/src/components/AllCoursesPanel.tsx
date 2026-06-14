import type { Course } from "../../constants/types";
import { CourseRow } from "../../constants/functions";

interface AllCoursesPanelProps {
  allCoursesQuery: string;
  setAllCoursesQuery: React.Dispatch<React.SetStateAction<string>>;
  allCoursesFiltered: [string, Course][];
  yourCoursesFiltered: Course[];
  yourCourses: string[] | null;
}

export default function AllCoursesPanel({
  allCoursesQuery,
  setAllCoursesQuery,
  allCoursesFiltered,
  yourCoursesFiltered,
  yourCourses,
}: AllCoursesPanelProps) {
  
  return (
    <main className="flex-1 min-w-0 overflow-hidden flex flex-col gap-4 h-fit">
      <div className="sticky top-0 z-20 bg-[#ffffff11] branchpanelsearch rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-bold">All Courses</h1>
            <p className="text-sm mt-0.5 truncate">Complete course catalogue</p>
          </div>
        </div>
      </div>

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
      <section className="branchpanelsearch bg-[#ffffff11] rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-w-0 flex flex-col">
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-50 shrink-0">
          <h2 className="font-semibold flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block shrink-0" />
            <span className="truncate">Your Courses</span>
          </h2>
          {yourCourses !== null && (
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">
                {yourCoursesFiltered.length} courses
              </span>
              <span className="text-xs bg-gray-100 font-bold px-2 py-0.5 rounded-full text-black">
                {yourCoursesFiltered.reduce((sum, c) => sum + c.credits, 0)} cr
              </span>
            </div>
          )}
        </div>
        <div className="overflow-y-auto p-3 h-fit">
          {yourCoursesFiltered.length > 0 ? (
            <ul className="flex flex-col gap-1.5">
              {yourCoursesFiltered.map((c) => (
                <CourseRow
                  key={c.code}
                  course={c}
                  type="basket"
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
      <section className="branchpanelsearch bg-[#ffffff11] rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-w-0 flex flex-col flex-1 min-h-0">
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-50 shrink-0">
          <h2 className="font-semibold flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400 inline-block shrink-0" />
            <span className="truncate">Course Catalogue</span>
          </h2>
          <span className="text-xs bg-gray-100 text-black font-bold px-2 py-0.5 rounded-full shrink-0 ml-2">
            {allCoursesFiltered.length} courses
          </span>
        </div>

        <ul className="flex flex-col gap-1.5 p-3 overflow-y-auto max-h-96 ">
          {allCoursesFiltered.length > 0 ? (
            allCoursesFiltered.map(([code, course]) => (
              <CourseRow
                key={code}
                course={{ code, ...course }}
                type="your"
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
