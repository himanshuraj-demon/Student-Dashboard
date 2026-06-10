import { branches, courseMasterList } from "../../constants/courses";
import { useAuth } from "../hooks/useAuth";

type SidebarView = "branches" | "all-courses";

interface SidebarProps {
  sidebarView: SidebarView;
  setSidebarView: React.Dispatch<React.SetStateAction<SidebarView>>;

  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  filteredBranches: string[];

  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;

  isAddingCourses: boolean;
  handleStartAdding: () => void;

  yourCourses: string[] | null;
  isFetchingYourCourses: boolean;

  setIsAddingCourses: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  sidebarView,
  setSidebarView,
  search,
  setSearch,
  filteredBranches,
  selected,
  setSelected,
  isAddingCourses,
  handleStartAdding,
  yourCourses,
  isFetchingYourCourses,
  setIsAddingCourses,
}: SidebarProps) {
  const { user } = useAuth();

  return (
    <aside className="w-full md:w-64 shrink-0 flex flex-col gap-3">
      {/* Tab switcher */}
      <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        <button
          onClick={() => setSidebarView("branches")}
          className={`flex-1 py-2 text-xs font-semibold transition-colors
          ${
            sidebarView === "branches"
              ? "bg-blue-600 text-white"
              : "text-gray-500 hover:bg-gray-50"
          }`}>
          Branches
        </button>

        <button
          onClick={() => {
            setSidebarView("all-courses");
            setIsAddingCourses(false);
          }}
          className={`flex-1 py-2 text-xs font-semibold transition-colors
          ${
            sidebarView === "all-courses"
              ? "bg-violet-600 text-white"
              : "text-gray-500 hover:bg-gray-50"
          }`}>
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
              const isUser = name === user?.details?.branch;

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
                        className={`text-xs font-bold px-1.5 py-0.5 rounded
                        ${
                          isActive
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}>
                        {b.branchCode}
                      </span>

                      <span className="truncate font-medium">
                        {b.branchName}
                      </span>
                    </div>

                    {isUser && (
                      <span
                        className={`text-xs shrink-0 font-semibold px-1.5 py-0.5 rounded-full
                        ${
                          isActive
                            ? "bg-white text-blue-600"
                            : "bg-blue-100 text-blue-600"
                        }`}>
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
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3 w-full overflow-hidden">
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
                className="w-3.5 h-3.5 shrink-0"
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
  );
}