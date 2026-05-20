import type { ReactNode } from 'react';

export function NavItem({
  icon,
  label,
  active,
  onClick,
  testId,
  className = '',
}: {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  testId?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 py-2.5 pl-3 pr-2 text-[13px] cursor-pointer border-r-[3px] transition-colors ${className} ${
        active
          ? 'bg-[#e3ebf5] border-[#1a5fa8] text-[#1a5fa8] font-semibold'
          : 'border-transparent text-[#5c6b82] hover:bg-[#e8edf3]'
      }`}
      onClick={onClick}
      data-testid={testId}
    >
      {icon}
      <span className="flex-1 leading-tight">{label}</span>
    </div>
  );
}

export function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] text-[#999] font-semibold uppercase tracking-wide">{label}</span>
      <span className="text-[12.5px] text-[#1a2340] font-semibold">{value}</span>
    </div>
  );
}

export function StatField({
  label, value, valueColor, valueLarge,
}: {
  label: string;
  value: string;
  valueColor?: string;
  valueLarge?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10.5px] text-[#999] font-semibold uppercase tracking-wide">{label}</span>
      <span
        className={`font-medium ${valueLarge ? 'text-[15px] font-bold' : 'text-[12.5px]'}`}
        style={{ color: valueColor || '#222' }}
      >
        {value}
      </span>
    </div>
  );
}

export function FilterInput({
  label, placeholder, maxWidth,
}: {
  label: string;
  placeholder: string;
  maxWidth: string;
}) {
  return (
    <div className="flex flex-col gap-1 flex-1" style={{ minWidth: '90px', maxWidth }}>
      <label className="text-[10.5px] text-[#888] font-semibold uppercase tracking-wide">{label}</label>
      <input
        className="border border-[#d5d9ed] rounded-lg px-2.5 py-[7px] text-[12.5px] text-[#333] bg-[#f9fafc] outline-none w-full focus:border-[#1a5fa8] transition-colors"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
}

export function KpiCard({
  label, value, color, sub,
}: {
  label: string;
  value: string;
  color: string;
  sub: string;
}) {
  return (
    <div className="bg-white border border-[#e2e6f0] rounded-xl p-3.5 shadow-sm">
      <div className="text-[10.5px] text-[#999] font-semibold uppercase tracking-wide mb-1.5">{label}</div>
      <div className="text-[22px] font-bold" style={{ color }}>{value}</div>
      <div className="text-[11px] text-[#bbb] mt-0.5">{sub}</div>
    </div>
  );
}
