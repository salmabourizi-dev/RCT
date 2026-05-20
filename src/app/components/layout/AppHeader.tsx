import { Bell } from 'lucide-react';
import cdmLogo from '@assets/cdm.png';

const SIDEBAR_WIDTH = 220;

export function AppHeader() {
  return (
    <header className="h-[72px] shrink-0 z-20 flex border-b border-[#e4e8f0]">
      <div
        className="flex items-center gap-1 px-3 py-2 bg-[#F3F0F5] border-r border-[#e4e8f0] shrink-0 overflow-hidden"
        style={{ width: SIDEBAR_WIDTH }}
      >
        <div className="flex-1 flex items-center min-w-0 h-full">
          <img
            src={cdmLogo}
            alt="Crédit du Maroc"
            className="w-auto max-w-[170px] h-full max-h-[36px] object-contain"
          />
        </div>
        <button
          type="button"
          className="w-8 h-8 flex flex-col justify-center items-end gap-[5px] cursor-pointer shrink-0 rounded hover:bg-[#eef1f5] transition-colors pr-0.5"
          aria-label="Menu"
          data-testid="button-menu"
        >
          <span className="block w-[17px] h-[1.5px] bg-[#1a5fa8] rounded" />
          <span className="block w-[13px] h-[1.5px] bg-[#1a5fa8] rounded" />
          <span className="block w-[17px] h-[1.5px] bg-[#1a5fa8] rounded" />
        </button>
      </div>

      <div
        className="flex-1 flex items-center px-5 min-w-0"
        style={{
          background: '#F3F0F5',
        }}
      >
        <span className="text-[14px] text-[#4a5568] font-normal">Recherche</span>

        <div className="flex items-center gap-3 ml-auto">
          <button
            type="button"
            className="relative flex items-center justify-center w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Notifications"
          >
            <Bell className="w-[20px] h-[20px] text-[#8eb8dc]" strokeWidth={1.75} />
            <span className="absolute bottom-0.5 right-0 w-2 h-2 bg-[#e8174a] rounded-full border border-white" />
          </button>
          <div className="w-9 h-9 rounded-full bg-[#a8b0bc] text-white text-[13px] font-semibold flex items-center justify-center tracking-wide shrink-0">
            SA
          </div>
        </div>
      </div>
    </header>
  );
}
