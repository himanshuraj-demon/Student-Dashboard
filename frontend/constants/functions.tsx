import type { Course,CourseType } from "./types";
import { CATEGORY_COLORS } from "./types";
import { type JSX } from "react/jsx-runtime";
export function CourseRow({
  course,
  type,
  query,
}: {
  course: Course;
  type: CourseType;
  query: string;
}): JSX.Element {
  const c = CATEGORY_COLORS[type] || CATEGORY_COLORS.core;

  const highlight = (text: string): string | JSX.Element => {
    if (!query) return text;

    const idx = text.toLowerCase().indexOf(query.toLowerCase());

    if (idx === -1) return text;

    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-yellow-200 text-yellow-900 rounded px-0.5">
          {text.slice(idx, idx + query.length)}
        </mark>
        {text.slice(idx + query.length)}
      </>
    );
  };

  return (
    <li
      className={`flex items-center justify-between px-3 py-2.5 rounded-lg ${c.bg} transition-all`}>
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <span
          className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 ${c.dot}`}
        />
        <span className="text-xs font-mono font-semibold text-gray-400 shrink-0">
          {course.code}
        </span>
        <span className="text-sm font-medium text-gray-700 truncate min-w-0">
          {highlight(course.title)}
        </span>
      </div>

      <span className="text-xs font-bold text-gray-500 shrink-0 ml-2">
        {course.credits} cr
      </span>
    </li>
  );
}