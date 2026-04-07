import { useNavigate, Link, useLocation } from "react-router-dom";

const sidebarLinks = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "My Requests", to: "/dashboard/requests" },
  { label: "Draw Results", to: "/dashboard/draws" },
  { label: "Documents", to: "/dashboard/documents" },
  { label: "Participation History", to: "/dashboard/history" },
  { label: "Surveys", to: "/dashboard/surveys" },
  { label: "Idea Box", to: "/dashboard/ideas" },
];

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F7F7F5]">

      {/* ── Navbar */}
      <div className="flex justify-center px-4 pt-[18px] pb-0 relative z-10">
        <nav className="flex w-full max-w-[1336px] min-h-[74px] px-5 py-[13px] justify-between items-center rounded-[22px] border border-[rgba(229,226,220,0.92)] bg-[rgba(255,255,255,0.82)] backdrop-blur-[5px]">

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-[14px] min-w-[220px] cursor-pointer"
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/af72391ae8971f15efed2311d265b92f2f3a69fd?width=84"
              alt="Sonatrach"
              className="w-[42px] h-[42px] rounded-[10px] object-cover"
            />
            <span className="text-[#2F343B] font-bold text-2xl">SONATRACH</span>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-[380px] mx-6 h-[42px] items-center gap-2 px-4 rounded-full border border-[#E5E2DC] bg-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A8088" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="flex-1 text-sm text-[#2F343B] outline-none bg-transparent placeholder:text-[#7A8088]"
              placeholder="Search activities, announcements..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="flex min-h-[42px] p-1 items-center gap-1 rounded-full border border-[#E5E2DC] bg-[rgba(255,255,255,0.88)]">
              <button className="flex h-8 min-w-[38px] px-[11.5px] justify-center items-center rounded-full bg-[#ED8D31]">
                <span className="text-white text-xs font-semibold">EN</span>
              </button>
              <button disabled className="flex h-8 min-w-[38px] px-[10.7px] justify-center items-center rounded-full cursor-not-allowed opacity-60">
                <span className="text-[#7A8088] text-xs font-semibold">FR</span>
              </button>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-2">
              <div className="w-[42px] h-[42px] rounded-full bg-[#ED8D31] flex items-center justify-center text-white font-bold text-sm">
                AK
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-[#2F343B] text-sm font-semibold leading-tight">Ahmed K.</span>
                <span className="text-[#7A8088] text-xs">Employee</span>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* ── Body */}
      <div className="flex justify-center px-4 py-8">
        <div className="w-full max-w-[1336px] flex gap-8">

          {/* ── Sidebar */}
          <aside className="hidden lg:flex flex-col gap-1 w-[220px] shrink-0 pt-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`px-4 py-2.5 rounded-[12px] text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "bg-[#ED8D31] text-white"
                    : "text-[#7A8088] hover:text-[#2F343B] hover:bg-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </aside>

          {/* ── Page content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>

        </div>
      </div>

      {/* ── Footer */}
      <div className="flex justify-center px-4 pt-8 pb-4">
        <div className="w-full max-w-[1336px] flex justify-between items-center border-t border-[#E5E2DC] pt-6">
          <div className="text-[#7A8088] text-sm font-normal">
            © 2026 SONATRACH. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#7A8088] text-sm hover:text-[#2F343B] transition-colors">Policies</a>
            <a href="#" className="text-[#7A8088] text-sm hover:text-[#2F343B] transition-colors">Contact</a>
            <a href="#" className="text-[#7A8088] text-sm hover:text-[#2F343B] transition-colors">Social Media</a>
          </div>
        </div>
      </div>

    </div>
  );
}