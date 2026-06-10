export interface Course {
  code: string;
  title: string;
  credits: number;
}

export interface CourseBasket {
  basketName: string;
  minimumCredits: number;
  courses: Course[];
}

export interface Branch {
  branchCode: string;
  branchName: string;
  totalCredits: number;
  coreCredits: number;
  electiveCredits: number;
  mandatoryScienceBasketRequirements: string;
  mandatoryMathBasketRequirements: string;
  openElectiveRequirements: Record<string, number>;
  projectRequirements: string;
  disciplineCoreCourses: Course[];
  disciplineElectiveBaskets: CourseBasket[];
}

export type CourseType = "core" | "elective" | "basket" | "your";