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

export interface Note{
  _id:string,
  title:string,
  description:string,
  theme:{
    bg:string,
    text:string,
  }
}

export interface Todo {
  _id?: string;          
  title: string;         
  description?: string;  
  time?: string;         
  tag: "coding" | "game" | "study" | "music" | "fitness" | "personal"; 
  pinned: boolean;     
  completed: boolean;    
  createdAt?: string;    
  updatedAt?: string;    
}