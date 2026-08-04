export interface Minor {
  code: string;
  name: string;
  requiredCredits: number;
  hasDetailedCourses: boolean;
  note: string | null;
}

export interface MinorCourse {
  minorCode: string;
  courseCode: string;
  courseName: string;
  credits: number;
  isMandatory: boolean;
  note: string | null;
}

export const MINORS: Minor[] = [
  { code: 'ARCH', name: 'Archaeological Sciences', requiredCredits: 20, hasDetailedCourses: true, note: null },
  { code: 'AI', name: 'Artificial Intelligence', requiredCredits: 20, hasDetailedCourses: true, note: null },
  { code: 'AUTO', name: 'Automobile Engineering', requiredCredits: 20, hasDetailedCourses: false, note: 'NOT_PUBLISHED' },
  { code: 'BIOENG', name: 'Biological Engineering', requiredCredits: 20, hasDetailedCourses: false, note: 'NOT_PUBLISHED' },
  { code: 'BME', name: 'Biomedical Engineering', requiredCredits: 20, hasDetailedCourses: true, note: null },
  { code: 'CL', name: 'Chemical Engineering', requiredCredits: 20, hasDetailedCourses: false, note: 'NOT_PUBLISHED' },
  { code: 'CHEM', name: 'Chemistry', requiredCredits: 20, hasDetailedCourses: false, note: 'NOT_PUBLISHED' },
  { code: 'CE', name: 'Civil Engineering', requiredCredits: 20, hasDetailedCourses: false, note: 'NOT_PUBLISHED' },
  { code: 'COGSCI', name: 'Cognitive Science', requiredCredits: 20, hasDetailedCourses: false, note: 'NOT_PUBLISHED' },
  { code: 'CM', name: 'Computational Mechanics', requiredCredits: 20, hasDetailedCourses: true, note: null },
  { code: 'CSE', name: 'Computer Science and Engineering', requiredCredits: 20, hasDetailedCourses: true, note: null },
  { code: 'DA', name: 'Data Analytics', requiredCredits: 20, hasDetailedCourses: true, note: null },
  { code: 'DESIGN', name: 'Design', requiredCredits: 20, hasDetailedCourses: false, note: 'NOT_PUBLISHED' },
  { code: 'EARTH', name: 'Earth Sciences', requiredCredits: 20, hasDetailedCourses: false, note: 'NOT_PUBLISHED' },
  { code: 'EE', name: 'Electrical Engineering', requiredCredits: 20, hasDetailedCourses: false, note: 'NOT_PUBLISHED' },
  { code: 'HSS', name: 'Humanities and Social Sciences', requiredCredits: 20, hasDetailedCourses: false, note: 'NOT_PUBLISHED' },
  { code: 'ICDT', name: 'Integrated Circuit Design and Technology', requiredCredits: 20, hasDetailedCourses: true, note: null },
  { code: 'MGMT', name: 'Management', requiredCredits: 20, hasDetailedCourses: false, note: 'NOT_PUBLISHED' },
  { code: 'MSE', name: 'Materials Engineering', requiredCredits: 20, hasDetailedCourses: false, note: 'NOT_PUBLISHED' },
  { code: 'MATH', name: 'Mathematics', requiredCredits: 20, hasDetailedCourses: false, note: 'NOT_PUBLISHED' },
  { code: 'ME', name: 'Mechanical Engineering', requiredCredits: 20, hasDetailedCourses: false, note: 'NOT_PUBLISHED' },
  { code: 'PHY', name: 'Physics', requiredCredits: 20, hasDetailedCourses: false, note: 'NOT_PUBLISHED' },
  { code: 'QT', name: 'Quantum Technologies', requiredCredits: 20, hasDetailedCourses: true, note: null },
  { code: 'ROBO', name: 'Robotics', requiredCredits: 20, hasDetailedCourses: true, note: null },
  { code: 'SAFETY', name: 'Safety Engineering', requiredCredits: 20, hasDetailedCourses: false, note: 'NOT_PUBLISHED' },
  { code: 'SUSDEV', name: 'Sustainable Development', requiredCredits: 20, hasDetailedCourses: true, note: null },
];

export const MINOR_COURSES: MinorCourse[] = [
  // --- Archaeological Sciences (Adv 63, section A) ---
  { minorCode: 'ARCH', courseCode: 'EH628', courseName: 'The Prehistory of Homo Sapiens', credits: 4, isMandatory: false, note: null },
  { minorCode: 'ARCH', courseCode: 'HS326', courseName: 'Harappan Civilization', credits: 4, isMandatory: false, note: null },
  { minorCode: 'ARCH', courseCode: 'HS425', courseName: 'Introduction to Archaeology', credits: 4, isMandatory: false, note: null },
  { minorCode: 'ARCH', courseCode: 'HS508', courseName: 'Introduction to Indian Knowledge Systems', credits: 4, isMandatory: false, note: null },
  { minorCode: 'ARCH', courseCode: 'HS510', courseName: 'Perspectives on Indian Civilization', credits: 4, isMandatory: false, note: null },
  { minorCode: 'ARCH', courseCode: 'HS520', courseName: 'Ancient Indian Architecture', credits: 4, isMandatory: false, note: null },
  { minorCode: 'ARCH', courseCode: 'IN304', courseName: 'Ancient Indian Technology', credits: 4, isMandatory: false, note: null },
  { minorCode: 'ARCH', courseCode: 'IN402', courseName: 'Human Evolution', credits: 4, isMandatory: false, note: null },

  // --- Artificial Intelligence (Adv 63, section H) ---
  { minorCode: 'AI', courseCode: 'CS303', courseName: 'Mathematical Foundations for AI', credits: 4, isMandatory: true, note: 'Mandatory' },
  { minorCode: 'AI', courseCode: 'ES204', courseName: 'Digital Systems', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'AI', courseCode: 'ES242', courseName: 'Data Structures & Algorithms I', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'AI', courseCode: 'ES244', courseName: 'Signals, Systems & Random Processes', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'AI', courseCode: 'ES245', courseName: 'Control Systems', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'AI', courseCode: 'ES335', courseName: 'Machine Learning', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'AI', courseCode: 'ES336', courseName: 'Computer Organization & Architecture', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'AI', courseCode: 'CS201', courseName: 'Theory of Computing', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'AI', courseCode: 'CS203', courseName: 'Software Tools & Techniques for AI', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'AI', courseCode: 'CS328', courseName: 'Introduction to Data Science', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'AI', courseCode: 'CS329', courseName: 'Foundations for AI: Multiagent Systems', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'AI', courseCode: 'CS613', courseName: 'Natural Language Processing', credits: 4, isMandatory: false, note: 'Elective' },
  { minorCode: 'AI', courseCode: 'ES666', courseName: 'Computer Vision', credits: 4, isMandatory: false, note: 'Elective' },
  { minorCode: 'AI', courseCode: 'ES667', courseName: 'Deep Learning', credits: 4, isMandatory: false, note: 'Elective' },

  // --- Biomedical Engineering (Adv 63, section B) ---
  { minorCode: 'BME', courseCode: 'BE303', courseName: 'Bionanotechnology - Principles and Applications', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'BE304', courseName: 'Introduction to Biomedical Engineering', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'BE403', courseName: 'Stem Cells', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'BE601', courseName: 'Applied Biological Engineering', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'BE603', courseName: 'Biophysical Techniques', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'EE605', courseName: 'Digital Image Processing', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'BE614', courseName: 'Biostatistics', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'BE616', courseName: 'Human Physiology', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'BE617', courseName: 'Novel Drug Delivery Technologies: Fundamental Principles and Engineering', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'CL426', courseName: 'Introduction to Biochemical Engineering', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'EE323', courseName: 'Digital Signal Processing', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'EE606', courseName: 'Applied Statistical Bioelectric Signal Analysis', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'ES244', courseName: 'Signals, Systems and Random Processes', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'ES606', courseName: 'Computational Neuroscience', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'ES623', courseName: 'Biomolecular Material Science', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'ES641', courseName: 'Electronic Instrumentation', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'ES655', courseName: 'Medical Imaging Systems', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'ES656', courseName: 'Human Robot Interaction', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'ES657', courseName: 'Biomedical Ultrasound', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'HS638', courseName: 'Disease, Health and Inequality', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'MS410', courseName: 'Medical Products Industry: Quality and Regulations', credits: 4, isMandatory: false, note: null },
  { minorCode: 'BME', courseCode: 'MSE605', courseName: 'Biomaterials for Tissue Regeneration', credits: 4, isMandatory: false, note: null },

  // --- Computational Mechanics (Adv 63, section C) ---
  { minorCode: 'CM', courseCode: 'MA_NUMENG', courseName: 'Numerical Methods for Engineers (course to be floated)', credits: 4, isMandatory: true, note: 'Mandatory — TBD, not yet floated per advisory' },
  { minorCode: 'CM', courseCode: 'ES622', courseName: 'Finite Element Methods', credits: 4, isMandatory: false, note: 'At least 1 of ES622/ME605 required' },
  { minorCode: 'CM', courseCode: 'ME605', courseName: 'Computational Fluid Dynamics', credits: 4, isMandatory: false, note: 'At least 1 of ES622/ME605 required' },
  { minorCode: 'CM', courseCode: 'MSE203', courseName: 'Introduction to Computational Materials Engineering', credits: 4, isMandatory: false, note: 'Up to 3 courses (4-12cr) from this group' },
  { minorCode: 'CM', courseCode: 'MSE402', courseName: 'Computational Process Design', credits: 4, isMandatory: false, note: 'Up to 3 courses (4-12cr) from this group' },
  { minorCode: 'CM', courseCode: 'EH618', courseName: 'Computational Tools for Earth System Modeling', credits: 4, isMandatory: false, note: 'Up to 3 courses (4-12cr) from this group' },
  { minorCode: 'CM', courseCode: 'ES664', courseName: 'Scientific Computing using C++', credits: 4, isMandatory: false, note: 'Up to 3 courses (4-12cr) from this group' },
  { minorCode: 'CM', courseCode: 'CS616', courseName: 'Distributed Systems and Cloud Computing', credits: 4, isMandatory: false, note: 'Up to 3 courses (4-12cr) from this group' },
  { minorCode: 'CM', courseCode: 'ES658', courseName: 'Molecular Simulations - Theory and Applications', credits: 4, isMandatory: false, note: 'Up to 3 courses (4-12cr) from this group' },

  // --- Computer Science and Engineering (Adv 63, section I) ---
  { minorCode: 'CSE', courseCode: 'ES242', courseName: 'Data Structures & Algorithms I', credits: 4, isMandatory: true, note: 'Mandatory (except AI-major students)' },
  { minorCode: 'CSE', courseCode: 'ES214', courseName: 'Discrete Mathematics', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'CSE', courseCode: 'ES204', courseName: 'Digital Systems', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'CSE', courseCode: 'ES336', courseName: 'Computer Organization & Architecture', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'CSE', courseCode: 'CS201', courseName: 'Theory of Computing', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'CSE', courseCode: 'CS202', courseName: 'Software Tools & Techniques for CSE', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'CSE', courseCode: 'CS329', courseName: 'Foundations of AI: Multiagent Systems', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'CSE', courseCode: 'CS330', courseName: 'Operating Systems', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'CSE', courseCode: 'CS331', courseName: 'Computer Networks', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },

  // --- Data Analytics (Adv 63, section J) ---
  { minorCode: 'DA', courseCode: 'BE614', courseName: 'Biostatistics', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'CE605', courseName: 'Remote Sensing of Land and Water Resources', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'ES606', courseName: 'Computational Neuroscience', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'CS328', courseName: 'Introduction to Data Science', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'CS432', courseName: 'Databases', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'CS613', courseName: 'Natural Language Processing', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'EE605', courseName: 'Digital Image Processing', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'EE606', courseName: 'Applied Statistical Bioelectric Signal Analysis', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'EE609', courseName: 'Advanced Signal Processing', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'EE645', courseName: '3D Computer Vision', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'ES242', courseName: 'Data Structures and Algorithms I', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'ES301', courseName: 'Data Structures and Algorithms II', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'ES404', courseName: 'Networks and Complex Systems', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'ES410', courseName: 'Introduction to Inverse Modelling in Physical Sciences', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'ES411', courseName: 'Topics in Complexity Science', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'ES413', courseName: 'Deep Learning', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'ES612', courseName: 'Artificial Intelligence', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'ES615', courseName: 'Nature Inspired Computing', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'ES617', courseName: 'Design of Experiments', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'ES634', courseName: 'Applied Multivariate Data Analysis', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'ES645', courseName: 'Optimization Methods for Machine Learning', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'HS523', courseName: 'Quantitative Research Methods in Social Sciences', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'MA632', courseName: 'Applied Statistics', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'ES335', courseName: 'Machine Learning', credits: 4, isMandatory: false, note: null },
  { minorCode: 'DA', courseCode: 'EH615', courseName: 'Statistical Seismology', credits: 4, isMandatory: false, note: null },

  // --- ICDT (Adv 63, section D) ---
  { minorCode: 'ICDT', courseCode: 'EE322', courseName: 'Analog & Mixed-Signal Circuits', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'ICDT', courseCode: 'EE227', courseName: 'CMOS Circuit Design', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'ICDT', courseCode: 'ES336', courseName: 'Computer Organization & Architecture', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'ICDT', courseCode: 'ES204', courseName: 'Digital Systems', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'ICDT', courseCode: 'EE501', courseName: 'Semiconductor Material & Device Characterization', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'ICDT', courseCode: 'EE226', courseName: 'Semiconductor Devices', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'ICDT', courseCode: 'EE502', courseName: 'IC Fabrication & Manufacturing', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'ICDT', courseCode: 'EE503', courseName: 'Thin Film Science & Vacuum Technology', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },
  { minorCode: 'ICDT', courseCode: 'EE504', courseName: 'Semiconductor Package Assembly & Manufacturing', credits: 4, isMandatory: false, note: 'Core option (need ≥2)' },

  // --- Quantum Technologies (Adv 63, section E) ---
  { minorCode: 'QT', courseCode: 'PH202', courseName: 'Introduction to Quantum Physics', credits: 4, isMandatory: true, note: 'Mandatory' },
  { minorCode: 'QT', courseCode: 'QT_APPS', courseName: 'Quantum Technologies - Applications (course to be floated)', credits: 4, isMandatory: true, note: 'Mandatory — TBD, not yet floated per advisory' },
  { minorCode: 'QT', courseCode: 'PH616', courseName: 'Quantum Optics', credits: 4, isMandatory: false, note: 'At least 2 from this group' },
  { minorCode: 'QT', courseCode: 'PH643', courseName: 'Quantum Computation and Information', credits: 4, isMandatory: false, note: 'At least 2 from this group' },

  // --- Robotics (Adv 63, section F) ---
  { minorCode: 'ROBO', courseCode: 'ES408', courseName: 'Mechatronics', credits: 4, isMandatory: false, note: 'At least 1 of ES408/ME639 required' },
  { minorCode: 'ROBO', courseCode: 'ME639', courseName: 'Introduction to Robotics', credits: 4, isMandatory: false, note: 'At least 1 of ES408/ME639 required' },
  { minorCode: 'ROBO', courseCode: 'ES321', courseName: 'Dynamics and Vibration', credits: 4, isMandatory: false, note: null },
  { minorCode: 'ROBO', courseCode: 'ES332', courseName: 'Control Systems', credits: 4, isMandatory: false, note: null },
  { minorCode: 'ROBO', courseCode: 'ES613', courseName: 'Modern Control Theory', credits: 4, isMandatory: false, note: null },
  { minorCode: 'ROBO', courseCode: 'ES616', courseName: 'Digital Control Systems', credits: 4, isMandatory: false, note: null },
  { minorCode: 'ROBO', courseCode: 'ES637', courseName: 'Mathematical Foundations for Computer Vision and Graphics', credits: 4, isMandatory: false, note: null },
  { minorCode: 'ROBO', courseCode: 'ES641', courseName: 'Electronic Instrumentation', credits: 4, isMandatory: false, note: null },
  { minorCode: 'ROBO', courseCode: 'ES642', courseName: 'Control of Nonlinear Dynamical Systems', credits: 4, isMandatory: false, note: null },
  { minorCode: 'ROBO', courseCode: 'ES656', courseName: 'Human-Robot Interaction', credits: 4, isMandatory: false, note: null },
  { minorCode: 'ROBO', courseCode: 'ES666', courseName: 'Computer Vision', credits: 4, isMandatory: false, note: null },
  { minorCode: 'ROBO', courseCode: 'ME322', courseName: 'Synthesis and Analysis of Mechanisms', credits: 4, isMandatory: false, note: null },

  // --- Sustainable Development (Adv 63, section G) ---
  { minorCode: 'SUSDEV', courseCode: 'CE605', courseName: 'Remote Sensing of Land and Water Resources', credits: 4, isMandatory: false, note: 'Water' },
  { minorCode: 'SUSDEV', courseCode: 'CE611', courseName: 'Advanced Engineering Hydrology', credits: 4, isMandatory: false, note: 'Water' },
  { minorCode: 'SUSDEV', courseCode: 'CE634', courseName: 'Air Pollution Control Engineering', credits: 4, isMandatory: false, note: 'Pollution & Waste Management' },
  { minorCode: 'SUSDEV', courseCode: 'CE637', courseName: 'Infrastructure Systems: Planning and Management', credits: 4, isMandatory: false, note: 'Water' },
  { minorCode: 'SUSDEV', courseCode: 'EE426', courseName: 'Electric Vehicle Technology', credits: 4, isMandatory: false, note: 'Energy' },
  { minorCode: 'SUSDEV', courseCode: 'EH602', courseName: 'River Morphology and Ecology', credits: 4, isMandatory: false, note: 'Water' },
  { minorCode: 'SUSDEV', courseCode: 'EH605', courseName: 'Modelling of Earth System & Sustainability', credits: 4, isMandatory: false, note: 'Environment/Biodiversity/Earth Systems' },
  { minorCode: 'SUSDEV', courseCode: 'EH608', courseName: 'Biodiversity Conservation and Sustainable Development', credits: 4, isMandatory: false, note: 'Environment/Biodiversity/Earth Systems' },
  { minorCode: 'SUSDEV', courseCode: 'EH612', courseName: 'Ocean and Global Change', credits: 4, isMandatory: false, note: 'Water' },
  { minorCode: 'SUSDEV', courseCode: 'ES632', courseName: 'Energy Systems', credits: 4, isMandatory: false, note: 'Energy' },
  { minorCode: 'SUSDEV', courseCode: 'ES635', courseName: 'Water Quality Engineering', credits: 4, isMandatory: false, note: 'Pollution & Waste Management' },
  { minorCode: 'SUSDEV', courseCode: 'ES663', courseName: 'Smart Renewable Energy Systems', credits: 4, isMandatory: false, note: 'Energy' },
  { minorCode: 'SUSDEV', courseCode: 'ES665', courseName: 'Advanced Transportation Electrification Technology', credits: 4, isMandatory: false, note: 'Energy' },
  { minorCode: 'SUSDEV', courseCode: 'HS515', courseName: 'Politics of the Environment', credits: 4, isMandatory: false, note: 'Environment/Biodiversity/Earth Systems' },
  { minorCode: 'SUSDEV', courseCode: 'IN304', courseName: 'Ancient Indian Technology', credits: 4, isMandatory: false, note: 'Environment/Biodiversity/Earth Systems' },
];
