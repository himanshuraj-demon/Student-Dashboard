import type { Course } from "../../constants/types";
import { CourseRow } from "../../constants/functions";

interface AllCoursesPanelProps {
  allCoursesQuery: string;
  remainingMandatoryCourses: Course[];
  yourCourses: Course[];
}

export default function RemainingCourses({
  allCoursesQuery,
  remainingMandatoryCourses,
  yourCourses,
}: AllCoursesPanelProps) {
  return (
    <main className="flex-1 min-w-0 overflow-hidden flex flex-col gap-4">
      <div className="sticky top-0 z-20 bg-[#ffffff11] branchpanelsearch rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-bold">Remaining Courses Courses</h1>
            <p className="text-sm mt-0.5 truncate">
              Courses not yet recorded in any semester
            </p>
          </div>
        </div>
      </div>
      <section className="branchpanelsearch bg-[#ffffff11] rounded-2xl border h-dvh border-gray-100 shadow-sm overflow-x-hidden overflow-y-auto min-w-0 flex flex-col">
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-50 shrink-0">
          <h2 className="font-semibold flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block shrink-0" />
            <span className="truncate">Your Remaining Courses</span>
          </h2>
          {yourCourses !== null && (
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <span className="text-xs bg-violet-100 text-violet-700 font-bold px-2 py-0.5 rounded-full">
                {yourCourses.length} courses
              </span>
              <span className="text-xs bg-gray-100 font-bold px-2 py-0.5 rounded-full text-black">
                {yourCourses.reduce((sum, c) => sum + c.credits, 0)} cr
              </span>
            </div>
          )}
        </div>

        <div className="overflow-y-auto p-3 max-h-dvh">
          <ul className="flex flex-col gap-1.5 h-auto">
            {yourCourses.map((c) => (
              <CourseRow
                key={c.code + Math.random}
                course={c}
                type="your"
                query={allCoursesQuery}
              />
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-50 shrink-0">
          <h2 className="font-semibold flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block shrink-0" />
            <span className="truncate">
              Your Remaining Institute Mandatory Courses
            </span>
          </h2>
          {remainingMandatoryCourses !== null && (
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <span className="text-xs bg-violet-100 text-violet-700 font-bold px-2 py-0.5 rounded-full">
                {remainingMandatoryCourses.length} courses
              </span>
              <span className="text-xs bg-gray-100 font-bold px-2 py-0.5 rounded-full text-black">
                {remainingMandatoryCourses.reduce(
                  (sum, c) => sum + c.credits,
                  0,
                )}{" "}
                cr
              </span>
            </div>
          )}
        </div>

        <div className="overflow-y-auto p-3 max-h-dvh">
          <ul className="flex flex-col gap-1.5 h-auto">
            {remainingMandatoryCourses.map((c) => (
              <CourseRow
                key={c.code + Math.random}
                course={c}
                type="your"
                query={allCoursesQuery}
              />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
