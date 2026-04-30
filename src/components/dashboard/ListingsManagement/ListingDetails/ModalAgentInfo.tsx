import React from "react";
import type { ListingDetail } from "../../../../types/listing.types";

interface Props { agent: ListingDetail["agent"] }

const ModalAgentInfo: React.FC<Props> = ({ agent }) => (
  <div className="mb-4">
    <h3 className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-900 mb-3">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
      Agent Information
    </h3>
    <div className="border border-gray-100 rounded-xl p-4">
      <p className="text-lg font-bold text-gray-900">{agent.name}</p>
      <p className="text-md text-gray-400 mb-3">{agent.agency}</p>
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: "phone", val: agent.phone },
          { icon: "mail",  val: agent.email },
        ].map(c => (
          <div key={c.icon} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-md text-gray-700">
            {c.icon === "phone"
              ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.21 3.18 2 2 0 0 1 3.22 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.09a16 16 0 0 0 6 6l.56-.56a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/></svg>
              : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            }
            <span className="truncate">{c.val}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ModalAgentInfo;