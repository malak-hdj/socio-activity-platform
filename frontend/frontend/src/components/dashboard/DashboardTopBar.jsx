import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function DashboardTopBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userInitial = user?.prenom?.charAt(0)?.toUpperCase() || "U";
    return (
      <header className="h-[60px] bg-white border-b border-[#E5E2DC] flex items-center px-6 gap-4 sticky top-0 z-40">
        {/* Search */}
        <div className="flex-1 max-w-[360px]">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-[#E5E2DC] bg-[#F5F4F1]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="flex-shrink-0"
            >
              <circle cx="7" cy="7" r="4.5" stroke="#7A8088" strokeWidth="1.33333" />
              <path
                d="M10.5 10.5L13.5 13.5"
                stroke="#7A8088"
                strokeWidth="1.33333"
                strokeLinecap="round"
              />
            </svg>
  
            <input
              type="text"
              placeholder="Search activities, announcements..."
              className="bg-transparent text-sm text-[#2F343B] placeholder:text-[#7A8088] outline-none w-full"
            />
          </div>
        </div>
  
        {/* Right actions */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Language switch */}
          <div className="flex min-h-[42px] p-1 items-center gap-1 rounded-full border border-[#E5E2DC] bg-[rgba(255,255,255,0.88)]">
            <button
              type="button"
              className="flex h-8 min-w-[38px] px-[11.5px] justify-center items-center rounded-full bg-[#ED8D31]"
            >
              <span className="text-white text-xs font-semibold">EN</span>
            </button>
  
            <button
              type="button"
              disabled
              title="French version coming later"
              className="flex h-8 min-w-[38px] px-[10.7px] justify-center items-center rounded-full cursor-not-allowed opacity-60"
            >
              <span className="text-[#7A8088] text-xs font-semibold">FR</span>
            </button>
          </div>
  
          {/* Notification bell */}
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-[#E5E2DC] bg-white hover:bg-[#F5F4F1] transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 1.5C6.1 1.5 3.75 3.85 3.75 6.75v.75L2.25 10.5v.75h13.5v-.75L14.25 7.5v-.75C14.25 3.85 11.9 1.5 9 1.5z"
                stroke="#2F343B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.75 11.25v.75A2.25 2.25 0 0 0 11.25 12v-.75"
                stroke="#2F343B"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
  
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#ED8D31] rounded-full border border-white" />
          </button>
  
          {/* User profile */}
          <div className="relative">
            <button
              onClick={() => setShowLogoutMenu(!showLogoutMenu)}
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            >
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-[#2F343B] leading-tight">
                  {user?.prenom} {user?.nom}
                </p>
                <p className="text-xs text-[#7A8088] leading-tight">
                  {user?.role === "admin" ? "Administrator" : "Employee"}
                </p>
              </div>

              <div className="w-9 h-9 rounded-full bg-[#ED8D31] flex items-center justify-center overflow-hidden flex-shrink-0">
                <span className="text-white text-sm font-bold">{userInitial}</span>
              </div>
            </button>

            {showLogoutMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E2DC] rounded-lg shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-[#2F343B] hover:bg-[#F5F4F1] transition-colors flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H6M11 11L14 8M14 8L11 5M14 8H6"
                      stroke="currentColor"
                      strokeWidth="1.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }
  