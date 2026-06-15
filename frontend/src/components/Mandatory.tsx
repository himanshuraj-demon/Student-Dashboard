import React from "react";
import {instituteRequirements} from "../../constants/courses";

const COLORS = [
  "#6366f1",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#ec4899",
  "#8b5cf6",
];

type RowProps = {
  label: string;
  value: React.ReactNode;
  colorDot?: string;
};

function Row({ label, value, colorDot }: RowProps) {
  return (
    <li className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-300">
      <div className="flex items-center gap-2">
        {colorDot !== undefined && (
          <span
            className="inline-block w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: colorDot }}
          />
        )}
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </li>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-2 px-1">
        {title}
      </h2>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
}

export default function InstituteRequirements() {
  const r = instituteRequirements;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl md:text-2xl font-semibold mb-6 text-center">
        Institute Mandatory Courses
      </h1>

      {/* HSS Basket */}
      <Section title="HSS Basket">
        {r.hssBasket.mandatoryCourses.map((c, i) => (
          <Row
            key={c.code}
            colorDot={COLORS[i]}
            label={`${c.code} — ${c.title}`}
            value={`${c.credits} credits`}
          />
        ))}
        <Row
          label="Elective Credits"
          value={`${r.hssBasket.electiveCredits} credits`}
        />
        <Row
          label="General Education Credits"
          value={`${r.hssBasket.generalEducationCredits} credits`}
        />
        <Row label="Total Credits" value={`${r.hssBasket.totalCredits} credits`} />
      </Section>

      {/* Science Basket */}
      <Section title="Science Basket">
        <Row
          label="Basket Credits"
          value={`${r.scienceBasket.basketCredits} credits`}
        />
        <Row
          label="Basic Science Elective Credits"
          value={`${r.scienceBasket.basicScienceElectiveCredits} credits`}
        />
        <li className="flex items-start justify-between px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-300">
          <span className="text-sm font-medium text-gray-700">
            Allowed Areas
          </span>
          <span className="text-sm font-semibold text-gray-900 text-right max-w-xs">
            {r.scienceBasket.allowedAreas.join(", ")}
          </span>
        </li>
      </Section>

      {/* Math Basket */}
      <Section title="Math Basket">
        {r.mathBasket.mandatoryCourses.map((c, i) => (
          <Row
            key={c.code}
            colorDot={COLORS[i]}
            label={`${c.code} — ${c.title}`}
            value={`${c.credits} credits`}
          />
        ))}
        <Row
          label="Additional Basket Credits"
          value={`${r.mathBasket.basketCredits} credits`}
        />
      </Section>

      {/* Materials Basket */}
      <Section title="Materials Basket (Choose One)">
        {r.materialsBasket.options.map((c, i) => (
          <Row
            key={c.code}
            colorDot={COLORS[i]}
            label={`${c.code} — ${c.title}`}
            value={`${c.credits} credits`}
          />
        ))}
        <Row
          label="Total Credits Required"
          value={`${r.materialsBasket.totalCredits} credits`}
        />
      </Section>

      {/* Open Project */}
      <Section title="Open Project">
        <Row
          label={`Course: ${r.openProject.courseCode}`}
          value={`${r.openProject.mandatoryCredits} credits`}
        />
      </Section>

      {/* Open Electives */}
      <Section title="Open Electives">
        <Row
          label="Admitted 2022–2024"
          value={`${r.openElectives.admitted_2022_to_2024} credits`}
        />
        <Row
          label="Admitted 2025 onwards"
          value={`${r.openElectives.admitted_2025_onwards} credits`}
        />
      </Section>

      {/* Physical Education */}
      <Section title="Physical Education">
        <Row
          label="Mandatory Semesters"
          value={r.physicalEducation.mandatorySemesters}
        />
        <Row label="Credits" value={r.physicalEducation.credits} />
      </Section>

      {/* Graduation Credits */}
      <Section title="Graduation Credits">
        <Row label="Required Range" value={r.graduationCredits.range} />
      </Section>
    </div>
  );
}
