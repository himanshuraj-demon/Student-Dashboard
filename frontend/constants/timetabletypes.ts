type SlotRow = {
  Slot: string;
  M: string;
  T: string;
  W: string;
  Th: string;
  F: string;
};

type CourseEntry = {
  "Course Code": string;
  "Course Name"?: string;
  Lecture?: string;
  Lab?: string;
  Tutorial?:string
};

type EventColor = "purple" | "blue" | "green" | "pink" | "amber"|"red";

type ResolvedEvent = {
  courseCode: string;
  courseName: string;
  slotCode: string;
  type: "Lecture" | "Lab" | "Tutorial";
  room: string;
  color: EventColor;
};

interface EventCardProps {
  event: ResolvedEvent;
  slotTime: string;
  topPx: number;
  heightPx: number;
}

export type{
    EventCardProps,ResolvedEvent,CourseEntry,SlotRow,EventColor
}