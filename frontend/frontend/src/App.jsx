import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Login from "./pages/Login";
import ActivityDetail from "./pages/ActivityDetail";
import Dashboard from "./pages/Dashboard";
import ManageSite from "./pages/admin/ManageSite";
import ManageRegistrations from "./pages/admin/ManageRegistrations";
import ManageActivities from "./pages/admin/ManageActivities";
import ModifyActivity from "./pages/admin/ModifyActivity";
import ManageSessions from "./pages/admin/ManageSessions";
import SitesAndQuotas from "./pages/admin/SitesAndQuotas";
import LaunchDraw from "./pages/admin/LaunchDraw";
import ManageWithdrawals from "./pages/admin/ManageWithdrawals";
import Reports from "./pages/admin/Reports";
import DrawHistory from "./pages/admin/DrawHistory";
import ActivitiesCatalog from "./pages/employee/ActivitiesCatalog";
import MyRequests from "./pages/employee/MyRequests";
import DrawResults from "./pages/employee/DrawResults";
import Documents from "./pages/employee/Documents";
import ParticipationHistory from "./pages/employee/ParticipationHistory";
import Surveys from "./pages/employee/Surveys";
import IdeaBox from "./pages/employee/IdeaBox";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/activities/:slug" element={<ActivityDetail />} />

          {/* Employee Dashboard routes - Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="user">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/requests"
            element={
              <ProtectedRoute requiredRole="user">
                <MyRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/draw"
            element={
              <ProtectedRoute requiredRole="user">
                <DrawResults />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/surveys"
            element={
              <ProtectedRoute requiredRole="user">
                <Surveys />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/history"
            element={
              <ProtectedRoute requiredRole="user">
                <ParticipationHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/ideas"
            element={
              <ProtectedRoute requiredRole="user">
                <IdeaBox />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/documents"
            element={
              <ProtectedRoute requiredRole="user">
                <Documents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/catalog"
            element={
              <ProtectedRoute requiredRole="user">
                <ActivitiesCatalog />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard routes - Protected */}
          <Route
            path="/dashboard/admin/draw-history"
            element={
              <ProtectedRoute requiredRole="admin">
                <DrawHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/reports"
            element={
              <ProtectedRoute requiredRole="admin">
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/withdrawals"
            element={
              <ProtectedRoute requiredRole="admin">
                <ManageWithdrawals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/draw"
            element={
              <ProtectedRoute requiredRole="admin">
                <LaunchDraw />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/activities/:slug/sessions/:sessionId/sites-quotas"
            element={
              <ProtectedRoute requiredRole="admin">
                <SitesAndQuotas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/activities/:slug/sessions"
            element={
              <ProtectedRoute requiredRole="admin">
                <ManageSessions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/site"
            element={
              <ProtectedRoute requiredRole="admin">
                <ManageSite />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/activities/:slug/edit"
            element={
              <ProtectedRoute requiredRole="admin">
                <ModifyActivity />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/activities"
            element={
              <ProtectedRoute requiredRole="admin">
                <ManageActivities />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin/registrations"
            element={
              <ProtectedRoute requiredRole="admin">
                <ManageRegistrations />
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;