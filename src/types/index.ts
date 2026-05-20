export type ActiveView = 'home' | 'saisie' | 'planning' | 'saisie-form' | 'saisie-anomalies';

export interface Operation {
  n: number;
  ref: string;
  cpt: string;
  lieu: string;
  type: string;
  lib: string;
  mt: string;
  st: string;
  stc: string;
  doc: string;
  dc: string;
  idx: string;
  hl: boolean;
  agence: string;
  date: string;
}

export interface CtrlTab {
  name: string;
  ref: string;
  n: number;
  res: string;
  taux: string;
  anomalies: number;
  docs: number;
}

export interface PlanningRow {
  date: string;
  agence: string;
  agenceName: string;
  region: string;
  op: number;
  scan: string;
  scanC: string;
  status: string;
  stC: string;
  filter: string;
  ctrl: string;
}

export interface Cotation {
  label: string;
  sub: string;
  color: string;
  bg: string;
  activeBg: string;
}

export interface DashboardState {
  activeView: ActiveView;
  selectedCtrlTab: number;
  planningFilter: string;
  planningStatusSelect: string;
  sidebarOpen: boolean;
  selectedOperation: Operation | null;
  cotation: number;
  formStatut: string;
  formResultat: string;
}
