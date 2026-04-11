import { useAuth } from "../context/AuthContext";
import AdminLayout from "./AdminLayout";
import DashboardLayout from "./DashboardLayout";

export default function AppLayout({ children }) {
  const { user } = useAuth();
  
  return user?.role === "admin" 
    ? <AdminLayout>{children}</AdminLayout>
    : <DashboardLayout>{children}</DashboardLayout>;
}