import { useState, useMemo } from "react";
import { useTitle } from "../hooks/useTitle";
import MinorPanel from "../components/cources/MinorPanel";
import { MINORS, MINOR_COURSES, type Minor } from "../../constants/minors";
import { useAuth } from "../hooks/useAuth";

export default function Minors() {
  useTitle("Minors");
  const { yourCourses } = useAuth();

  const [search, setSearch] = useState<string>("");
  const [selectedMinorItem, setSelectedMinorItem] = useState<string>("CSE");
  const [selectedMinor, setSelectedMinor] = useState<string | null>(
    localStorage.getItem("selectedMinor")
  );

  const handleSetMinor = (minorCode: string) => {
    localStorage.setItem("selectedMinor", minorCode);
    setSelectedMinor(minorCode);
  };

  const handleRemoveMinor = () => {
    localStorage.removeItem("selectedMinor");
    setSelectedMinor(null);
  };

  const filteredMinors = useMemo(() => {
    const q = search.toLowerCase();
    return MINORS.filter(
      (m: Minor) =>
        m.code.toLowerCase().includes(q) ||
        m.name.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-1 md:p-4 min-h-screen bg-[rgba(59,130,246,0.06)] font-sans overflow-x-hidden overflow-y-scroll h-fit md:h-dvh w-full">
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
              placeholder="Search minors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <ul className="flex flex-col gap-1 overflow-y-auto max-h-[45dvh] md:max-h-[80dvh] pr-1">
            {filteredMinors.map((minor: Minor) => {
              const isActive = selectedMinorItem === minor.code;
              const isSelected = selectedMinor === minor.code;
              return (
                <li key={minor.code}>
                  <button
                    onClick={() => setSelectedMinorItem(minor.code)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all flex items-center justify-between gap-2
                      ${isActive ? "bg-blue-600 text-white shadow-md" : "branchpanelsearch bg-[#ffffff11] hover:bg-blue-300 border border-gray-300"}`}>
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isActive ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-500"}`}>
                        {minor.code}
                      </span>
                      <span className="truncate font-medium">
                        {minor.name}
                      </span>
                    </div>
                    {isSelected && (
                      <span
                        className={`text-[10px] shrink-0 font-semibold px-1.5 py-0.5 rounded-full ${isActive ? "bg-white text-blue-600" : "bg-blue-100 text-blue-600"}`}>
                        Active
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="h-px bg-gray-100/10 my-2" />

          {/* Minor Status summary */}
          <div className="branchpanelsearch bg-[#ffffff11] rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3 w-full overflow-hidden shrink-0">
            {selectedMinor ? (
              <>
                <div className="text-center">
                  <div className="text-xs text-gray-500">Your Active Minor</div>
                  <div className="text-sm font-bold text-green-500 truncate">
                    {MINORS.find((m: Minor) => m.code === selectedMinor)?.name || selectedMinor}
                  </div>
                </div>
                <div className="h-px bg-gray-100/10" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {MINOR_COURSES.filter((c) => c.minorCode === selectedMinor && yourCourses?.includes(c.courseCode)).reduce((sum, c) => sum + c.credits, 0)} / 20 cr
                  </div>
                  <div className="text-xs text-gray-500">Credits Completed</div>
                </div>
              </>
            ) : (
              <div className="text-center py-2">
                <div className="text-sm font-semibold text-gray-400">No active minor set</div>
                <div className="text-[10px] text-gray-500 mt-1">Select a minor from the list and click "Set as My Minor" to activate.</div>
              </div>
            )}
          </div>
        </aside>

        {/* ── Right Detail Panel ── */}
        <MinorPanel
          minorCode={selectedMinorItem}
          yourCourses={yourCourses}
          selectedMinor={selectedMinor}
          onSetMinor={handleSetMinor}
          onRemoveMinor={handleRemoveMinor}
        />
      </div>
  );
}
