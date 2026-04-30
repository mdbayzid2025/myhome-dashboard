import React from "react";

interface Props { listing: any }

const ModalPropertySpecs: React.FC<Props> = ({ listing: l }) => (
  <div className="mb-4">
    <h3 className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-900 mb-3">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
      Property Specifications
    </h3>
    {/* Spec boxes */}
    <div className="grid grid-cols-4 border border-gray-100 rounded-xl overflow-hidden mb-3">
      {[
        { val: l.beds, label: "Bedrooms" },
        { val: l.baths, label: "Bathrooms" },
        { val: 1, label: "Receptions" },
        { val: 200, label: "sq ft" },
      ].map((s, i) => (
        <div key={s.label} className={`text-center py-3.5 ${i < 3 ? "border-r border-gray-100" : ""}`}>
          <p className="text-2xl font-bold text-gray-900 mb-1">{s.val}</p>
          <p className="text-[11px] text-gray-400">{s.label}</p>
        </div>
      ))}
    </div>
    {/* Meta table */}
    <table className="w-full  text-md">
      <tbody className="grid grid-cols-2 gap-2">
        {[
          { key: "Council Tax", val: 'Band D' },
          { key: "Tenure", val: 'Freehold' },
          {
            key: "EPC Rating", val: <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-lg font-medium px-2 py-0.5 rounded-md"
            >5</span>
          },
          { key: "Available From", val: '01/03/2024' },
        ].map(row => (
          <tr key={row.key} className="border-b border-gray-50 last:border-0 flex justify-between items-center">
            <td className="py-2.5 text-gray-500">{row.key}</td>
            <td className="py-2.5 font-semibold text-gray-900 text-right">{row.val}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ModalPropertySpecs;