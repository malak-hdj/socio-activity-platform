import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "./AdminLayout";
import DashboardLayout from "./DashboardLayout";

export default function AppLayout({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  const isAdminArea = location.pathname.toLowerCase().startsWith("/dashboardadmin");

  return user?.role === "admin" || isAdminArea
    ? <AdminLayout>{children}</AdminLayout>
    : <DashboardLayout>{children}</DashboardLayout>;
}
