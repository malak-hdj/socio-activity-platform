import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AppLayout from "../../components/AppLayout";

// ── image placeholders (remplace par vrais assets)
const IMGS = {
  hero:    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=300&fit=crop",
  djanet:  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&h=200&fit=crop",
  family:  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
  retreat: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop",
};

// ─────────────────────────────────────────────
//  SHARED SMALL COMPONENTS
// ─────────────────────────────────────────────

function StatusBadge({ status }) {
  const map = {
    "Pending Draw": "bg-[#FFF8F0] text-[#ED8D31] border-[#FDDCB5]",
    "Under review": "bg-[#F0F9FF] text-[#026AA2] border-[#B9E6FE]",
    "Accepted":     "bg-[#E9F7EF] text-[#2F8C57] border-[#A6E0BE]",
    "Completed":    "bg-[#E9F7EF] text-[#2F8C57] border-[#A6E0BE]",
  };
  return (
    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${map[status] ?? "bg-[#F7F7F5] text-[#7A8088] border-[#E5E2DC]"}`}>
      {status}
    </span>
  );
}

// ─────────────────────────────────────────────
//  EMPLOYEE DASHBOARD
// ─────────────────────────────────────────────

function EmployeeDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    { label: "Open activities",     value: 12,   sub: "Available to apply this month",    icon: "🗂" },
    { label: "Pending demandes",    value: 3,     sub: "Waiting for validation or draw",   icon: "⏳" },
    { label: "Past participations", value: 8,     sub: "Activities joined since 2023",     icon: "✅" },
    { label: "Dossier completion",  value: "68%", sub: "Documents uploaded",               icon: "📋", progress: 68 },
  ];

  const requests = [
    { title: "Excursion à Djanet",         date: "Submitted on Sep 20, 2024", status: "Pending Draw" },
    { title: "Weekend thermal stay",        date: "Submitted on Sep 03, 2024", status: "Under review" },
    { title: "Summer Camp Stay (Children)", date: "Submitted on Aug 15, 2024", status: "Accepted" },
  ];

  const activities = [
    { title: "Excursion à Djanet, Sud algérien", dates: "Oct 12 – Oct 18, 2024", location: "Djanet",  img: IMGS.djanet },
    { title: "Vacances nature & détente",         dates: "Nov 01 – Nov 07, 2024", location: "Bejaia",  img: IMGS.family },
    { title: "Annual Corporate Retreat",          dates: "Dec 15, 2024",          location: "Algiers", img: IMGS.retreat },
  ];

  return (
    <div className="flex flex-col gap-6">

      {/* Welcome */}
      <div>
        <h1 className="text-[#2F343B] text-[26px] font-extrabold tracking-[-0.5px]">
          Welcome back, {user?.name ?? "Ahmed K."}! 👋
        </h1>
        <p className="text-[#7A8088] text-sm mt-1">
          Explore available activities, track your demandes, required documents in one place.
        </p>
      </div>

      {/* Draw result banner */}
      <div className="rounded-[20px] bg-gradient-to-r from-[#ED8D31] to-[#f5a855] p-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-white font-bold text-base mb-1">🎉 Congratulations!</p>
          <p className="text-white/90 text-sm leading-[160%] max-w-[400px]">
            You have been selected for the <span className="font-semibold">Summer Camp Stay</span>. Please finalize your documents.
          </p>
        </div>
        <button onClick={() => navigate("/dashboard/documents")} className="shrink-0 h-[36px] px-4 rounded-full bg-white text-[#ED8D31] text-sm font-semibold hover:bg-orange-50 transition-colors">
          View result details
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-[18px] border border-[#E5E2DC] bg-white p-4">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xl">{s.icon}</span>
            </div>
            <p className="text-[28px] font-extrabold leading-none text-[#2F343B] mb-1">{s.value}</p>
            <p className="text-xs font-semibold text-[#2F343B]">{s.label}</p>
            <p className="text-[11px] text-[#7A8088] mt-0.5">{s.sub}</p>
            {s.progress && (
              <div className="mt-2 h-1.5 w-full rounded-full bg-[#F0EFED]">
                <div className="h-1.5 rounded-full bg-[#ED8D31]" style={{ width: `${s.progress}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Left — activities + requests */}
        <div className="xl:col-span-2 flex flex-col gap-5">

          {/* Activities to apply for */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[#2F343B] font-bold">Activities you can still apply for</h2>
              <button onClick={() => navigate("/catalog")} className="text-xs text-[#ED8D31] font-semibold hover:opacity-80">View catalog</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activities.map((a) => (
                <div key={a.title} className="rounded-[16px] border border-[#E5E2DC] bg-white overflow-hidden hover:border-[#ED8D31] transition-colors cursor-pointer group">
                  <div className="h-[110px] overflow-hidden">
                    <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-bold text-[#2F343B] leading-tight mb-2">{a.title}</p>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] text-[#7A8088] flex items-center gap-1">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        {a.dates}
                      </span>
                      <span className="text-[11px] text-[#7A8088] flex items-center gap-1">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {a.location}
                      </span>
                    </div>
                    <button className="mt-2 w-full h-[28px] rounded-full border border-[#E5E2DC] text-[11px] font-medium text-[#2F343B] hover:bg-gray-50">
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My requests */}
          <div className="rounded-[20px] border border-[#E5E2DC] bg-white overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-4 pb-3">
              <h2 className="text-[#2F343B] font-bold text-sm">My requests</h2>
              <button onClick={() => navigate("/dashboard/requests")} className="text-xs text-[#ED8D31] font-semibold">See all requests</button>
            </div>
            <div className="flex flex-col divide-y divide-[#F0EFED]">
              {requests.map((r) => (
                <div key={r.title} className="flex items-center justify-between px-5 py-3 gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#F7F7F5] border border-[#E5E2DC] flex items-center justify-center shrink-0">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A8088" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#2F343B] truncate">{r.title}</p>
                      <p className="text-[11px] text-[#7A8088]">{r.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={r.status} />
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A8088" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Participation history */}
          <div className="rounded-[20px] border border-[#E5E2DC] bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[#2F343B] font-bold text-sm">Participation history</h2>
              <button onClick={() => navigate("/dashboard/history")} className="text-xs text-[#ED8D31] font-semibold">View archive</button>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { title: "Forest family retreat",  meta: "Joined in May 2024 · 5 days" },
                { title: "Aurès hiking weekend",   meta: "Joined in February 2024 · 2 days" },
              ].map((h) => (
                <div key={h.title} className="flex items-center justify-between px-4 py-3 rounded-[12px] bg-[#F7F7F5] border border-[#E5E2DC]">
                  <div>
                    <p className="text-sm font-semibold text-[#2F343B]">{h.title}</p>
                    <p className="text-[11px] text-[#7A8088]">{h.meta}</p>
                  </div>
                  <StatusBadge status="Completed" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right col */}
        <div className="flex flex-col gap-4">

          {/* Documents to provide */}
          <div className="rounded-[20px] border border-[#E5E2DC] bg-white p-5">
            <h2 className="text-[#2F343B] font-bold text-sm mb-3">Documents to provide</h2>
            <div className="flex flex-col gap-3">
              {[
                { name: "Medical Certificate",  note: "Required for Summer Camp" },
                { name: "Family booklet copy",  note: "Needed before Oct 05, 2024" },
              ].map((d) => (
                <div key={d.name} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[10px] bg-[#FEF3F2] border border-[#FEE4E2] flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D92D20" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#2F343B]">{d.name}</p>
                    <p className="text-[11px] text-[#7A8088]">{d.note}</p>
                  </div>
                  <button onClick={() => navigate("/dashboard/documents")} className="shrink-0 h-[28px] px-3 rounded-full bg-[#ED8D31] text-white text-xs font-semibold hover:bg-[#d47d29]">
                    Upload
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Active survey */}
          <div className="rounded-[20px] border border-[#E5E2DC] bg-white p-5">
            <h2 className="text-[#2F343B] font-bold text-sm mb-3">Active surveys</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#2F343B]">Q3 Activities Satisfaction</p>
                <p className="text-[11px] text-[#7A8088]">Takes ~2 mins</p>
              </div>
              <button onClick={() => navigate("/dashboard/surveys")} className="h-[28px] px-3 rounded-full bg-[#2F343B] text-white text-xs font-semibold hover:bg-[#1e2228]">Participate</button>
            </div>
          </div>

          {/* Have an idea */}
          <div className="rounded-[20px] border border-[#E5E2DC] bg-white p-5">
            <h2 className="text-[#2F343B] font-bold text-sm mb-1">Have an idea?</h2>
            <p className="text-[11px] text-[#7A8088] mb-3">Share your suggestions for new activities, trips, or ways to improve the employee experience.</p>
            <button onClick={() => navigate("/dashboard/ideas")} className="w-full h-[32px] rounded-full border border-[#E5E2DC] text-[#2F343B] text-xs font-medium hover:bg-gray-50">
              Submit an idea
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  ADMIN DASHBOARD
// ─────────────────────────────────────────────

function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    { label: "Active activities",   value: 12,   sub: "Published and open for applications", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A8088" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
    { label: "Draws to launch",     value: 2,    sub: "Sessions closing this week",           icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A8088" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> },
    { label: "Pending withdrawals", value: 4,    sub: "Requests waiting for reassignment",   icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A8088" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { label: "Employee dossier completion", value: "74%", sub: "Digitally complete, tracks are validated", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A8088" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, progress: 74 },
  ];

  const adminCards = [
    {
      title: "Create and manage activities",
      desc: "Prepare new stays, excursions, and events, update descriptions, and open registrations in a few steps.",
      to: "/dashboardadmin/activities",
      stats: [{ v: 12, l: "active" }, { v: 3, l: "drafts" }, { v: 11, l: "sessions" }],
      cta: "Manage Activities",
      badge: null,
    },
    {
      title: "Configure sessions and quotas",
      desc: "Define wish periods, participant quotas, eligibility rules, and priority logic for each activity.",
      to: "/admin/sessions",
      stats: [{ v: 3, l: "closing soon" }, { v: 2, l: "quota alerts" }, { v: 1, l: "rule update" }],
      cta: "Sessions & Quotas",
      badge: null,
    },
    {
      title: "Launch the draw",
      desc: "Run upcoming tirages, review eligible employees, and publish results with a clear audit trail.",
      to: "/admin/draw",
      stats: [{ v: 4, l: "Ready now" }],
      cta: "Launch Draw",
      badge: "Ready now",
    },
    {
      title: "Consult reports and draw history",
      desc: "Track participation, compare sessions, export summaries, and review all past draws and outcomes.",
      to: "/admin/reports",
      stats: [{ v: "Q3", l: "report" }, { v: 24, l: "exports" }],
      cta: "Reports",
      badge: "Updated today",
    },
  ];

  const requests = [
    { title: "Excursion à Djanet",         date: "Submitted on Sep 20, 2024", status: "Pending Draw" },
    { title: "Weekend thermal stay",        date: "Submitted on Sep 03, 2024", status: "Under review" },
    { title: "Summer Camp Stay (Children)", date: "Submitted on Aug 15, 2024", status: "Accepted" },
  ];

  const activities = [
    { title: "Excursion à Djanet, Sud algérien", dates: "Oct 12 – Oct 18, 2024", location: "Djanet",  img: IMGS.djanet },
    { title: "Vacances nature & détente",         dates: "Nov 01 – Nov 07, 2024", location: "Bejaia",  img: IMGS.family },
    { title: "Annual Corporate Retreat",          dates: "Dec 15, 2024",          location: "Algiers", img: IMGS.retreat },
  ];

  const activityLog = [
    { time: "09:30", text: "Quota updated for Family Stay — +12 additional places opened after last week adjustments." },
    { time: "11:00", text: "Withdrawal management — 4 employee withdrawals require reassignment. Alternates are already available for direct replacement." },
    { time: "14:00", text: "Admin follow-up — Djanet is at 98% of capacity. Family Stay still has available places before the next draw." },
    { time: "15:00", text: "Draw report exported — September participation report shared with management." },
  ];

  return (
    <div className="flex flex-col gap-6">

      {/* ── Hero banner */}
      <div className="relative rounded-[24px] overflow-hidden min-h-[140px] flex items-center">
        <img src={IMGS.hero} alt="hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(30,34,40,0.82)] via-[rgba(30,34,40,0.65)] to-[rgba(30,34,40,0.3)]" />
        <div className="relative z-10 flex items-center justify-between w-full px-8 py-6 gap-6">
          <div>
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">Administration workspace</p>
            <h1 className="text-white text-[22px] font-extrabold leading-tight tracking-[-0.5px] max-w-[400px]">
              Manage activities and stay on top of employee requests
            </h1>
            <p className="text-white/70 text-xs mt-2 max-w-[380px] leading-[160%]">
              Monitor quotas, launch draws, review withdrawals, and keep your own employee participation tools in the same clean workspace.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={() => navigate("/admin/draw")} className="h-[38px] px-5 rounded-full bg-[#ED8D31] text-white text-sm font-semibold hover:bg-[#d47d29] transition-colors">
              Launch next draw
            </button>
            <button onClick={() => navigate("/dashboardadmin/activities")} className="h-[38px] px-5 rounded-full bg-white text-[#2F343B] text-sm font-semibold hover:bg-gray-100 transition-colors">
              Create activity
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-[18px] border border-[#E5E2DC] bg-white p-4">
            <div className="flex items-start justify-between mb-2">
              <span className="text-[#7A8088]">{s.icon}</span>
            </div>
            <p className="text-[28px] font-extrabold leading-none text-[#2F343B] mb-1">{s.value}</p>
            <p className="text-xs font-semibold text-[#2F343B]">{s.label}</p>
            <p className="text-[11px] text-[#7A8088] mt-0.5">{s.sub}</p>
            {s.progress && (
              <div className="mt-2 h-1.5 w-full rounded-full bg-[#F0EFED]">
                <div className="h-1.5 rounded-full bg-[#ED8D31]" style={{ width: `${s.progress}%` }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Administrative actions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[#2F343B] font-bold">Administrative actions</h2>
          <button onClick={() => navigate("/dashboardadmin/activities")} className="text-xs text-[#ED8D31] font-semibold hover:opacity-80">Open full management area</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {adminCards.map((card) => (
            <div key={card.title} className="rounded-[20px] border border-[#E5E2DC] bg-white p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-[#2F343B] font-bold text-[13px] leading-tight">{card.title}</h3>
                {card.badge && (
                  <span className="text-[10px] font-bold text-white bg-[#ED8D31] px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">{card.badge}</span>
                )}
              </div>
              <p className="text-[11px] text-[#7A8088] leading-[160%] flex-1">{card.desc}</p>
              <div className="flex gap-4">
                {card.stats.map((s) => (
                  <div key={s.l}>
                    <p className="text-base font-extrabold text-[#2F343B] leading-none">{s.v}</p>
                    <p className="text-[10px] text-[#7A8088]">{s.l}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate(card.to)} className="w-full h-[32px] rounded-full border border-[#E5E2DC] text-[#2F343B] text-xs font-semibold hover:bg-gray-50 transition-colors">
                {card.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Left 2/3 */}
        <div className="xl:col-span-2 flex flex-col gap-5">

          {/* Next draw + Documents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Next draw */}
            <div className="rounded-[20px] border border-[#E5E2DC] bg-white p-5">
              <h2 className="text-[#2F343B] font-bold text-sm mb-3">Next draw</h2>
              <div className="rounded-[14px] border border-[#A6E0BE] bg-[#E9F7EF] p-4 mb-4">
                <div className="flex items-start gap-2 mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2F8C57" strokeWidth="2" className="shrink-0 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <p className="text-sm font-bold text-[#2F343B]">Djanet session is ready</p>
                </div>
                <p className="text-[11px] text-[#50565E] leading-[160%]">
                  Eligibility is complete, quotas are validated, and <span className="font-semibold">8 employees</span> are ready for the next draw launch.
                </p>
              </div>
              <button onClick={() => navigate("/admin/draw")} className="w-full h-[36px] rounded-full bg-[#ED8D31] text-white text-sm font-semibold hover:bg-[#d47d29] transition-colors">
                Launch draw now
              </button>
            </div>

            {/* Documents to provide */}
            <div className="rounded-[20px] border border-[#E5E2DC] bg-white p-5">
              <h2 className="text-[#2F343B] font-bold text-sm mb-3">Documents to provide</h2>
              <div className="flex flex-col gap-3">
                {[
                  { name: "Medical Certificate", note: "Required for Summer Camp" },
                  { name: "Family booklet copy", note: "Needed before Oct 05, 2024" },
                ].map((d) => (
                  <div key={d.name} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-[8px] bg-[#FEF3F2] border border-[#FEE4E2] flex items-center justify-center shrink-0">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D92D20" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#2F343B]">{d.name}</p>
                      <p className="text-[10px] text-[#7A8088]">{d.note}</p>
                    </div>
                    <button onClick={() => navigate("/dashboardadmin/documents")} className="shrink-0 h-[26px] px-3 rounded-full bg-[#ED8D31] text-white text-[10px] font-semibold hover:bg-[#d47d29]">
                      Upload
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activities you can still apply for */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[#2F343B] font-bold text-sm">Activities you can still apply for</h2>
              <button onClick={() => navigate("/catalog")} className="text-xs text-[#ED8D31] font-semibold">View catalog</button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {activities.map((a) => (
                <div key={a.title} className="rounded-[16px] border border-[#E5E2DC] bg-white overflow-hidden hover:border-[#ED8D31] transition-colors cursor-pointer group">
                  <div className="h-[90px] overflow-hidden">
                    <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-[#2F343B] leading-tight mb-1">{a.title}</p>
                    <p className="text-[10px] text-[#7A8088] flex items-center gap-1">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      {a.dates}
                    </p>
                    <p className="text-[10px] text-[#7A8088] flex items-center gap-1 mt-0.5">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {a.location}
                    </p>
                    <button className="mt-2 w-full h-[24px] rounded-full border border-[#E5E2DC] text-[10px] font-medium text-[#2F343B] hover:bg-gray-50">
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Requests */}
          <div className="rounded-[20px] border border-[#E5E2DC] bg-white overflow-hidden">
            <div className="flex items-center justify-between px-5 pt-4 pb-3">
              <h2 className="text-[#2F343B] font-bold text-sm">My requests</h2>
              <button onClick={() => navigate("/dashboardadmin/requests")} className="text-xs text-[#ED8D31] font-semibold">See all requests</button>
            </div>
            <div className="flex flex-col divide-y divide-[#F0EFED]">
              {requests.map((r) => (
                <div key={r.title} className="flex items-center justify-between px-5 py-3 gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-[#F7F7F5] border border-[#E5E2DC] flex items-center justify-center shrink-0">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A8088" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#2F343B] truncate">{r.title}</p>
                      <p className="text-[11px] text-[#7A8088]">{r.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={r.status} />
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A8088" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admin follow-up + Withdrawal management */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-[20px] border border-[#E5E2DC] bg-white p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[#2F343B] font-bold text-sm">Admin follow-up</h2>
                <button onClick={() => navigate("/admin/reports")} className="text-xs text-[#ED8D31] font-semibold">Open reports</button>
              </div>
              <p className="text-[11px] text-[#50565E] leading-[170%]">
                Djanet is at <span className="font-semibold text-[#D92D20]">98% of capacity</span>. Family Stay still has available places before the next draw.
              </p>
            </div>
            <div className="rounded-[20px] border border-[#E5E2DC] bg-white p-5">
              <h2 className="text-[#2F343B] font-bold text-sm mb-3">Withdrawal management</h2>
              <p className="text-[11px] text-[#50565E] leading-[170%] mb-3">
                <span className="font-semibold text-[#2F343B]">4 employee withdrawals</span> require reassignment. Alternates are already available for direct replacement.
              </p>
              <button onClick={() => navigate("/admin/withdrawals")} className="h-[28px] px-3 rounded-full border border-[#E5E2DC] text-[#2F343B] text-xs font-medium hover:bg-gray-50">
                Review withdrawals
              </button>
            </div>
          </div>

          {/* Participation history */}
          <div className="rounded-[20px] border border-[#E5E2DC] bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[#2F343B] font-bold text-sm">Participation history</h2>
              <button onClick={() => navigate("/dashboardadmin/history")} className="text-xs text-[#ED8D31] font-semibold">View archive</button>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { title: "Forest family retreat",  meta: "Joined in May 2024 · 5 days" },
                { title: "Aurès hiking weekend",   meta: "Joined in February 2024 · 2 days" },
              ].map((h) => (
                <div key={h.title} className="flex items-center justify-between px-4 py-3 rounded-[12px] bg-[#F7F7F5] border border-[#E5E2DC]">
                  <div>
                    <p className="text-sm font-semibold text-[#2F343B]">{h.title}</p>
                    <p className="text-[11px] text-[#7A8088]">{h.meta}</p>
                  </div>
                  <StatusBadge status="Completed" />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1/3 */}
        <div className="flex flex-col gap-4">

          {/* Reports snapshot */}
          <div className="rounded-[20px] border border-[#E5E2DC] bg-white p-5">
            <h2 className="text-[#2F343B] font-bold text-sm mb-3">Reports snapshot</h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 rounded-[12px] bg-[#F7F7F5] border border-[#E5E2DC]">
                <div className="w-8 h-8 rounded-[8px] bg-[#FFF3E8] border border-[#FDDCB5] flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ED8D31" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#2F343B]">Participation report</p>
                  <p className="text-[10px] text-[#7A8088]">Monthly summary updated this morning</p>
                  <div className="mt-1.5 h-1 w-full rounded-full bg-[#F0EFED]">
                    <div className="h-1 rounded-full bg-[#ED8D31]" style={{ width: "82%" }} />
                  </div>
                  <p className="text-[10px] text-[#ED8D31] font-semibold mt-0.5">82%</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-[12px] bg-[#F7F7F5] border border-[#E5E2DC]">
                <div className="w-8 h-8 rounded-[8px] bg-[#F0F9FF] border border-[#B9E6FE] flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#026AA2" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#2F343B]">Draw history archive</p>
                  <p className="text-[10px] text-[#7A8088]">Review all sessions and generated results</p>
                </div>
                <span className="text-[10px] font-bold text-white bg-[#026AA2] px-2 py-0.5 rounded-full shrink-0">24 logs</span>
              </div>
            </div>
          </div>

          {/* Activity log — Today */}
          <div className="rounded-[20px] border border-[#E5E2DC] bg-white p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[#2F343B] font-bold text-sm">Today</h2>
            </div>
            <div className="flex flex-col gap-3">
              {activityLog.map((a, i) => (
                <div key={i} className="flex gap-2.5">
                  <span className="text-[10px] text-[#7A8088] font-mono shrink-0 pt-0.5">{a.time}</span>
                  <p className="text-[11px] text-[#50565E] leading-[160%]">{a.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick admin action card */}
          <div className="rounded-[20px] bg-[#ED8D31] p-5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
            </div>
            <h3 className="text-white font-bold text-sm mb-1">Need a quick admin action?</h3>
            <p className="text-white/80 text-[11px] leading-[160%] mb-4">
              Create a new session, update quotas, or publish a draw result from one shared control area.
            </p>
            <button onClick={() => navigate("/dashboardadmin/activities")} className="w-full h-[36px] rounded-full bg-white text-[#ED8D31] text-xs font-bold hover:bg-orange-50 transition-colors">
              Open admin tools
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  EXPORT — choisit selon le rôle
// ─────────────────────────────────────────────

export default function Dashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const isAdminView = location.pathname.toLowerCase().startsWith("/dashboardadmin");

  return (
    <AppLayout>
      {user?.role === "admin" || isAdminView ? <AdminDashboard /> : <EmployeeDashboard />}
    </AppLayout>
  );
}
