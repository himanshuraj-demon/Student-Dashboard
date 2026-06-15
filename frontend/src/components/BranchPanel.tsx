import type { Branch, Course, CourseBasket } from "../../constants/types";
import { CourseRow } from "../../constants/functions";

interface BranchPanelProps {
  branch: Branch;
  courseQuery: string;
  setCourseQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredCore: Course[];
  filteredBaskets: CourseBasket[];
  expandedBaskets: Record<string, boolean>;
  toggleBasket: (name: string) => void;
  openElectives: string;
}

export default function BranchPanel({
  branch,
  courseQuery,
  setCourseQuery,
  filteredCore,
  filteredBaskets,
  expandedBaskets,
  toggleBasket,
  openElectives,
}: BranchPanelProps) {
  return (
    <main className="flex-1 min-w-0 flex flex-col gap-4 branchpanel">
      {/* Header */}
      <div className="bg-[#ffffff11] rounded-2xl border  border-gray-100 shadow-sm p-5 branchpanelsearch">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold ">
              IIT Gandhinagar {branch.branchName} Courses & Curriculum
            </h1>

            <p className="text-sm  mt-0.5">
              Branch Code:
              <span className="font-semibold ml-1">{branch.branchCode}</span>
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

                <div className="text-xs text-black">{label} cr</div>
              </div>
            ))}
          </div>
          <p className="text-sm md:flex hidden font-semibold">
            View mandatory core courses, elective options, credit requirements,
            and degree completion guidelines for the IIT Gandhinagar {branch.branchName} program.
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-1.5 text-xs ">
          <div className="flex gap-1.5 items-start">
            <span className="font-semibold  uppercase tracking-wide w-16">
              Science
            </span>

            <span>{branch.mandatoryScienceBasketRequirements}</span>
          </div>

          <div className="flex gap-1.5 items-start">
            <span className="font-semibold  uppercase tracking-wide w-16">
              Math
            </span>

            <span>{branch.mandatoryMathBasketRequirements}</span>
          </div>

          <div className="flex gap-1.5 items-start">
            <span className="font-semibold  uppercase tracking-wide w-16">
              Open El.
            </span>

            <span>{openElectives}</span>
          </div>

          <div className="flex gap-1.5 items-start">
            <span className="font-semibold  uppercase tracking-wide w-16">
              Project
            </span>

            <span>{branch.projectRequirements}</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative branchpanelsearch">
        <input
          className="w-full pl-9 pr-3 py-2.5 text-sm font-semibold rounded-xl border  border-gray-200 bg-[#ffffff11] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Filter courses by name or code..."
          value={courseQuery}
          onChange={(e) => setCourseQuery(e.target.value)}
        />

        {courseQuery && (
          <button
            onClick={() => setCourseQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2">
            ✕
          </button>
        )}
      </div>

      {/* Core Courses */}
      <section className="bg-[#ffffff11] rounded-2xl border border-gray-100 shadow-sm ">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
          <h2 className="font-semibold  branchpanelsearch flex items-center gap-2">
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
            className="bg-[#ffffff11] rounded-2xl border border-gray-100 shadow-sm">
            <button
              onClick={() => toggleBasket(basket.basketName)}
              className="w-full flex items-center justify-between px-5 py-3 border-b border-gray-50">
              <h2 className="font-semibold branchpanelsearch flex items-center gap-2 text-left">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />

                {basket.basketName}

                <span className="text-xs font-normal text-gray-400">
                  · min {basket.minimumCredits} cr
                </span>
              </h2>

              <div className="flex items-center gap-2">
                <span className="text-xs bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">
                  {basket.courses.length} courses
                </span>

                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
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
}
