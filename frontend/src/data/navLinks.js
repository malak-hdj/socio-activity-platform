// Shared nav data — imported by both DashboardLayout and AdminLayout

export const employeeLinks = [
  { label: "Dashboard",             to: "/dashboard" },
  { label: "My Requests",           to: "/dashboard/requests",  badge: 3 },
  { label: "Draw Results",          to: "/dashboard/draws" },
  { label: "Documents",             to: "/dashboard/documents" },
  { label: "Participation History", to: "/dashboard/history" },
  { label: "Surveys",               to: "/dashboard/surveys" },
  { label: "Idea Box",              to: "/dashboard/ideas" },
];

export const adminLinks = [
  { label: "Manage Activities",     to: "/dashboardadmin/activities" },
  { label: "Manage Registrations",  to: "/admin/registrations" },
  { label: "Launch Draw",           to: "/admin/draw" },
  { label: "Withdrawals",           to: "/admin/withdrawals", badge: 4 },
  { label: "Reports",               to: "/admin/reports" },
  { label: "Draw History",          to: "/admin/draw-history" },
];