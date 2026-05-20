import type { PlanningRow } from '../types';

export const planningData: PlanningRow[] = [
  { date: "13/05/2026", agence: "AG-011", agenceName: "Tanger Corniche", region: "Tanger-Tétouan", op: 16, scan: "100%", scanC: "bg-[#e8f5e9] text-[#2e7d32]", status: "À traiter", stC: "bg-[#fff3e0] text-[#e65100]", filter: "atraiter", ctrl: "CT21R_2.1" },
  { date: "13/05/2026", agence: "AG-0124", agenceName: "Casablanca M.Sultan", region: "Casablanca-Settat", op: 24, scan: "92%", scanC: "bg-[#e8f5e9] text-[#2e7d32]", status: "En cours", stC: "bg-[#e3eefb] text-[#1a5fa8]", filter: "encours", ctrl: "CT21R_2.3" },
  { date: "13/05/2026", agence: "AG-0315", agenceName: "Rabat Agdal", region: "Rabat-Salé-Kénitra", op: 28, scan: "90%", scanC: "bg-[#e8f5e9] text-[#2e7d32]", status: "Déjà traité", stC: "bg-[#e8f5e9] text-[#2e7d32]", filter: "dejatraite", ctrl: "CT21R_2.6" },
  { date: "13/05/2026", agence: "AG-0450", agenceName: "Casablanca Maarif", region: "Casablanca-Settat", op: 22, scan: "85%", scanC: "bg-[#fff3e0] text-[#e65100]", status: "À traiter", stC: "bg-[#fff3e0] text-[#e65100]", filter: "atraiter", ctrl: "CT21R_2.7" },
  { date: "13/05/2026", agence: "AG-0520", agenceName: "Marrakech Médina", region: "Marrakech-Safi", op: 30, scan: "78%", scanC: "bg-[#e3eefb] text-[#1a5fa8]", status: "En cours", stC: "bg-[#e3eefb] text-[#1a5fa8]", filter: "encours", ctrl: "CT21R_2.8" },
  { date: "13/05/2026", agence: "AG-0680", agenceName: "Agadir Souk", region: "Souss-Massa", op: 25, scan: "81%", scanC: "bg-[#e8f5e9] text-[#2e7d32]", status: "Déjà traité", stC: "bg-[#e8f5e9] text-[#2e7d32]", filter: "dejatraite", ctrl: "CT21R_2.9" },
  { date: "13/05/2026", agence: "AG-0745", agenceName: "Tétouan Médina", region: "Tanger-Tétouan", op: 55, scan: "95%", scanC: "bg-[#fff3e0] text-[#e65100]", status: "À traiter", stC: "bg-[#fff3e0] text-[#e65100]", filter: "atraiter", ctrl: "CT21R_2.10" },
  { date: "12/05/2026", agence: "AG-0312", agenceName: "Rabat Agdal", region: "Rabat-Salé-Kénitra", op: 18, scan: "88%", scanC: "bg-[#e8f5e9] text-[#2e7d32]", status: "Déjà traité", stC: "bg-[#e8f5e9] text-[#2e7d32]", filter: "dejatraite", ctrl: "CT21R_2.2" },
  { date: "11/05/2026", agence: "AG-0087", agenceName: "Marrakech Guéliz", region: "Marrakech-Safi", op: 31, scan: "74%", scanC: "bg-[#fdeaea] text-[#c62828]", status: "Non démarré", stC: "bg-[#f0f2f4] text-[#666]", filter: "nondemarre", ctrl: "CT21R_2.5" },
  { date: "10/05/2026", agence: "AG-0205", agenceName: "Fès Ville Nouvelle", region: "Fès-Meknès", op: 12, scan: "61%", scanC: "bg-[#e8f5e9] text-[#2e7d32]", status: "Déjà traité", stC: "bg-[#e8f5e9] text-[#2e7d32]", filter: "dejatraite", ctrl: "CT21R_2.4" },
];

export const PLANNING_FILTERS = ['Tous', 'À traiter', 'En cours', 'Déjà traité'] as const;

export type PlanningFilter = typeof PLANNING_FILTERS[number];
