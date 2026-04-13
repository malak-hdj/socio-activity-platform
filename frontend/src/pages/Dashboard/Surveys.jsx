import { useMemo, useState } from "react";
import AppLayout from "../../components/AppLayout";

const tabs = [
  { id: "active", label: "Active", count: 3 },
  { id: "completed", label: "Completed", count: 12 },
  { id: "results", label: "Results", count: 5 },
];

const surveyCards = [
  {
    id: "workplace-amenities",
    tab: "active",
    title: "Workplace Environment & Amenities 2024",
    badge: "Mandatory",
    description:
      "We want to hear your thoughts on our current office facilities, including the cafeteria,...",
    duration: "~5 min",
    due: "Due in 3 days",
    cta: "Take Survey",
    accent: "orange",
    icon: "card",
  },
  {
    id: "employee-satisfaction",
    tab: "active",
    title: "Annual Employee Satisfaction",
    description:
      "Your feedback is crucial. Please share your experience regarding work-life balance,...",
    duration: "~10 min",
    due: "Due in 2 weeks",
    cta: "Take Survey",
    accent: "orange",
    icon: "smile",
  },
  {
    id: "remote-work-policy",
    tab: "active",
    title: "Remote Work Policy Feedback",
    description:
      "Evaluate the current hybrid work setup. Let us know how we can better support your remot...",
    duration: "~3 min",
    due: "Due Tomorrow",
    cta: "Continue",
    progress: 60,
    accent: "neutral",
    icon: "house",
  },
  {
    id: "onboarding-experience",
    tab: "completed",
    title: "New Joiner Onboarding Experience",
    description: "Thanks for sharing your first-month journey with our HR and team process.",
    duration: "~7 min",
    due: "Submitted 5 days ago",
    cta: "View Response",
    accent: "neutral",
    icon: "card",
  },
  {
    id: "transport-services",
    tab: "completed",
    title: "Employee Transport Services",
    description:
      "This survey helped us review bus scheduling, route coverage, and punctuality service.",
    duration: "~4 min",
    due: "Submitted 12 days ago",
    cta: "View Response",
    accent: "neutral",
    icon: "compass",
  },
  {
    id: "wellness-results",
    tab: "results",
    title: "Workplace Wellness Survey Results",
    description:
      "Explore key outcomes from the wellness initiative and compare department trends.",
    duration: "~6 min",
    due: "Published",
    cta: "View Results",
    accent: "neutral",
    icon: "results",
  },
];

function Icon({ name, className = "h-4 w-4" }) {
  switch (name) {
    case "search":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "filter":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7H20M7.5 12H16.5M10 17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "clock":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 8V12L14.8 13.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "calendar":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="4" y="6" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 4.8V8M16 4.8V8M4 10.5H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "play":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 7.5L16 12L9 16.5V7.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
    case "card":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="5" y="4.5" width="14" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8.5 8.5H15.5M8.5 11.5H15.5M8.5 14.5H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "smile":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="9.2" cy="10.2" r="1" fill="currentColor" />
          <circle cx="14.8" cy="10.2" r="1" fill="currentColor" />
          <path d="M8.8 13.4C9.7 14.7 11 15.3 12 15.3C13 15.3 14.3 14.7 15.2 13.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "house":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5.5 10.5L12 5L18.5 10.5V18.5H5.5V10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M9.5 18.5V13.2H14.5V18.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "compass":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
          <path d="M15.5 8.5L13.3 13.3L8.5 15.5L10.7 10.7L15.5 8.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "results":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="5" y="12" width="3.2" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.7" />
          <rect x="10.4" y="9" width="3.2" height="9.5" rx="1" stroke="currentColor" strokeWidth="1.7" />
          <rect x="15.8" y="6" width="3.2" height="12.5" rx="1" stroke="currentColor" strokeWidth="1.7" />
        </svg>
      );
    default:
      return null;
  }
}

function SurveyCard({ survey }) {
  const primary = survey.accent === "orange";

  return (
    <article className="flex min-h-[292px] flex-col rounded-[16px] border border-[#E5E2DC] bg-white p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h3 className="max-w-[250px] text-[28px] font-bold leading-[1.2] tracking-[-0.03em] text-[#2F343B]">
          {survey.title}
        </h3>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-[10px] ${
            primary ? "bg-[#ED8D31] text-white" : "bg-[#F2F2F0] text-[#7A8088]"
          }`}
        >
          <Icon name={survey.icon} className="h-5 w-5" />
        </div>
      </div>

      {survey.badge && (
        <span className="mb-4 inline-flex w-fit rounded-full bg-[#F2B233] px-3 py-1 text-xs font-semibold text-[#6D4A10]">
          {survey.badge}
        </span>
      )}

      <p className="mb-5 text-sm leading-relaxed text-[#7A8088]">{survey.description}</p>

      <div className="mb-5 flex flex-wrap gap-2 text-[#8A8F96]">
        <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#E4E4E1] bg-[#FBFBFA] px-2.5 py-1 text-sm">
          <Icon name="clock" className="h-4 w-4" />
          {survey.duration}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-[8px] border border-[#E4E4E1] bg-[#FBFBFA] px-2.5 py-1 text-sm">
          <Icon name="calendar" className="h-4 w-4" />
          {survey.due}
        </span>
      </div>

      {typeof survey.progress === "number" && (
        <div className="mb-4 mt-auto">
          <div className="mb-2 h-[6px] w-full overflow-hidden rounded-full bg-[#E6E7E4]">
            <div className="h-full rounded-full bg-[#38A169]" style={{ width: `${survey.progress}%` }} />
          </div>
          <p className="text-right text-sm font-semibold text-[#8A8F96]">{survey.progress}% Completed</p>
        </div>
      )}

      <button
        type="button"
        className={`mt-auto inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] border text-base font-semibold transition-colors ${
          primary
            ? "border-[#ED8D31] bg-[#ED8D31] text-white hover:bg-[#dd7f25]"
            : "border-[#DADBD7] bg-[#FBFBFA] text-[#4E545B] hover:bg-[#F2F2F0]"
        }`}
      >
        <Icon name="play" className="h-[17px] w-[17px]" />
        {survey.cta}
      </button>
    </article>
  );
}

export default function Surveys() {
  const [activeTab, setActiveTab] = useState("active");
  const [search, setSearch] = useState("");

  const filteredSurveys = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return surveyCards.filter(
      (survey) =>
        survey.tab === activeTab &&
        (normalized.length === 0 ||
          survey.title.toLowerCase().includes(normalized) ||
          survey.description.toLowerCase().includes(normalized))
    );
  }, [activeTab, search]);

  return (
    <AppLayout>
      <section>
        <div className="mb-6">
          <h1 className="mb-1 text-[32px] font-extrabold leading-tight tracking-[-0.03em] text-[#2F343B]">
            Surveys &amp; Feedback
          </h1>
          <p className="text-sm text-[#7A8088]">
            Participate in internal company surveys, share your opinions, and help us improve the workplace.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[#E4E4E1]">
          <div className="flex flex-wrap gap-6">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex h-11 items-center gap-2 border-b-2 pb-2 text-sm transition-colors ${
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
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mb-3 ml-auto flex w-full flex-wrap items-center gap-3 md:w-auto">
            <label className="flex h-11 min-w-[220px] flex-1 items-center gap-2 rounded-full border border-[#E4E4E1] bg-white px-3 text-[#9CA1A9] md:flex-none">
              <Icon name="search" className="h-4 w-4" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search surveys..."
                className="w-full bg-transparent text-sm text-[#2F343B] outline-none placeholder:text-[#9CA1A9]"
              />
            </label>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[#E4E4E1] bg-white px-4 text-sm font-semibold text-[#4D5560] hover:bg-[#F2F2F0]"
            >
              <Icon name="filter" className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {filteredSurveys.map((survey) => (
            <SurveyCard key={survey.id} survey={survey} />
          ))}
        </div>

        {filteredSurveys.length === 0 && (
          <div className="rounded-[16px] border border-[#E5E2DC] bg-white px-6 py-10 text-center">
            <p className="text-base font-medium text-[#4D5560]">No surveys found for your search.</p>
          </div>
        )}
      </section>
    </AppLayout>
  );
}
