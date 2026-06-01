import { AppLayout } from '../app/components/layout/AppLayout';
import { DashboardFeature } from '../features/dashboard';
import { HomeFeature } from '../features/home';
import { SaisieFormFeature } from '../features/saisie';
import { PlanningFeature } from '../features/planning';
import { SaisieAnomaliesFeature } from '../features/saisie-anomalies';
import { SupervisorFeature } from '../features/supervisor';
import { useDashboard } from '../hooks/useDashboard';
import type { ActiveView } from '../types';

export default function DashboardPage() {
  const { activeView, sidebarOpen, role, dispatch } = useDashboard();

  return (
    <AppLayout
      activeView={activeView}
      role={role}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
      onSetView={(view: ActiveView) => dispatch({ type: 'SET_VIEW', payload: view })}
    >
      {activeView === 'home' && <HomeFeature />}
      {activeView === 'saisie' && <DashboardFeature />}
      {activeView === 'saisie-form' && <SaisieFormFeature />}
      {activeView === 'planning' && <PlanningFeature />}
      {activeView === 'saisie-anomalies' && <SaisieAnomaliesFeature />}
      {['statistiques', 'suivi-investigations', 'suivi-docs', 'supervision-cc', 'supervision-da'].includes(activeView) && (
        <SupervisorFeature view={activeView} />
      )}
    </AppLayout>
  );
}
