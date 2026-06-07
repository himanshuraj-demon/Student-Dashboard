import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home,Login,Signup,Error,Timetable,Dashbord, Todo, Calender, Notes, Courses, Analytics, Profile, Competitive} from "./services"
import ThemeProvider from "./context/ThemeContext";
import { useAuth } from "./hooks/useAuth";


const App = () => {
  const { auth } = useAuth();
  return (
    <BrowserRouter>
    <ThemeProvider>
      <Routes>
        <Route path="/" element={auth ? <Home /> : <Dashbord />} errorElement={<Error/>}/>
        <Route path="/timetable" element={<Timetable />} errorElement={<Error/>} />
        <Route path="/dashboard" element={<Dashbord />} errorElement={<Error/>} />
        <Route path="/todo" element={<Todo />} errorElement={<Error/>} />
        <Route path="/calendar" element={<Calender />} errorElement={<Error/>}/>
        <Route path="/notes" element={<Notes />} errorElement={<Error/>} />
        <Route path="/courses" element={<Courses />} errorElement={<Error/>}/>
        <Route path="/analytics" element={<Analytics />} errorElement={<Error/>}/>
        <Route path="/profile" element={<Profile />} errorElement={<Error/>}/>
        <Route path="/competitive" element={<Competitive />} errorElement={<Error/>}/>
        <Route path="/login" element={<Login />} errorElement={<Error/>}/>
        <Route path="/signup" element={<Signup />} errorElement={<Error/>}/>
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
