import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="ml-auto w-[420px] bg-white h-full shadow-2xl flex flex-col relative z-10">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e2e6f0]">
          <h2 className="text-[14px] font-semibold text-[#1a2340]">{title}</h2>
          <button className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-[#f0f2f8] transition-colors" onClick={onClose}>
            <X className="w-4 h-4 text-[#888]" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}
