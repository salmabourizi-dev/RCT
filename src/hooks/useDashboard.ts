import { useDashboardContext } from '../store/contexts/DashboardContext';
import { ctrlTabs } from '../services/operations';
import { planningData } from '../services/planning';
import type { Operation } from '../types';

export function useDashboard() {
  const { state, dispatch } = useDashboardContext();

  const filteredPlanning = planningData.filter(item => {
    const filterKey = (val: string) =>
      val === 'Tous' ? true :
      val === 'En cours' ? item.filter === 'encours' :
      val === 'À traiter' ? item.filter === 'atraiter' :
      val === 'Déjà traité' ? item.filter === 'dejatraite' : true;

    return filterKey(state.planningFilter) && filterKey(state.planningStatusSelect);
  });

  const planningCounts: Record<string, number> = {
    'Tous': planningData.length,
    'À traiter': planningData.filter(x => x.filter === 'atraiter').length,
    'En cours': planningData.filter(x => x.filter === 'encours').length,
    'Déjà traité': planningData.filter(x => x.filter === 'dejatraite').length,
  };

  function openEditForm(op: Operation) {
    dispatch({ type: 'OPEN_EDIT_FORM', payload: op });
  }

  function goToPlanningCtrl(ctrl: string) {
    const idx = ctrlTabs.findIndex(t => t.ref === ctrl);
    dispatch({ type: 'GO_TO_PLANNING_CTRL', payload: { ctrlIdx: idx >= 0 ? idx : 0 } });
  }

  return {
    ...state,
    dispatch,
    filteredPlanning,
    planningCounts,
    openEditForm,
    goToPlanningCtrl,
  };
}
