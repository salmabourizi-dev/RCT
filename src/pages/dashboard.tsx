import { AppLayout } from '../app/components/layout/AppLayout';
import { DashboardFeature } from '../features/dashboard';
import { HomeFeature } from '../features/home';
import { SaisieFormFeature } from '../features/saisie';
import { PlanningFeature } from '../features/planning';
import { SaisieAnomaliesFeature } from '../features/saisie-anomalies';
import { useDashboard } from '../hooks/useDashboard';
import type { ActiveView } from '../types';

export default function DashboardPage() {
  const { activeView, sidebarOpen, dispatch } = useDashboard();

  return (
    <AppLayout
      activeView={activeView}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
      onSetView={(view: ActiveView) => dispatch({ type: 'SET_VIEW', payload: view })}
    >
      {activeView === 'home' && <HomeFeature />}
      {activeView === 'saisie' && <DashboardFeature />}
      {activeView === 'saisie-form' && <SaisieFormFeature />}
      {activeView === 'planning' && <PlanningFeature />}
      {activeView === 'saisie-anomalies' && <SaisieAnomaliesFeature />}
    </AppLayout>
  );
}
