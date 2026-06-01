import { AppLayout } from '../app/components/layout/AppLayout';
import { SettingsFeature } from '../features/settings';
import { useDashboard } from '../hooks/useDashboard';
import type { ActiveView } from '../types';

export default function SettingsPage() {
  const { activeView, sidebarOpen, role, dispatch } = useDashboard();

  return (
    <AppLayout
      activeView={activeView}
      role={role}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
      onSetView={(view: ActiveView) => dispatch({ type: 'SET_VIEW', payload: view })}
    >
      <SettingsFeature />
    </AppLayout>
  );
}
