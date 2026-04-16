import { useState } from "react";
import AppLayout from "../../components/AppLayout";

// ── Mock data
const drawResults = [
  {
    id: 1,
    title: "Excursion à Djanet",
    drawDate: "Oct 12, 2024",
    session: "Autumn 2024",
    participants: "1 Participant",
    status: "accepted",
    statusLabel: "Accepted",
    sub: "Action required",
    cta: "Complete Dossier",
    ctaStyle: "orange",
    icon: "travel",
    borderColor: "#2F8C57",
    year: 2024,
  },
  {
    id: 2,
    title: "Summer Camp Stay (Children)",
    drawDate: "Sep 05, 2024",
    session: "Summer 2024",
    participants: "2 Children",
    status: "waitlisted",
    statusLabel: "Waitlisted",
    sub: "Position: #4",
    cta: "View Details",
    ctaStyle: "ghost",
    icon: "camp",
    borderColor: "#ED8D31",
    year: 2024,
  },
  {
    id: 3,
    title: "Annual Corporate Retreat",
    drawDate: "Aug 20, 2024",
    session: "Annual 2024",
    participants: "1 Participant",
    status: "not_selected",
    statusLabel: "Not Selected",
    sub: "Quota Reached",
    cta: "View Details",
    ctaStyle: "ghost",
    icon: "event",
    borderColor: "#D92D20",
    year: 2024,
  },
  {
    id: 4,
    title: "Language Training Program",
    drawDate: "Jul 15, 2023",
    session: "Q3 2023",
    participants: "1 Participant",
    status: "accepted",
    statusLabel: "Accepted",
    sub: "Dossier Completed",
    cta: "View Details",
    ctaStyle: "ghost",
    icon: "training",
    borderColor: "#2F8C57",
    year: 2023,
  },
  {
    id: 5,
    title: "Summer Family Stay - Bejaia",
    drawDate: "Jun 10, 2023",
    session: "Summer 2023",
    participants: "2 Participants",
    status: "waitlisted",
    statusLabel: "Waitlisted",
    sub: "Position: #7",
    cta: "View Details",
    ctaStyle: "ghost",
    icon: "travel",
    borderColor: "#ED8D31",
    year: 2023,
  },
  {
    id: 6,
    title: "Annual Gala 2022",
    drawDate: "Nov 05, 2022",
    session: "Annual 2022",
    participants: "1 Participant",
    status: "accepted",
    statusLabel: "Accepted",
    sub: "Dossier Completed",
    cta: "View Details",
    ctaStyle: "ghost",
    icon: "event",
    borderColor: "#2F8C57",
    year: 2022,
  },
];

const years = ["2024", "2023", "2022", "All Time"];

// ── Icon by type
function ActivityIcon({ type }) {
  const base = "w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0";
  const icons = {
    travel: { bg: "bg-[#E9F7EF]", color: "#2F8C57", svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12l9-9 9 9"/><path d="M9 21V12h6v9"/></svg> },
    camp:   { bg: "bg-[#F7F7F5]", color: "#7A8088", svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12l9-9 9 9"/><path d="M9 21V12h6v9"/></svg> },
    event:  { bg: "bg-[#F7F7F5]", color: "#7A8088", svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
    training: { bg: "bg-[#E9F7EF]", color: "#2F8C57", svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> },
  };
  const { bg, color, svg } = icons[type] ?? icons.event;
  return (
    <div className={`${base} ${bg}`} style={{ color }}>
      {svg}
    </div>
  );
}

// ── Status badge
function StatusBadge({ status, label }) {
  const styles = {
    accepted:     "bg-[#2F8C57] text-white",
    waitlisted:   "bg-[#ED8D31] text-white",
    not_selected: "bg-[#D92D20] text-white",
  };
  return (
    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {label}
    </span>
  );
}

// ── Stat card
function StatCard({ label, value, icon }) {
  return (
    <div className="flex-1 min-w-[140px] rounded-[18px] border border-[#E5E2DC] bg-white px-5 py-4">
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-[#7A8088]">{label}</span>
        <span className="text-[#7A8088] opacity-50">{icon}</span>
      </div>
      <p className="text-[36px] font-extrabold text-[#2F343B] leading-none">{value}</p>
    </div>
  );
}

export default function DrawResults() {
  const [activeYear, setActiveYear] = useState("2024");
  const [search, setSearch] = useState("");

  const filtered = drawResults.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchYear = activeYear === "All Time" || r.year === parseInt(activeYear);
    return matchSearch && matchYear;
  });

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[#2F343B] text-[28px] font-extrabold tracking-[-0.5px]">Draw Results</h1>
        <p className="text-[#7A8088] text-sm mt-1">
          Check the outcomes of the random draws for your requested activities.
        </p>
      </div>

      {/* Stat cards */}
      <div className="flex flex-wrap gap-4 mb-7">
        <StatCard label="Total Participations" value={12}
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
        />
        <StatCard label="Accepted" value={4}
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>}
        />
        <StatCard label="Waitlisted" value={2}
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
        />
        <StatCard label="Not Selected" value={6}
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>}
        />
      </div>

      {/* Filters row */}
      <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
        {/* Year pills */}
        <div className="flex gap-1">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setActiveYear(y)}
              className={`h-[34px] px-4 rounded-full text-sm font-medium transition-colors ${
                activeYear === y
                  ? "bg-[#2F343B] text-white"
                  : "bg-white border border-[#E5E2DC] text-[#7A8088] hover:text-[#2F343B]"
              }`}
            >
              {y}
            </button>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 h-[36px] px-3 rounded-full border border-[#E5E2DC] bg-white w-[200px]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A8088" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm text-[#2F343B] outline-none bg-transparent placeholder:text-[#7A8088]"
              placeholder="Search results..."
            />
          </div>
          <button className="flex items-center gap-1.5 h-[36px] px-4 rounded-full border border-[#E5E2DC] bg-white text-[#2F343B] text-sm font-medium hover:bg-gray-50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            Filter
          </button>
        </div>
      </div>

      {/* Results list */}
      <div className="flex flex-col gap-3">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="flex items-center gap-4 bg-white rounded-[18px] border border-[#E5E2DC] px-5 py-4"
            style={{ borderLeft: `4px solid ${r.borderColor}` }}
          >
            {/* Icon */}
            <ActivityIcon type={r.icon} />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[#2F343B] font-bold text-[15px] mb-1">{r.title}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#7A8088]">
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Draw Date: {r.drawDate}
                </span>
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                  Session: {r.session}
                </span>
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                  {r.participants}
                </span>
              </div>
            </div>

            {/* Status + sub */}
            <div className="flex flex-col items-end gap-1 shrink-0">
              <StatusBadge status={r.status} label={r.statusLabel} />
              <span className="text-xs text-[#7A8088]">{r.sub}</span>
            </div>

            {/* CTA */}
            <button
              className={`shrink-0 h-[38px] px-5 rounded-full text-sm font-semibold transition-colors ${
                r.ctaStyle === "orange"
                  ? "bg-[#ED8D31] text-white hover:bg-[#d47d29]"
                  : "border border-[#E5E2DC] bg-white text-[#2F343B] hover:bg-gray-50"
              }`}
            >
              {r.cta}
            </button>

            {/* 3-dot menu */}
            <button className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[#7A8088] hover:bg-[#F7F7F5] transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/>
              </svg>
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-[18px] border border-[#E5E2DC] bg-white p-10 text-center text-[#7A8088] text-sm">
            No results found.
          </div>
        )}
      </div>
    </AppLayout>
  );
}