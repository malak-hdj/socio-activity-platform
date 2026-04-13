import { useMemo, useState } from "react";
import AppLayout from "../../components/AppLayout";

const categoryOptions = [
  "Activities",
  "Services",
  "Communication",
  "Workplace",
  "Wellbeing",
];

const initialIdeas = [
  {
    id: 1,
    category: "Activities",
    title: "Create more family weekend stays near the coast",
    description:
      "A short coastal stay with activities for parents and children would be useful during school breaks and easier to access than long trips.",
    status: "under_review",
    submittedAgo: "Submitted 2 days ago",
  },
  {
    id: 2,
    category: "Services",
    title: "Add a checklist for required registration documents",
    description:
      "A simple checklist attached to each activity would help employees prepare their files faster and reduce missing documents during registration.",
    status: "under_review",
    submittedAgo: "Submitted 1 week ago",
  },
  {
    id: 3,
    category: "Communication",
    title: "Send one summary notification each week for new announcements",
    description:
      "A weekly recap would make it easier to follow announcements and important updates without checking the platform several times a day.",
    status: "archived",
    submittedAgo: "Submitted 3 weeks ago",
  },
];

function StatusBadge({ status }) {
  const map = {
    under_review: {
      label: "Under Review",
      cls: "bg-[#FFF4E8] text-[#9B5A13] border-[#F7D8B5]",
    },
    archived: {
      label: "Archived",
      cls: "bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]",
    },
  };
  const current = map[status] ?? map.under_review;
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${current.cls}`}>
      {current.label}
    </span>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="rounded-[12px] border border-[#E5E2DC] bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-[#7A8088]">{label}</span>
        {icon}
      </div>
      <p className="text-[38px] font-bold leading-none text-[#2F343B]">{value}</p>
    </div>
  );
}

function IdeaRow({ idea }) {
  return (
    <div className="rounded-[10px] border border-[#E5E2DC] bg-white p-4">
      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
        <span className="inline-flex rounded-full border border-[#ECE8E0] bg-[#F9F8F6] px-2.5 py-1 text-[11px] font-medium text-[#8A8F96]">
          {idea.category}
        </span>
        <StatusBadge status={idea.status} />
      </div>

      <h3 className="mb-1 text-[18px] font-bold leading-[1.3] text-[#2F343B]">{idea.title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-[#7A8088]">{idea.description}</p>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#EFECE7] pt-3">
        <div className="flex items-center gap-2 text-xs text-[#8A8F96]">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="8" />
          </svg>
          <span>Sent anonymously</span>
          <span>•</span>
          <span>{idea.submittedAgo}</span>
        </div>
        <button
          type="button"
          className="inline-flex h-9 items-center rounded-[8px] border border-[#E5E2DC] bg-white px-4 text-sm font-semibold text-[#5A6169] hover:bg-[#F6F6F4]"
        >
          View details
        </button>
      </div>
    </div>
  );
}

export default function IdeaBox() {
  const [ideas, setIdeas] = useState(initialIdeas);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const stats = useMemo(() => {
    const total = ideas.length;
    const underReview = ideas.filter((idea) => idea.status === "under_review").length;
    const archived = ideas.filter((idea) => idea.status === "archived").length;
    return { total, underReview, archived };
  }, [ideas]);

  const filteredIdeas = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return ideas.filter((idea) => {
      const tabMatch =
        activeTab === "all" ||
        (activeTab === "under_review" && idea.status === "under_review") ||
        (activeTab === "archived" && idea.status === "archived");
      const searchMatch =
        normalized.length === 0 ||
        idea.title.toLowerCase().includes(normalized) ||
        idea.description.toLowerCase().includes(normalized) ||
        idea.category.toLowerCase().includes(normalized);
      return tabMatch && searchMatch;
    });
  }, [activeTab, ideas, search]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    if (!category || !trimmedTitle || !trimmedDescription) return;

    const nextIdea = {
      id: Date.now(),
      category,
      title: trimmedTitle,
      description: trimmedDescription,
      status: "under_review",
      submittedAgo: "Submitted just now",
    };

    setIdeas((prev) => [nextIdea, ...prev]);
    setTitle("");
    setDescription("");
    setCategory("");
    setActiveTab("all");
  };

  const tabs = [
    { id: "all", label: "All" },
    { id: "under_review", label: "Under review" },
    { id: "archived", label: "Archived" },
  ];

  return (
    <AppLayout>
      <section>
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[32px] font-extrabold tracking-[-0.03em] text-[#2F343B]">Idea Box</h1>
            <p className="mt-1 text-sm text-[#7A8088]">
              Submit your ideas anonymously to the administration and keep track of the ideas you have already sent.
            </p>
          </div>
        </div>

        <div className="mb-5 grid gap-3 md:grid-cols-3">
          <StatCard
            label="My Submitted Ideas"
            value={stats.total}
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ED8D31" strokeWidth="2">
                <path d="M12 2V8M12 16V22M4.93 4.93L9.17 9.17M14.83 14.83L19.07 19.07M2 12H8M16 12H22M4.93 19.07L9.17 14.83M14.83 9.17L19.07 4.93" />
              </svg>
            }
          />
          <StatCard
            label="Currently Under Review"
            value={stats.underReview}
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F2B233" strokeWidth="2">
                <circle cx="12" cy="12" r="8" />
                <path d="M12 8V12L14.5 13.5" />
              </svg>
            }
          />
          <StatCard
            label="Archived Responses"
            value={stats.archived}
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <path d="M4 7H20L18.8 20H5.2L4 7Z" />
                <path d="M9 7V4H15V7" />
              </svg>
            }
          />
        </div>

        <div className="grid gap-4 xl:grid-cols-[1fr_1.55fr]">
          <div className="rounded-[12px] border border-[#E5E2DC] bg-white p-4">
            <h2 className="text-[24px] font-bold tracking-[-0.02em] text-[#2F343B]">Submit a new idea</h2>
            <p className="mt-1 text-sm text-[#7A8088]">
              Your identity is hidden. The idea is sent directly to the admin team for review.
            </p>

            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#4E545B]">Category</label>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="h-10 w-full rounded-[8px] border border-[#E5E2DC] bg-[#FBFBFA] px-3 text-sm text-[#2F343B] outline-none"
                >
                  <option value="">Choose a category</option>
                  {categoryOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#4E545B]">Idea title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Example: Add a family wellness weekend activity"
                  className="h-10 w-full rounded-[8px] border border-[#E5E2DC] bg-[#FBFBFA] px-3 text-sm text-[#2F343B] outline-none placeholder:text-[#9AA0A8]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#4E545B]">Description</label>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe your suggestion, the benefit for employees, and any useful details for the admin team."
                  className="min-h-[110px] w-full resize-none rounded-[8px] border border-[#E5E2DC] bg-[#FBFBFA] p-3 text-sm text-[#2F343B] outline-none placeholder:text-[#9AA0A8]"
                />
              </div>

              <div className="rounded-[8px] border border-[#ECE8E0] bg-[#F9F8F6] p-3">
                <p className="text-xs leading-relaxed text-[#7A8088]">
                  Anonymous submission enabled. Other employees cannot view or react to ideas. Only you can see your own submission history here.
                </p>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-[#8A8F96]">Visible only to you and the admin team.</span>
                <button
                  type="submit"
                  disabled={!category || !title.trim() || !description.trim()}
                  className="inline-flex h-10 items-center rounded-[8px] bg-[#ED8D31] px-4 text-sm font-semibold text-white hover:bg-[#da7f2a] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Send Idea
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-[12px] border border-[#E5E2DC] bg-white p-4">
            <h2 className="text-[24px] font-bold tracking-[-0.02em] text-[#2F343B]">My submitted ideas</h2>
            <p className="mt-1 text-sm text-[#7A8088]">
              Follow the status of the ideas you already sent to the administration.
            </p>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1 rounded-[8px] border border-[#E5E2DC] bg-[#FBFBFA] p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-[6px] px-3 py-1.5 text-xs font-semibold transition-colors ${
                      activeTab === tab.id
                        ? "bg-white text-[#2F343B] shadow-[0_0_0_1px_#E5E2DC]"
                        : "text-[#7A8088] hover:text-[#2F343B]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <label className="flex h-10 min-w-[220px] flex-1 items-center gap-2 rounded-[8px] border border-[#E5E2DC] bg-[#FBFBFA] px-3 text-[#9AA0A8] sm:flex-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search my ideas..."
                  className="w-full bg-transparent text-sm text-[#2F343B] outline-none placeholder:text-[#9AA0A8]"
                />
              </label>
            </div>

            <div className="mt-3 space-y-3">
              {filteredIdeas.length === 0 ? (
                <div className="rounded-[10px] border border-[#E5E2DC] bg-[#FBFBFA] px-4 py-8 text-center text-sm text-[#8A8F96]">
                  No ideas match this filter.
                </div>
              ) : (
                filteredIdeas.map((idea) => <IdeaRow key={idea.id} idea={idea} />)
              )}
            </div>

            <div className="mt-3 rounded-[10px] border border-[#ECE8E0] bg-[#F9F8F6] p-3 text-xs leading-relaxed text-[#8A8F96]">
              Only your own ideas appear in this space. There are no public votes, reactions, or implemented idea lists on this page.
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
