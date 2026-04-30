import React from "react";

interface Props { features: string[] }

const ModalPropertyFeatures: React.FC<Props> = ({ features }) => (
  <div className="mb-4">
    <h3 className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-900 mb-3">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      Property Features
    </h3>
    <div className="grid grid-cols-2 gap-1.5">
      {features?.map(f => (
        <div key={f} className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2 text-[12.5px] text-green-800">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          {f}
        </div>
      ))}
    </div>
  </div>
);

export default ModalPropertyFeatures;