import { AppLayout } from '../app/components/layout/AppLayout';
import { TiersFeature } from '../features/tiers';
import { useDashboard } from '../hooks/useDashboard';
import type { ActiveView } from '../types';

export default function TiersPage() {
  const { activeView, sidebarOpen, dispatch } = useDashboard();

  return (
    <AppLayout
      activeView={activeView}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
      onSetView={(view: ActiveView) => dispatch({ type: 'SET_VIEW', payload: view })}
    >
      <TiersFeature />
    </AppLayout>
  );
}
