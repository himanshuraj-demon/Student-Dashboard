# Technical Decisions, Challenges Faced, and Future Improvements

# DEMO LINK 
https://drive.google.com/file/d/1TJiICenQYvTWsLkdB4BlCtsEOu_fPWQ7/view?usp=sharing

# Technical Decisions

While building StudyTracker, my primary goal was to create a single platform that students could use to manage their academics instead of relying on multiple separate applications. The application combines course planning, timetable generation, notes, task management, analytics, academic calendars, and an AI assistant into one dashboard.

## Frontend Architecture

The frontend was developed using **React**, **TypeScript**, and **Vite**. React's component-based architecture made it easier to divide the application into reusable modules such as the Dashboard, Notes, Timetable Generator, Semester Planner, Analytics, and Course Management.

I used **React Router** for navigation, allowing the application to behave like a single-page application while keeping page transitions smooth. **Tailwind CSS** was chosen because it allowed rapid UI development and helped maintain a consistent design across all pages without writing large amounts of custom CSS.

Charts and academic visualizations were implemented using **Recharts**, making it easier for students to understand their academic performance through interactive graphs rather than plain numbers.

## Backend Design

The backend was built with **Node.js** and **Express.js** following a REST API architecture. I separated the application into routes, controllers, middleware, and models to keep the project organized and maintainable.

Authentication is handled using **JWT** with HTTP-only cookies to improve security, while **Google OAuth** was integrated to provide users with a faster login experience.

## Database Design

I chose **MongoDB** because the application manages different kinds of data, including user profiles, notes, tasks, completed courses, semester information, and academic records. MongoDB's document-based structure made it easy to evolve the schema as new features were added during development.

Mongoose simplified schema validation and database interactions while keeping the code clean and consistent.

## Security

Security was an important consideration throughout the project. Helmet was used to secure HTTP headers, JWT authentication protected private routes, user input was validated before processing, and MongoDB sanitization was implemented to reduce the risk of NoSQL injection attacks.

---

# Challenges Faced

## Managing Multiple Academic Modules

One of the biggest challenges was integrating many independent modules into a single application. Features such as Notes, Todo Management, Timetable Generation, Semester Planning, Analytics, and Course Management all required different data structures and workflows while still providing a consistent user experience.

## Designing the Database

Although MongoDB provides flexibility, designing collections that could efficiently represent courses, semesters, completed credits, notes, and tasks required careful planning. Several schema modifications were made during development as new requirements emerged.

## Timetable Generator

Creating the timetable generator was more challenging than expected because it needed to detect conflicting course slots while generating a clear weekly timetable. Handling different scheduling scenarios required careful logic and repeated testing.

## Authentication

Implementing secure authentication with both JWT and Google OAuth involved handling protected routes, persistent login sessions, cookie management, and user authorization while ensuring a smooth user experience.

## User Interface

As more features were added, maintaining a clean and intuitive interface became increasingly difficult. Several pages were redesigned multiple times to improve navigation, responsiveness, and accessibility across desktop and mobile devices.

---

# What I Would Do With More Time

If given more time, I would continue improving StudyTracker by adding features that make it even more useful for students.

Some planned improvements include:

- Attendance tracking integrated with courses.
- Smarter AI-powered course recommendations based on previous academic performance.
- Collaborative study groups where students can share notes and resources.
- Push notifications and reminder system for assignments and deadlines.
- Mobile application for Android and iOS.
- Offline support for notes and task management.
- More detailed academic analytics and performance forecasting.
- Faculty and teaching assistant portals for sharing course materials.

From a software engineering perspective, I would also improve testing by increasing automated test coverage, introduce CI/CD pipelines for deployment, containerize the application using Docker, and optimize performance for larger numbers of users.

---

# Reflection

Developing StudyTracker gave me practical experience in designing and building a complete full-stack application from scratch. Beyond implementing features, I learned the importance of modular architecture, secure authentication, database design, responsive UI development, and maintaining clean code as a project grows.

The project strengthened my understanding of modern web development and taught me how to balance functionality, usability, and maintainability while building software intended for real users.