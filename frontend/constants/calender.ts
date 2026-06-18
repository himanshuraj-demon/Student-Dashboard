interface AcademicEvent {
  id: string;
  subject: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  category: "REGISTRATION" | "CLASSES" | "EXAMS" | "RECESS" | "DEADLINE";
  audience?: string;
  semester: "Semester I" | "Semester II" | "Summer Term";
}

const CALENDAR_DATA: AcademicEvent[] = [
  // --- Semester I ---
  { id: "1", subject: "New PG Registration", startDate: "2025-07-18", endDate: "2025-07-18", category: "REGISTRATION", audience: "New PG Students", semester: "Semester I" },
  { id: "2", subject: "New UG Registration", startDate: "2025-07-20", endDate: "2025-07-20", category: "REGISTRATION", audience: "New UG Students", semester: "Semester I" },
  { id: "3", subject: "Registration (All Other Students)", startDate: "2025-08-01", endDate: "2025-08-01", category: "REGISTRATION", semester: "Semester I" },
  { id: "4", subject: "Aarohan Orientation", startDate: "2025-07-18", endDate: "2025-07-31", category: "CLASSES", audience: "New PG Students", semester: "Semester I" },
  { id: "5", subject: "Foundation Programme", startDate: "2025-07-21", endDate: "2025-08-15", category: "CLASSES", audience: "New UG Students", semester: "Semester I" },
  { id: "6", subject: "Classes Commence", startDate: "2025-08-04", endDate: "2025-08-04", category: "CLASSES", semester: "Semester I" },
  { id: "7", subject: "Late Registration Deadline", startDate: "2025-08-08", endDate: "2025-08-08", category: "DEADLINE", semester: "Semester I" },
  { id: "8", subject: "Classes Commence (UG)", startDate: "2025-08-18", endDate: "2025-08-18", category: "CLASSES", semester: "Semester I" },
  { id: "9", subject: "Course Adjustment (Add/Drop)", startDate: "2025-08-02", endDate: "2025-08-13", category: "DEADLINE", semester: "Semester I" },
  { id: "11", subject: "Last Day of Classes (Q1)", startDate: "2025-08-26", endDate: "2025-08-26", category: "CLASSES", semester: "Semester I" },
  { id: "12", subject: "Classes Commence (Q2)", startDate: "2025-08-27", endDate: "2025-08-27", category: "CLASSES", semester: "Semester I" },
  { id: "13", subject: "Last Day of Classes (Q2)", startDate: "2025-09-18", endDate: "2025-09-18", category: "CLASSES", semester: "Semester I" },
  { id: "14", subject: "Examination I", startDate: "2025-09-19", endDate: "2025-09-26", category: "EXAMS", semester: "Semester I" },
  { id: "15", subject: "Mid-Semester Recess", startDate: "2025-09-27", endDate: "2025-10-05", category: "RECESS", semester: "Semester I" },
  { id: "16", subject: "Classes Commence (Q3)", startDate: "2025-10-06", endDate: "2025-10-06", category: "CLASSES", semester: "Semester I" },
  { id: "17", subject: "Last Day of Classes (Q3)", startDate: "2025-10-28", endDate: "2025-10-28", category: "CLASSES", semester: "Semester I" },
  { id: "18", subject: "Classes Commence (Q4)", startDate: "2025-10-29", endDate: "2025-10-29", category: "CLASSES", semester: "Semester I" },
  { id: "19", subject: "Academic Pre-Registration", startDate: "2025-11-03", endDate: "2025-11-07", category: "REGISTRATION", semester: "Semester I" },
  { id: "20", subject: "Last Day for Course Drop", startDate: "2025-11-13", endDate: "2025-11-13", category: "DEADLINE", semester: "Semester I" },
  { id: "21", subject: "Last Day of Classes", startDate: "2025-11-20", endDate: "2025-11-20", category: "CLASSES", semester: "Semester I" },
  { id: "22", subject: "Examination II", startDate: "2025-11-21", endDate: "2025-11-28", category: "EXAMS", semester: "Semester I" },
  { id: "23", subject: "Winter Vacation", startDate: "2025-11-29", endDate: "2026-01-01", category: "RECESS", semester: "Semester I" },

  // --- Semester II ---
  { id: "24", subject: "Registration (PG)", startDate: "2025-12-19", endDate: "2025-12-19", category: "REGISTRATION", semester: "Semester II" },
  { id: "25", subject: "Registration (UG)", startDate: "2026-01-02", endDate: "2026-01-02", category: "REGISTRATION", semester: "Semester II" },
  { id: "26", subject: "Classes Commence", startDate: "2026-01-05", endDate: "2026-01-05", category: "CLASSES", semester: "Semester II" },
  { id: "27", subject: "Examination I", startDate: "2026-02-20", endDate: "2026-02-27", category: "EXAMS", semester: "Semester II" },
  { id: "28", subject: "Mid-Semester Recess", startDate: "2026-02-28", endDate: "2026-03-08", category: "RECESS", semester: "Semester II" },
  { id: "29", subject: "Last Day of Classes", startDate: "2026-04-23", endDate: "2026-04-23", category: "CLASSES", semester: "Semester II" },
  { id: "30", subject: "Examination II", startDate: "2026-04-24", endDate: "2026-05-01", category: "EXAMS", semester: "Semester II" },
  { id: "31", subject: "Summer Vacation", startDate: "2026-05-02", endDate: "2026-07-31", category: "RECESS", semester: "Semester II" }
];

const MONTHS_MAP = [
  { name: "July 2025", m: 6, y: 2025 },
  { name: "August 2025", m: 7, y: 2025 },
  { name: "September 2025", m: 8, y: 2025 },
  { name: "October 2025", m: 9, y: 2025 },
  { name: "November 2025", m: 10, y: 2025 },
  { name: "December 2025", m: 11, y: 2025 },
  { name: "January 2026", m: 0, y: 2026 },
  { name: "February 2026", m: 1, y: 2026 },
  { name: "March 2026", m: 2, y: 2026 },
  { name: "April 2026", m: 3, y: 2026 },
  { name: "May 2026", m: 4, y: 2026 },
  { name: "June 2026", m: 5, y: 2026 },
  { name: "July 2026", m: 6, y: 2026 }
];

export {
    CALENDAR_DATA ,MONTHS_MAP  
}