const COURSES: CourseEntry[] = [
  {
    "Course Code": "GE 101",
    "Course Name": "General Education I",
    "Credits": 2,
    "Lecture": "P1,P2\n(Central Arcade,Jagdish Patel Learning Theatre)"
  },
  {
    "Course Code": "MA 104 (E)",
    "Course Name": "Ordinary Differential Equations (first half)",
    "Credits": 2,
    "Lecture": "E1,E2\n(Jasubhai Auditorium)",
    "Tutorial": "H2\n(7/101,7/210,7/103,7/104,7/105,7/201,7/204)"
  },
  {
    "Course Code": "MA 104 (H)",
    "Course Name": "Ordinary Differential Equations (first half)",
    "Credits": 2,
    "Lecture": "E1,E2\n(Jagdish Patel Learning Theatre)",
    "Tutorial": "H2\n(7/205,7/206,7/207)"
  },
  {
    "Course Code": "ES 113 (E)",
    "Course Name": "Data-Centric Computing",
    "Credits": 3,
    "Lecture": "D1\n(Jasubhai Auditorium)",
    "Lab": "N1\n(10/104,10/105,10/203,10/204)"
  },
  {
    "Course Code": "ES 113 (H)",
    "Course Name": "Data-Centric Computing",
    "Credits": 3,
    "Lecture": "D2\n(Jasubhai Auditorium)",
    "Lab": "L1\n(10/104,10/105)"
  },
  {
    "Course Code": "ES 119 (E)",
    "Course Name": "Principles of Artificial Intelligence",
    "Credits": 4,
    "Lecture": "D1,A1\n(Jasubhai Auditorium)",
    "Lab": "J1,L1\n(10/103,10/104,Harsha Patel Learning Theatre)"
  },
  {
    "Course Code": "ES 119 (H)",
    "Course Name": "Principles of Artificial Intelligence",
    "Credits": 4,
    "Lecture": "C1,A2\n(Jayshree S Sheth Learning Theatre)"
  },
  {
    "Course Code": "ES 114 (E)",
    "Course Name": "Probability, Statistics, and Data Visualization",
    "Credits": 3,
    "Lecture": "C1\n(Jasubhai Auditorium)",
    "Lab": "K2\n(10/104,Jasubhai Auditorium)"
  },
  {
    "Course Code": "ES 114 (H)",
    "Course Name": "Probability, Statistics, and Data Visualization",
    "Credits": 3,
    "Lecture": "D1\n(11/102)",
    "Lab": "L2\n(10/104,10/105)"
  },
  {
    "Course Code": "ES 116 (E)",
    "Course Name": "Principles and Applications of Electrical Engineering",
    "Credits": 5,
    "Lecture": "G1,G2\n(Jasubhai Auditorium)",
    "Tutorial": "N2 (7/101,7/103,7/106,7/107,7/109,7/110,7/202,7/204,7/206,7/207)",
    "Lab": "I1,J2,M1,L2,M2\n(EE Lab)"
  },
  {
    "Course Code": "ES 116 (H)",
    "Course Name": "Principles and Applications of Electrical Engineering",
    "Credits": 5,
    "Lecture": "G1,G2\n(10/103)"
  },
  {
    "Course Code": "ES 117 (E)",
    "Course Name": "The World of Engineering",
    "Credits": 2,
    "Lab": "K1,H1\n(Jasubhai Auditorium)"
  },
  {
    "Course Code": "ES 117 (H)",
    "Course Name": "The World of Engineering",
    "Credits": 2,
    "Lab": "K1,H1\n(Harsha Patel Learning Theatre)"
  },
  {
    "Course Code": "CE 202",
    "Course Name": "Sustainability and Environment",
    "Credits": 3,
    "Lecture": "B1\n(10/102)",
    "Lab": "B2,I2\n(10/102)"
  },
  {
    "Course Code": "CS 203",
    "Course Name": "Software Tools & Techniques for AI",
    "Credits": 4,
    "Lecture": "I2\n(10/103)",
    "Lab": "B1,B2\n(10/105,Jasubhai Auditorium)"
  },
  {
    "Course Code": "ES 211",
    "Course Name": "Thermodynamics",
    "Credits": 3,
    "Lecture": "B1,B2\n(10/103)",
    "Tutorial": "I2\n(Jagdish Patel Learning Theatre,7/106,7/107)"
  },
  {
    "Course Code": "ES 214",
    "Course Name": "Discrete Mathematics",
    "Credits": 4,
    "Lecture": "B1,B2\n(Jayshree S Sheth Learning Theatre)",
    "Tutorial": "I2\n(Surendra C Sheth Learning Theatre,7/201)"
  },
  {
    "Course Code": "EE 225",
    "Course Name": "Unveiling the Semiconductor World",
    "Credits": 2,
    "Lecture": "D2\n(Jagdish Patel Learning Theatre)"
  },
  {
    "Course Code": "EE 226",
    "Course Name": "Semiconductor Devices",
    "Credits": 4,
    "Lecture": "B1,B2\n(Jagdish Patel Learning Theatre)",
    "Tutorial": "I2\n(Jayshree S Sheth Learning Theatre,7/209)"
  },
  {
    "Course Code": "HS 192",
    "Course Name": "Introduction to writing II",
    "Credits": 2,
    "Tutorial": "F1,F2\n(Jasubhai Auditorium) - Quads 1,2 only\n(7/101,7/102,7/103,7/104,7/201,7/207,7/208,7/209,11/101)"
  },
  {
    "Course Code": "MSE 207",
    "Course Name": "Structure of Materials",
    "Credits": 4,
    "Lecture": "B1,B2\n(7/210)",
    "Tutorial": "I2\n(7/101)"
  },
  {
    "Course Code": "PE 102",
    "Course Name": "Physical Education",
    "Credits": 0
  },
  {
    "Course Code": "IN 102",
    "Course Name": "Comprehensive Viva Voce",
    "Credits": 0
  },
  {
    "Course Code": "CS 201",
    "Course Name": "Theory of Computing",
    "Credits": 4,
    "Lecture": "C1,C2\n(Jagdish Patel Learning Theatre)",
    "Tutorial": "H2\n(Jagdish Patel Learning Theatre,11/101)"
  },
  {
    "Course Code": "PH 201",
    "Course Name": "Introduction to Electrodynamics",
    "Credits": 4,
    "Lecture": "P1,P2\n(Surendra C Sheth Learning Theatre)",
    "Tutorial": "B2\n(7/208,7/209)"
  },
  {
    "Course Code": "PH 203",
    "Course Name": "Solid State Physics",
    "Credits": 4,
    "Lecture": "E1,E2\n(Surendra C Sheth Learning Theatre)",
    "Tutorial": "H1\n(7/203)"
  },
  {
    "Course Code": "CL 202",
    "Course Name": "Chemical Engineering Thermodynamics",
    "Credits": 3,
    "Lecture": "G1,G2\n(7/108)",
    "Tutorial": "G1,G2\n(7/108)"
  },
  {
    "Course Code": "CL 203",
    "Course Name": "Process Fluid Mechanics",
    "Credits": 3,
    "Lecture": "A1,H2\n(Harsha Patel Learning Theatre)",
    "Tutorial": "C1\n(Harsha Patel Learning Theatre)"
  },
  {
    "Course Code": "CL 204",
    "Course Name": "Heat Transfer",
    "Credits": 3,
    "Lecture": "D1,D2\n(10/102)",
    "Tutorial": "D1,D2\n(10/102)"
  },
  {
    "Course Code": "MA 203",
    "Course Name": "Numerical Methods (second half)",
    "Credits": 2,
    "Lecture": "F1,F2\n(Jasubhai Auditorium)",
    "Tutorial": "L2\n(7/101,7/210,7/103,7/104,7/105,7/201,7/204,7/205,7/202,7/203)"
  },
  {
    "Course Code": "MA 204",
    "Course Name": "Introduction to Partial Differential Equations (second half)",
    "Credits": 2,
    "Lecture": "D1,D2\n(7/106)",
    "Tutorial": "A1\n(7/207)"
  },
  {
    "Course Code": "CL 205",
    "Course Name": "Chemical Reaction Engineering - I",
    "Credits": 3,
    "Lecture": "I1,J2\n(Harsha Patel Learning Theatre)",
    "Tutorial": "I1,J2\n(Harsha Patel Learning Theatre)"
  },
  {
    "Course Code": "ME 209",
    "Course Name": "Principles of Manufacturing Processes",
    "Credits": 3,
    "Lecture": "G1,G2\n(7/209)",
    "Tutorial": "A2\n(7/209)"
  },
  {
    "Course Code": "ES 221",
    "Course Name": "Mechanics of Solids",
    "Credits": 4,
    "Lecture": "C1,C2\n(7/208)",
    "Tutorial": "B1\n(7/102,7/105,7/107)"
  },
  {
    "Course Code": "ES 212",
    "Course Name": "Fluid Mechanics",
    "Credits": 4,
    "Lecture": "G1,G2\n(7/101)",
    "Tutorial": "H2\n(7/108)"
  },
  {
    "Course Code": "ES 246",
    "Course Name": "Vacuum Technology Laboratory",
    "Credits": 2,
    "Lab": "I1,K1\n(10/103,MSE Lab)"
  },
  {
    "Course Code": "ES 247",
    "Course Name": "IC Fabrication Processes",
    "Credits": 4,
    "Lecture": "G1,G2\n(11/101)"
  },
  {
    "Course Code": "EE 227",
    "Course Name": "CMOS Circuit Design",
    "Credits": 4,
    "Lecture": "D2,J2\n(Jayshree S Sheth Learning Theatre)",
    "Tutorial": "J2\n(Jayshree S Sheth Learning Theatre)",
    "Lab": "B1,D1\n(10/104)"
  },
  {
    "Course Code": "ME 207",
    "Course Name": "Fluid Dynamics",
    "Credits": 5,
    "Lecture": "D1,D2\n(Surendra C Sheth Learning Theatre)",
    "Tutorial": "A1\n(7/208,7/209)",
    "Lab": "I1\n(Surendra C Sheth Learning Theatre)"
  },
  {
    "Course Code": "ME 208",
    "Course Name": "Vibrations",
    "Credits": 2,
    "Lecture": "K1,K2\n(7/209)",
    "Tutorial": "J2\n(7/209)"
  },
  {
    "Course Code": "ME 333",
    "Course Name": "Mechanics of Materials",
    "Credits": 3,
    "Lecture": "L1,L2\n(7/109)",
    "Tutorial": "L1,L2\n(7/109)",
    "Lab": "J2\n(ME Lab)"
  },
  {
    "Course Code": "CE 302",
    "Course Name": "Structural Analysis",
    "Credits": 4,
    "Lecture": "E1,E2\n(7/101)",
    "Tutorial": "A1\n(7/101)"
  },
  {
    "Course Code": "CS 303",
    "Course Name": "Mathematical Foundations for AI",
    "Credits": 4,
    "Lecture": "G1,G2\n(Harsha Patel Learning Theatre)",
    "Tutorial": "K2\n(Surendra C Sheth Learning Theatre)"
  },
  {
    "Course Code": "MSE 315",
    "Course Name": "Introduction to Computational Materials Engineering",
    "Credits": 4,
    "Lecture": "G1,G2\n(7/210)",
    "Tutorial": "D1\n(7/203)",
    "Lab": "I1\n(7/202)"
  },
  {
    "Course Code": "MSE 205",
    "Course Name": "Mechanical Behavior of Materials",
    "Credits": 4,
    "Lecture": "L1,D2\n(7/205)",
    "Lab": "K1\n(MSE Lab)"
  },
  {
    "Course Code": "MSE 206",
    "Course Name": "Physics of Materials",
    "Credits": 4,
    "Lecture": "C1,C2\n(7/103)"
  },
  {
    "Course Code": "MSE 210",
    "Course Name": "Microstructural Engineering",
    "Credits": 4,
    "Lecture": "A1,A2\n(7/105)",
    "Lab": "J2\n(MSE Lab)"
  },
  {
    "Course Code": "EE 224",
    "Course Name": "Power Systems",
    "Credits": 4,
    "Lecture": "G1,G2\n(7/208)",
    "Tutorial": "H2\n(7/102,7/107)"
  },
  {
    "Course Code": "ES 245",
    "Course Name": "Control Systems",
    "Credits": 4,
    "Lecture": "A1,A2\n(Jagdish Patel Learning Theatre)",
    "Tutorial": "K1\n(7/202,7/108,7/109)"
  },
  {
    "Course Code": "ES 301",
    "Course Name": "Data Structures and Algorithms II",
    "Credits": 4,
    "Lecture": "M1,M2\n(Jagdish Patel Learning Theatre)",
    "Tutorial": "J1\n(Jagdish Patel Learning Theatre,7/205,7/110)"
  },
  {
    "Course Code": "ES 336",
    "Course Name": "Computer Organization & Architecture",
    "Credits": 4,
    "Lecture": "N1,N2\n(Jasubhai Auditorium)",
    "Tutorial": "H1 (11/101,7/209)\nE2 (11/101,7/209)\nB2 (11/102,Harsha Patel Learning Theatre)"
  },
  {
    "Course Code": "PE 104",
    "Course Name": "Physical Education",
    "Credits": 0
  },
  {
    "Course Code": "IN 103",
    "Course Name": "Comprehensive Viva Voce",
    "Credits": 0
  },
  {
    "Course Code": "CS 328",
    "Course Name": "Introduction to Data Science",
    "Credits": 4,
    "Lecture": "M1,M2\n(10/103)",
    "Tutorial": "J2\n(10/103,11/101,11/102)"
  },
  {
    "Course Code": "ES 335",
    "Course Name": "Machine Learning",
    "Credits": 4,
    "Lecture": "D1,D2\n(10/103)",
    "Tutorial": "H1,N1\n(10/103,Jayshree S Sheth Learning Theatre)"
  },
  {
    "Course Code": "CS XXX",
    "Course Name": "Discipline Elective",
    "Credits": NaN
  },
  {
    "Course Code": "IN 106",
    "Course Name": "Comprehensive Viva Voce (Third Year B.Tech. Students)",
    "Credits": 0
  },
  {
    "Course Code": "CL 316",
    "Course Name": "Separation Processes - II",
    "Credits": 3,
    "Lecture": "G1,G2\n(7/107)",
    "Tutorial": "G1,G2\n(7/107)"
  },
  {
    "Course Code": "CL 317",
    "Course Name": "Process Synthesis, Design, and Simulation",
    "Credits": 4,
    "Lecture": "E1\n(7/202)",
    "Lab": "K1,H1\n(10/104)"
  },
  {
    "Course Code": "CL 325",
    "Course Name": "Transport Phenomena",
    "Credits": 3,
    "Lecture": "D1,D2\n(7/102)",
    "Tutorial": "D1,D2\n(7/102)"
  },
  {
    "Course Code": "CL 327",
    "Course Name": "Integrated Chemical Engineering Lab-II",
    "Credits": 2,
    "Lab": "J1,L1\n(CL Lab)"
  },
  {
    "Course Code": "HS XXX",
    "Course Name": "HSS Elective",
    "Credits": NaN
  },
  {
    "Course Code": "IN 108",
    "Course Name": "Comprehensive Viva Voce (Fourth Year B.Tech. Students)",
    "Credits": 0
  },
  {
    "Course Code": "CE 313",
    "Course Name": "Environmental Science and Engineering",
    "Credits": 4,
    "Lecture": "D1,D2\n(7/108)"
  },
  {
    "Course Code": "CE 311",
    "Course Name": "Design of Reinforced Concrete Structures",
    "Credits": 5,
    "Lecture": "G1,G2\n(7/103)",
    "Tutorial": "L2\n(7/206,7/102)",
    "Lab": "N2\n(CE Lab)"
  },
  {
    "Course Code": "CE 314",
    "Course Name": "Geotechnical Engineering",
    "Credits": 4,
    "Lecture": "F1\n(7/206)",
    "Tutorial": "F2\n(7/206)",
    "Lab": "K1,H1\n(CE Lab)"
  },
  {
    "Course Code": "CE 403",
    "Course Name": "Construction Technology & Management",
    "Credits": 4,
    "Lecture": "C1,C2\n(7/209)"
  },
  {
    "Course Code": "EE 313",
    "Course Name": "Communication Systems",
    "Credits": 3,
    "Lecture": "J1,J2\n(7/208)",
    "Tutorial": "L2\n(7/209)"
  },
  {
    "Course Code": "EE 341",
    "Course Name": "Communication Systems",
    "Credits": 4,
    "Lecture": "J1,J2\n(Surendra C Sheth Learning Theatre)",
    "Tutorial": "L2,N2\n(Harsha Patel Learning Theatre)"
  },
  {
    "Course Code": "ME 335",
    "Course Name": "Synthesis and Analysis of Mechanisms",
    "Credits": 3,
    "Lecture": "D1,D2\n(7/208)",
    "Lab": "I1\n(Makers Bhavan)"
  },
  {
    "Course Code": "ME 337",
    "Course Name": "Mechanical Systems Design",
    "Credits": 3,
    "Lecture": "C1,C2\n(7/109)"
  },
  {
    "Course Code": "ES 337",
    "Course Name": "Energy Systems",
    "Credits": 3,
    "Lecture": "F1,F2\n(Jagdish Patel Learning Theatre)"
  },
  {
    "Course Code": "MSE 312",
    "Course Name": "Materials and Environment",
    "Credits": 2,
    "Lecture": "E1\n(13/124)"
  },
  {
    "Course Code": "MSE 316",
    "Course Name": "Corrosion and Degradation of Materials",
    "Credits": 4,
    "Lecture": "L1,L2\n(7/110)",
    "Tutorial": "M1\n(7/110)",
    "Lab": "P1\n(MSE Lab)"
  },
  {
    "Course Code": "FP 501",
    "Course Name": "Aarohan (For 2026 MSc and MA students)",
    "Credits": 2
  },
  {
    "Course Code": "FP 601",
    "Course Name": "Aarohan (For 2026 MTech, PGDIIT and PhD students)",
    "Credits": 2
  },
  {
    "Course Code": "PE 500",
    "Course Name": "Physical Education (For 2022 MSc and MA students)",
    "Credits": 0
  },
  {
    "Course Code": "PE 600",
    "Course Name": "Physical Education (For 2022 M Tech and PhD students)",
    "Credits": 0
  },
  {
    "Course Code": "IN 502",
    "Course Name": "Comprehensive Viva Voce",
    "Credits": 0,
    "Lecture": "A1,B1,A2,B2,C2\n(11/204,11/206)"
  },
  {
    "Course Code": "IN 602",
    "Course Name": "Comprehensive Viva Voce",
    "Credits": 0,
    "Lecture": "A1,B1,A2,B2,C2\n(11/204,11/206)"
  },
  {
    "Course Code": "IN 102/104/106\nIN 107/108/110",
    "Course Name": "Comprehensive Viva Voce",
    "Credits": 0,
    "Lecture": "C2,N1\n(11/204,11/206,10/203)"
  },
  {
    "Course Code": "ES 404",
    "Course Name": "Networks and Complex Systems",
    "Credits": 4,
    "Lecture": "G1,G2\n(7/207,7/110)"
  },
  {
    "Course Code": "ES 622",
    "Course Name": "Finite Element Methods",
    "Credits": 4,
    "Lecture": "Tuesday & Thursday (6:30 PM to 7:50 PM)\n(7/202)"
  },
  {
    "Course Code": "CE 602",
    "Course Name": "Analysis and Design of Foundation Systems",
    "Credits": 5,
    "Lecture": "M1,M2\n(7/207)",
    "Lab": "J1,L1\n(CE Lab)"
  },
  {
    "Course Code": "CE 605",
    "Course Name": "Remote Sensing of Land and Water Resources",
    "Credits": 4,
    "Lecture": "M1,M2\n(7/101)"
  },
  {
    "Course Code": "CE 615",
    "Course Name": "Structural Design for Fire",
    "Credits": 4,
    "Lecture": "M1,M2\n(7/107)"
  },
  {
    "Course Code": "CE 628",
    "Course Name": "Applied Hydraulic Transients",
    "Credits": 4,
    "Lecture": "J1,J2\n(13/124)"
  },
  {
    "Course Code": "CE 629",
    "Course Name": "Geosynthetics",
    "Credits": 4,
    "Lecture": "L1,L2\n(13/124)"
  },
  {
    "Course Code": "CE 632",
    "Course Name": "Advanced Concrete Design",
    "Credits": 4,
    "Lecture": "K1,K2\n(7/204)"
  },
  {
    "Course Code": "CE 636",
    "Course Name": "Traffic and Roadway Engineering",
    "Credits": 4,
    "Lecture": "E1,E2\n(11/206)"
  },
  {
    "Course Code": "CE 639",
    "Course Name": "AI for Civil Engineering",
    "Credits": 4,
    "Lecture": "C1,C2\n(7/104)"
  },
  {
    "Course Code": "CE 691-I",
    "Course Name": "Special Topics in Civil Engineering: Design for Dynamic Loads",
    "Credits": 4,
    "Lecture": "P1,P2\n(13/124)"
  },
  {
    "Course Code": "CE 691-V",
    "Course Name": "Special Topics in Civil Engineering: Geotechnical Infrastructure Projects",
    "Credits": 4,
    "Lecture": "I1,I2\n(7/203)"
  },
  {
    "Course Code": "CE 691-VII",
    "Course Name": "Special Topics: Drinking Water Treatment : Engineering Practices",
    "Credits": 4,
    "Lecture": "N1,N2\n(7/102)"
  },
  {
    "Course Code": "CE 641",
    "Course Name": "Management of Water Resources Systems (second half)",
    "Credits": 2,
    "Lecture": "M1,M2\n(7/201)"
  },
  {
    "Course Code": "ES 418",
    "Course Name": "Financial Modeling and Engineering",
    "Credits": 4,
    "Lecture": "Monday & Wednesday (6:30 PM to 7:50 PM)\n(Jayshree S Sheth Learning Theatre)"
  },
  {
    "Course Code": "CL 605",
    "Course Name": "Colloidal Domain: Where Science Meets Engineering",
    "Credits": 4,
    "Lecture": "C1,C2\n(7/202)"
  },
  {
    "Course Code": "CL 353",
    "Course Name": "Introduction to Process Safety",
    "Credits": 2,
    "Lecture": "A2\n(7/208)"
  },
  {
    "Course Code": "ES 617",
    "Course Name": "Design of Experiments",
    "Credits": 4,
    "Lecture": "N1,N2\n(10/102)"
  },
  {
    "Course Code": "CL 627",
    "Course Name": "Particulate Solids: Processing & Surface Engineering",
    "Credits": 4,
    "Lecture": "H1,P2\n(7/103)"
  },
  {
    "Course Code": "CL 629",
    "Course Name": "Fundamentals of Aerosol Science",
    "Credits": 4,
    "Lecture": "I1,K2\n(11/101)"
  },
  {
    "Course Code": "CL 628",
    "Course Name": "Liquid State Theory",
    "Credits": 4,
    "Lecture": "E1,D2\n(11/102)",
    "Tutorial": "K1\n(7/207)"
  },
  {
    "Course Code": "CL 630",
    "Course Name": "Catalyst Design for Heterogeneous Reactions",
    "Credits": 4,
    "Lecture": "K1,L1\n(7/201)"
  },
  {
    "Course Code": "CL 631",
    "Course Name": "Pharmaceutical Crystallization",
    "Credits": 4,
    "Lecture": "I1,J2\n(11/206)"
  },
  {
    "Course Code": "CL 632",
    "Course Name": "Advanced Separation Processes",
    "Credits": 4,
    "Lecture": "A1,A2\n(7/206)",
    "Tutorial": "B1\n(7/101)"
  },
  {
    "Course Code": "CL 633",
    "Course Name": "Applications of AI in Chemical Engineering",
    "Credits": 4,
    "Lecture": "F1,F2\n(10/102)",
    "Tutorial": "H2\n(7/110)"
  },
  {
    "Course Code": "ES 658",
    "Course Name": "Molecular Simulations – Theory and Applications",
    "Credits": 4,
    "Lecture": "N1,N2\n(7/108)",
    "Tutorial": "P1\n(7/108)"
  },
  {
    "Course Code": "CH 203",
    "Course Name": "Fundamentals and Applications of Spectroscopy",
    "Credits": 4,
    "Lecture": "K1,K2\n(Jayshree S Sheth Learning Theatre)"
  },
  {
    "Course Code": "CH 503",
    "Course Name": "Fundamentals of Analytical Chemistry",
    "Credits": 4,
    "Lecture": "N1,N2\n(7/104)"
  },
  {
    "Course Code": "CH 512",
    "Course Name": "Reactions and Mechanisms in Organic Chemistry",
    "Credits": 4,
    "Lecture": "F1,F2\n(7/108)"
  },
  {
    "Course Code": "CH 522",
    "Course Name": "Inorganic Chemistry Laboratory",
    "Credits": 2,
    "Lecture": "I1,K1\n(CH Lab)"
  },
  {
    "Course Code": "CH 523",
    "Course Name": "Organic Chemistry Laboratory",
    "Credits": 2,
    "Lab": "J2,M2\n(CH Lab)"
  },
  {
    "Course Code": "CH 524",
    "Course Name": "Analytical and Computational Chemistry Laboratory",
    "Credits": 2,
    "Lab": "I2,M1\n(10/104)"
  },
  {
    "Course Code": "CH 525",
    "Course Name": "Physical Chemistry Laboratory",
    "Credits": 2,
    "Lab": "E2,H1\n(CH Lab)"
  },
  {
    "Course Code": "CH 526",
    "Course Name": "Group theory and spectroscopy",
    "Credits": 4,
    "Lecture": "B1,B2\n(7/110)"
  },
  {
    "Course Code": "CH 527",
    "Course Name": "Organometallic Chemistry",
    "Credits": 4,
    "Lecture": "D1,D2\n(7/206)"
  },
  {
    "Course Code": "CH 591-I",
    "Course Name": "Special Topics in Chemistry: Introduction to Polymer Chemistry",
    "Credits": 4,
    "Lecture": "M1,M2\n(7/104)"
  },
  {
    "Course Code": "CH 592-I",
    "Course Name": "Chemical biology in space (Special topics course)",
    "Credits": 4,
    "Lecture": "D1,D2\n(11/204,11/205)"
  },
  {
    "Course Code": "CH 602",
    "Course Name": "Chemistry of Natural Products",
    "Credits": 4,
    "Lecture": "H1,J2\n(7/110)"
  },
  {
    "Course Code": "CH 615",
    "Course Name": "Electrochemistry",
    "Credits": 4,
    "Lecture": "G1,G2\n(7/205)"
  },
  {
    "Course Code": "CH 628",
    "Course Name": "Fluorescence Spectroscopy for Chemists and Biologists",
    "Credits": 4,
    "Lecture": "P1,P2\n(7/105)"
  },
  {
    "Course Code": "CH 629",
    "Course Name": "Medicinal Chemistry for Life",
    "Credits": 4,
    "Lecture": "C1,C2\n(13/124)"
  },
  {
    "Course Code": "CH 630",
    "Course Name": "Catalytic Chemistry",
    "Credits": 4,
    "Lecture": "F1,F2\n(11/102)"
  },
  {
    "Course Code": "CH 632",
    "Course Name": "Solid State Chemistry and Applications",
    "Credits": 4,
    "Lecture": "D1,D2\n(Harsha Patel Learning Theatre)"
  },
  {
    "Course Code": "CH 633",
    "Course Name": "Single Molecule Spectroscopy",
    "Credits": 4,
    "Lecture": "J1\n(7/101)",
    "Lab": "L1,L2\n(CH Lab)"
  },
  {
    "Course Code": "CH 634",
    "Course Name": "Introduction to Molecular Dynamics",
    "Credits": 4,
    "Lecture": "L1\n(7/210)",
    "Lab": "N1,N2\n(10/104)"
  },
  {
    "Course Code": "CH 638",
    "Course Name": "Electronic Structure Theory",
    "Credits": 4,
    "Lecture": "K1,F2\n(11/206)"
  },
  {
    "Course Code": "CH 639",
    "Course Name": "Advanced Main Group Chemistry",
    "Credits": 4,
    "Lecture": "I1,I2\n(7/105)"
  },
  {
    "Course Code": "CH 642",
    "Course Name": "Non-linear Spectroscopy and its Applications",
    "Credits": 4,
    "Lecture": "I1,I2\n(7/103)"
  },
  {
    "Course Code": "MA 513",
    "Course Name": "AI and Mathematics",
    "Credits": 4,
    "Lecture": "K1,K2\n(7/205)",
    "Tutorial": "B1\n(7/205)"
  },
  {
    "Course Code": "MA 502",
    "Course Name": "Complex Analysis",
    "Credits": 4,
    "Lecture": "G1,G2\n(7/203)",
    "Tutorial": "A1\n(7/203)"
  },
  {
    "Course Code": "MA 507",
    "Course Name": "Ordinary Differential Equations",
    "Credits": 4,
    "Lecture": "E1,E2\n(7/109)",
    "Tutorial": "B1\n(7/108)"
  },
  {
    "Course Code": "MA 606",
    "Course Name": "Differential Topology",
    "Credits": 4,
    "Lecture": "I1,I2\n(7/102)"
  },
  {
    "Course Code": "MA 629 (A)",
    "Course Name": "Real analysis of several variables",
    "Credits": 4,
    "Lecture": "C1,C2\n(7/108)",
    "Tutorial": "A2\n(7/202)"
  },
  {
    "Course Code": "MA 637",
    "Course Name": "Numerical Analysis and Computing",
    "Credits": 4,
    "Lecture": "D1,D2\n(7/209)",
    "Tutorial": "H2\n(10/203)"
  },
  {
    "Course Code": "MA 625",
    "Course Name": "Stochastic Differential Equations",
    "Credits": 4,
    "Lecture": "K1,K2\n(7/110)"
  },
  {
    "Course Code": "MA 628",
    "Course Name": "Algebra II",
    "Credits": 4,
    "Lecture": "F1,F2\n(Jayshree S Sheth Learning Theatre)",
    "Tutorial": "L2\n(5/202)"
  },
  {
    "Course Code": "MA 634",
    "Course Name": "Algebraic Number theory",
    "Credits": 4,
    "Lecture": "J1,J2\n(7/103)"
  },
  {
    "Course Code": "MA 638",
    "Course Name": "Matrix Lie Groups",
    "Credits": 4,
    "Lecture": "P1,P2\n(7/205)"
  },
  {
    "Course Code": "MA 639",
    "Course Name": "Matrix Analysis",
    "Credits": 4,
    "Lecture": "M1,M2\n(7/208)"
  },
  {
    "Course Code": "MA 645",
    "Course Name": "Commutative Algebra II",
    "Credits": 4,
    "Lecture": "E1,E2\n(7/105)",
    "Tutorial": "K1,K2\n(7/203)"
  },
  {
    "Course Code": "MA 646",
    "Course Name": "Modular Forms",
    "Credits": 4,
    "Lecture": "L1,B2\n(7/202)"
  },
  {
    "Course Code": "MA 691-IV",
    "Course Name": "Elliptic cruves and surfaces",
    "Credits": 4,
    "Lecture": "A1,A2\n(7/108)"
  },
  {
    "Course Code": "MA 691-V",
    "Course Name": "Commutative Algebra - II",
    "Credits": 4,
    "Lecture": "E1,E2\n(7/105)",
    "Tutorial": "K2\n(7/203)"
  },
  {
    "Course Code": "MA 691-VII",
    "Course Name": "Special Topics in Mathematics: Hermitian Analysis",
    "Credits": 4,
    "Lecture": "E1,E2\n(7/102)",
    "Tutorial": "A1\n(7/102)"
  },
  {
    "Course Code": "PH 409",
    "Course Name": "Introduction to Astronomy and Space Science",
    "Credits": 4,
    "Lecture": "K1,K2\n(7/101)"
  },
  {
    "Course Code": "PH 653",
    "Course Name": "Advanced Condensed Matter Physics",
    "Credits": 4,
    "Lecture": "C1,C2\n(7/210)"
  },
  {
    "Course Code": "PH 504",
    "Course Name": "Quantum Mechanics II",
    "Credits": 4,
    "Lecture": "G1,G2\n(10/102)",
    "Tutorial": "A1\n(7/202)"
  },
  {
    "Course Code": "PH 506",
    "Course Name": "Methods of Experimental Physics",
    "Credits": 4,
    "Lecture": "C1\n(7/107)",
    "Lab": "J1,L1\n(PH Lab)"
  },
  {
    "Course Code": "PH 507",
    "Course Name": "Statistical Mechanics",
    "Credits": 4,
    "Lecture": "E1,E2\n(7/108)",
    "Tutorial": "B1\n(7/208)"
  },
  {
    "Course Code": "PH 509 (N)",
    "Course Name": "Computational Physics",
    "Credits": 4,
    "Lecture": "D1,D2\n(7/109)",
    "Lab": "I1,K1\n(10/204)"
  },
  {
    "Course Code": "PH 513",
    "Course Name": "Electronic Devices & Digital Systems for Physicists",
    "Credits": 4,
    "Lecture": "F1,F2\n(7/204)"
  },
  {
    "Course Code": "PH 514",
    "Course Name": "AI in Physics",
    "Credits": 4,
    "Lecture": "M1,M2\n(7/209)",
    "Lab": "I1\n(7/209)"
  },
  {
    "Course Code": "PH 607",
    "Course Name": "Topics in Quantum and Statistical Mechanics",
    "Credits": 4,
    "Lecture": "P1,H1\n(7/206)"
  },
  {
    "Course Code": "PH 608",
    "Course Name": "Tools of Theoretical Physics",
    "Credits": 4,
    "Lecture": "G1,G2\n(11/205)"
  },
  {
    "Course Code": "PH 612",
    "Course Name": "Quantum Field Theory-II",
    "Credits": 4,
    "Lecture": "F1,F2\n(5/202)"
  },
  {
    "Course Code": "PH 615",
    "Course Name": "Physics of two-dimensional materials",
    "Credits": 4,
    "Lecture": "D1,D2\n(7/207)"
  },
  {
    "Course Code": "PH 616",
    "Course Name": "Quantum Optics",
    "Credits": 4,
    "Lecture": "D1,D2\n(11/206)"
  },
  {
    "Course Code": "PH 644",
    "Course Name": "Tools of Experimental Physics",
    "Credits": 4,
    "Lecture": "F1,F2\n(7/110)"
  },
  {
    "Course Code": "PH 649",
    "Course Name": "Advanced General Relativity",
    "Credits": 4,
    "Lecture": "A1,A2\n(7/205)"
  },
  {
    "Course Code": "PH 691-V",
    "Course Name": "Special Topics in Physics: Effective Field Theory",
    "Credits": 4,
    "Lecture": "I1,K2\n(7/206)"
  },
  {
    "Course Code": "FP 602 (CH)",
    "Course Name": "Writing Course in Chemistry",
    "Credits": 4,
    "Lecture": "A1\n(Jayshree S Sheth Learning Theatre)",
    "Lab": "E1,H2\n(Jayshree S Sheth Learning Theatre)"
  },
  {
    "Course Code": "FP 602 (PH)",
    "Course Name": "Writing Course in Physics",
    "Credits": 4,
    "Lecture": "B2\n(Surendra C Sheth Learning Theatre)",
    "Lab": "L2,N2\n(Jayshree S Sheth Learning Theatre)"
  },
  {
    "Course Code": "HS 103",
    "Course Name": "French Studies",
    "Credits": 4,
    "Lecture": "I1,I2\n(7/208)"
  },
  {
    "Course Code": "HS 111",
    "Course Name": "Urdu script and poetry",
    "Credits": 4,
    "Lecture": "D1,D2\n(7/201)",
    "Tutorial": "H2\n(7/106)"
  },
  {
    "Course Code": "HS 112",
    "Course Name": "Urdu poetry interpretation",
    "Credits": 4,
    "Lecture": "H1,M1\n(7/102)",
    "Tutorial": "Tuesday (6:30 PM to 7:50 PM)\n(7/107)"
  },
  {
    "Course Code": "HS 152",
    "Course Name": "Japanese Language for Beginners",
    "Credits": 4,
    "Lecture": "M1,M2\n(11/102)",
    "Tutorial": "J1\n(11/102)"
  },
  {
    "Course Code": "HS 153",
    "Course Name": "Advance Japanese Learning",
    "Credits": 4,
    "Lecture": "Monday, Wednesday, Friday (6:30 PM to 8:00 PM)\n(11/205)"
  },
  {
    "Course Code": "HS 154",
    "Course Name": "Mandarin for Beginners",
    "Credits": 4,
    "Lecture": "N1,N2\n(7/209)"
  },
  {
    "Course Code": "HS 155",
    "Course Name": "Mandarin for Beginners - II",
    "Credits": 4,
    "Lecture": "L1,L2\n(11/102)"
  },
  {
    "Course Code": "HS 192-I",
    "Course Name": "Special Topics in HSS: Conversational English (first half)",
    "Credits": 2,
    "Lecture": "I1,I2\n(7/108)"
  },
  {
    "Course Code": "HS 201",
    "Course Name": "World Civilizations and Cultures",
    "Credits": 4,
    "Lecture": "L1,L2\n(Surendra C Sheth Learning Theatre)"
  },
  {
    "Course Code": "HS 223",
    "Course Name": "Sanskrit Literature",
    "Credits": 4,
    "Lecture": "K1,K2\n(7/106)",
    "Tutorial": "J1\n(7/106)"
  },
  {
    "Course Code": "HS 513",
    "Course Name": "Perspectives in History",
    "Credits": 4,
    "Lecture": "G1,G2\n(7/204)"
  },
  {
    "Course Code": "HS 514",
    "Course Name": "Sociology of Tourism",
    "Credits": 4,
    "Lecture": "B1,B2\n(11/101)"
  },
  {
    "Course Code": "HS 515",
    "Course Name": "The Politics of the Environment",
    "Credits": 4,
    "Lecture": "I1,I2\n(7/208)"
  },
  {
    "Course Code": "HS 518",
    "Course Name": "Philosophy, Cognition and Psychoanalyis",
    "Credits": 4,
    "Lecture": "J1,J2\n(7/102)"
  },
  {
    "Course Code": "HS 519",
    "Course Name": "Linguistic Anthropology",
    "Credits": 4,
    "Lecture": "N1,N2\n(7/104)"
  },
  {
    "Course Code": "HS 523",
    "Course Name": "Quantitative Research Methods in Social Sciences",
    "Credits": 4,
    "Lecture": "E1,E2\n(7/103)",
    "Tutorial": "B1\n(10/203)"
  },
  {
    "Course Code": "HS 610",
    "Course Name": "Critical Journey  through Select Thoughts and Theories",
    "Credits": 4,
    "Lecture": "F1,F2\n(7/205)"
  },
  {
    "Course Code": "HS 635",
    "Course Name": "India Through the Writer’s Eye",
    "Credits": 4,
    "Lecture": "J1,J2\n(7/105)"
  },
  {
    "Course Code": "HS 642",
    "Course Name": "Structures and Hydrology in Ancient India",
    "Credits": 4,
    "Lecture": "M1,M2\n(7/108)"
  },
  {
    "Course Code": "HS 650",
    "Course Name": "Critical Perspectives in Anthropology",
    "Credits": 4,
    "Lecture": "D1,D2\n(7/107)"
  },
  {
    "Course Code": "HS 651",
    "Course Name": "Critical Perspectives in Sociology",
    "Credits": 4,
    "Lecture": "A1,A2\n(7/110)"
  },
  {
    "Course Code": "HS 653",
    "Course Name": "Academic Communication: Explanation and Paraphrasing",
    "Credits": 2,
    "Lecture": "P1,P2\n(11/204)"
  },
  {
    "Course Code": "HS 654",
    "Course Name": "Mixed Methods in Research",
    "Credits": 2,
    "Lecture": "D1,D2\n(11/101)"
  },
  {
    "Course Code": "HS 657",
    "Course Name": "Mixed Methods in Research",
    "Credits": 4,
    "Lecture": "D1,D2\n(11/101)"
  },
  {
    "Course Code": "HS 691-IX",
    "Course Name": "Decolonizing Social Sciences",
    "Credits": 4,
    "Lecture": "I1,I2\n(11/205)"
  },
  {
    "Course Code": "HS 691-VII",
    "Course Name": "Special Topics in HSS: Haunting, Spectrality and Cinema",
    "Credits": 4,
    "Lecture": "G1,G2\n(7/206)"
  },
  {
    "Course Code": "HS 491-III",
    "Course Name": "Strorytelling for the Digital Era",
    "Credits": 4,
    "Lecture": "P1,P2\n(7/104)"
  },
  {
    "Course Code": "HS 491-XI",
    "Course Name": "Special Topics in HSS: Understanding and Designing Comics and Graphic Novels",
    "Credits": 4,
    "Lecture": "I1,J2\n(7/201)"
  },
  {
    "Course Code": "HS 491-XIII",
    "Course Name": "Drawing Conncetions: Enviranmental Perception and Visula Anthropology",
    "Credits": 4,
    "Lecture": "M1,M2\n(10/102)"
  },
  {
    "Course Code": "HS 491-XIV",
    "Course Name": "Special Topics in HSS: Appreciation of Classical Indian Music",
    "Credits": 4,
    "Lecture": "L1,L2\n(7/209)"
  },
  {
    "Course Code": "HS 656",
    "Course Name": "Ethanoarchaeology",
    "Credits": 4,
    "Lecture": "N1,N2\n(7/203)"
  },
  {
    "Course Code": "HS 527",
    "Course Name": "Environmental Economics and Natural Resource Management",
    "Credits": 4,
    "Lecture": "M1,M2\n(7/204)"
  },
  {
    "Course Code": "IN 402",
    "Course Name": "Human Evolution",
    "Credits": 4,
    "Lecture": "P1,P2\n(7/204)"
  },
  {
    "Course Code": "HS 108",
    "Course Name": "Japan Studies",
    "Credits": 2,
    "Lecture": "E1,E2\n(7/201)"
  },
  {
    "Course Code": "DES 302",
    "Course Name": "Creativity, Design and Doing",
    "Credits": 4,
    "Lecture": "N1,N2\n(Jagdish Patel Learning Theatre)"
  },
  {
    "Course Code": "DES 591-I",
    "Course Name": "Game Apreciation and Game Aesthetics",
    "Credits": 4,
    "Lecture": "J1,L1\n(7/204)"
  },
  {
    "Course Code": "DES 601",
    "Course Name": "Visual Design for Academia",
    "Credits": 4,
    "Lecture": "L1\n(7/101)",
    "Lab": "J2,M2\n(7/203)"
  },
  {
    "Course Code": "DES 691-II",
    "Course Name": "Special Topics in Design: Designing Learning environments for science and engineering",
    "Credits": 4,
    "Lecture": "L1,L2\n(11/101)"
  },
  {
    "Course Code": "MS 404",
    "Course Name": "Neuromarketing (second half)",
    "Credits": 2,
    "Lecture": "M1,M2\n(7/109)"
  },
  {
    "Course Code": "MS 306",
    "Course Name": "Principles of Business Management",
    "Credits": 4,
    "Lecture": "N1,N2\n(7/208)"
  },
  {
    "Course Code": "MS 491-VII",
    "Course Name": "Special Topics in Management: Managing Sustainable Businesses",
    "Credits": 4,
    "Lecture": "G1,F2\n(Surendra C Sheth Learning Theatre)"
  },
  {
    "Course Code": "MS 491-XIV",
    "Course Name": "Special Topics in Management: Consumer Behaviour",
    "Credits": 4,
    "Lecture": "M1,M2\n(Online)"
  },
  {
    "Course Code": "MS 491-XV",
    "Course Name": "Special Topics in Management: Medical Products Manufacturing Quality and Regulatory \n(first half)",
    "Credits": 3,
    "Lecture": "J1,J2\n(7/207)"
  },
  {
    "Course Code": "MS 491-XVI",
    "Course Name": "Special Topics in Management: Lean Six Sigma",
    "Credits": 4,
    "Lecture": "M1,M2\n(7/206)"
  },
  {
    "Course Code": "MS 491-XVII",
    "Course Name": "Special Topics in Management: Organizational Psychology",
    "Credits": 4,
    "Lecture": "P1,P2\n(7/110)"
  },
  {
    "Course Code": "MS 492-I",
    "Course Name": "Special Topics in Management: Strategic Leadership\n(first half)",
    "Credits": 2,
    "Lecture": "P1,P2\n(7/102)"
  },
  {
    "Course Code": "MS 492-II",
    "Course Name": "Special Topics in Management: Business Risk Management\n(first half)",
    "Credits": 2,
    "Lecture": "N1,P1\n(7/110)"
  },
  {
    "Course Code": "MS 491-XVIII",
    "Course Name": "Special Topics in Management: Comprehensive Business Ethics & Responsible Leadership",
    "Credits": 4,
    "Lecture": "L1,L2\n(10/102)"
  },
  {
    "Course Code": "MS 491-XIX",
    "Course Name": "Special Topics in Management: Comprehensive Manufacturing Quality & Regulatory of Medical Products",
    "Credits": 4,
    "Lecture": "J1,J2\n(7/207)"
  },
  {
    "Course Code": "MS 492-IV",
    "Course Name": "Special Topics in Management: Business Ethics and Responsible Leadership (first half)",
    "Credits": 2,
    "Lecture": "L1,L2\n(10/102)"
  },
  {
    "Course Code": "MS 492-V",
    "Course Name": "Special Topics in Management: Essentials of Finance and Trade Laws\n(second half)",
    "Credits": 2,
    "Lecture": "K1,K2\n(11/102)"
  },
  {
    "Course Code": "MS 492-VII",
    "Course Name": "Special Topics in Management: International Marketing",
    "Credits": 2,
    "Lecture": "D1,D2\n(7/208)"
  },
  {
    "Course Code": "HS 491-VIII",
    "Course Name": "Special Topics in HSS: Challenges in the Digital Society",
    "Credits": 4,
    "Lecture": "M1,M2\n(11/101)"
  },
  {
    "Course Code": "CG 507",
    "Course Name": "Evolutionary Neuropsychology\n(Quad 1)",
    "Credits": 2,
    "Lecture": "M1,M2\n(7/202)"
  },
  {
    "Course Code": "HS 392",
    "Course Name": "Special Topics in HSS: Competitiveness and Ethical Leadership \n(first half)",
    "Credits": 2,
    "Lecture": "Saturday (10:00 AM to 1:00 PM)\n(Harsha Patel Learning Theatre)"
  },
  {
    "Course Code": "BE 304",
    "Course Name": "Introduction to Biomedical Engineering",
    "Credits": 4,
    "Lecture": "P1,P2\n(7/109)"
  },
  {
    "Course Code": "BE 402",
    "Course Name": "Biomolecular Forensics",
    "Credits": 2,
    "Lecture": "B1,B2\n(7/104)"
  },
  {
    "Course Code": "BE 407",
    "Course Name": "Introduction to Cell Biology",
    "Credits": 4,
    "Lecture": "Tuesday & Thursday (6:25 PM to 7:50 PM)\n(Jagdish Patel Learning Theatre)"
  },
  {
    "Course Code": "BE 603",
    "Course Name": "Biophysical Techniques",
    "Credits": 4,
    "Lecture": "A1,A2\n(11/206)",
    "Lab": "I1\n(BE Lab)"
  },
  {
    "Course Code": "BE 608",
    "Course Name": "Molecular Basis of Neurodegenerative Diseases",
    "Credits": 4,
    "Lecture": "D1,D2\n(13/125)"
  },
  {
    "Course Code": "BE 610",
    "Course Name": "Molecular Oncology",
    "Credits": 4,
    "Lecture": "D1,D2\n(13/124)"
  },
  {
    "Course Code": "BE 615",
    "Course Name": "Bioinformatics and Computational Biology",
    "Credits": 4,
    "Lecture": "A1\n(7/206)",
    "Lab": "I2,M1\n(7/109)"
  },
  {
    "Course Code": "BE 619",
    "Course Name": "Cellular Communication",
    "Credits": 4,
    "Lecture": "F1,F2\n(7/105)"
  },
  {
    "Course Code": "BE 625",
    "Course Name": "AI Applications in Life Sciences",
    "Credits": 4,
    "Lecture": "E1,E2\n(7/205,7/206)"
  },
  {
    "Course Code": "BE 626",
    "Course Name": "Metabolic Engineering",
    "Credits": 4,
    "Lecture": "J1,J2\n(7/105)"
  },
  {
    "Course Code": "BE 627",
    "Course Name": "Methods in Structural Biology",
    "Credits": 4,
    "Lecture": "A1,A2\n(13/124)",
    "Lab": "H2\n(BE Lab)"
  },
  {
    "Course Code": "BE 628",
    "Course Name": "Transport Phenomenon in Biological Systems",
    "Credits": 4,
    "Lecture": "A1,A2\n(7/106)"
  },
  {
    "Course Code": "BE 691-I",
    "Course Name": "Special Topics in Biological Engineering: Analysis and Characterization of Biologicals",
    "Credits": 4,
    "Lecture": "I1\n(7/205)",
    "Lab": "I2,M1\n(BE Lab)"
  },
  {
    "Course Code": "BE 692",
    "Course Name": "Special Topics in Biological Engineering: Animal Cell Culture Techniques",
    "Credits": 2,
    "Lab": "K1,H1\n(BE Lab)"
  },
  {
    "Course Code": "BE 617",
    "Course Name": "Novel Drug Delivery Technologies: Fundamental Principles and Engineering",
    "Credits": 4,
    "Lecture": "G1,G2\n(Jayshree S Sheth Learning Theatre)"
  },
  {
    "Course Code": "BE 692-I",
    "Course Name": "Special Topics in Biological Engineering: Nucleic Acids Based Therapeutics (first half)",
    "Credits": 2,
    "Lecture": "L1,L2\n(7/108)"
  },
  {
    "Course Code": "BE 692-II",
    "Course Name": "Special Topics in Biological Engineering: Medical Device Regulations (second half)",
    "Credits": 2,
    "Lecture": "L1,L2\n(Jagdish Patel Learning Theatre)"
  },
  {
    "Course Code": "BE 692-III",
    "Course Name": "Special Topics in Biological Engineering: Plant Developmental Biology (first half)",
    "Credits": 2,
    "Lecture": "P1,P2\n(7/207)"
  },
  {
    "Course Code": "CG 506",
    "Course Name": "Experimental Techniques in Cognitive Science",
    "Credits": 4,
    "Lecture": "H2\n(7/203)",
    "Lab": "K2\n(7/108)"
  },
  {
    "Course Code": "CG 517",
    "Course Name": "Introduction to Cognitive Linguistics",
    "Credits": 4,
    "Lecture": "G1,G2\n(7/109)"
  },
  {
    "Course Code": "CG 601",
    "Course Name": "Motor Learning and Memory",
    "Credits": 4,
    "Lecture": "E1,E2\n(7/110)"
  },
  {
    "Course Code": "CG 603",
    "Course Name": "Perception and Attention",
    "Credits": 4,
    "Lecture": "L1,L2\n(7/106)"
  },
  {
    "Course Code": "CG 605",
    "Course Name": "Learning and Memory",
    "Credits": 4,
    "Lecture": "D1,D2\n(7/105)"
  },
  {
    "Course Code": "CG 607",
    "Course Name": "Emotion and Cognition",
    "Credits": 4,
    "Lecture": "L1,L2\n(7/106)",
    "Lab": "K1\n(7/202)"
  },
  {
    "Course Code": "CG 614",
    "Course Name": "Human Brain Mapping",
    "Credits": 4,
    "Lecture": "F1,F2\n(7/203)"
  },
  {
    "Course Code": "ES 248",
    "Course Name": "Introduction to Data Structures and Algorithms",
    "Credits": 3,
    "Lecture": "N1\n(11/101)",
    "Lab": "A2,C2\n(10/203)"
  },
  {
    "Course Code": "CS 327",
    "Course Name": "Compilers",
    "Credits": 5,
    "Lecture": "F1,G2\n(Surendra C Sheth Learning Theatre)",
    "Lab": "F2\n(10/203,10/204)"
  },
  {
    "Course Code": "CS 392-I",
    "Course Name": "Special Topics in Computer Science: Introduction to Competitive Programming (second half)",
    "Credits": 2,
    "Lecture": "Saturday & Sunday (11:30 AM to 12:50 PM)\n(Jayshree S Sheth Learning Theatre)",
    "Lab": "Saturday & Sunday (2:00 PM to 3:20 PM)\n(10/203,10/204)"
  },
  {
    "Course Code": "ES 678",
    "Course Name": "Machine Learning",
    "Credits": 4,
    "Lecture": "D1,D2\n(10/103)",
    "Tutorial": "H1,N1\n(10/103,Jayshree S Sheth Learning Theatre)"
  },
  {
    "Course Code": "CS 614",
    "Course Name": "Advanced Algorithms",
    "Credits": 4,
    "Lecture": "D1,D2\n(7/110)"
  },
  {
    "Course Code": "CS 616",
    "Course Name": "Distributed Systems and Cloud Computing",
    "Credits": 5,
    "Lecture": "M1,M2\n(7/103)",
    "Lab": "I1\n(10/104)"
  },
  {
    "Course Code": "CS 617",
    "Course Name": "Computational Complexity Theory",
    "Credits": 4,
    "Lecture": "J1,J2\n(13/125)"
  },
  {
    "Course Code": "ES 667",
    "Course Name": "Deep Learning",
    "Credits": 4,
    "Lecture": "L1,L2\n(7/208)"
  },
  {
    "Course Code": "ES 670",
    "Course Name": "Matrix Methods for Signal Processing, Data Science,\nand Machine Learning",
    "Credits": 4,
    "Lecture": "C1,C2\n(11/101)"
  },
  {
    "Course Code": "CS 333",
    "Course Name": "Ethics of AI",
    "Credits": 4,
    "Lecture": "K1,K2\n(7/101)"
  },
  {
    "Course Code": "CS 431",
    "Course Name": "Computer and Network Security",
    "Credits": 4,
    "Lecture": "H1,H2\n(7/109)"
  },
  {
    "Course Code": "CS 432",
    "Course Name": "Databases",
    "Credits": 4,
    "Lecture": "P1,P2\n(10/103)"
  },
  {
    "Course Code": "CS 436",
    "Course Name": "History of Computing and its Applications to Domains\n(second half)",
    "Credits": 2,
    "Lecture": "A1,A2\n(Surendra C Sheth Learning Theatre)"
  },
  {
    "Course Code": "CS 621",
    "Course Name": "Ethics of AI (N)",
    "Credits": 4,
    "Lecture": "K1,P2\n(7/208)"
  },
  {
    "Course Code": "CS 691-XX",
    "Course Name": "Special Topics in Computer Science: Cyber Physical Systems for Industrial Applications",
    "Credits": 2,
    "Lecture": "M1,M2\n(7/105)"
  },
  {
    "Course Code": "ES 333",
    "Course Name": "Microprocessors and Embedded Systems",
    "Credits": 4,
    "Lecture": "G1\n(Jagdish Patel Learning Theatre)",
    "Tutorial": "G2\n(Jagdish Patel Learning Theatre)",
    "Lab": "C1,C2\n(EE Lab)"
  },
  {
    "Course Code": "EE 609",
    "Course Name": "Advanced Signal Processing",
    "Credits": 4,
    "Lecture": "E1,E2\n(7/204)"
  },
  {
    "Course Code": "ES 612",
    "Course Name": "Artificial Intelligence",
    "Credits": 4,
    "Lecture": "I1,I2\n(7/101)"
  },
  {
    "Course Code": "EE 618",
    "Course Name": "Microelectronics Lab",
    "Credits": 2,
    "Lab": "J2,M2\n(10/104)"
  },
  {
    "Course Code": "EE 619",
    "Course Name": "Special Electrical Machines",
    "Credits": 4,
    "Lecture": "G1,G2\n(11/102)"
  },
  {
    "Course Code": "EE 629",
    "Course Name": "Power Electronic Converters",
    "Credits": 4,
    "Lecture": "P1,P2\n(11/102)",
    "Tutorial": "N1\n(11/102)"
  },
  {
    "Course Code": "EE 639",
    "Course Name": "Lasers",
    "Credits": 4,
    "Lecture": "N1,N2\n(13/125)"
  },
  {
    "Course Code": "EE 652",
    "Course Name": "IC Design Laboratory",
    "Credits": 2,
    "Tutorial": "I1\n(Jagdish Patel Learning Theatre)",
    "Lab": "I1,K1\n(10/105)"
  },
  {
    "Course Code": "EE 653",
    "Course Name": "Analog IC Design Lab",
    "Credits": 2,
    "Lab": "D2,F2\n(10/104)"
  },
  {
    "Course Code": "ES 641",
    "Course Name": "Electronic Instrumentation",
    "Credits": 4,
    "Lecture": "N1,N2\n(13/124)"
  },
  {
    "Course Code": "EE 691-V",
    "Course Name": "Regulation of Electricity Sector",
    "Credits": 4,
    "Lecture": "M1,M2\n(Surendra C Sheth Learning Theatre)"
  },
  {
    "Course Code": "ES 655",
    "Course Name": "Medical Imaging Systems",
    "Credits": 4,
    "Lecture": "J1,J2\n(7/210)"
  },
  {
    "Course Code": "EE 657",
    "Course Name": "VLSI System Design",
    "Credits": 4,
    "Lecture": "A2,I2\n(11/101)"
  },
  {
    "Course Code": "EE 658",
    "Course Name": "Memory Device Technologies and Applications",
    "Credits": 4,
    "Lecture": "F1,K2\n(10/102)"
  },
  {
    "Course Code": "EE 660",
    "Course Name": "Power Management IC Design",
    "Credits": 4,
    "Lecture": "P1,P2\n(11/206)"
  },
  {
    "Course Code": "ES 665",
    "Course Name": "Advanced Transportation Electrification Technology",
    "Credits": 4,
    "Lecture": "H1,H2\n(10/102)"
  },
  {
    "Course Code": "EE 668",
    "Course Name": "Smart Power Distribution System",
    "Credits": 4,
    "Lecture": "F1,F2\n(13/124)"
  },
  {
    "Course Code": "ES 677",
    "Course Name": "Physics inspired Machine Learning for Engineering Design",
    "Credits": 4,
    "Lecture": "N1,G2\n(7/105)",
    "Tutorial": "H2\n(13/125)"
  },
  {
    "Course Code": "EE 665",
    "Course Name": "Advanced Radiating Systems",
    "Credits": 4,
    "Lecture": "M1,M2\n(11/205)",
    "Tutorial": "J1\n(11/205)"
  },
  {
    "Course Code": "EE 666",
    "Course Name": "Fundamentals of Wireless Localization",
    "Credits": 4,
    "Lecture": "K1,K2\n(7/103)"
  },
  {
    "Course Code": "EE 669",
    "Course Name": "Advanced Semiconductor Devices",
    "Credits": 2,
    "Lecture": "L1,L2\n(11/204)"
  },
  {
    "Course Code": "EE 667",
    "Course Name": "Quantum Error Correction",
    "Credits": 2,
    "Lecture": "P1,P2\n(7/210)"
  },
  {
    "Course Code": "EE 670",
    "Course Name": "AI for Electrical Engineering",
    "Credits": 4,
    "Lecture": "I1,I2\n(11/102)"
  },
  {
    "Course Code": "ES 676",
    "Course Name": "Classical Information Theory",
    "Credits": 4,
    "Lecture": "E1,E2\n(7/205)"
  },
  {
    "Course Code": "EH 304",
    "Course Name": "Drone Data Acquisition, Processing and Interpretation",
    "Credits": 2,
    "Lecture": "D1\n(7/104)",
    "Lab": "J2,M2\n(10/105)"
  },
  {
    "Course Code": "EH 601 (N)",
    "Course Name": "Earth Surface Processes in The Anthropocene",
    "Credits": 4,
    "Lecture": "B1,B2\n(7/103)",
    "Lab": "H1\n(10/102)"
  },
  {
    "Course Code": "EH 602",
    "Course Name": "River Morphology and Ecology",
    "Credits": 4,
    "Lecture": "B1,B2\n(7/103)"
  },
  {
    "Course Code": "EH 604",
    "Course Name": "Quantitative Geomorphology",
    "Credits": 4,
    "Lecture": "L1,L2\n(11/206)"
  },
  {
    "Course Code": "EH 608",
    "Course Name": "Biodiversity Conservation and Sustainable Development",
    "Credits": 4,
    "Lecture": "L1,L2\n(7/107)"
  },
  {
    "Course Code": "EH 610",
    "Course Name": "Engineering Seismology and Seismic Hazard Analysis",
    "Credits": 4,
    "Lecture": "F1,F2\n(7/210)"
  },
  {
    "Course Code": "EH 612",
    "Course Name": "Ocean and Global Change",
    "Credits": 4,
    "Lecture": "E1,E2\n(10/103)"
  },
  {
    "Course Code": "EH 614",
    "Course Name": "Physics of the Lithosphere",
    "Credits": 4,
    "Lecture": "N1,N2\n(7/210)"
  },
  {
    "Course Code": "EH 621",
    "Course Name": "Climate of the Past",
    "Credits": 4,
    "Lecture": "K1\n(11/204)",
    "Lab": "J2,L1\n(7/206)"
  },
  {
    "Course Code": "EH 622",
    "Course Name": "Fluid Flow and Reactions in Reservoir Rocks",
    "Credits": 4,
    "Lecture": "G1,G2\n(7/201)"
  },
  {
    "Course Code": "EH 623",
    "Course Name": "Stratigraphic Evolution of Indian Continent",
    "Credits": 4,
    "Lecture": "P1,P2\n(7/101)",
    "Tutorial": "B1\n(7/101)"
  },
  {
    "Course Code": "EH 629",
    "Course Name": "Ceramics in Archaeology",
    "Credits": 4,
    "Lecture": "M1,F2\n(11/204)"
  },
  {
    "Course Code": "EH 630",
    "Course Name": "Harappan Civilization",
    "Credits": 4,
    "Lecture": "D1,D2\n(7/202)"
  },
  {
    "Course Code": "EH 632",
    "Course Name": "Fundamentals of Structural Geology",
    "Credits": 4,
    "Lecture": "K1\n(13/125)",
    "Lab": "I2,M1\n(EH Lab)"
  },
  {
    "Course Code": "EH 634",
    "Course Name": "Dynamic Earth Surface and Nature Hazards",
    "Credits": 4,
    "Lecture": "G2\n(7/104)",
    "Lab": "I2,M1\n(EH Lab)"
  },
  {
    "Course Code": "EH 691-II",
    "Course Name": "Atmopheric Physics",
    "Credits": 4,
    "Lecture": "C1,C2\n(13/125)"
  },
  {
    "Course Code": "EH 691-X",
    "Course Name": "Interpreting animals in the Human past",
    "Credits": 4,
    "Lecture": "I1,I2\n(11/204)"
  },
  {
    "Course Code": "EH 691-XI",
    "Course Name": "Special Topics in Earth Sciences: Stable Isotopes in Earth Systems",
    "Credits": 4,
    "Lecture": "F1,F2\n(13/125)"
  },
  {
    "Course Code": "ES 419",
    "Course Name": "Numerical Methods for Engineers",
    "Credits": 4,
    "Lecture": "I1,I2\n(7/104)",
    "Tutorial": "J1\n(10/105)"
  },
  {
    "Course Code": "ES 646",
    "Course Name": "Elastodynamics and Vibrations",
    "Credits": 4,
    "Lecture": "D1,D2\n(7/101)"
  },
  {
    "Course Code": "ES 648",
    "Course Name": "Nonlinear Dynamics and Vibrations",
    "Credits": 4,
    "Lecture": "G1,G2\n(7/104)"
  },
  {
    "Course Code": "ES 613",
    "Course Name": "Modern Control Theory",
    "Credits": 4,
    "Lecture": "E1,E2\n(11/204)"
  },
  {
    "Course Code": "ES 656",
    "Course Name": "Human Robot Interaction",
    "Credits": 4,
    "Lecture": "G1,G2\n(7/105)"
  },
  {
    "Course Code": "ES 671",
    "Course Name": "Mechanics of Composite Materials",
    "Credits": 4,
    "Lecture": "E1,E2\n(7/207)"
  },
  {
    "Course Code": "ME 462",
    "Course Name": "Integrated Design and Manufacturing",
    "Credits": 4,
    "Lecture": "N1\n(7/107)",
    "Lab": "K1,H1\n(7/107)"
  },
  {
    "Course Code": "ME 628",
    "Course Name": "Advanced Fluid Mechanics",
    "Credits": 4,
    "Lecture": "G1,G2\n(7/102)",
    "Tutorial": "H2\n(7/202)"
  },
  {
    "Course Code": "ES 632",
    "Course Name": "Energy Systems",
    "Credits": 4,
    "Lecture": "F1,F2\n(Jagdish Patel Learning Theatre)"
  },
  {
    "Course Code": "ME 691-X",
    "Course Name": "Special Topics in Mechanical Engineering: Mechanics of Elastic Rods",
    "Credits": 4,
    "Lecture": "M1,M2\n(7/106)"
  },
  {
    "Course Code": "ME 691-XIX",
    "Course Name": "Special Topics in Mechanical Engineering: Introduction to Computational Solid Mechanics",
    "Credits": 4,
    "Lecture": "F1,F2\n(7/109)",
    "Tutorial": "J2\n(7/109)"
  },
  {
    "Course Code": "ME 691-XX",
    "Course Name": "Special Topics in Mechanical Engineering: Introduction to Conduction and Radiation Heat Transfer",
    "Credits": 4,
    "Lecture": "M1,M2\n(7/205)",
    "Tutorial": "J1\n(7/201)"
  },
  {
    "Course Code": "ME 691-XXI",
    "Course Name": "Special Topics in Mechanical Engineering: Mechatronics Design Studio",
    "Credits": 4,
    "Lecture": "D1\n(Makers Bhavan)",
    "Lab": "K1,H1\n(Makers Bhavan)"
  },
  {
    "Course Code": "ME 691-XIV",
    "Course Name": "Special Topics in Mechanical Engineering: Mathematical Tools for Mechanical Engineers",
    "Credits": 4,
    "Lecture": "L1,L2\n(7/207)",
    "Tutorial": "H1\n(7/207)"
  },
  {
    "Course Code": "ME 691-XV",
    "Course Name": "Special Topics in Mechanical Engineering: Advanced Nonlinear Dynamics",
    "Credits": 4,
    "Lecture": "I1,I2\n(7/102)"
  },
  {
    "Course Code": "ME 643",
    "Course Name": "Aircraft and Rocket Propulsion",
    "Credits": 4,
    "Lecture": "P1,P2\n(7/202)"
  },
  {
    "Course Code": "ME 647",
    "Course Name": "Vapor Liquid Phase Change Phenomena",
    "Credits": 4,
    "Lecture": "Tuesday (6:30 PM to 7:50 PM), I2\n(7/104)"
  },
  {
    "Course Code": "ME 649",
    "Course Name": "Mathematical Tools for Mechanical Engineers-II",
    "Credits": 4,
    "Lecture": "L1,L2\n(7/207)",
    "Tutorial": "H1\n(7/207)"
  },
  {
    "Course Code": "ME 692-VII",
    "Course Name": "Special Topics in Mechanical Engineering: Data and Observer Design (first half)",
    "Credits": 2,
    "Lecture": "J1\n(7/206)",
    "Lab": "K2,L2\n(ME Lab)"
  },
  {
    "Course Code": "ME 692-VIII",
    "Course Name": "Special Topics in Mechanical Engineering: Introduction to Plasticity Theory (second half)",
    "Credits": 2,
    "Lecture": "N1 (7/201)\nG2 (7/202)"
  },
  {
    "Course Code": "ME 692-IX",
    "Course Name": "Special Topics in Mechanical Engineering: Rotary Wing Vehicle Aerodynamics and Design (second half)",
    "Credits": 2,
    "Lecture": "E2, Friday (6:30 PM to 7:50 PM)\n(7/104)",
    "Lab": "I1,K1\n(ME Lab)"
  },
  {
    "Course Code": "MSE 355",
    "Course Name": "Surface Engineering",
    "Credits": 4,
    "Lecture": "N1,N2\n(11/204)"
  },
  {
    "Course Code": "MSE 404",
    "Course Name": "Diffraction Methods for Structure and Stress Analysis",
    "Credits": 4,
    "Lecture": "N1,N2\n(11/205)"
  },
  {
    "Course Code": "MSE 603",
    "Course Name": "Thin Film Processing and Characterization",
    "Credits": 4,
    "Lecture": "A1,A2\n(11/205)"
  },
  {
    "Course Code": "MSE 605",
    "Course Name": "Biomaterials for Tissue Regeneration",
    "Credits": 4,
    "Lecture": "E1,J2\n(11/205)"
  },
  {
    "Course Code": "MSE 621",
    "Course Name": "Process Plant Design – How to Set Up a Process Industry",
    "Credits": 4,
    "Lecture": "F1,F2\n(7/106)"
  },
  {
    "Course Code": "ES 623 (N)",
    "Course Name": "Biomolecular Materials Science",
    "Credits": 4,
    "Lecture": "G1,G2\n(7/106)"
  },
  {
    "Course Code": "MSE 634",
    "Course Name": "Semiconductor Materials and Fabrication Process",
    "Credits": 4,
    "Lecture": "H1,H2\n(11/102)"
  }
];