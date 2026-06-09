/* eslint-disable react-refresh/only-export-components */
const curriculumPathway1 = [
  {
    semester: 1,
    credits: 28,
    courses: [
      {
        code: "FP:100",
        title: "Foundation Programme",
        credits: 4,
        category: "foundation",
      },
      {
        code: "HS:191",
        title: "Introduction to Writing I",
        credits: 2,
        category: "humanities",
      },
      {
        code: "HS:201",
        title: "World Civilizations and Cultures",
        credits: 4,
        category: "humanities",
      },
      {
        code: "MA:103",
        title: "Calculus of Single Variable & Linear Algebra",
        credits: 4,
        category: "math",
      },
      {
        code: "ES:101",
        title: "Engineering Graphics",
        credits: 3,
        category: "engineering_science",
      },
      {
        code: "ES:112",
        title: "Computing",
        credits: 3,
        category: "engineering_science",
      },
      {
        code: "ES:115",
        title: "Design, Innovation & Prototyping",
        credits: 5,
        category: "engineering_science",
      },
      {
        code: "ES:118",
        title: "Materials for the Future",
        credits: 3,
        category: "engineering_science",
      },
      {
        code: "PE:101",
        title: "Physical Education",
        credits: 0,
        category: "physical_education",
      },
    ],
  },
  {
    semester: 2,
    credits: 22,
    courses: [
      {
        code: "GE:101",
        title: "General Education I",
        credits: 2,
        category: "general_education",
      },
      {
        code: "HS:192",
        title: "Introduction to Writing II",
        credits: 2,
        category: "humanities",
      },
      {
        code: "MA:104",
        title: "Ordinary Differential Equations",
        credits: 2,
        category: "math",
      },
      {
        code: "BS:192",
        title: "Undergraduate Science Laboratory",
        credits: 3,
        category: "basic_science",
      },
      {
        code: "ES:113",
        title: "Data Centric Computing",
        credits: 3,
        category: "engineering_science",
      },
      {
        code: "ES:114",
        title: "Probability, Statistics & Data Visualization",
        credits: 3,
        category: "engineering_science",
      },
      {
        code: "ES:116",
        title: "Principles & Applications of Electrical Engineering",
        credits: 5,
        category: "engineering_science",
      },
      {
        code: "ES:117",
        title: "The World of Engineering",
        credits: 2,
        category: "engineering_science",
      },
      {
        code: "PE:102",
        title: "Physical Education",
        credits: 0,
        category: "physical_education",
      },
    ],
  },
  {
    semester: 3,
    credits: 16,
    courses: [
      {
        code: "GE:201",
        title: "General Education II",
        credits: 2,
        category: "general_education",
      },
      {
        code: "HS:221",
        title: "Introduction to Philosophy",
        credits: 4,
        category: "humanities",
      },
      {
        code: "MA:203",
        title: "Numerical Methods",
        credits: 2,
        category: "math",
      },
      {
        code: "BS:XXX",
        title: "Science Basket",
        credits: 4,
        category: "basic_science",
      },
      {
        code: "ES:243",
        title: "Biology for Engineers",
        credits: 4,
        category: "engineering_science",
      },
      {
        code: "PE:103",
        title: "Physical Education",
        credits: 0,
        category: "physical_education",
      },
    ],
  },
  {
    semester: 4,
    credits: 10,
    courses: [
      { code: "HS:XXX", title: "Elective", credits: 4, category: "humanities" },
      {
        code: "MA:XXX",
        title: "Mathematics Basket",
        credits: 2,
        category: "math",
      },
      {
        code: "BS:XXX",
        title: "Science Basket",
        credits: 4,
        category: "basic_science",
      },
      {
        code: "PE:104",
        title: "Physical Education",
        credits: 0,
        category: "physical_education",
      },
    ],
  },
  {
    semester: 5,
    credits: 8,
    courses: [
      {
        code: "HS:151",
        title: "Economics",
        credits: 4,
        category: "humanities",
      },
      {
        code: "XX:XXX",
        title: "Open Project Course",
        credits: 4,
        category: "open_elective",
      },
    ],
  },
  {
    semester: 6,
    credits: 8,
    courses: [
      { code: "HS:XXX", title: "Elective", credits: 4, category: "humanities" },
      {
        code: "XX:XXX",
        title: "Open Elective",
        credits: 4,
        category: "open_elective",
      },
    ],
  },
  {
    semester: 7,
    credits: 8,
    courses: [
      {
        code: "XX:XXX",
        title: "Open Elective",
        credits: 4,
        category: "open_elective",
      },
      {
        code: "XX:XXX",
        title: "Open Elective",
        credits: 4,
        category: "open_elective",
      },
    ],
  },
  {
    semester: 8,
    credits: 8,
    courses: [
      {
        code: "BS:XXX",
        title: "Elective",
        credits: 4,
        category: "basic_science",
      },
      {
        code: "XX:XXX",
        title: "Open Elective",
        credits: 4,
        category: "open_elective",
      },
    ],
  },
];

const Chemical = [
  {
    semester: 1,
    credits: 26,
    courses: [
      { code: "FP 100", title: "Foundation Programme", l_t_p_c: "0-0-0-4", credits: 4 },
      { code: "HS 101-109", title: "Language", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "BE 101", title: "Introduction to Life Sciences: Fundamentals of Life", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "ES 101", title: "Engineering Graphics", l_t_p_c: "2-0-3-3", credits: 3 },
      { code: "ES 102/ES 112", title: "Introduction to Computing/ Computing", l_t_p_c: "2-0-2-3", credits: 3 },
      { code: "ES 103", title: "Introduction to Electrical Systems", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "PE 101", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 }
    ]
  },
  {
    semester: 2,
    credits: 25,
    courses: [
      { code: "HS 151", title: "Economics", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "MA 102", title: "Mathematics II", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "PH 101", title: "Physics", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "MA 101", title: "Mathematics I", l_t_p_c: "4-2-0-4", credits: 4 },
      { code: "ES 104", title: "Introduction to Analog and Digital Electronics", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "CH 202", title: "Chemistry Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "ES 105", title: "Electrical and Electronics Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "ES 106", title: "Manufacturing and Workshop practice", l_t_p_c: "2-0-3-4", credits: 4 },
      { code: "PE 102", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 },
      { code: "FP 101", title: "Intro to Engineering", l_t_p_c: "0-0-2-1", credits: 1 }
    ]
  },
  {
    semester: 3,
    credits: 24,
    courses: [
      { code: "HS 221", title: "Introduction to Philosophy", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MA 201", title: "Mathematics III", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "CH 201", title: "General Chemistry", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "ES 201", title: "Intro to Design and Innovation", l_t_p_c: "2-0-4-4", credits: 4 },
      { code: "PH 102", title: "Physics Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "ES 221", title: "Mechanics of Solids", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "ES 211", title: "Thermodynamics", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "CL 201", title: "Chemical Process Calculations", l_t_p_c: "1-2-0-2", credits: 2 },
      { code: "PE 103", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 }
    ]
  },
  {
    semester: 4,
    credits: 22,
    courses: [
      { code: "HS 201-209", title: "World Civilization/ Culture/History", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MA 202", title: "Mathematics IV", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "ES 202", title: "Introduction to Materials", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "ES 212", title: "Fluid Mechanics", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "CL 251", title: "Fluid Mechanics Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "PE 104", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 }
    ]
  },
  {
    semester: 5,
    credits: 22,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "BS Elective", title: "Basic Science Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "CL 221", title: "Chemical Engg. Thermodynamics", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "ES 311", title: "Heat and Mass Transfer", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "CL 351", title: "Heat Transfer and Thermodynamics Lab", l_t_p_c: "0-0-4-2", credits: 2 }
    ]
  },
  {
    semester: 6,
    credits: 17,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "CL 321", title: "Separation Processes", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "CL 422", title: "Process Control", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "CL 322", title: "Chemical Reaction Engineering", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "CL 352 / CL 424", title: "Mass Transfer and Reaction Engg. Lab / Process Analysis and Simulation", l_t_p_c: "1-1-4-3 / 0-0-4-2", credits: 3 }
    ]
  },
  {
    semester: 7,
    credits: 18,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "CL 451 / CL 425", title: "Process Synthesis and Design / Process Dynamics and Control Lab", l_t_p_c: "3-1-0-4 / 0-0-4-2", credits: 4 }
    ]
  },
  {
    semester: 8,
    credits: 16,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "BS Elective", title: "Basic Science Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 }
    ]
  }
];

const Civil = [
  {
    semester: 1,
    credits: 26,
    courses: [
      { code: "FP 100", title: "Foundation Programme", l_t_p_c: "0-0-0-4", credits: 4 },
      { code: "HS 101-109", title: "Language", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "BE 101", title: "Introduction to Life Sciences: Fundamentals of Life", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "MA 101", title: "Mathematics I", l_t_p_c: "4-2-0-4", credits: 4 },
      { code: "ES 101", title: "Engineering Graphics", l_t_p_c: "2-0-3-3", credits: 3 },
      { code: "ES 102/ES 112", title: "Introduction to Computing/ Computing", l_t_p_c: "2-0-2-3", credits: 3 },
      { code: "ES 103", title: "Introduction to Electrical Systems", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "PE 101", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 }
    ]
  },
  {
    semester: 2,
    credits: 25,
    courses: [
      { code: "HS 151", title: "Economics", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "MA 102", title: "Mathematics II", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "PH 101", title: "Physics", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "CH 202", title: "Chemistry Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "ES 104", title: "Introduction to Analog and Digital Electronics", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "ES 105", title: "Electrical and Electronics Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "ES 106", title: "Manufacturing and Workshop practice", l_t_p_c: "2-0-3-4", credits: 4 },
      { code: "PE 102", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 },
      { code: "FP 101", title: "Intro to Engineering", l_t_p_c: "0-0-2-1", credits: 1 }
    ]
  },
  {
    semester: 3,
    credits: 22,
    courses: [
      { code: "HS 221", title: "Introduction to Philosophy", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MA 201", title: "Mathematics III", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "CH 201", title: "General Chemistry", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "PH 102", title: "Physics Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "ES 201", title: "Intro to Design and Innovation", l_t_p_c: "2-0-4-4", credits: 4 },
      { code: "CE 201", title: "Earth Materials & Processes", l_t_p_c: "2-0-3-4", credits: 4 },
      { code: "PE 103", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 }
    ]
  },
  {
    semester: 4,
    credits: 23,
    courses: [
      { code: "HS 201-209", title: "World Civilization/ Culture/History", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MA 202", title: "Mathematics IV", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "ES 202", title: "Introduction to Materials", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "ES 212", title: "Fluid Mechanics", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "ES 221", title: "Mechanics of Solids", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "CE 202", title: "Sustainability & Environment", l_t_p_c: "1-0-3-3", credits: 3 },
      { code: "PE 104", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 }
    ]
  },
  {
    semester: 5,
    credits: 20,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "CE 301", title: "Soil Mechanics", l_t_p_c: "3-1-2-5", credits: 5 },
      { code: "CE 302", title: "Structural Analysis", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "CE 303", title: "Geospatial Engineering", l_t_p_c: "1-0-3-3", credits: 3 },
      { code: "CE 308", title: "Water Resource Engineering", l_t_p_c: "2-0-3-4", credits: 4 }
    ]
  },
  {
    semester: 6,
    credits: 20,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "CE 304", title: "Concrete Design", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "CE 305", title: "Steel Design (half semester)", l_t_p_c: "2-1-0-2", credits: 2 },
      { code: "CE 307", title: "Masonry Design (half semester)", l_t_p_c: "2-1-0-2", credits: 2 },
      { code: "CE 306", title: "Civil Engineering Materials Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "CE 403", title: "Construction Technology & Management", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "CE 309", title: "Field Survey Project", l_t_p_c: "0-0-0-2", credits: 2 }
    ]
  },
  {
    semester: 7,
    credits: 20,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "BS Elective", title: "Basic Science Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "CE 401", title: "Comprehensive Project - 1", l_t_p_c: "0-0-3-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 }
    ]
  },
  {
    semester: 8,
    credits: 16,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "BS Elective", title: "Basic Science Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 }
    ]
  }
];

const ComputerScience = [
  {
    semester: 1,
    credits: 26,
    courses: [
      { code: "FP 100", title: "Foundation Programme", l_t_p_c: "0-0-0-4", credits: 4 },
      { code: "HS 101-109", title: "Language", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MA 101", title: "Mathematics I", l_t_p_c: "4-2-0-4", credits: 4 },
      { code: "ES 101", title: "Engineering Graphics", l_t_p_c: "2-0-3-3", credits: 3 },
      { code: "ES 102/ES 112", title: "Introduction to Computing/ Computing", l_t_p_c: "2-0-2-3", credits: 3 },
      { code: "ES 103", title: "Introduction to Electrical Systems", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "BE 101", title: "Introduction to Life Sciences: Fundamentals of Life", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "PE 101", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 }
    ]
  },
  {
    semester: 2,
    credits: 25,
    courses: [
      { code: "HS 151", title: "Economics", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "MA 102", title: "Mathematics II", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "ES 104", title: "Introduction to Analog and Digital Electronics", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "ES 105", title: "Electrical and Electronics Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "ES 106", title: "Manufacturing and Workshop Practice", l_t_p_c: "2-0-3-4", credits: 4 },
      { code: "PH 101", title: "Physics", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "CH 202", title: "Chemistry Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "PE 102", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 },
      { code: "FP 101", title: "Intro to Engineering", l_t_p_c: "0-0-2-1", credits: 1 }
    ]
  },
  {
    semester: 3,
    credits: 25,
    courses: [
      { code: "HS 221", title: "Introduction to Philosophy", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MA 201", title: "Mathematics III", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "ES 201", title: "Intro to Design and Innovation", l_t_p_c: "2-0-4-4", credits: 4 },
      { code: "ES 203", title: "Digital Systems", l_t_p_c: "2-1-3-4", credits: 4 },
      { code: "ES 242", title: "Data Structures & Algorithms I", l_t_p_c: "2-0-2-3", credits: 3 },
      { code: "CH 201", title: "General Chemistry", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "PH 102", title: "Physics Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "PE 103", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 }
    ]
  },
  {
    semester: 4,
    credits: 24,
    courses: [
      { code: "HS 201-209", title: "World Civilization/ Culture/History", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MA 202", title: "Mathematics IV", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "ES 301", title: "Data Structures & Algorithms II", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "ES 214", title: "Discrete Mathematics", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "ES 215", title: "Computer Organization and Architecture", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "ES 202", title: "Introduction to Materials", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "PE 104", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 }
    ]
  },
  {
    semester: 5,
    credits: 21,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "CS 302", title: "Theory of Computation", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "CS 301", title: "Operating Systems", l_t_p_c: "3-0-2-5", credits: 5 },
      { code: "CS XXX", title: "Extended Core", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "BS Elective", title: "Basic Science Elective", l_t_p_c: "3-1-0-4", credits: 4 }
    ]
  },
  {
    semester: 6,
    credits: 21,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "CS 328", title: "Introduction to Data Science", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "CS 327", title: "Compilers", l_t_p_c: "3-0-2-5", credits: 5 },
      { code: "CS XXX", title: "Extended Core", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "CS XXX", title: "Extended Core", l_t_p_c: "3-0-0-4", credits: 4 }
    ]
  },
  {
    semester: 7,
    credits: 16,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "BS Elective", title: "Basic Science Elective", l_t_p_c: "3-1-0-4", credits: 4 }
    ]
  },
  {
    semester: 8,
    credits: 12,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 }
    ]
  }
];

const Electrical = [
  {
    semester: 1,
    credits: 26,
    courses: [
      { code: "FP 100", title: "Foundation Programme", l_t_p_c: "0-0-0-4", credits: 4 },
      { code: "BE 101", title: "Introduction to Life Sciences: Fundamentals of Life", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "MA 101", title: "Mathematics I", l_t_p_c: "4-2-0-4", credits: 4 },
      { code: "ES 101", title: "Engineering Graphics", l_t_p_c: "2-0-3-3", credits: 3 },
      { code: "ES 102/ES 112", title: "Introduction to Computing/ Computing", l_t_p_c: "2-0-2-3", credits: 3 },
      { code: "ES 103", title: "Introduction to Electrical Systems", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "PE 101", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 }
    ]
  },
  {
    semester: 2,
    credits: 25,
    courses: [
      { code: "HS 151", title: "Economics", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "HS 101-109", title: "Language", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MA 102", title: "Mathematics II", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "PH 101", title: "Physics", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "CH 202", title: "Chemistry Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "ES 104", title: "Introduction to Analog and Digital Electronics", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "ES 105", title: "Electrical and Electronics Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "ES 106", title: "Manufacturing and Workshop Practice", l_t_p_c: "2-0-3-4", credits: 4 },
      { code: "PE 102", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 },
      { code: "FP 101", title: "Intro to Engineering", l_t_p_c: "0-0-2-1", credits: 1 }
    ]
  },
  {
    semester: 3,
    credits: 25,
    courses: [
      { code: "HS 221", title: "Introduction to Philosophy", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MA 201", title: "Mathematics III", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "CH 201", title: "General Chemistry", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "PH 102", title: "Physics Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "ES 201", title: "Intro to Design and Innovation", l_t_p_c: "2-0-4-4", credits: 4 },
      { code: "ES 203", title: "Digital Systems", l_t_p_c: "2-1-3-4", credits: 4 },
      { code: "EE 221", title: "Electronic Devices", l_t_p_c: "2-1-0-3", credits: 3 },
      { code: "PE 103", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 }
    ]
  },
  {
    semester: 4,
    credits: 20,
    courses: [
      { code: "HS 201-209", title: "World Civilization/ Culture/History", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "ES 202", title: "Introduction to Materials", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "EE 331", title: "Electrical Machines", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "ES 216", title: "Signals, Systems and Networks", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "PE 104", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 }
    ]
  },
  {
    semester: 5,
    credits: 21,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MA 202", title: "Mathematics IV", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "EE 321", title: "Analog Circuits", l_t_p_c: "3-1-3-5", credits: 5 },
      { code: "EE 311", title: "Electromagnetic Waves", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "EE 431", title: "Electrical Systems Lab", l_t_p_c: "0-0-3-2", credits: 2 }
    ]
  },
  {
    semester: 6,
    credits: 20,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "EE 332", title: "Probability & Random Processes", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "ES 331", title: "Power Systems", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "ES 332", title: "Control Theory", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "EE 333", title: "Power Electronics", l_t_p_c: "2-1-3-4", credits: 4 }
    ]
  },
  {
    semester: 7,
    credits: 22,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "ES 333", title: "Microprocessors & Embedded Systems", l_t_p_c: "2-1-2-4", credits: 4 },
      { code: "EE 341", title: "Communication Systems", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "BS Elective", title: "Basic Science Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "EE 411", title: "Digital Signal Processing", l_t_p_c: "3-1-0-4", credits: 4 }
    ]
  },
  {
    semester: 8,
    credits: 16,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "BS Elective", title: "Basic Science Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 }
    ]
  }
];

const Materials = [
  {
    semester: 1,
    credits: 26,
    courses: [
      { code: "FP 100", title: "Foundation Programme", l_t_p_c: "0-0-0-4", credits: 4 },
      { code: "HS 101-109", title: "Language", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "BE 101", title: "Introduction to Life Sciences: Fundamentals of Life", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "MA 101", title: "Mathematics I", l_t_p_c: "4-2-0-4", credits: 4 },
      { code: "ES 101", title: "Engineering Graphics", l_t_p_c: "2-0-3-3", credits: 3 },
      { code: "ES 102/ES 112", title: "Introduction to Computing/ Computing", l_t_p_c: "2-0-2-3", credits: 3 },
      { code: "ES 103", title: "Introduction to Electrical Systems", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "PE 101", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 }
    ]
  },
  {
    semester: 2,
    credits: 25,
    courses: [
      { code: "HS 151", title: "Economics", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "MA 102", title: "Mathematics II", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "PH 101", title: "Physics", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "CH 202", title: "Chemistry Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "ES 104", title: "Introduction to Analog and Digital Electronics", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "ES 105", title: "Electrical and Electronics Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "ES 106", title: "Manufacturing and Workshop practice", l_t_p_c: "2-0-3-4", credits: 4 },
      { code: "PE 102", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 },
      { code: "FP 101", title: "Intro to Engineering", l_t_p_c: "0-0-2-1", credits: 1 }
    ]
  },
  {
    semester: 3,
    credits: 26,
    courses: [
      { code: "HS 221", title: "Introduction to Philosophy", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MA 201", title: "Mathematics III", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "CH 201", title: "General Chemistry", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "PH 102", title: "Physics Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "ES 201", title: "Intro to Design and Innovation", l_t_p_c: "2-0-4-4", credits: 4 },
      { code: "ES 211", title: "Thermodynamics", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "ES 202", title: "Introduction to Materials", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "PE 103", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 }
    ]
  },
  {
    semester: 4,
    credits: 25,
    courses: [
      { code: "HS 201-209", title: "World Civilization/ Culture/History", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MA 202", title: "Mathematics IV", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "ES 212", title: "Fluid Mechanics", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "ES 221", title: "Mechanics of Solids", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "MSE 209", title: "Material Thermodynamics and Kinetics", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "MSE 201", title: "Microstructural Engineering", l_t_p_c: "3-0-2-5", credits: 5 },
      { code: "PE 104", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 }
    ]
  },
  {
    semester: 5,
    credits: 21,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MSE 303", title: "Mechanical Behaviour of materials", l_t_p_c: "3-0-2-5", credits: 5 },
      { code: "MSE 304", title: "Principle of Metal Extraction & refining", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MSE 305", title: "Advanced Materials", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MSE 310", title: "Physics of Materials", l_t_p_c: "3-0-0-4", credits: 4 }
    ]
  },
  {
    semester: 6,
    credits: 20,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "BS Elective", title: "Basic Science Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "MSE 307", title: "Materials Processing", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MSE 352", title: "Material characterization techniques", l_t_p_c: "2-0-3-4", credits: 4 },
      { code: "MSE 302", title: "Corrosion & Degradation of Materials", l_t_p_c: "3-0-0-4", credits: 4 }
    ]
  },
  {
    semester: 7,
    credits: 16,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MSE 402", title: "Computational Process Design", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 }
    ]
  },
  {
    semester: 8,
    credits: 16,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "BS Elective", title: "Basic Science Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 }
    ]
  }
];

const Mechanical = [
  {
    semester: 1,
    credits: 26,
    courses: [
      { code: "FP 100", title: "Foundation Programme", l_t_p_c: "0-0-0-4", credits: 4 },
      { code: "HS 101-109", title: "Language", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MA 101", title: "Mathematics I", l_t_p_c: "4-2-0-4", credits: 4 },
      { code: "ES 102/ES 112", title: "Introduction to Computing/ Computing", l_t_p_c: "2-0-2-3", credits: 3 },
      { code: "ES 103", title: "Introduction to Electrical Systems", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "BE 101", title: "Introduction to Life Sciences: Fundamentals of Life", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "PE 101", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 }
    ]
  },
  {
    semester: 2,
    credits: 25,
    courses: [
      { code: "HS 151", title: "Economics", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "MA 102", title: "Mathematics II", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "ES 104", title: "Introduction to Analog and Digital Electronics", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "ES 101", title: "Engineering Graphics", l_t_p_c: "2-0-3-3", credits: 3 },
      { code: "ES 106", title: "Manufacturing and Workshop Practice", l_t_p_c: "2-0-3-4", credits: 4 },
      { code: "ES 105", title: "Electrical and Electronics Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "PH 101", title: "Physics", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "CH 202", title: "Chemistry Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "PE 102", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 },
      { code: "FP 101", title: "Intro to Engineering", l_t_p_c: "0-0-2-1", credits: 1 }
    ]
  },
  {
    semester: 3,
    credits: 26,
    courses: [
      { code: "HS 221", title: "Introduction to Philosophy", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MA 201", title: "Mathematics III", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "ES 201", title: "Introduction to Design & Innovation", l_t_p_c: "2-0-4-4", credits: 4 },
      { code: "CH 201", title: "General Chemistry", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "ES 211", title: "Thermodynamics", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "PH 102", title: "Physics Lab", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "PE 103", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 }
    ]
  },
  {
    semester: 4,
    credits: 20,
    courses: [
      { code: "HS 201-209", title: "World Civilization/ Culture/History", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "MA 202", title: "Mathematics IV", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "ES 202", title: "Introduction to Materials", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "ES 221", title: "Mechanics of Solids", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "ES 212", title: "Fluid Mechanics", l_t_p_c: "3-2-0-4", credits: 4 },
      { code: "PE 104", title: "Physical Education", l_t_p_c: "0-0-0-0", credits: 0 }
    ]
  },
  {
    semester: 5,
    credits: 18,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "ES 311", title: "Heat and Mass Transfer", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "ME 321", title: "Mechanics of Deformable Bodies", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "ME 351", title: "Mechanical Engineering Lab - I", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "ME 331", title: "Manufacturing Processes & Systems", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "ES 321", title: "Dynamics and Vibration", l_t_p_c: "3-1-0-4", credits: 4 }
    ]
  },
  {
    semester: 6,
    credits: 20,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "ES 332", title: "Control Theory", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "ME 322", title: "Synthesis and Analysis of Mechanisms", l_t_p_c: "2-1-2-4", credits: 4 },
      { code: "ME 332", title: "Industrial Engineering & Operations Research", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "ME 352", title: "Mechanical Engineering Lab - II", l_t_p_c: "0-0-4-2", credits: 2 },
      { code: "ME 361", title: "Integrated Design and Manufacturing - I", l_t_p_c: "0-1-4-2", credits: 2 }
    ]
  },
  {
    semester: 7,
    credits: 18,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "ME 461", title: "Integrated Design & Manufacturing - II", l_t_p_c: "0-1-4-2", credits: 2 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "BS Elective", title: "Basic Science Elective", l_t_p_c: "3-1-0-4", credits: 4 }
    ]
  },
  {
    semester: 8,
    credits: 16,
    courses: [
      { code: "HS Elective", title: "Humanities & Social Sciences Elective", l_t_p_c: "3-0-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "Open Elective", title: "Open Elective", l_t_p_c: "3-1-0-4", credits: 4 },
      { code: "BS Elective", title: "Basic Science Elective", l_t_p_c: "3-1-0-4", credits: 4 }
    ]
  }
];
export {
    curriculumPathway1,Chemical,Civil,ComputerScience,Electrical,Mechanical,Materials
}