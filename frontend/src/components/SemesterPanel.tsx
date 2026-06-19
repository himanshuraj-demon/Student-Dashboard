import { useState, useEffect, type JSX } from "react";
import { courseMasterList } from "../../constants/courses";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";

export interface CourseRecord {
  code: string;
  grade: string;
}

export interface SemesterPayload {
  semester: number;
  courses: CourseRecord[];
}

export interface CourseCodesPayload {
  codes: string[];
}

export interface SemesterData {
  courses: CourseRecord[];
  saved: boolean;
}


const VALID_GRADES = new Set([
  "A+",
  "A",
  "A-",
  "B+",
  "B",
  "B-",
  "C+",
  "C",
  "C-",
  "D+",
  "D",
  "D-",
  "F",
  "AB",
  "FF",
  "W",
  "PP",
  "NP",
  "I",
]);

// eslint-disable-next-line react-refresh/only-export-components
export function parsePortalPaste(raw: string): CourseRecord[] {
  const lines = raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const results: CourseRecord[] = [];

  for (const line of lines) {
    const tokens = line.split(/\s+/);
    if (tokens.length < 4) continue;

    const grade = tokens[tokens.length - 1];
    if (!VALID_GRADES.has(grade)) continue;

    const codeMatch = line.match(/\b([A-Z]{2,3})\s*(\d{3})\b/);
    if (!codeMatch) continue;

    const code = codeMatch[1] + codeMatch[2];
    if (!results.find((r) => r.code === code)) {
      results.push({ code, grade });
    }
  }

  return results;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Spinner({
  className = "w-3 h-3",
}: {
  className?: string;
}): JSX.Element {
  return (
    <svg
      className={`animate-spin ${className}`}
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
  );
}

function GradeBadge({ grade }: { grade: string }): JSX.Element {
  const good = ["A+", "A", "A-", "B+", "B"].includes(grade);
  const ok = ["B-", "C+", "C", "C-"].includes(grade);
  const cls = good
    ? "bg-emerald-100 text-emerald-700"
    : ok
      ? "bg-amber-50 text-amber-700"
      : "bg-red-50 text-red-600";
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cls}`}>
      {grade}
    </span>
  );
}

function CourseTableRow({
  record,
  editing,
  onGradeChange,
}: {
  record: CourseRecord;
  editing: boolean;
  onGradeChange: (code: string, grade: string) => void;
}): JSX.Element {
  const master = courseMasterList[record.code];
  return (
    <li className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-green-50 hover:bg-violet-100/60 transition-colors">
      <span className="inline-block w-2.5 h-2.5 rounded-full shrink-0 bg-green-500" />
      <span className="text-xs font-mono font-semibold text-gray-400 shrink-0 w-16">
        {record.code}
      </span>
      <span className="flex-1 text-sm font-medium text-gray-700 truncate min-w-0">
        {master?.title ?? record.code}
      </span>
      <span className="text-xs font-bold text-gray-400 shrink-0 w-10 text-center">
        {master?.credits ?? "—"} cr
      </span>
      {editing ? (
        <input
          className="w-14 text-xs text-center border border-gray-300 rounded-lg px-1.5 py-1 font-bold focus:outline-none focus:ring-2 focus:ring-violet-300 bg-white"
          value={record.grade}
          onChange={(e) =>
            onGradeChange(record.code, e.target.value.toUpperCase())
          }
        />
      ) : (
        <div className="w-14 flex justify-end shrink-0">
          <GradeBadge grade={record.grade} />
        </div>
      )}
    </li>
  );
}


function LoadingSkeleton(): JSX.Element {
  return (
    <section className="branchpanelsearch bg-[#ffffff11] rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-20 gap-3">
      <Spinner className="w-5 h-5 text-blue-400" />
      <p className="text-sm text-gray-400">Loading semester data…</p>
    </section>
  );
}


interface SemesterPanelProps {
  semesterName: string;
  semesterNum: number;
  existingCodes: string[]; // from parent — all completed codes
  onSaved: (semNum: number, data: SemesterData) => void;
  onCoursesAdded: (codes: string[]) => void;
}

export default function SemesterPanel({
  semesterName,
  semesterNum,
  existingCodes,
  onSaved,
  onCoursesAdded,
}: SemesterPanelProps): JSX.Element {

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const { setYourCourses } = useAuth();

 
  const [savedCourses, setSavedCourses] = useState<CourseRecord[] | null>(null);

  const [editing, setEditing] = useState<boolean>(false);
  const [pasteText, setPasteText] = useState<string>("");
  const [parsedCourses, setParsedCourses] = useState<CourseRecord[]>([]);
  const [parseError, setParseError] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string>("");

  
  useEffect(() => {
    let cancelled = false;

    const fetchSemester = async () => {
      setIsFetching(true);
      setFetchError(false);

      try {
        const res = await api.get(`/user/semester-details/${semesterNum}`);

        if (cancelled) return;

        const record = res.data?.semester;

        if (
          record &&
          Array.isArray(record.courses) &&
          record.courses.length > 0
        ) {
          
          const courses: CourseRecord[] = record.courses.map(
            (c: { code?: string; courseCode?: string; grade: string }) => ({
              code: c.code ?? c.courseCode ?? "",
              grade: c.grade,
            }),
          );
          setSavedCourses(courses);
          setParsedCourses(courses);
          setEditing(false);
        } else {
        
          setSavedCourses([]);
          setParsedCourses([]);
          setEditing(true);
        }
      } catch (err) {
        if (cancelled) return;
        console.error("Failed to fetch semester data:", err);
        setFetchError(true);
        setSavedCourses([]);
        setEditing(true);
      } finally {
        if (!cancelled) setIsFetching(false);
      }
    };

    fetchSemester();
    return () => {
      cancelled = true;
    };
  }, [semesterNum]); 

  
  const hasSavedData = savedCourses !== null && savedCourses.length > 0;
  const displayCourses = parsedCourses; 

  const totalCredits = displayCourses.reduce(
    (sum, r) => sum + (courseMasterList[r.code]?.credits ?? 0),
    0,
  );


  const handleParse = () => {
    setParseError("");
    const results = parsePortalPaste(pasteText);
    if (results.length === 0) {
      setParseError(
        "Could not find any courses. Make sure you pasted the full semester result table.",
      );
      return;
    }
    setParsedCourses(results);
  };

  const handleGradeChange = (code: string, grade: string) => {
    setParsedCourses((prev) =>
      prev.map((r) => (r.code === code ? { ...r, grade } : r)),
    );
  };

  const handleSave = async () => {
    if (parsedCourses.length === 0) return;
    setSaveError("");
    setIsSaving(true);

    const semPayload: SemesterPayload = {
      semester: semesterNum,
      courses: parsedCourses,
    };

    const existingSet = new Set(existingCodes);
    const newOnlyCodes = parsedCourses
      .map((c) => c.code)
      .filter((code) => !existingSet.has(code));

    try {
      await api.post("/user/semester-details", semPayload);
      if (newOnlyCodes.length > 0) {
        await api.post("/user/your-courses", {
          codes: newOnlyCodes,
        } satisfies CourseCodesPayload);
        const coursesRes = await api.get("/user/your-courses");
        onCoursesAdded(newOnlyCodes);
        setYourCourses(coursesRes.data.codes ?? []);
      }

      const saved: SemesterData = { courses: parsedCourses, saved: true };
      setSavedCourses(parsedCourses);
      onSaved(semesterNum, saved);
      setEditing(false);
    } catch (err: unknown) {
      console.error(err);
      setSaveError("Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = () => {
    setPasteText("");
    setParseError("");
    setSaveError("");
    setParsedCourses(savedCourses ?? []);
    setEditing(true);
  };

  const handleCancel = () => {
    setParsedCourses(savedCourses ?? []);
    setEditing(false);
    setParseError("");
    setSaveError("");
  };


  if (isFetching) return <LoadingSkeleton />;

  return (
    <main className="flex-1 min-w-0 overflow-hidden flex flex-col gap-4">
      <div className="sticky top-0 z-20 bg-[#ffffff11] branchpanelsearch rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-bold">{semesterName}</h1>
            <p className="text-sm mt-0.5 text-gray-500 truncate">
              {displayCourses.length > 0
                ? `${displayCourses.length} courses · ${totalCredits} credits`
                : "No records yet"}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!editing && hasSavedData && (
              <button
                onClick={handleEdit}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition shadow-sm">
                Edit
              </button>
            )}
            {editing && displayCourses.length > 0 && (
              <>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition shadow-sm">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm disabled:opacity-60 flex items-center gap-1.5">
                  {isSaving && <Spinner />}
                  {isSaving ? "Saving…" : "Save"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {fetchError && (
        <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-xs text-red-600 font-medium">
          Could not load saved data. You can still import grades below.
        </div>
      )}
      {editing && (
        <section className="branchpanelsearch bg-[#ffffff11] rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex flex-col gap-3">
          <div>
            <h2 className="font-semibold text-sm">
              Import Grades From IITGN Portal
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Go to your student portal → Results → copy the full semester table
              and paste below.
            </p>
          </div>

          <textarea
            className="w-full h-36 text-xs font-mono rounded-xl border border-gray-200 bg-white p-3 resize-none focus:outline-none focus:ring-2 focus:ring-violet-300 text-gray-700 placeholder:text-gray-300 shadow-sm"
            placeholder={
              "2025-2026 Semester I  ES 101  Engineering Graphics  3  B-\n2025-2026 Semester I  MA 103  Calculus of Single Variable  4  A\n2025-2026 Semester I  HS 191  Introduction to Writing I  2  A-"
            }
            value={pasteText}
            onChange={(e) => {
              setPasteText(e.target.value);
              setParseError("");
            }}
          />

          {parseError && (
            <p className="text-xs text-red-500 font-medium">{parseError}</p>
          )}

          <div className="flex gap-2">
            <button
              onClick={handleParse}
              disabled={!pasteText.trim()}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition disabled:opacity-40">
              Parse Grades
            </button>

            {displayCourses.length > 0 && (
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-60 flex items-center gap-1.5">
                {isSaving && <Spinner />}
                {isSaving ? "Saving…" : "Save Semester"}
              </button>
            )}
          </div>

          {saveError && (
            <p className="text-xs text-red-500 font-medium">{saveError}</p>
          )}
        </section>
      )}

      {!editing && !hasSavedData && (
        <section className="branchpanelsearch bg-[#ffffff11] rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-20 text-center">
          <span className="text-3xl mb-3">📋</span>
          <p className="text-sm font-semibold text-gray-600">
            No semester data imported yet.
          </p>
          <p className="text-xs text-gray-400 mt-1 mb-5">
            Paste your portal results to get started.
          </p>
          <button
            onClick={handleEdit}
            className="px-5 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition shadow-sm">
            Import Grades
          </button>
        </section>
      )}

      {displayCourses.length > 0 && (
        <section className="branchpanelsearch bg-[#ffffff11] rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-w-0 flex flex-col">
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-100 shrink-0">
            <h2 className="font-semibold flex items-center gap-2 min-w-0 text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block shrink-0" />
              <span className="truncate">{semesterName} Courses</span>
            </h2>
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <span className="text-xs bg-violet-100 text-violet-700 font-bold px-2 py-0.5 rounded-full">
                {displayCourses.length} courses
              </span>
              <span className="text-xs bg-gray-100 font-bold px-2 py-0.5 rounded-full text-black">
                {totalCredits} cr
              </span>
              {hasSavedData && !editing && (
                <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                  Saved
                </span>
              )}
            </div>
          </div>

          <div className="overflow-y-auto p-3 max-h-dvh">
            <ul className="flex flex-col gap-1.5">
              {displayCourses.map((record) => (
                <CourseTableRow
                  key={record.code}
                  record={record}
                  editing={editing}
                  onGradeChange={handleGradeChange}
                />
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
