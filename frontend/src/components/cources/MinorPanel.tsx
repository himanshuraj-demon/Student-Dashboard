import { useMemo } from "react";
import { MINORS, MINOR_COURSES, type Minor, type MinorCourse } from "../../../constants/minors";
import { FaCheckCircle, FaLock, FaUserPlus, FaUserMinus } from "react-icons/fa";

interface MinorPanelProps {
  minorCode: string;
  yourCourses: string[] | null;
  selectedMinor: string | null;
  onSetMinor: (code: string) => void;
  onRemoveMinor: () => void;
}

export default function MinorPanel({
  minorCode,
  yourCourses,
  selectedMinor,
  onSetMinor,
  onRemoveMinor,
}: MinorPanelProps) {
  const minor = useMemo(() => {
    return MINORS.find((m: Minor) => m.code === minorCode) as Minor;
  }, [minorCode]);

  const courses = useMemo(() => {
    return MINOR_COURSES.filter((c: MinorCourse) => c.minorCode === minorCode);
  }, [minorCode]);

  const isActive = selectedMinor === minorCode;

  const completedCourses = useMemo(() => {
    if (!yourCourses) return [];
    return courses.filter((c: MinorCourse) => yourCourses.includes(c.courseCode));
  }, [courses, yourCourses]);

  const completedCredits = useMemo(() => {
    return completedCourses.reduce((sum: number, c: MinorCourse) => sum + c.credits, 0);
  }, [completedCourses]);

  const progressPercent = useMemo(() => {
    return Math.min(100, Math.round((completedCredits / minor.requiredCredits) * 100));
  }, [completedCredits, minor.requiredCredits]);

  return (
    <main className="flex-1 min-w-0 overflow-hidden flex flex-col gap-4 h-fit pb-12">
      {/* ── Minor Header ── */}
      <div className="sticky top-0 z-20 bg-[#ffffff11] branchpanelsearch rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 bg-blue-600 text-white rounded-full">
                Minor Code: {minor.code}
              </span>
              {isActive && (
                <span className="text-xs font-bold px-2 py-0.5 bg-green-500 text-white rounded-full flex items-center gap-1">
                  Your Active Minor
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold mt-1.5">{minor.name}</h1>
            <p className="text-sm mt-1 text-gray-500">
              Minors require completing {minor.requiredCredits} credits of courses from the discipline.
            </p>
          </div>

          <div className="shrink-0">
            {isActive ? (
              <button
                onClick={onRemoveMinor}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer shadow-md transition-all">
                <FaUserMinus size={16} />
                Remove Minor
              </button>
            ) : (
              <button
                onClick={() => onSetMinor(minor.code)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer shadow-md transition-all">
                <FaUserPlus size={16} />
                Set as My Minor
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Progress Card ── */}
      {minor.hasDetailedCourses && (
        <div className="branchpanelsearch bg-[#ffffff11] rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-gray-500">Curriculum Progress</span>
            <span className="text-sm font-extrabold text-blue-600">
              {completedCredits} / {minor.requiredCredits} Credits ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* ── Curriculum List ── */}
      {minor.hasDetailedCourses ? (
        <section className="branchpanelsearch bg-[#ffffff11] rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-w-0 flex flex-col">
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-50 shrink-0">
            <h2 className="font-semibold flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block shrink-0" />
              <span className="truncate">Required Course Syllabus</span>
            </h2>
            <span className="text-xs bg-gray-100 text-black font-bold px-2 py-0.5 rounded-full shrink-0 ml-2">
              {courses.length} courses listed
            </span>
          </div>

          <div className="p-3 overflow-y-auto max-h-[60dvh]">
            <ul className="flex flex-col gap-2">
              {courses.map((c: MinorCourse) => {
                const isCompleted = yourCourses?.includes(c.courseCode);
                return (
                  <li
                    key={c.courseCode}
                    className={`flex items-center justify-between gap-3 p-3 rounded-xl border transition-all duration-200
                      ${isCompleted
                        ? "bg-green-500/10 border-green-500/20"
                        : "minor-bg border-gray-200/5"
                      }`}>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-blue-400">{c.courseCode}</span>
                        <span className="text-xs text-gray-500">· {c.credits} Credits</span>
                        {c.isMandatory && (
                          <span className="text-[10px] font-extrabold px-1.5 py-0.2 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded">
                            Mandatory
                          </span>
                        )}
                        {c.note && (
                          <span className="text-[10px] font-medium px-1.5 py-0.2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">
                            {c.note}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold mt-1 text-[var(--text-primary)]">{c.courseName}</h4>
                    </div>

                    <div className="shrink-0 flex items-center">
                      {isCompleted ? (
                        <span className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-500/20 px-2 py-1 rounded-lg">
                          <FaCheckCircle size={14} />
                          Completed
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400 font-medium px-2 py-1 bg-white/5 rounded-lg">
                          Pending
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : (
        <div className="branchpanelsearch bg-[#ffffff11] rounded-2xl border border-gray-100 shadow-sm p-8 text-center flex flex-col items-center justify-center gap-3">
          <FaLock size={40} className="text-gray-400 mb-2" />
          <h3 className="text-lg font-bold">Curriculum TBD / Under Review</h3>
          <p className="text-sm text-gray-500 max-w-md">
            The course plan for the <strong>{minor.name}</strong> minor is currently under review or has not been published yet in the advisory document. A total of <strong>{minor.requiredCredits} credits</strong> is required.
          </p>
        </div>
      )}
    </main>
  );
}
