import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import AITutor from "./pages/AITutor";
import AdaptiveLearning from "./pages/AdaptiveLearning";
import VRClassroom from "./pages/VRClassroom";
import Gamification from "./pages/Gamification";
import Analytics from "./pages/Analytics";
import MyLearning from "./pages/MyLearning";
import Profile from "./pages/Profile";
import CourseDetails from "./pages/CourseDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course-details" element={<CourseDetails />} />
            <Route path="/ai-tutor" element={<AITutor />} />
            <Route
              path="/adaptive-learning"
              element={<AdaptiveLearning />}
            />
            <Route path="/vr-classroom" element={<VRClassroom />} />
            <Route path="/gamification" element={<Gamification />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/my-learning" element={<MyLearning />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;