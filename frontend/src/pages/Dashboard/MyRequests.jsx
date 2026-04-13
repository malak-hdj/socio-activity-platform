import { useMemo, useState } from "react";
import AppLayout from "../../components/AppLayout";

const initialRequests = [
  {
    id: "REQ-8291",
    title: "Excursion à Djanet",
    submittedOn: "Sep 20, 2024",
    participants: "1 Participant",
    status: "pending_draw",
    icon: "plane",
  },
  {
    id: "REQ-7422",
    title: "Weekend thermal stay",
    submittedOn: "Sep 03, 2024",
    participants: "2 Participants",
    status: "under_review",
    icon: "building",
  },
  {
    id: "REQ-6105",
    title: "Summer Camp Stay (Children)",
    submittedOn: "Aug 15, 2024",
    participants: "2 Children",
    status: "accepted",
    icon: "home",
    primaryAction: "Complete dossier",
  },
  {
    id: "REQ-5099",
    title: "Annual Corporate Retreat",
    submittedOn: "Jul 10, 2024",
    participants: "1 Participant",
    status: "refused",
    icon: "briefcase",
  },
  {
    id: "REQ-4812",
    title: "Language Training Program",
    submittedOn: "Jun 22, 2024",
    participants: "1 Participant",
    status: "accepted",
    icon: "book",
  },
];

const statusMeta = {
  pending_draw: { label: "Pending Draw", cls: "bg-[#FCEFCB] text-[#9E6700]", tab: "pending_draw" },
  under_review: { label: "Under review", cls: "bg-[#F2F2F0] text-[#7A8088]", tab: "under_review" },
  accepted: { label: "Accepted", cls: "bg-[#E9F7EF] text-[#2F8C57]", tab: "accepted" },
  refused: { label: "Refused", cls: "bg-[#FEF3F2] text-[#D92D20]", tab: "refused" },
};

const tabs = [
  { key: "all", label: "All Requests" },
  { key: "pending_draw", label: "Pending Draw" },
  { key: "under_review", label: "Under Review" },
  { key: "accepted", label: "Accepted" },
  { key: "refused", label: "Refused" },
];

function RequestIcon({ name }) {
  const cls = "h-5 w-5 text-[#7A8088]";

  if (name === "plane") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 19l20-7L2 5l3 7-3 7z" />
      </svg>
    );
  }

  if (name === "building") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M12 21v-5" />
      </svg>
    );
  }

  if (name === "home") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 10.5L12 3l9 7.5V21H3v-10.5z" />
        <path d="M9 21v-6h6v6" />
      </svg>
    );
  }

  if (name === "briefcase") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </svg>
    );
  }

  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 5h11a2 2 0 0 1 2 2v12H6a2 2 0 0 1-2-2V5z" />
      <path d="M17 7h3v14h-3" />
    </svg>
  );
}

function Row({ req }) {
  const meta = statusMeta[req.status];

  return (
    <div className="flex flex-col gap-3 rounded-[14px] border border-[#E5E2DC] bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-[#F2F2F0]">
          <RequestIcon name={req.icon} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-[34px]/[1.1] text-sm font-bold text-[#2F343B]">{req.title}</p>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#8A8F96]">
            <span className="inline-flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Submitted on {req.submittedOn}
            </span>
            <span>#</span>
            <span>Ref: #{req.id}</span>
            <span className="inline-flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              {req.participants}
            </span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${meta.cls}`}>{meta.label}</span>
        <button className={`h-[40px] rounded-[10px] px-4 text-sm font-semibold ${req.primaryAction ? "bg-[#ED8D31] text-white hover:bg-[#d47d29]" : "border border-[#E5E2DC] bg-white text-[#3F464E] hover:bg-[#F7F7F5]"}`}>
          {req.primaryAction ?? "View details"}
        </button>
        <button className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[10px] border border-[#E5E2DC] text-[#7A8088] hover:bg-[#F7F7F5]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.8" />
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="12" cy="19" r="1.8" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function MyRequests() {
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c = { all: initialRequests.length, pending_draw: 0, under_review: 0, accepted: 0, refused: 0 };
    initialRequests.forEach((r) => {
      c[statusMeta[r.status].tab] += 1;
    });
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initialRequests.filter((r) => {
      const tabOk = activeTab === "all" || statusMeta[r.status].tab === activeTab;
      const searchOk =
        q.length === 0 ||
        r.title.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.participants.toLowerCase().includes(q);
      return tabOk && searchOk;
    });
  }, [activeTab, query]);

  return (
    <AppLayout>
      <section>
        <div className="mb-6">
          <h1 className="text-[32px] font-extrabold leading-tight tracking-[-0.02em] text-[#2F343B]">My Requests</h1>
          <p className="mt-1 text-sm text-[#7A8088]">Track the status of your applications and manage your submitted requests.</p>
        </div>

        <div className="mb-5 flex flex-col gap-3 border-b border-[#E4E4E1] pb-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-6">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-2 border-b-2 pb-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-[#ED8D31] font-semibold text-[#2F343B]"
                      : "border-transparent text-[#7A8088] hover:text-[#4D5560]"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs ${
                      isActive ? "bg-[#F2B233] text-[#5D430E]" : "bg-[#EFEFEC] text-[#8A8F96]"
                    }`}
                  >
                    {counts[tab.key]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <label className="flex h-9 min-w-[200px] items-center gap-2 rounded-full border border-[#E4E4E1] bg-white px-3 text-[#9CA1A9]">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search requests..."
                className="w-full bg-transparent text-xs text-[#2F343B] outline-none placeholder:text-[#9CA1A9]"
              />
            </label>
            <button
              type="button"
              className="inline-flex h-9 items-center gap-2 rounded-full border border-[#E4E4E1] bg-white px-2 text-xs font-semibold text-[#4D5560] hover:bg-[#F2F2F0]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7H20M7.5 12H16.5M10 17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Filter
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((req) => (
            <Row key={req.id} req={req} />
          ))}

          {filtered.length === 0 && (
            <div className="rounded-[14px] border border-[#E5E2DC] bg-white px-5 py-10 text-center text-sm text-[#7A8088]">
              No requests found.
            </div>
          )}
        </div>
      </section>
    </AppLayout>
  );
}
