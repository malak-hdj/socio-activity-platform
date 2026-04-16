import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { employeeLinks } from "../data/navLinks";

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isActive = (to) => location.pathname === to;

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      <div className="flex justify-center px-4 pt-[18px] pb-0 relative z-10">
        <nav className="flex w-full max-w-[1440px] min-h-[74px] px-5 py-[13px] justify-between items-center rounded-[22px] border border-[rgba(229,226,220,0.92)] bg-[rgba(255,255,255,0.82)] backdrop-blur-[5px]">
          <div onClick={() => navigate("/")} className="flex items-center gap-3 cursor-pointer">
            <img src="https://api.builder.io/api/v1/image/assets/TEMP/af72391ae8971f15efed2311d265b92f2f3a69fd?width=84" alt="Sonatrach" className="w-[38px] h-[38px] rounded-[10px] object-cover" />
            <span className="text-[#2F343B] font-bold text-xl">SONATRACH</span>
          </div>
          <div className="hidden md:flex flex-1 max-w-[380px] mx-6 h-[40px] items-center gap-2 px-4 rounded-full border border-[#E5E2DC] bg-white">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7A8088" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input className="flex-1 text-sm outline-none bg-transparent placeholder:text-[#7A8088]" placeholder="Search activities, announcements..." />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex p-1 items-center gap-1 rounded-full border border-[#E5E2DC] bg-white">
              <button className="flex h-7 min-w-[36px] px-2 justify-center items-center rounded-full bg-[#ED8D31]"><span className="text-white text-xs font-semibold">EN</span></button>
              <button disabled className="flex h-7 min-w-[36px] px-2 justify-center items-center rounded-full opacity-50"><span className="text-[#7A8088] text-xs font-semibold">FR</span></button>
            </div>
            <button className="w-[38px] h-[38px] rounded-full border border-[#E5E2DC] bg-white flex items-center justify-center text-[#7A8088] hover:text-[#2F343B] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[#2F343B] text-sm font-semibold leading-tight">{user?.name ?? "Ahmed K."}</span>
                <span className="text-[#7A8088] text-xs">Employee</span>
              </div>
              <div onClick={() => { logout(); navigate("/login"); }} className="w-[38px] h-[38px] rounded-full bg-[#ED8D31] flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:opacity-90 transition-opacity" title="Logout">
                {user?.initials ?? "AK"}
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div className="flex justify-center px-4 py-8">
        <div className="w-full max-w-[1440px] flex gap-8">
          <aside className="hidden lg:flex flex-col w-[210px] shrink-0 pt-1 gap-0.5">
            {employeeLinks.map((link) => (
              <Link key={link.label} to={link.to}
                className={`flex items-center justify-between px-3 py-2.5 rounded-[12px] text-sm font-medium transition-colors ${isActive(link.to) ? "bg-[#ED8D31] text-white" : "text-[#7A8088] hover:text-[#2F343B] hover:bg-white"}`}
              >
                {link.label}
                {link.badge && <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isActive(link.to) ? "bg-white/30 text-white" : "bg-[#ED8D31] text-white"}`}>{link.badge}</span>}
              </Link>
            ))}
          </aside>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
      <div className="flex justify-center px-4 pt-2 pb-6">
        <div className="w-full max-w-[1440px] flex justify-between items-center border-t border-[#E5E2DC] pt-5">
          <div className="text-[#7A8088] text-sm">© 2026 SONATRACH. All rights reserved.</div>
          <div className="flex gap-6">{["Policies","Contact","Social Media"].map(l => <a key={l} href="#" className="text-[#7A8088] text-sm hover:text-[#2F343B] transition-colors">{l}</a>)}</div>
        </div>
      </div>
    </div>
  );
}