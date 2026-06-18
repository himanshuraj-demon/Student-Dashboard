import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
  AdminError
} from "./services";
import ThemeProvider from "./context/ThemeContext";
import { useAuth } from "./hooks/useAuth";
import axios from "axios";
import ProtectedRoute from "./context/ProtectedRoute";
import { Toaster } from "react-hot-toast";

axios.defaults.withCredentials = true;

const App = () => {
  const { auth,user } = useAuth();
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Toaster position="top-center" />
        <Routes>
          <Route
            path="/"
            element={auth ? <Navigate to="/dashboard" /> : <Home />}
            errorElement={<Error />}
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/timetable"
              element={<Timetable />}
              errorElement={<Error />}
            />
            <Route
              path="/admin"
              element={user?.role==="ADMIN" ? <AdminPage currentUser={user}/> : <AdminError/>}
              errorElement={<Error />}
            />
            <Route
              path="/dashboard"
              element={<Dashbord />}
              errorElement={<Error />}
            />
            <Route
              path="/planner"
              element={<Planner />}
              errorElement={<Error />}
            />
            <Route
              path="/courses"
              element={<Courses />}
              errorElement={<Error />}
            />
            <Route
              path="/analytics"
              element={<Analytics />}
              errorElement={<Error />}
            />
            <Route
              path="/profile"
              element={<Profile />}
              errorElement={<Error />}
            />
            <Route
              path="/competitive"
              element={<Competitive />}
              errorElement={<Error />}
            />
            <Route
              path="/work"
              element={<Work />}
              errorElement={<Error />}
            />
          </Route>
          <Route
            path="/details"
            element={<Details />}
            errorElement={<Error />}
          />
          <Route path="/login" element={<Login />} errorElement={<Error />} />
          <Route path="/signup" element={<Signup />} errorElement={<Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
