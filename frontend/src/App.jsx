import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Login from "./pages/Login";
import ActivityDetail from "./pages/ActivityDetail";
import Documents from "./pages/Dashboard/Documents";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activities/:slug" element={<ActivityDetail />} />
        <Route path="/dashboard/documents" element={<Documents />} />
        {/* <Route path="/dashboard/draws" element={<DrawResults />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;