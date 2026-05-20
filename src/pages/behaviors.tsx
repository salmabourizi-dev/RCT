import { AppLayout } from '../app/components/layout/AppLayout';
import { SampleBehaviorsFeature } from '../features/sampleBehaviors';
import { useDashboard } from '../hooks/useDashboard';
import type { ActiveView } from '../types';

export default function BehaviorsPage() {
  const { activeView, sidebarOpen, dispatch } = useDashboard();

  return (
    <AppLayout
      activeView={activeView}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
      onSetView={(view: ActiveView) => dispatch({ type: 'SET_VIEW', payload: view })}
    >
      <SampleBehaviorsFeature />
    </AppLayout>
  );
}
