import React from "react";
import Nav from "../services/Nav";
import { useAuth } from "../hooks/useAuth";
import { branches, instituteRequirements } from "../../constants/courses";
import { Link } from "react-router-dom";
function ProgressBar({
  label,
  completed,
  total,
}: {
  label: string;
  completed: number;
  total: number;
}) {
  const percentage = total > 0 ? Math.min(100, (completed / total) * 100) : 0;

  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span>{label}</span>
        <span className="text-[var(--text-secondary)]">
          {completed} / {total}
        </span>
      </div>
      <div
        className="w-auto h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--border)" }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: "var(--text-primary)",
          }}
        />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, yourCourses, todos, notes } = useAuth();

  const selectedBranch = user?.details?.branch || "Artificial Intelligence";
  const branchData = branches[selectedBranch as keyof typeof branches] ||
    Object.values(branches)[0];
  const completedSet = new Set(yourCourses || []);

  const completedCredits = user?.details?.creditsCompleted || 0;
  const totalCredits = branchData.totalCredits;
  const totalCoreCredits = branchData.coreCredits;

  const completedCoreCourses = branchData.disciplineCoreCourses.filter(
    (course) => completedSet.has(course.code),
  );
  const completedCoreCredits = completedCoreCourses.reduce(
    (sum, course) => sum + course.credits,
    0,
  );
  const remainingCoreCourses =
    branchData.disciplineCoreCourses.length - completedCoreCourses.length;

  const remainingCredits = totalCredits - completedCredits;

  const graduationPercentageNum =
    totalCredits > 0 ? (completedCredits / totalCredits) * 100 : 0;
  const graduationPercentage = graduationPercentageNum.toFixed(1);
  const graduationDegrees = (graduationPercentageNum * 3.6).toFixed(1);

  const completedTodos = todos?.filter((todo) => todo.completed).length || 0;
  const totalTodos = todos?.length || 0;
  const pendingTodos = totalTodos - completedTodos;

  const totalNotes = notes?.length || 0;

  const mandatoryCourses = [
    ...instituteRequirements.hssBasket.mandatoryCourses,
    ...instituteRequirements.mathBasket.mandatoryCourses,
  ];
  const completedMandatoryCredits = mandatoryCourses
    .filter((course) => completedSet.has(course.code))
    .reduce((sum, course) => sum + course.credits, 0);
  const totalMandatoryCredits = mandatoryCourses.reduce(
    (sum, course) => sum + course.credits,
    0,
  );

  const completedHSSCredits = instituteRequirements.hssBasket.mandatoryCourses
    .filter((course) => completedSet.has(course.code))
    .reduce((sum, course) => sum + course.credits, 0);
  const totalHSSCredits = instituteRequirements.hssBasket.totalCredits;

  const completedMathCredits =
    instituteRequirements.mathBasket.mandatoryCourses
      .filter((course) => completedSet.has(course.code))
      .reduce((sum, course) => sum + course.credits, 0);
  const totalMathCredits = instituteRequirements.mathBasket.totalCredits;

  const completedCoreElectiveCredits = branchData.disciplineElectiveBaskets
    .flatMap((basket) => basket.courses)
    .filter((course) => completedSet.has(course.code))
    .reduce((sum, course) => sum + course.credits, 0);
  const totalCoreElectiveCredits = branchData.electiveCredits;

  return (
    <div className="main">
      <Nav />
      <div className="dashboard-wrapper h-dvh overflow-y-scroll w-dvw md:w-auto">
        <div className="w-auto mx-auto md:p-6 p-3">
          <div className="dash-header mb-6">
            <div className="flex justify-between items-start relative z-10">
              <div>
                <h1 className="md:text-2xl text-xl font-bold mb-1">
                  Welcome back, {user?.name}
                </h1>
                <p>
                  Semester {user?.details?.currentSemester},{" "}
                  {user?.details?.branch}
                </p>
              </div>

             <Link to={"/analytics"}> <button className="btn-analytics hidden md:flex">
                View Analytics
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button></Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Overview */}
            <div className="dash-card lg:col-span-2">
              <div className="stat-label">Academic Progress</div>
              <div className="stat-value">
                {completedCredits} / {totalCredits} Credits
              </div>
              <div className="md:text-sm text-xs mt-1">
                {graduationPercentage}% Degree Completed
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="rounded-xl p-4 border border-[var(--border)]">
                  <p className="text-xs">
                    Core Credits
                  </p>
                  <p className="text-2xl font-bold">
                    {completedCoreCredits}/{totalCoreCredits}
                  </p>
                </div>
                <div className="rounded-xl p-4 border border-[var(--border)]">
                  <p className="text-xs ">
                    Credits Left
                  </p>
                  <p className="text-2xl font-bold">{remainingCredits}</p>
                </div>
                <div className="rounded-xl p-4 border border-[var(--border)]">
                  <p className="text-xs ">
                    Core Courses Done
                  </p>
                  <p className="text-2xl font-bold">
                    {completedCoreCourses.length}
                  </p>
                </div>
                <div className="rounded-xl p-4 border border-[var(--border)]">
                  <p className="text-xs ">
                    Core Courses Left
                  </p>
                  <p className="text-2xl font-bold">{remainingCoreCourses}</p>
                </div>
              </div>
            </div>

            {/* Graduation Donut */}
            <div className="dash-card flex flex-col items-center justify-center">
              <div className="stat-label self-center w-full mb-4">
                Graduation Progress
              </div>
              <div
                className="circular-progress mb-4"
                style={
                  { "--progress": `${graduationDegrees}deg` } as React.CSSProperties
                }>
                <span className="circular-progress-text">
                  {graduationPercentage}%
                </span>
              </div>
              <div
                className="text-sm font-semibold text-center"
                style={{ color: "var(--text-primary)" }}>
                {completedCredits} / {totalCredits} Credits
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tasks & Notes */}
            <div className="dash-card">
              <div className="stat-label mb-6">Productivity Overview</div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs ">Notes</p>
                  <p className="text-2xl font-bold">{totalNotes}</p>
                </div>
                <div>
                  <p className="text-xs ">Tasks</p>
                  <p className="text-2xl font-bold">{totalTodos}</p>
                </div>
              </div>

              <div className="space-y-4">
                <ProgressBar
                  label="Completed"
                  completed={completedTodos}
                  total={totalTodos}
                />
                <ProgressBar
                  label="Pending"
                  completed={pendingTodos}
                  total={totalTodos}
                />
              </div>
            </div>

            {/* Degree Requirements */}
            <div className="dash-card">
              <div className="stat-label mb-6">Degree Requirements</div>
              <div className="space-y-5">
                <ProgressBar
                  label="Mandatory"
                  completed={completedMandatoryCredits}
                  total={totalMandatoryCredits}
                />
                <ProgressBar
                  label="Core"
                  completed={completedCoreCredits}
                  total={totalCoreCredits}
                />
                <ProgressBar
                  label="HSS Basket"
                  completed={completedHSSCredits}
                  total={totalHSSCredits}
                />
                <ProgressBar
                  label="Math Basket"
                  completed={completedMathCredits}
                  total={totalMathCredits}
                />
                <ProgressBar
                  label="Core Electives"
                  completed={completedCoreElectiveCredits}
                  total={totalCoreElectiveCredits}
                />
              </div>
            </div>

            {/* Summary */}
            <div className="dash-card">
              <div className="stat-label mb-6">Academic Summary</div>
              <div className="space-y-4 mt-5">
                <div className="flex justify-between">
                  <span>Total Credits</span>
                  <span>{totalCredits}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed Credits</span>
                  <span>{completedCredits}</span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining Credits</span>
                  <span>{remainingCredits}</span>
                </div>
                <div className="flex justify-between">
                  <span>Semester</span>
                  <span>{user?.details?.currentSemester}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}