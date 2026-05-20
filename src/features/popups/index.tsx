import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface PopupProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onConfirm?: () => void;
  confirmLabel?: string;
}

export function Popup({ open, onClose, title, children, onConfirm, confirmLabel = 'Confirmer' }: PopupProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 relative z-10 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e2e6f0]">
          <h2 className="text-[14px] font-semibold text-[#1a2340]">{title}</h2>
          <button className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-[#f0f2f8] transition-colors" onClick={onClose}>
            <X className="w-4 h-4 text-[#888]" />
          </button>
        </div>
        <div className="p-5">{children}</div>
        {onConfirm && (
          <div className="flex justify-end gap-2 px-5 py-4 border-t border-[#e2e6f0] bg-[#f8f9fd]">
            <button className="px-4 py-2 rounded-lg border border-[#d5d9ed] bg-white text-[#555] text-[12.5px] hover:bg-[#f0f2f8] transition-colors" onClick={onClose}>
              Annuler
            </button>
            <button className="px-4 py-2 rounded-lg bg-[#1a5fa8] text-white text-[12.5px] font-semibold hover:bg-[#154c86] transition-colors" onClick={onConfirm}>
              {confirmLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
