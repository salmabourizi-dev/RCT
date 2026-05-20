import type { ReactNode } from 'react';
import { AppHeader } from './AppHeader';
import { Sidebar } from './Sidebar';
import cdmLogo from '@assets/cdm.png';
import type { ActiveView } from '../../../types';

interface AppLayoutProps {
  children: ReactNode;
  activeView: ActiveView;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onSetView: (view: ActiveView) => void;
}

export function AppLayout({
  children,
  activeView,
  sidebarOpen,
  onToggleSidebar,
  onSetView,
}: AppLayoutProps) {
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden font-sans" style={{ background: '#f0f2f8' }}>
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeView={activeView}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={onToggleSidebar}
          onSetView={onSetView}
        />
        <div
          className="flex-1 flex flex-col overflow-hidden"
          style={{ background: 'linear-gradient(90deg, #f5f9fc 0%, #faf8fb 55%, #fdf5f8 100%)' }}
        >
          <div className="flex-1 overflow-y-auto p-5">
            {children}
          </div>
          <div className="px-4 py-2.5 border-t border-[#ebebf0] shrink-0 bg-white/60 backdrop-blur-sm flex items-center justify-center gap-2 opacity-50">
            <img src={cdmLogo} alt="CDM" className="h-4 w-auto object-contain grayscale" />
            <span className="text-[10px] text-[#bbb]">Crédit du Maroc © 2024 v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
