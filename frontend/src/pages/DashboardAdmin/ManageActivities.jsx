import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";

// ── thumbnails via unsplash (remplacer par vrais assets plus tard)
const THUMBS = {
  djanet:   "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=60&fit=crop",
  vacances: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=80&h=60&fit=crop",
  retreat:  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=80&h=60&fit=crop",
  ski:      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=80&h=60&fit=crop",
  camp:     "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=80&h=60&fit=crop",
  thermal:  "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=80&h=60&fit=crop",
};

const initialActive = [
  { id: 1, title: "Excursion à Djanet, Sud algérien", sub: "Vacances nature & détente", registrations: 118, capacity: 120, deadline: "Draw planned for Oct 02", thumb: THUMBS.djanet, nearFull: true },
  { id: 2, title: "Vacances nature & détente",        sub: "Family stay",                registrations: 36,  capacity: 50,  deadline: "Open until Nov 01",        thumb: THUMBS.vacances },
  { id: 3, title: "Annual Corporate Retreat",         sub: "Corporate event",            registrations: 75,  capacity: 300, deadline: "Corporate event",           thumb: THUMBS.retreat },
];

const initialInactive = [
  { id: 4, title: "Winter Ski Trip - Tikjda",    sub: "Draft activity · Jan 10 - Jan 14, 2025",    status: "draft",   thumb: THUMBS.ski },
  { id: 5, title: "Summer Camp Stay…",           sub: "Closed season · Ready for next campaign",   status: "closed",  thumb: THUMBS.camp },
  { id: 6, title: "Thermal Weekend - Ha…",       sub: "Paused by admin · Waiting for new quota",   status: "paused",  thumb: THUMBS.thermal },
];

const drawReady = [
  { id: 1, title: "Excursion à Djanet",           note: "120 seats · 118 requests submitted" },
  { id: 2, title: "Thermal stay - Hammam Righa",  note: "40 seats · Session closed yesterday" },
];

// ── Stat card
function StatCard({ label, value, sub, icon }) {
  return (
    <div className="flex-1 min-w-[140px] rounded-[18px] border border-[#E5E2DC] bg-white px-5 py-4">
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm text-[#7A8088]">{label}</span>
        <span className="text-[#7A8088] opacity-60">{icon}</span>
      </div>
      <p className="text-[32px] font-extrabold text-[#2F343B] leading-none mb-1">{value}</p>
      <p className="text-xs text-[#7A8088]">{sub}</p>
    </div>
  );
}

// ── Progress bar
function ProgressBar({ value, max }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const color = pct >= 95 ? "#D92D20" : pct >= 70 ? "#ED8D31" : "#2F8C57";
  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs text-[#7A8088] mb-1">
        <span>{value}/{max} registrations</span>
        <span style={{ color }} className="font-semibold">{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-[#F0EFED]">
        <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

// ── Inactive badge
function InactiveBadge({ status }) {
  const map = {
    draft:  "bg-[#F0F9FF] text-[#026AA2] border-[#B9E6FE]",
    closed: "bg-[#F7F7F5] text-[#7A8088] border-[#E5E2DC]",
    paused: "bg-[#FEF3F2] text-[#D92D20] border-[#FEE4E2]",
  };
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${map[status]}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
}

// ── Stop confirm modal
function StopModal({ activity, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] px-4">
      <div className="w-full max-w-[400px] bg-white rounded-[24px] border border-[#E5E2DC] p-7 shadow-xl">
        <div className="w-10 h-10 rounded-full bg-[#FEF3F2] flex items-center justify-center mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D92D20" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <h3 className="text-[#2F343B] text-lg font-bold mb-1">Stop this activity?</h3>
        <p className="text-[#7A8088] text-sm mb-6"><span className="font-semibold text-[#2F343B]">{activity.title}</span> will be deactivated immediately.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-[12px] border border-[#E5E2DC] text-[#2F343B] text-sm font-medium hover:bg-gray-50">Cancel</button>
          <button onClick={() => onConfirm(activity.id)} className="flex-1 py-3 rounded-[12px] bg-[#D92D20] text-white text-sm font-semibold hover:bg-[#b91c1c]">Stop Activity</button>
        </div>
      </div>
    </div>
  );
}

export default function ManageActivities() {
  const [active, setActive]       = useState(initialActive);
  const [inactive, setInactive]   = useState(initialInactive);
  const [stopTarget, setStopTarget] = useState(null);
  const [launched, setLaunched]   = useState({});

  const handleStop = (id) => {
    const item = active.find(a => a.id === id);
    setActive(prev => prev.filter(a => a.id !== id));
    setInactive(prev => [{ ...item, sub: "Stopped by admin", status: "paused" }, ...prev]);
    setStopTarget(null);
  };

  const handleActivate = (id) => {
    const item = inactive.find(a => a.id === id);
    setInactive(prev => prev.filter(a => a.id !== id));
    setActive(prev => [...prev, { ...item, registrations: 0, capacity: 50, deadline: "Open — set quota" }]);
  };

  return (
    <AdminLayout>

      {/* ── Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#2F343B] text-[28px] font-extrabold tracking-[-0.5px]">Manage Activities</h1>
          <p className="text-[#7A8088] text-sm mt-1">View active activities, activate inactive ones, create new programs, and launch draws from one workspace.</p>
        </div>
        <button className="shrink-0 flex items-center gap-2 h-[42px] px-5 rounded-full bg-[#ED8D31] text-white text-sm font-semibold hover:bg-[#d47d29] transition-colors mt-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Create Activity
        </button>
      </div>

      {/* ── Stat cards */}
      <div className="flex flex-wrap gap-4 mb-7">
        <StatCard label="Active Activities" value={active.length} sub="Open and visible to employees"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>} />
        <StatCard label="Inactive Activities" value={inactive.length} sub="Can be activated at any moment"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>} />
        <StatCard label="Draws Ready" value={drawReady.length} sub="Sessions reached their application deadline"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ED8D31" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="8 12 12 16 16 12"/><line x1="12" y1="8" x2="12" y2="16"/></svg>} />
        <StatCard label="New Requests" value={286} sub="Awaiting review across current campaigns"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} />
      </div>

      {/* ── Two columns */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-6">

        {/* Active activities */}
        <div className="rounded-[20px] border border-[#E5E2DC] bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <div>
              <h2 className="text-[#2F343B] font-bold text-[15px]">Active activities</h2>
              <p className="text-xs text-[#7A8088] mt-0.5">Monitor live activities and stop them when needed.</p>
            </div>
            <span className="text-xs font-semibold text-white bg-[#2F343B] px-3 py-1 rounded-full">{active.length} running</span>
          </div>
          <div className="flex flex-col divide-y divide-[#F0EFED]">
            {active.map(a => (
              <div key={a.id} className="flex items-center gap-3 px-5 py-4">
                <img src={a.thumb} alt={a.title} className="w-[52px] h-[40px] rounded-[10px] object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[#2F343B] font-semibold text-sm truncate">{a.title}</p>
                    {a.nearFull && <span className="shrink-0 text-[10px] font-bold text-[#D92D20] bg-[#FEF3F2] px-2 py-0.5 rounded-full">Near full</span>}
                  </div>
                  <p className="text-xs text-[#7A8088]">{a.deadline}</p>
                  <ProgressBar value={a.registrations} max={a.capacity} />
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button className="h-[30px] px-3 rounded-full border border-[#E5E2DC] text-[#2F343B] text-xs font-medium hover:bg-gray-50">View</button>
                  <button onClick={() => setStopTarget(a)} className="h-[30px] px-3 rounded-full border border-[#FEE4E2] bg-[#FEF3F2] text-[#D92D20] text-xs font-semibold hover:bg-[#fee4e2]">Stop</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inactive activities */}
        <div className="rounded-[20px] border border-[#E5E2DC] bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <div>
              <h2 className="text-[#2F343B] font-bold text-[15px]">Inactive activities</h2>
              <p className="text-xs text-[#7A8088] mt-0.5">Reactivate unpublished or paused activities.</p>
            </div>
            <span className="text-xs font-semibold text-[#7A8088] bg-[#F7F7F5] border border-[#E5E2DC] px-3 py-1 rounded-full">{inactive.length} inactive</span>
          </div>
          <div className="flex flex-col divide-y divide-[#F0EFED]">
            {inactive.map(a => (
              <div key={a.id} className="flex items-center gap-3 px-5 py-4">
                <img src={a.thumb} alt={a.title} className="w-[52px] h-[40px] rounded-[10px] object-cover shrink-0 opacity-60 grayscale" />
                <div className="flex-1 min-w-0">
                  <p className="text-[#2F343B] font-semibold text-sm truncate">{a.title}</p>
                  <p className="text-xs text-[#7A8088] truncate">{a.sub}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <InactiveBadge status={a.status} />
                  <button className="h-[30px] px-3 rounded-full border border-[#E5E2DC] text-[#2F343B] text-xs font-medium hover:bg-gray-50">{a.status === "draft" ? "Edit" : "Details"}</button>
                  <button onClick={() => handleActivate(a.id)} className="h-[30px] px-3 rounded-full bg-[#ED8D31] text-white text-xs font-semibold hover:bg-[#d47d29]">Activate</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create a new activity */}
        <div className="rounded-[20px] border border-[#E5E2DC] bg-white p-5">
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-[#2F343B] font-bold text-[15px]">Create a new activity</h2>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ED8D31" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </div>
          <p className="text-xs text-[#7A8088] mb-4">Start a new vacation, trip, event, or family stay with dates, quotas, and required documents.</p>
          <button className="flex items-center gap-1.5 text-xs text-[#7A8088] hover:text-[#2F343B] mb-4 transition-colors">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            Reuse an existing activity template
          </button>
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-[12px] bg-[#ED8D31] text-white text-sm font-semibold hover:bg-[#d47d29] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Create Activity
          </button>
        </div>

        {/* Launch a draw */}
        <div className="rounded-[20px] border border-[#E5E2DC] bg-white p-5">
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-[#2F343B] font-bold text-[15px]">Launch a draw</h2>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ED8D31" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="8 12 12 16 16 12"/><line x1="12" y1="8" x2="12" y2="16"/></svg>
          </div>
          <p className="text-xs text-[#7A8088] mb-4">Run the draw for activities that completed the application phase and have validated quotas.</p>
          <div className="flex flex-col gap-2">
            {drawReady.map(d => (
              <div key={d.id} className="flex items-center justify-between px-4 py-3 rounded-[12px] bg-[#F7F7F5] border border-[#E5E2DC]">
                <div>
                  <p className="text-sm font-semibold text-[#2F343B]">{d.title}</p>
                  <p className="text-xs text-[#7A8088]">{d.note}</p>
                </div>
                <button
                  onClick={() => setLaunched(prev => ({ ...prev, [d.id]: true }))}
                  disabled={launched[d.id]}
                  className={`shrink-0 h-[34px] px-4 rounded-full text-xs font-semibold transition-colors ${launched[d.id] ? "bg-[#E9F7EF] text-[#2F8C57] cursor-default" : "bg-[#ED8D31] text-white hover:bg-[#d47d29]"}`}
                >
                  {launched[d.id] ? "Launched ✓" : "Launch"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Activity workflow note */}
      <div className="rounded-[16px] border border-[#E5E2DC] bg-white px-5 py-4 mb-6">
        <h3 className="text-[#2F343B] text-sm font-bold mb-1">Activity workflow</h3>
        <p className="text-xs text-[#7A8088] leading-[170%]">From this page, the admin can stop active activities, activate inactive ones, create a new activity, and directly launch draws for eligible sessions.</p>
      </div>

      {/* ── Bottom actions bar */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E5E2DC]">
        <button className="h-[42px] px-6 rounded-full border border-[#E5E2DC] bg-white text-[#2F343B] text-sm font-medium hover:bg-gray-50 transition-colors">
          Open Reports
        </button>
        <button className="h-[42px] px-6 rounded-full bg-[#ED8D31] text-white text-sm font-semibold hover:bg-[#d47d29] transition-colors">
          Launch Draw Center
        </button>
      </div>

      {/* Stop modal */}
      {stopTarget && <StopModal activity={stopTarget} onClose={() => setStopTarget(null)} onConfirm={handleStop} />}

    </AdminLayout>
  );
}
