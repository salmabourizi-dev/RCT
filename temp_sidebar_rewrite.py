from pathlib import Path
path = Path('src/app/components/layout/Sidebar.tsx')
content = '''import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'wouter';
import { NavItem } from '../core';
import {
  NavIconCaisses,
  NavIconContrat,
  NavIconHome,
  NavIconPlanning,
  NavIconSettings,
} from './SidebarIcons';
import type { ActiveView, UserRole } from '../../../types';

interface SidebarProps {
  activeView: ActiveView;
  role: UserRole;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onSetView: (view: ActiveView) => void;
}

const supervisorItems: { label: string; view: ActiveView }[] = [
  { label: 'Statistiques', view: 'statistiques' },
  { label: 'Suivi Investigation des CC', view: 'suivi-investigations' },
  { label: 'Suivi DOC Non repris', view: 'suivi-docs' },
  { label: 'Supervision CC', view: 'supervision-cc' },
  { label: 'Supervision fiche DA', view: 'supervision-da' },
];

const caissesActive = (view: ActiveView) =>
  view === 'saisie' || view === 'saisie-form' || supervisorItems.some(item => item.view === view);
const tarecActive = (view: ActiveView) => view === 'saisie-anomalies';

export function Sidebar({ activeView, role, sidebarOpen, onToggleSidebar, onSetView }: SidebarProps) {
  const [location, setLocation] = useLocation();
  const [tarecOpen, setTarecOpen] = useState(() => activeView === 'saisie-anomalies');
  const isCaissesActive = caissesActive(activeView);
  const isTarecActive = tarecActive(activeView);
  const isSettingsActive = location === '/settings';

  return (
    <aside className="w-55 bg-[#F3F0F5] border-r border-[#e8ecf2] flex flex-col shrink-0">
      <nav className="flex-1 overflow-y-auto py-3">
        <NavItem
          icon={<NavIconHome />}
          label="Accueil"
          active={activeView === 'home'}
          onClick={() => onSetView('home')}
          testId="nav-home"
        />

        <div
          className={`relative flex items-center gap-3 py-2.5 pl-3 pr-2 text-[13px] cursor-pointer border-r-[3px] transition-colors ${
            isCaissesActive
              ? 'bg-[#e3ebf5] border-[#1a5fa8] text-[#1a5fa8] font-semibold'
              : 'border-transparent text-[#5c6b82] hover:bg-[#e8edf3]'
          }`}
          onClick={onToggleSidebar}
          data-testid="nav-caisses"
        >
          <NavIconCaisses />
          <span className="flex-1 leading-tight">caisses comptables</span>
          <ChevronRight
            className={`w-3.5 h-3.5 shrink-0 text-[#9aa8bc] transition-transform duration-200 ${sidebarOpen ? 'rotate-90' : ''}`}
          />
        </div>

        {sidebarOpen && (
          <div className={`${isCaissesActive ? 'bg-[#e8eef5]' : 'bg-[#eef2f6]'}`}>
            {role === 'CCO' ? (
              <div
                className={`flex items-center gap-2 py-2 pl-12 pr-3 text-[12.5px] cursor-pointer transition-colors ${
                  isCaissesActive
                    ? 'text-[#1a5fa8] font-semibold'
                    : 'text-[#5c6b82] hover:text-[#1a5fa8]'
                }`}
                onClick={() => onSetView('saisie')}
                data-testid="subnav-saisie"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a5fa8] shrink-0" />
                Saisie / Modification
              </div>
            ) : (
              supervisorItems.map(item => {
                const active = activeView === item.view;
                return (
                  <div
                    key={item.view}
                    className={`flex items-center gap-2 py-2 pl-12 pr-3 text-[12.5px] cursor-pointer transition-colors ${
                      active ? 'text-[#1a5fa8] font-semibold' : 'text-[#5c6b82] hover:text-[#1a5fa8]'
                    }`}
                    onClick={() => onSetView(item.view)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a5fa8] shrink-0" />
                    {item.label}
                  </div>
                );
              })
            )}
          </div>
        )}

        {role === 'CCO' && (
          <>
            <div
              className={`relative flex items-center gap-3 py-2.5 pl-3 pr-2 text-[13px] cursor-pointer border-r-[3px] transition-colors ${
                isTarecActive
                  ? 'bg-[#e3ebf5] border-[#1a5fa8] text-[#1a5fa8] font-semibold'
                  : 'border-transparent text-[#5c6b82] hover:bg-[#e8edf3]'
              }`}
              onClick={() => setTarecOpen(!tarecOpen)}
              data-testid="nav-tarec"
            >
              <NavIconContrat />
              <span className="flex-1 leading-tight">Contrats TAREC</span>
              <ChevronRight
                className={`w-3.5 h-3.5 shrink-0 text-[#9aa8bc] transition-transform duration-200 ${tarecOpen ? 'rotate-90' : ''}`}
              />
            </div>

            {tarecOpen && (
              <div className={`${isTarecActive ? 'bg-[#e8eef5]' : 'bg-[#eef2f6]'}`}>
                <div
                  className={`flex items-center gap-2 py-2 pl-12 pr-3 text-[12.5px] cursor-pointer transition-colors ${
                    isTarecActive
                      ? 'text-[#1a5fa8] font-semibold'
                      : 'text-[#5c6b82] hover:text-[#1a5fa8]'
                  }`}
                  onClick={() => onSetView('saisie-anomalies')}
                  data-testid="subnav-saisie-anomalies"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1a5fa8] shrink-0" />
                  Saisie des anomalies
                </div>
              </div>
            )}
          </>
        )}

        <NavItem
          icon={<NavIconPlanning />}
          label="Planning"
          active={activeView === 'planning'}
          onClick={() => onSetView('planning')}
          testId="nav-planning"
        />

        <NavItem
          icon={<NavIconSettings />}
          label="Paramètres"
          active={isSettingsActive}
          onClick={() => setLocation('/settings')}
          testId="nav-settings"
        />
      </nav>
    </aside>
  );
}
'''
path.write_text(content, encoding='utf-8')
print('rewritten')
