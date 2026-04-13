import AdminLayout from "../../components/AdminLayout";

const applications = [
  {
    employee: "Yacine Bensaid",
    id: "M005284",
    activity: "Excursion à Djanet",
    activityType: "Travel activity",
    session: "Session Autumn 2024",
    date: "Sep 21, 2024",
    status: "Pending",
    avatar: "https://i.pravatar.cc/40?img=12",
  },
  {
    employee: "Nadia Meziane",
    id: "M004913",
    activity: "Vacances nature & détente",
    activityType: "Family stay",
    session: "Family Session A",
    date: "Sep 19, 2024",
    status: "Selected",
    avatar: "https://i.pravatar.cc/40?img=47",
  },
  {
    employee: "Karim Touati",
    id: "M006107",
    activity: "Thermal stay - Hammam Righa",
    activityType: "Wellness stay",
    session: "Reallocation Session",
    date: "Sep 16, 2024",
    status: "Waiting list",
    avatar: "https://i.pravatar.cc/40?img=15",
  },
  {
    employee: "Samira Ghezali",
    id: "M003822",
    activity: "Annual Corporate Retreat",
    activityType: "Corporate event",
    session: "Main Session",
    date: "Sep 14, 2024",
    status: "Confirmed",
    avatar: "https://i.pravatar.cc/40?img=23",
  },
  {
    employee: "Anis Cherif",
    id: "M007224",
    activity: "Excursion à Djanet",
    activityType: "Travel activity",
    session: "Late Allocation Session",
    date: "Sep 12, 2024",
    status: "Rejected",
    avatar: "https://i.pravatar.cc/40?img=67",
  },
];

function Pill({ text }) {
  return (
    <span className="inline-flex rounded-full border border-[#E5E2DC] bg-white px-2.5 py-1 text-[10px] font-semibold text-[#7A8088]">
      {text}
    </span>
  );
}

function StatusPill({ status }) {
  const map = {
    Pending: "bg-[#FFF7ED] text-[#B96B10]",
    Selected: "bg-[#EEF7FF] text-[#026AA2]",
    "Waiting list": "bg-[#F7F7F5] text-[#7A8088]",
    Rejected: "bg-[#FEF3F2] text-[#D92D20]",
    Confirmed: "bg-[#E9F7EF] text-[#2F8C57]",
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${map[status] ?? "bg-[#F7F7F5] text-[#7A8088]"}`}>
      {status}
    </span>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-[14px] border border-[#E5E2DC] bg-white p-4">
      <p className="text-[11px] text-[#7A8088]">{label}</p>
      <p className="mt-1 text-[34px] font-extrabold leading-none text-[#2F343B]">{value}</p>
      <p className="mt-1 text-[10px] text-[#8A8F96]">{sub}</p>
    </div>
  );
}

function ActionRow({ title, desc, actionLabel = "Open", accent = false }) {
  return (
    <div className="rounded-[10px] border border-[#E5E2DC] bg-white p-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-[#2F343B]">{title}</p>
          <p className="mt-0.5 text-[10px] leading-[150%] text-[#7A8088]">{desc}</p>
        </div>
        <button className={`h-[26px] shrink-0 rounded-[6px] px-3 text-[10px] font-semibold ${accent ? "bg-[#ED8D31] text-white hover:bg-[#d47d29]" : "border border-[#E5E2DC] text-[#2F343B] hover:bg-[#F7F7F5]"}`}>
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

export default function ManageRegistrations() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[32px] font-extrabold leading-tight tracking-[-0.5px] text-[#2F343B]">Manage Registrations</h1>
            <p className="mt-1 text-sm text-[#7A8088]">
              Manage all employee applications to activities, filter by activity or session, review documents, and update registration status when needed.
            </p>
          </div>
          <button className="inline-flex h-[36px] items-center gap-2 rounded-[8px] bg-[#ED8D31] px-4 text-sm font-semibold text-white hover:bg-[#d47d29]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export Registrations
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Registrations" value="642" sub="Applications submitted across all activities this period" />
          <StatCard label="Pending Review" value="84" sub="Applications requiring admin validation or manual update" />
          <StatCard label="Confirmed" value="246" sub="Employees who confirmed their participation" />
          <StatCard label="Waiting List" value="39" sub="Registrations still waiting for seat reallocation" />
        </div>

        <section className="rounded-[16px] border border-[#E5E2DC] bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-[#2F343B]">Registrations table</h2>
              <p className="mt-0.5 text-[11px] text-[#7A8088]">Search by employee name or ID and narrow results by activity, session, or status.</p>
            </div>
            <button className="h-[30px] rounded-[8px] border border-[#E5E2DC] px-3 text-xs font-semibold text-[#2F343B] hover:bg-[#F7F7F5]">
              Reset filters
            </button>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
            <input
              placeholder="Search by employee name or ID"
              className="h-[34px] rounded-[8px] border border-[#E5E2DC] bg-[#FAFAF9] px-3 text-xs text-[#2F343B] outline-none placeholder:text-[#9CA1A9]"
            />
            <select className="h-[34px] rounded-[8px] border border-[#E5E2DC] bg-[#FAFAF9] px-3 text-xs text-[#2F343B] outline-none">
              <option>All activities</option>
            </select>
            <select className="h-[34px] rounded-[8px] border border-[#E5E2DC] bg-[#FAFAF9] px-3 text-xs text-[#2F343B] outline-none">
              <option>All sessions</option>
            </select>
            <select className="h-[34px] rounded-[8px] border border-[#E5E2DC] bg-[#FAFAF9] px-3 text-xs text-[#2F343B] outline-none">
              <option>All status</option>
            </select>
            <button className="h-[34px] rounded-[8px] bg-[#ED8D31] px-4 text-xs font-semibold text-white hover:bg-[#d47d29]">
              Apply filters
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <section className="xl:col-span-2 rounded-[16px] border border-[#E5E2DC] bg-white">
            <div className="flex items-center justify-between border-b border-[#F0EFED] px-4 py-3">
              <div>
                <h3 className="text-sm font-bold text-[#2F343B]">Applications</h3>
                <p className="mt-0.5 text-[11px] text-[#7A8088]">View application details, approve or reject manually if needed, mark confirmations, and check uploaded documents.</p>
              </div>
              <Pill text="642 entries" />
            </div>

            <div className="overflow-x-auto px-4 py-2">
              <table className="min-w-full text-left text-xs">
                <thead>
                  <tr className="text-[#7A8088]">
                    <th className="py-2 pr-3 font-medium">Employee</th>
                    <th className="py-2 pr-3 font-medium">Activity</th>
                    <th className="py-2 pr-3 font-medium">Session</th>
                    <th className="py-2 pr-3 font-medium">Registration date</th>
                    <th className="py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((row) => (
                    <tr key={`${row.id}-${row.activity}`} className="border-t border-[#F0EFED]">
                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-2.5">
                          <img src={row.avatar} alt={row.employee} className="h-8 w-8 rounded-full object-cover" />
                          <div>
                            <p className="font-semibold text-[#2F343B]">{row.employee}</p>
                            <p className="text-[10px] text-[#8A8F96]">{row.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-3">
                        <p className="font-semibold text-[#2F343B]">{row.activity}</p>
                        <p className="text-[10px] text-[#8A8F96]">{row.activityType}</p>
                      </td>
                      <td className="py-3 pr-3 text-[#7A8088]">{row.session}</td>
                      <td className="py-3 pr-3 text-[#7A8088]">{row.date}</td>
                      <td className="py-3"><StatusPill status={row.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-[#F0EFED] px-4 py-3 text-[11px] text-[#7A8088]">
              <span>Showing 1-5 of 642 registrations</span>
              <div className="inline-flex items-center gap-1">
                <button className="h-6 w-6 rounded border border-[#E5E2DC]">1</button>
                <button className="h-6 w-6 rounded bg-[#ED8D31] text-white">2</button>
                <button className="h-6 w-6 rounded border border-[#E5E2DC]">3</button>
                <button className="h-6 w-6 rounded border border-[#E5E2DC]">4</button>
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-4">
            <section className="rounded-[16px] border border-[#E5E2DC] bg-white p-4">
              <h3 className="text-sm font-bold text-[#2F343B]">Status summary</h3>
              <p className="mt-0.5 text-[11px] text-[#7A8088]">Current distribution of applications by processing state.</p>

              <div className="mt-3 space-y-2 text-xs">
                {[
                  ["Pending", "84"],
                  ["Selected", "157"],
                  ["Waiting list", "39"],
                  ["Rejected", "116"],
                  ["Confirmed", "246"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-[8px] border border-[#ECEAE4] bg-[#FAFAF9] px-3 py-2">
                    <span className="text-[#7A8088]">{label}</span>
                    <span className="font-semibold text-[#2F343B]">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-[8px] border border-[#FDDCB5] bg-[#FFF6EB] px-3 py-2.5 text-[11px] leading-[155%] text-[#B66A15]">
                Use this page to manually approve or reject applications, mark them as confirmed, check uploaded documents, and export filtered registration lists.
              </div>
            </section>

            <section className="rounded-[16px] border border-[#E5E2DC] bg-white p-4">
              <h3 className="text-sm font-bold text-[#2F343B]">Admin actions</h3>
              <p className="mt-0.5 text-[11px] text-[#7A8088]">Common actions available for registration management.</p>

              <div className="mt-3 space-y-2">
                <ActionRow title="View application details" desc="Open the employee application record with activity, session, and submission information." />
                <ActionRow title="Approve or reject manually" desc="Override automatic processing when validation requires a manual decision." />
                <ActionRow title="Track status and confirmation" desc="Update selected employees after they validate participation and complete their file." />
                <ActionRow title="Check uploaded documents" desc="Review supporting files before final validation." />
                <ActionRow title="Export registrations" desc="Download the current filtered list for reporting, sharing, or archives." actionLabel="Export" accent />
              </div>
            </section>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
