import { createContext, useContext, useReducer, type ReactNode } from 'react';
import { dashboardReducer, initialState, type DashboardAction } from '../slices/dashboardSlice';
import type { DashboardState } from '../../types';

interface DashboardContextValue {
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);
  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboardContext must be used inside DashboardProvider');
  return ctx;
}
