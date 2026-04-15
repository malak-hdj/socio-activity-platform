import AdminLayout from "../../components/AdminLayout";

const sites = [
  {
    name: "Hassi Messaoud Base",
    code: "HM-01",
    city: "Hassi Messaoud",
    linkedSessions: "8 sessions",
    quotaUsed: "164 places",
    participations: "312 employees",
    status: "active",
  },
  {
    name: "Algiers Coastal Center",
    code: "ALG-07",
    city: "Algiers",
    linkedSessions: "6 sessions",
    quotaUsed: "120 places",
    participations: "221 employees",
    status: "active",
  },
  {
    name: "Oran Family Leisure Hub",
    code: "OR-03",
    city: "Oran",
    linkedSessions: "4 sessions",
    quotaUsed: "86 places",
    participations: "154 employees",
    status: "inactive",
  },
  {
    name: "Ghardaia Desert Retreat",
    code: "GH-12",
    city: "Ghardaia",
    linkedSessions: "5 sessions",
    quotaUsed: "98 places",
    participations: "167 employees",
    status: "active",
  },
  {
    name: "Skikda Youth Camp",
    code: "SK-05",
    city: "Skikda",
    linkedSessions: "3 sessions",
    quotaUsed: "54 places",
    participations: "91 employees",
    status: "review",
  },
];

function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-[14px] border border-[#E5E2DC] bg-white p-4">
      <p className="text-[11px] text-[#7A8088]">{label}</p>
      <p className="mt-1 text-[34px] font-extrabold leading-none text-[#2F343B]">{value}</p>
      <p className="mt-1 text-[10px] text-[#8A8F96]">{sub}</p>
    </div>
  );
}

function SiteStatus({ status }) {
  if (status === "active") {
    return <span className="inline-flex rounded-full bg-[#E9F7EF] px-2.5 py-1 text-[10px] font-semibold text-[#2F8C57]">Active</span>;
  }
  if (status === "inactive") {
    return <span className="inline-flex rounded-full bg-[#FFF3E8] px-2.5 py-1 text-[10px] font-semibold text-[#B66A15]">Inactive</span>;
  }
  return <span className="inline-flex rounded-full bg-[#F2F2F0] px-2.5 py-1 text-[10px] font-semibold text-[#7A8088]">Review needed</span>;
}

function InsightRow({ label, value, highlight }) {
  return (
    <div className="rounded-[10px] border border-[#E5E2DC] bg-white px-3 py-2.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-semibold text-[#2F343B]">{label}</p>
        <span className={`text-xs font-bold ${highlight ? "text-[#ED8D31]" : "text-[#2F343B]"}`}>{value}</span>
      </div>
    </div>
  );
}

export default function ManageSites() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-[32px] font-extrabold leading-tight tracking-[-0.5px] text-[#2F343B]">Manage Site</h1>
            <p className="mt-1 text-sm text-[#7A8088]">
              Track the site repository used across activity sessions, monitor utilization, and maintain the list of active operational sites in the same admin style as the activity forms.
            </p>
          </div>
          <div className="flex w-full flex-wrap items-center justify-start gap-2 sm:justify-end lg:w-auto">
            <button className="inline-flex h-[40px] items-center gap-2 rounded-[8px] border border-[#E5E2DC] bg-white px-4 text-sm font-semibold text-[#2F343B] hover:bg-[#F7F7F5]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export
            </button>

            <button className="inline-flex h-[40px] items-center gap-1.5 rounded-[8px] bg-[#ED8D31] px-4 text-sm font-semibold text-white hover:bg-[#d47d29]">
              + Add Site
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard label="Total sites" value="24" sub="Central, regional, and holiday destination sites in the repository." />
          <StatCard label="Sites currently used" value="17" sub="Linked to at least one active or upcoming activity session." />
          <StatCard label="Inactive sites" value="7" sub="Available for cleanup, update, or reactivation before new allocations." />
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <section className="xl:col-span-2 rounded-[16px] border border-[#E5E2DC] bg-white p-4">
            <div>
              <h2 className="text-sm font-bold text-[#2F343B]">Sites list</h2>
              <p className="mt-0.5 text-[11px] text-[#7A8088]">Each site shows linked sessions, total quota already allocated, participation volume, and quick actions.</p>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-[1.4fr_1fr_1fr]">
              <input
                placeholder="Search by site name, code, or city"
                className="h-[34px] rounded-[8px] border border-[#E5E2DC] bg-[#FAFAF9] px-3 text-xs text-[#2F343B] outline-none placeholder:text-[#9CA1A9]"
              />
              <select className="h-[34px] rounded-[8px] border border-[#E5E2DC] bg-[#FAFAF9] px-3 text-xs text-[#2F343B] outline-none">
                <option>All statuses</option>
              </select>
              <select className="h-[34px] rounded-[8px] border border-[#E5E2DC] bg-[#FAFAF9] px-3 text-xs text-[#2F343B] outline-none">
                <option>Most used first</option>
              </select>
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full text-left text-xs">
                <thead>
                  <tr className="text-[#7A8088]">
                    <th className="py-2 pr-3 font-medium">Site name</th>
                    <th className="py-2 pr-3 font-medium">Linked sessions</th>
                    <th className="py-2 pr-3 font-medium">Total quota used</th>
                    <th className="py-2 pr-3 font-medium">Participations</th>
                    <th className="py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sites.map((site) => (
                    <tr key={site.code} className="border-t border-[#F0EFED]">
                      <td className="py-3 pr-3">
                        <p className="font-semibold text-[#2F343B]">{site.name}</p>
                        <p className="text-[10px] text-[#8A8F96]">Code {site.code} • {site.city}</p>
                      </td>
                      <td className="py-3 pr-3 font-semibold text-[#50565E]">{site.linkedSessions}</td>
                      <td className="py-3 pr-3 font-semibold text-[#50565E]">{site.quotaUsed}</td>
                      <td className="py-3 pr-3 font-semibold text-[#50565E]">{site.participations}</td>
                      <td className="py-3"><SiteStatus status={site.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="flex flex-col gap-4">
            <section className="rounded-[16px] border border-[#E5E2DC] bg-white p-4">
              <h3 className="text-sm font-bold text-[#2F343B]">Add site</h3>
              <p className="mt-0.5 text-[11px] text-[#7A8088]">Quick entry for a new operational site.</p>

              <div className="mt-3 space-y-2.5">
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-[#50565E]">Site name</label>
                  <input className="h-[34px] w-full rounded-[8px] border border-[#E5E2DC] bg-[#FAFAF9] px-3 text-xs outline-none" placeholder="Enter site name" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-[#50565E]">Site code</label>
                  <input className="h-[34px] w-full rounded-[8px] border border-[#E5E2DC] bg-[#FAFAF9] px-3 text-xs outline-none" placeholder="e.g. ALG-14" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-[#50565E]">City</label>
                  <input className="h-[34px] w-full rounded-[8px] border border-[#E5E2DC] bg-[#FAFAF9] px-3 text-xs outline-none" placeholder="Select or type city" />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-[#50565E]">Status</label>
                  <select className="h-[34px] w-full rounded-[8px] border border-[#E5E2DC] bg-[#FAFAF9] px-3 text-xs outline-none">
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Review needed</option>
                  </select>
                </div>
                <button className="mt-1 inline-flex h-[34px] w-full items-center justify-center gap-1.5 rounded-[8px] bg-[#ED8D31] text-xs font-semibold text-white hover:bg-[#d47d29]">
                  + Create Site
                </button>
              </div>
            </section>

            <section className="rounded-[16px] border border-[#E5E2DC] bg-white p-4">
              <h3 className="text-sm font-bold text-[#2F343B]">Usage insights</h3>
              <p className="mt-0.5 text-[11px] text-[#7A8088]">Operational highlights to support quota planning.</p>

              <div className="mt-3 space-y-2">
                <InsightRow label="Most used site" value="HM-01" highlight />
                <InsightRow label="Unused repository sites" value="5" />
                <InsightRow label="Pending review" value="2" />
              </div>

              <div className="mt-3 rounded-[8px] border border-[#FDDCB5] bg-[#FFF6EB] px-3 py-2.5 text-[11px] leading-[155%] text-[#B66A15]">
                View usage opens a detailed site view with the sessions currently linked to the selected site and the allocation history attached to it.
              </div>
            </section>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
