import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ── Sidebar nav items (matches PDF design)
const sidebarLinks = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "My Requests", to: "/dashboard/requests" },
  { label: "Draw Results", to: "/dashboard/draws" },
  { label: "Documents", to: "/dashboard/documents", active: true },
  { label: "Participation History", to: "/dashboard/history" },
  { label: "Surveys", to: "/dashboard/surveys" },
  { label: "Idea Box", to: "/dashboard/ideas" },
];

// ── Mock document data (mirrors PDF content)
const allDocuments = [
  {
    id: 1,
    activity: "Summer Camp Stay (Children)",
    activityTag: "Accepted Request",
    name: "Birth Certificate (Child 1)",
    due: "Aug 25, 2024",
    status: "missing",
    note: "Required for registration",
    fileName: null,
  },
  {
    id: 2,
    activity: "Summer Camp Stay (Children)",
    activityTag: "Accepted Request",
    name: "Medical Certificate (Child 1)",
    due: "Aug 25, 2024",
    status: "missing",
    note: "Required for registration",
    fileName: null,
  },
  {
    id: 3,
    activity: "Language Training Program",
    activityTag: "Accepted Request",
    name: "National ID Card",
    due: null,
    status: "verified",
    note: "Uploaded on Jul 01, 2024",
    fileName: "ID_Card_Ahmed.pdf",
  },
  {
    id: 4,
    activity: "Language Training Program",
    activityTag: "Accepted Request",
    name: "Employee Badge Copy",
    due: null,
    status: "verified",
    note: "Uploaded on Jul 01, 2024",
    fileName: "badge_scan.jpg",
  },
];

// ── Stat card
function StatCard({ label, value, highlight }) {
  return (
    <div
      className={`rounded-[20px] border p-5 flex flex-col gap-1 min-w-[120px] ${
        highlight
          ? "border-[#ED8D31] bg-[#FFF8F2]"
          : "border-[#E5E2DC] bg-white"
      }`}
    >
      <span
        className={`text-[28px] font-extrabold leading-none ${
          highlight ? "text-[#ED8D31]" : "text-[#2F343B]"
        }`}
      >
        {value}
      </span>
      <span className="text-sm text-[#7A8088]">{label}</span>
    </div>
  );
}

// ── Status badge
function StatusBadge({ status }) {
  const map = {
    missing: {
      label: "Missing",
      cls: "bg-[#FEF3F2] text-[#D92D20] border-[#FEE4E2]",
    },
    uploaded: {
      label: "Uploaded",
      cls: "bg-[#F0F9FF] text-[#026AA2] border-[#B9E6FE]",
    },
    verified: {
      label: "Verified",
      cls: "bg-[#E9F7EF] text-[#2F8C57] border-[#A6E0BE]",
    },
  };
  const { label, cls } = map[status] || map.missing;
  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${cls}`}
    >
      {label}
    </span>
  );
}

// ── Single document row
function DocumentRow({ doc, onUpload }) {
  return (
    <div className="rounded-[20px] border border-[#E5E2DC] bg-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Left info */}
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-[#7A8088] bg-[#F7F7F5] border border-[#E5E2DC] px-3 py-0.5 rounded-full">
            {doc.activity}
          </span>
          <span className="text-xs font-semibold text-[#2F8C57] bg-[#E9F7EF] border border-[#A6E0BE] px-3 py-0.5 rounded-full">
            {doc.activityTag}
          </span>
        </div>

        <h4 className="text-[#2F343B] font-bold text-[15px] mt-1">
          {doc.name}
        </h4>

        <p className="text-sm text-[#7A8088]">
          {doc.due ? (
            <>
              <span className="text-[#D92D20] font-medium">
                Due by: {doc.due}
              </span>
              {" · "}
              {doc.note}
            </>
          ) : (
            doc.note
          )}
        </p>

        {doc.fileName && (
          <div className="flex items-center gap-1.5 mt-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7A8088"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span className="text-xs text-[#7A8088]">{doc.fileName}</span>
          </div>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 shrink-0">
        <StatusBadge status={doc.status} />
        {doc.status === "missing" && (
          <button
            onClick={() => onUpload(doc.id)}
            className="flex h-[38px] px-5 items-center justify-center rounded-full bg-[#ED8D31] text-white text-sm font-semibold hover:bg-[#d97d22] transition-colors"
          >
            Upload
          </button>
        )}
        {doc.status === "uploaded" && (
          <button className="flex h-[38px] px-5 items-center justify-center rounded-full border border-[#E5E2DC] bg-white text-[#2F343B] text-sm font-medium hover:bg-gray-50 transition-colors">
            Replace
          </button>
        )}
        {doc.status === "verified" && (
          <button className="flex h-[38px] px-5 items-center justify-center rounded-full border border-[#E5E2DC] bg-white text-[#7A8088] text-sm font-medium hover:bg-gray-50 transition-colors">
            View
          </button>
        )}
      </div>
    </div>
  );
}

// ── Upload modal (simple)
function UploadModal({ docId, docName, onClose, onConfirm }) {
  const [file, setFile] = useState(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] px-4">
      <div className="w-full max-w-[480px] bg-white rounded-[28px] border border-[#E5E2DC] p-8 shadow-xl">
        <h3 className="text-[#2F343B] text-xl font-bold mb-1">
          Upload Document
        </h3>
        <p className="text-[#7A8088] text-sm mb-6">{docName}</p>

        <label className="flex flex-col items-center justify-center w-full h-[140px] rounded-[18px] border-2 border-dashed border-[#E5E2DC] bg-[#F7F7F5] cursor-pointer hover:border-[#ED8D31] transition-colors">
          <input
            type="file"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file ? (
            <div className="text-center px-4">
              <p className="text-[#2F343B] font-semibold text-sm">{file.name}</p>
              <p className="text-[#7A8088] text-xs mt-1">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>
          ) : (
            <div className="text-center px-4">
              <svg
                className="mx-auto mb-2"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7A8088"
                strokeWidth="1.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <p className="text-[#7A8088] text-sm">
                Click to choose a file or drag it here
              </p>
              <p className="text-[#7A8088] text-xs mt-1">PDF, JPG, PNG · Max 5 MB</p>
            </div>
          )}
        </label>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-[14px] border border-[#E5E2DC] bg-white text-[#2F343B] text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => file && onConfirm(docId, file)}
            disabled={!file}
            className="flex-1 py-3 rounded-[14px] bg-[#ED8D31] text-white text-sm font-semibold disabled:opacity-40 hover:bg-[#d97d22] transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main page
export default function Documents() {
  const navigate = useNavigate();
  const [docs, setDocs] = useState(allDocuments);
  const [activeTab, setActiveTab] = useState("all"); // all | action | uploaded
  const [search, setSearch] = useState("");
  const [uploadTarget, setUploadTarget] = useState(null); // { id, name }

  const stats = {
    total: docs.length,
    actionNeeded: docs.filter((d) => d.status === "missing").length,
    uploaded: docs.filter((d) => d.status === "uploaded").length,
    verified: docs.filter((d) => d.status === "verified").length,
  };

  const filtered = docs.filter((d) => {
    const matchTab =
      activeTab === "all" ||
      (activeTab === "action" && d.status === "missing") ||
      (activeTab === "uploaded" && d.status !== "missing");
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.activity.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const handleUploadOpen = (id) => {
    const doc = docs.find((d) => d.id === id);
    setUploadTarget({ id, name: doc.name });
  };

  const handleUploadConfirm = (id, file) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: "uploaded", fileName: file.name, note: `Uploaded on ${new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}`, due: null }
          : d
      )
    );
    setUploadTarget(null);
  };

  const tabs = [
    { key: "all", label: `All Documents` },
    { key: "action", label: `Action Needed ${stats.actionNeeded}` },
    { key: "uploaded", label: "Uploaded" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F5]">
      {/* ── Navbar (same as Navbar.jsx) */}
      <div className="flex justify-center px-4 pt-[18px] pb-0 relative z-10">
        <nav className="flex w-full max-w-[1336px] min-h-[74px] px-5 py-[13px] justify-between items-center rounded-[22px] border border-[rgba(229,226,220,0.92)] bg-[rgba(255,255,255,0.82)] backdrop-blur-[5px]">
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

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-[380px] mx-6 h-[42px] items-center gap-2 px-4 rounded-full border border-[#E5E2DC] bg-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A8088" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="flex-1 text-sm text-[#2F343B] outline-none bg-transparent placeholder:text-[#7A8088]"
              placeholder="Search activities, announcements..."
            />
          </div>

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
                  link.active
                    ? "bg-[#ED8D31] text-white"
                    : "text-[#7A8088] hover:text-[#2F343B] hover:bg-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </aside>

          {/* ── Main content */}
          <main className="flex-1 min-w-0">

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-[#2F343B] text-[32px] font-extrabold tracking-[-1px] leading-tight">
                Documents
              </h1>
              <p className="text-[#7A8088] text-sm mt-1">
                Manage the documents required for your accepted activities and ongoing requests.
              </p>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4 mb-6">
              <StatCard label="Total Required" value={stats.total} />
              <StatCard label="Action Needed" value={stats.actionNeeded} highlight />
              <StatCard label="Uploaded & Verified" value={stats.verified} />
            </div>

            {/* Tabs + search bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div className="flex gap-1 bg-white border border-[#E5E2DC] rounded-full p-1 w-fit">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? "bg-[#2F343B] text-white"
                        : "text-[#7A8088] hover:text-[#2F343B]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 h-[40px] px-4 rounded-full border border-[#E5E2DC] bg-white w-full sm:w-[220px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A8088" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 text-sm text-[#2F343B] outline-none bg-transparent placeholder:text-[#7A8088]"
                  placeholder="Search documents..."
                />
              </div>
            </div>

            {/* Document list */}
            <div className="flex flex-col gap-4">
              {filtered.length === 0 ? (
                <div className="rounded-[20px] border border-[#E5E2DC] bg-white p-10 text-center text-[#7A8088] text-sm">
                  No documents found.
                </div>
              ) : (
                filtered.map((doc) => (
                  <DocumentRow key={doc.id} doc={doc} onUpload={handleUploadOpen} />
                ))
              )}
            </div>
          </main>
        </div>
      </div>

      {/* ── Footer (same as Footer.jsx) */}
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

      {/* ── Upload modal */}
      {uploadTarget && (
        <UploadModal
          docId={uploadTarget.id}
          docName={uploadTarget.name}
          onClose={() => setUploadTarget(null)}
          onConfirm={handleUploadConfirm}
        />
      )}
    </div>
  );
}