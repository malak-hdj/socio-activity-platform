import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Login from "./pages/Login";
import ActivityDetail from "./pages/ActivityDetail";
import Documents from "./pages/Dashboard/Documents";
import ParticipationHistory from "./pages/Dashboard/ParticipationHistory";
import Surveys from "./pages/Dashboard/Surveys";
import IdeaBox from "./pages/Dashboard/IdeaBox";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activities/:slug" element={<ActivityDetail />} />
        <Route path="/dashboard/documents" element={<Documents />} />
        <Route path="/dashboard/history" element={<ParticipationHistory />} />
        <Route path="/dashboard/surveys" element={<Surveys />} />
        <Route path="/dashboard/ideas" element={<IdeaBox />} />
        {/* <Route path="/dashboard/draws" element={<DrawResults />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
