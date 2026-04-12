import { useState } from "react";
import AppLayout from "../../components/AppLayout";

const historyItems = [
  {
    id: 1,
    title: "Excursion à Timimoun",
    dates: "Jan 15 - Jan 20, 2024",
    location: "Timimoun, Algeria",
    category: "Trips & Excursions",
    participants: "2 Participants",
    status: "completed",
    action: "rate",
    year: 2024,
  },
  {
    id: 2,
    title: "Annual Team Building Retreat",
    dates: "Nov 10 - Nov 12, 2023",
    location: "Oran",
    category: "Events",
    participants: "1 Participant",
    status: "completed",
    action: "view",
    year: 2023,
  },
  {
    id: 3,
    title: "HSE Safety Management Workshop",
    dates: "Sep 05 - Sep 07, 2023",
    location: "Algiers HQ",
    category: "Trainings",
    participants: "Certificate Earned",
    status: "completed",
    action: "certificate",
    year: 2023,
  },
  {
    id: 4,
    title: "Summer Camp - Bejaia",
    dates: "Jul 12 - Jul 26, 2023",
    location: "Bejaia",
    category: "Trips & Excursions",
    participants: "3 Children",
    status: "cancelled",
    action: "view",
    year: 2023,
  },
  {
    id: 5,
    title: "Sonatrach Annual Gala",
    dates: "Dec 20, 2022",
    location: "Algiers",
    category: "Events",
    participants: "2 Participants",
    status: "completed",
    action: "gallery",
    year: 2022,
  },
];

const tabs = [
  { key: "all", label: "All History", count: 5 },
  { key: "Trips & Excursions", label: "Trips & Excursions", count: 2 },
  { key: "Events", label: "Events", count: 2 },
  { key: "Trainings", label: "Trainings", count: 1 },
];

const years = ["All Time", "2024", "2023", "2022"];

function CategoryIcon({ category }) {
  if (category === "Trips & Excursions") {
    return (
      <div className="w-10 h-10 rounded-[12px] bg-[#F7F7F5] border border-[#E5E2DC] flex items-center justify-center text-[#7A8088] shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </div>
    );
  }
  if (category === "Events") {
    return (
      <div className="w-10 h-10 rounded-[12px] bg-[#F7F7F5] border border-[#E5E2DC] flex items-center justify-center text-[#7A8088] shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-[12px] bg-[#F7F7F5] border border-[#E5E2DC] flex items-center justify-center text-[#7A8088] shrink-0">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === "cancelled") {
    return (
      <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-[#D92D20] text-white">
        Cancelled
      </span>
    );
  }
  return (
    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-[#F7F7F5] text-[#7A8088] border border-[#E5E2DC]">
      Completed
    </span>
  );
}

function ActionButton({ action }) {
  if (action === "rate") {
    return (
      <button className="flex items-center gap-2 h-[36px] px-4 rounded-full border border-[#E5E2DC] bg-white text-[#2F343B] text-sm font-medium hover:bg-gray-50 transition-colors">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        Rate
      </button>
    );
  }
  if (action === "certificate") {
    return (
      <button className="flex items-center gap-2 h-[36px] px-4 rounded-full border border-[#E5E2DC] bg-white text-[#2F343B] text-sm font-medium hover:bg-gray-50 transition-colors">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Certificate
      </button>
    );
  }
  if (action === "gallery") {
    return (
      <button className="flex items-center gap-2 h-[36px] px-4 rounded-full border border-[#E5E2DC] bg-white text-[#2F343B] text-sm font-medium hover:bg-gray-50 transition-colors">
        View gallery
      </button>
    );
  }
  return (
    <button className="flex items-center gap-2 h-[36px] px-4 rounded-full border border-[#E5E2DC] bg-white text-[#2F343B] text-sm font-medium hover:bg-gray-50 transition-colors">
      View details
    </button>
  );
}

function HistoryRow({ item }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-5 border-b border-[#E5E2DC] last:border-b-0">
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <CategoryIcon category={item.category} />
        <div className="flex flex-col gap-1 min-w-0">
          <h4 className="text-[#2F343B] font-bold text-[15px] leading-tight">{item.title}</h4>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#7A8088]">
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {item.dates}
            </span>
            <span className="text-[#D0CCC7]">·</span>
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {item.location}
            </span>
            <span className="text-[#D0CCC7]">·</span>
            <span className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              {item.participants}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <StatusBadge status={item.status} />
        <ActionButton action={item.action} />
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F7F7F5] transition-colors text-[#7A8088]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5"/>
            <circle cx="12" cy="12" r="1.5"/>
            <circle cx="12" cy="19" r="1.5"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function ParticipationHistory() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeYear, setActiveYear] = useState("All Time");
  const [search, setSearch] = useState("");

  const filtered = historyItems.filter((item) => {
    const matchTab = activeTab === "all" || item.category === activeTab;
    const matchYear = activeYear === "All Time" || item.year === parseInt(activeYear);
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchYear && matchSearch;
  });

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#2F343B] text-[32px] font-extrabold tracking-[-1px] leading-tight">
            Participation History
          </h1>
          <p className="text-[#7A8088] text-sm mt-1">
            Review your past activities, trips, and events you have attended.
          </p>
        </div>
      </div>

      {/* Tabs + search + filter + export — same row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
        {/* Underline tabs */}
        <div className="flex gap-0">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 pb-3 pt-1 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.key
                  ? "border-[#ED8D31] text-[#2F343B]"
                  : "border-transparent text-[#7A8088] hover:text-[#2F343B]"
              }`}
            >
              {tab.label}{" "}
              <span className={`text-xs ${activeTab === tab.key ? "text-[#ED8D31]" : "text-[#B0A99F]"}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 pb-1">
          <div className="flex items-center gap-2 h-[38px] px-4 rounded-full border border-[#E5E2DC] bg-white w-[180px]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7A8088" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 text-sm text-[#2F343B] outline-none bg-transparent placeholder:text-[#7A8088]"
              placeholder="Search history..."
            />
          </div>
          <button className="flex items-center gap-2 h-[38px] px-4 rounded-full border border-[#E5E2DC] bg-white text-[#2F343B] text-sm font-medium hover:bg-gray-50 transition-colors">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
              <line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            Filter
          </button>
          <button className="flex items-center gap-2 h-[38px] px-4 rounded-full border border-[#E5E2DC] bg-white text-[#2F343B] text-sm font-medium hover:bg-gray-50 transition-colors">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* Year pills */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {years.map((y) => (
          <button
            key={y}
            onClick={() => setActiveYear(y)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeYear === y
                ? "bg-[#2F343B] text-white border-[#2F343B]"
                : "border-[#E5E2DC] bg-white text-[#7A8088] hover:text-[#2F343B]"
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {/* List inside a card */}
      <div className="rounded-[20px] border border-[#E5E2DC] bg-white px-5">
        {filtered.length === 0 ? (
          <div className="py-10 text-center text-[#7A8088] text-sm">
            No history found for this filter.
          </div>
        ) : (
          filtered.map((item) => (
            <HistoryRow key={item.id} item={item} />
          ))
        )}
      </div>
    </AppLayout>
  );
}
