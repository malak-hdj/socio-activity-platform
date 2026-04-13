import { useState } from "react";
import AdminLayout from "../../components/AdminLayout";

const activities = ["Excursion DjDjanet", "Vacances nature & détente", "Annual Corporate Retreat"];
const sessions = ["Late Allocation Session (Sep 2024)", "Main Session (Sep 2024)", "Reallocation Session"];

const recentDraws = [
  {
    activity: "Excursion DjDjanet",
    session: "Session Autumn 2024",
    executedOn: "Sep 22, 2024, 09:14 AM",
    totalDrawn: "50 / 50",
    status: "Draft",
    action: "View Results",
    secondary: "Publish",
  },
  {
    activity: "Vacances nature & détente",
    session: "Family Session A",
    executedOn: "Sep 20, 2024, 14:30 PM",
    totalDrawn: "120 / 120",
    status: "Published",
    action: "View Results",
  },
  {
    activity: "Thermal stay - Hammam Righa",
    session: "Reallocation Session",
    executedOn: "Sep 18, 2024, 10:05 AM",
    totalDrawn: "15 / 15",
    status: "Published",
    action: "View Results",
  },
  {
    activity: "Annual Corporate Retreat",
    session: "Main Session",
    executedOn: "Sep 10, 2024, 11:20 AM",
    totalDrawn: "300 / 300",
    status: "Published",
    action: "View Results",
  },
];

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${checked ? "bg-[#ED8D31]" : "bg-[#E5E2DC]"}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-1"}`} />
    </button>
  );
}

function StatusBadge({ status }) {
  if (status === "Draft") {
    return <span className="rounded-full bg-[#FFF3E8] px-2.5 py-1 text-[10px] font-semibold text-[#B66A15]">Draft</span>;
  }
  return <span className="rounded-full bg-[#E9F7EF] px-2.5 py-1 text-[10px] font-semibold text-[#2F8C57]">Published</span>;
}

export default function LaunchDraw() {
  const [excludeRecent, setExcludeRecent] = useState(true);
  const [waitingList, setWaitingList] = useState(true);
  const [prioritizeChildren, setPrioritizeChildren] = useState(false);

  return (
    <AdminLayout>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-[#2F343B] text-[30px] font-extrabold tracking-[-0.5px]">Launch Draw</h1>
          <p className="mt-1 text-sm text-[#7A8088]">
            Select an activity and session to execute the random draw algorithm based on defined quotas and constraints.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <section className="xl:col-span-2 rounded-[18px] border border-[#E5E2DC] bg-white">
            <div className="border-b border-[#F0EFED] px-5 py-4">
              <h2 className="text-sm font-bold text-[#2F343B]">Draw Configuration</h2>
              <p className="mt-0.5 text-[11px] text-[#7A8088]">Choose the target activity and review the applied rules before execution.</p>
            </div>

            <div className="space-y-4 px-5 py-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#50565E]">Activity</label>
                <select className="h-[38px] w-full rounded-[8px] border border-[#E5E2DC] bg-[#FAFAF9] px-3 text-sm text-[#2F343B] outline-none">
                  {activities.map((activity) => (
                    <option key={activity} value={activity}>{activity}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-[#50565E]">Session</label>
                <select className="h-[38px] w-full rounded-[8px] border border-[#E5E2DC] bg-[#FAFAF9] px-3 text-sm text-[#2F343B] outline-none">
                  {sessions.map((session) => (
                    <option key={session} value={session}>{session}</option>
                  ))}
                </select>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold text-[#50565E]">Draw Rules & Constraints</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-[10px] border border-[#E5E2DC] bg-[#FAFAF9] px-3 py-2.5">
                    <div>
                      <p className="text-xs font-semibold text-[#2F343B]">Exclude recent participants</p>
                      <p className="text-[10px] text-[#7A8088]">Automatically exclude employees who participated in a similar activity within the last 12 months.</p>
                    </div>
                    <Toggle checked={excludeRecent} onChange={() => setExcludeRecent((prev) => !prev)} />
                  </div>

                  <div className="flex items-center justify-between rounded-[10px] border border-[#E5E2DC] bg-[#FAFAF9] px-3 py-2.5">
                    <div>
                      <p className="text-xs font-semibold text-[#2F343B]">Generate waiting list</p>
                      <p className="text-[10px] text-[#7A8088]">Draw additional participants to build a waiting list (typically 20% of total quota).</p>
                    </div>
                    <Toggle checked={waitingList} onChange={() => setWaitingList((prev) => !prev)} />
                  </div>

                  <div className="flex items-center justify-between rounded-[10px] border border-[#E5E2DC] bg-[#FAFAF9] px-3 py-2.5">
                    <div>
                      <p className="text-xs font-semibold text-[#2F343B]">Prioritize employees with children</p>
                      <p className="text-[10px] text-[#7A8088]">Increase the selection weight for employees registered with family dependents.</p>
                    </div>
                    <Toggle checked={prioritizeChildren} onChange={() => setPrioritizeChildren((prev) => !prev)} />
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <button className="inline-flex h-[36px] items-center gap-1.5 rounded-[8px] bg-[#ED8D31] px-4 text-sm font-semibold text-white hover:bg-[#d47d29]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3v18M3 12h18" />
                  </svg>
                  Execute Algorithm
                </button>
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-4">
            <section className="rounded-[18px] border border-[#E5E2DC] bg-white p-4">
              <h3 className="text-sm font-bold text-[#2F343B]">Session Context</h3>
              <p className="mt-0.5 text-[11px] text-[#7A8088]">Pre-draw statistics for the selected session.</p>

              <div className="mt-3 space-y-2 text-xs">
                <div className="flex items-center justify-between rounded-[8px] border border-[#ECEAE4] bg-[#FAFAF9] px-3 py-2">
                  <span className="text-[#7A8088]">Total Quota (Capacity)</span>
                  <span className="font-semibold text-[#2F343B]">50 places</span>
                </div>
                <div className="flex items-center justify-between rounded-[8px] border border-[#ECEAE4] bg-[#FAFAF9] px-3 py-2">
                  <span className="text-[#7A8088]">Total Registrations</span>
                  <span className="font-semibold text-[#2F343B]">142 applicants</span>
                </div>
                <div className="flex items-center justify-between rounded-[8px] border border-[#ECEAE4] bg-[#FAFAF9] px-3 py-2">
                  <span className="text-[#7A8088]">Eligible for Draw</span>
                  <span className="font-semibold text-[#2F343B]">128 applicants</span>
                </div>
                <div className="flex items-center justify-between rounded-[8px] border border-[#ECEAE4] bg-[#FAFAF9] px-3 py-2">
                  <span className="text-[#7A8088]">Selection Rate</span>
                  <span className="font-semibold text-[#2F343B]">~39%</span>
                </div>
              </div>

              <div className="mt-3 rounded-[8px] border border-[#FDDCB5] bg-[#FFF6EB] px-3 py-2.5 text-[11px] leading-[155%] text-[#B66A15]">
                This session is heavily overbooked. The algorithm will strictly apply the quotas. Please review the constraints before executing.
              </div>
            </section>

            <section className="rounded-[18px] border border-[#E5E2DC] bg-white p-4">
              <h3 className="text-sm font-bold text-[#2F343B]">Draw Guidelines</h3>
              <p className="mt-0.5 text-[11px] text-[#7A8088]">Best practices before running the algorithm.</p>
              <div className="mt-3 space-y-2 text-[11px] leading-[160%] text-[#7A8088]">
                <p>Ensure all manual registrations and withdrawals are processed before launching.</p>
                <p>Verify the total capacity and quota distribution for the session.</p>
                <p>Once executed, results are generated in "Draft" state and must be manually published to be visible to employees.</p>
                <p>A draw can be reset and re-executed as long as it remains in the draft state.</p>
              </div>
            </section>
          </div>
        </div>

        <section className="rounded-[18px] border border-[#E5E2DC] bg-white">
          <div className="flex items-center justify-between border-b border-[#F0EFED] px-5 py-4">
            <div>
              <h2 className="text-sm font-bold text-[#2F343B]">Recent Draws</h2>
              <p className="mt-0.5 text-[11px] text-[#7A8088]">Latest algorithm executions across all activities and sessions.</p>
            </div>
            <button className="h-[28px] rounded-full border border-[#E5E2DC] px-3 text-xs font-semibold text-[#2F343B] hover:bg-[#F7F7F5]">
              View full history
            </button>
          </div>

          <div className="overflow-x-auto px-5 py-3">
            <table className="min-w-full text-left text-xs">
              <thead>
                <tr className="text-[#7A8088]">
                  <th className="py-2 pr-4 font-medium">Activity</th>
                  <th className="py-2 pr-4 font-medium">Session</th>
                  <th className="py-2 pr-4 font-medium">Executed On</th>
                  <th className="py-2 pr-4 font-medium">Total Drawn</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentDraws.map((draw) => (
                  <tr key={`${draw.activity}-${draw.session}`} className="border-t border-[#F0EFED] text-[#2F343B]">
                    <td className="py-3 pr-4 font-semibold">{draw.activity}</td>
                    <td className="py-3 pr-4 text-[#7A8088]">{draw.session}</td>
                    <td className="py-3 pr-4 text-[#7A8088]">{draw.executedOn}</td>
                    <td className="py-3 pr-4">{draw.totalDrawn}</td>
                    <td className="py-3 pr-4"><StatusBadge status={draw.status} /></td>
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button className="h-[26px] rounded-[6px] border border-[#E5E2DC] px-3 text-[11px] font-semibold text-[#2F343B] hover:bg-[#F7F7F5]">
                          {draw.action}
                        </button>
                        {draw.secondary && (
                          <button className="h-[26px] rounded-[6px] bg-[#ED8D31] px-3 text-[11px] font-semibold text-white hover:bg-[#d47d29]">
                            {draw.secondary}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
