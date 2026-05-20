import type { ActiveView, DashboardState, Operation } from '../../types';

export type DashboardAction =
  | { type: 'SET_VIEW'; payload: ActiveView }
  | { type: 'SET_CTRL_TAB'; payload: number }
  | { type: 'SET_PLANNING_FILTER'; payload: string }
  | { type: 'SET_PLANNING_STATUS_SELECT'; payload: string }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR'; payload: boolean }
  | { type: 'SET_SELECTED_OPERATION'; payload: Operation | null }
  | { type: 'SET_COTATION'; payload: number }
  | { type: 'SET_FORM_STATUT'; payload: string }
  | { type: 'SET_FORM_RESULTAT'; payload: string }
  | { type: 'OPEN_EDIT_FORM'; payload: Operation }
  | { type: 'GO_TO_PLANNING_CTRL'; payload: { ctrlIdx: number } };

export const initialState: DashboardState = {
  activeView: 'home',
  selectedCtrlTab: 0,
  planningFilter: 'Tous',
  planningStatusSelect: 'Tous',
  sidebarOpen: true,
  selectedOperation: null,
  cotation: 0,
  formStatut: 'Signée',
  formResultat: 'OK',
};

export function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, activeView: action.payload };
    case 'SET_CTRL_TAB':
      return { ...state, selectedCtrlTab: action.payload };
    case 'SET_PLANNING_FILTER':
      return { ...state, planningFilter: action.payload };
    case 'SET_PLANNING_STATUS_SELECT':
      return { ...state, planningStatusSelect: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'SET_SIDEBAR':
      return { ...state, sidebarOpen: action.payload };
    case 'SET_SELECTED_OPERATION':
      return { ...state, selectedOperation: action.payload };
    case 'SET_COTATION':
      return { ...state, cotation: action.payload };
    case 'SET_FORM_STATUT':
      return { ...state, formStatut: action.payload };
    case 'SET_FORM_RESULTAT':
      return { ...state, formResultat: action.payload };
    case 'OPEN_EDIT_FORM':
      return {
        ...state,
        selectedOperation: action.payload,
        cotation: 0,
        formStatut: 'Signée',
        formResultat: 'OK',
        activeView: 'saisie-form',
      };
    case 'GO_TO_PLANNING_CTRL':
      return {
        ...state,
        selectedCtrlTab: action.payload.ctrlIdx,
        activeView: 'saisie',
        sidebarOpen: true,
      };
    default:
      return state;
  }
}
