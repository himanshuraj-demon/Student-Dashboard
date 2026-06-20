import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import {
  Home,
  Login,
  Signup,
  Error,
  Timetable,
  Dashbord,
  Planner,
  Courses,
  Analytics,
  Profile,
  Competitive,
  Details,
  Work,
  AdminPage,
  AdminError,
  AcademicCalendar,
} from "./services";
import ThemeProvider from "./context/ThemeContext";
import { useAuth } from "./hooks/useAuth";
import axios from "axios";
import ProtectedRoute from "./context/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import FullScreenLoader from "./components/FullScreenLoader";

axios.defaults.withCredentials = true;

const App = () => {
  const { auth, user } = useAuth();
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Toaster position="top-center" />
        <Suspense fallback={<FullScreenLoader />}>
          <Routes>
            <Route
              path="/"
              element={auth ? <Navigate to="/dashboard" /> : <Home />}
            />
            <Route element={<ProtectedRoute />}>
              <Route
                path="/timetable"
                element={<Timetable />}
                
              />
              <Route
                path="/admin"
                element={
                  user?.role === "ADMIN" ? (
                    <AdminPage currentUser={user} />
                  ) : (
                    <AdminError />
                  )
                }
                
              />
              <Route
                path="/dashboard"
                element={<Dashbord />}
                
              />
              <Route
                path="/planner"
                element={<Planner />}
                
              />
              <Route
                path="/courses"
                element={<Courses />}
                
              />
              <Route
                path="/analytics"
                element={<Analytics />}
                
              />
              <Route
                path="/profile"
                element={<Profile />}
                
              />
              <Route
                path="/competitive"
                element={<Competitive />}
                
              />
              <Route path="/work" element={<Work />}  />
              <Route
                path="/calender"
                element={<AcademicCalendar />}
                
              />
            </Route>
            <Route
              path="/details"
              element={<Details />}
              
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/signup"
              element={<Signup />}
              
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
