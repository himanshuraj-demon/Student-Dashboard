type Semester = {
  semester: number;
  credits: number;
  courses: {
    code: string;
    title: string;
    credits: number;
    category?: string;
  }[];
};

const CATEGORY_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  core:     { bg: "bg-blue-50",   text: "text-blue-700",   dot: "bg-blue-400" },
  elective: { bg: "bg-amber-50",  text: "text-amber-700",  dot: "bg-amber-400" },
  lab:      { bg: "bg-emerald-50",text: "text-emerald-700",dot: "bg-emerald-400" },
  project:  { bg: "bg-violet-50", text: "text-violet-700", dot: "bg-violet-400" },
  default:  { bg: "bg-gray-50",   text: "text-gray-600",   dot: "bg-gray-400" },
};

function getCategoryStyle(category: string) {
  const key = category?.toLowerCase() as keyof typeof CATEGORY_STYLES;
  return CATEGORY_STYLES[key] ?? CATEGORY_STYLES.default;
}

// Semester row background cycling
const SEM_ACCENTS = [
  "border-l-blue-400",
  "border-l-violet-400",
  "border-l-emerald-400",
  "border-l-amber-400",
  "border-l-rose-400",
  "border-l-cyan-400",
  "border-l-indigo-400",
  "border-l-teal-400",
];

// ── Desktop table ─────────────────────────────────────────────────────────────
function DesktopTable({ curriculum }: { curriculum: Semester[] }) {
  const maxCourses = Math.max(...curriculum.map((s) => s.courses.length), 1);
  const cols = Math.min(maxCourses, 8);

  return (
    <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 shadow-sm m-4">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-900 text-white">
            <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider whitespace-nowrap rounded-tl-2xl w-24">
              Semester
            </th>
            {[...Array(cols)].map((_, i) => (
              <th
                key={i}
                className="text-left px-3 py-3 font-semibold text-xs uppercase tracking-wider text-gray-300"
              >
                Course {i + 1}
              </th>
            ))}
            <th className="text-center px-4 py-3 font-semibold text-xs uppercase tracking-wider text-gray-300 rounded-tr-2xl whitespace-nowrap w-20">
              Credits
            </th>
          </tr>
        </thead>
        <tbody>
          {curriculum.map((sem, semIdx) => {
            const accent = SEM_ACCENTS[semIdx % SEM_ACCENTS.length];
            const isEven = semIdx % 2 === 0;
            return (
              <tr
                key={sem.semester}
                className={`border-b border-gray-100 border-l-4 ${accent} ${
                  isEven ? "bg-white" : "bg-gray-50/60"
                } hover:bg-blue-50/40 transition-colors group`}
              >
                {/* Semester label */}
                <td className="px-4 py-3 align-top">
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sem</span>
                    <span className="text-2xl font-black text-gray-800 leading-none">{sem.semester}</span>
                  </div>
                </td>

                {/* Course cells */}
                {[...Array(cols)].map((_, i) => {
                  const course = sem.courses[i];
                  if (!course) return <td key={i} className="px-3 py-3" />;
                  const style = getCategoryStyle(course.category!);
                  return (
                    <td key={i} className="px-3 py-3 align-top">
                      <div className={`rounded-xl p-2.5 h-full flex flex-col gap-1 ${style.bg}`}>
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />
                          <span className={`text-xs font-mono font-bold ${style.text}`}>
                            {course.code}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-gray-700 leading-snug line-clamp-2">
                          {course.title}
                        </p>
                        <span className="text-xs font-bold text-gray-400 mt-auto">
                          {course.credits} cr
                        </span>
                      </div>
                    </td>
                  );
                })}

                {/* Credits total */}
                <td className="px-4 py-3 align-top text-center">
                  <div className="inline-flex flex-col items-center justify-center w-12 h-12 rounded-full bg-gray-900 text-white mx-auto">
                    <span className="text-base font-black leading-none">{sem.credits}</span>
                    <span className="text-[9px] font-semibold text-gray-400 leading-none mt-0.5">cr</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        {/* Footer: total credits */}
        <tfoot>
          <tr className="bg-gray-900 rounded-b-2xl">
            <td
              colSpan={cols + 1}
              className="px-4 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider rounded-bl-2xl"
            >
              Total Programme Credits
            </td>
            <td className="px-4 py-3 text-center rounded-br-2xl">
              <span className="text-white font-black text-lg">
                {curriculum.reduce((s, sem) => s + sem.credits, 0)}
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ── Mobile card view ──────────────────────────────────────────────────────────
function MobileCards({ curriculum }: { curriculum: Semester[] }) {
  return (
    <div className="md:hidden flex flex-col gap-4">
      {curriculum.map((sem, semIdx) => {
        const accent = SEM_ACCENTS[semIdx % SEM_ACCENTS.length];
        return (
          <div
            key={sem.semester}
            className={`bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden border-l-4 ${accent}`}
          >
            {/* Card header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Semester</span>
                <span className="text-xl font-black text-gray-800">{sem.semester}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-900 text-white rounded-full px-3 py-1">
                <span className="text-sm font-black">{sem.credits}</span>
                <span className="text-[10px] font-semibold text-gray-400">cr</span>
              </div>
            </div>

            {/* Course grid */}
            <div className="p-3 grid grid-cols-1 gap-2">
              {sem.courses.map((course) => {
                const style = getCategoryStyle(course.category!);
                return (
                  <div
                    key={course.code}
                    className={`flex items-start gap-3 rounded-xl p-3 ${style.bg}`}
                  >
                    <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${style.dot}`} />
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-mono font-bold ${style.text}`}>{course.code}</div>
                      <div className="text-sm font-medium text-gray-700 mt-0.5 leading-snug">{course.title}</div>
                    </div>
                    <span className="text-xs font-bold text-gray-500 shrink-0 mt-0.5">{course.credits} cr</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Total credits footer */}
      <div className="flex items-center justify-between bg-gray-900 text-white rounded-2xl px-5 py-4">
        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Total Credits</span>
        <span className="text-2xl font-black">{curriculum.reduce((s, sem) => s + sem.credits, 0)}</span>
      </div>
    </div>
  );
}



// ── Main export ───────────────────────────────────────────────────────────────
export default function CurriculumTable({ curriculum }: { curriculum: Semester[] }) {
  return (
    <div className="font-sans">
      <DesktopTable curriculum={curriculum} />
      <MobileCards curriculum={curriculum} />
    </div>
  );
}