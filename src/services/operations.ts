import type { CtrlTab, Operation, Cotation } from '../types';

export const ctrlTabs: CtrlTab[] = [
  { name: "Contrôle des virements validés en agence", ref: "CT21R_2.1", n: 8, res: "OK", taux: "100,00%", anomalies: 0, docs: 8 },
  { name: "Contrôle des opérations de change manuel (Vente de devises)", ref: "CT21R_2.2", n: 0, res: "OK", taux: "100,00%", anomalies: 0, docs: 0 },
  { name: "Contrôle des retraits en espèces au moyen d'un bordereau", ref: "CT21R_2.3", n: 3, res: "OK", taux: "96,00%", anomalies: 0, docs: 3 },
  { name: "Contrôles des opérations Accréditifs et CdmExpress", ref: "CT21R_2.4", n: 1, res: "OK", taux: "100,00%", anomalies: 0, docs: 1 },
  { name: "Contrôle des retraits en espèces Chèque Client", ref: "CT21R_2.5", n: 3, res: "OK", taux: "98,00%", anomalies: 0, docs: 3 },
  { name: "Contrôles des retraits Accréditifs et CdmExpress", ref: "CT21R_2.6", n: 1, res: "OK", taux: "100,00%", anomalies: 0, docs: 1 },
  { name: "Contrôle des retraits compte sur carnet (CSC)", ref: "CT21R_2.7", n: 0, res: "OK", taux: "100,00%", anomalies: 0, docs: 0 },
];

export const operations: Operation[] = [
  { n: 1, ref: "01188252363821973", cpt: "02164000001100102482651", lieu: "011", type: "58W30", lib: "PAIEMENT FATOURATI PAR VIREMENT", mt: "2 093", st: "Traitée", stc: "bg-[#e8f5e9] text-[#2e7d32]", doc: "OUI", dc: "bg-[#e3eefb] text-[#1a5fa8]", idx: "—", hl: true, agence: "011 – TANGER CORNICHE", date: "29/12/2025" },
  { n: 2, ref: "01188252363823223", cpt: "02164000001100102482651", lieu: "011", type: "58W30", lib: "PAIEMENT FATOURATI PAR VIREMENT", mt: "2 003", st: "Traitée", stc: "bg-[#e8f5e9] text-[#2e7d32]", doc: "OUI", dc: "bg-[#e3eefb] text-[#1a5fa8]", idx: "—", hl: false, agence: "011 – TANGER CORNICHE", date: "29/12/2025" },
  { n: 3, ref: "01188252363823323", cpt: "02164000001100102482651", lieu: "011", type: "58W30", lib: "PAIEMENT FATOURATI PAR VIREMENT", mt: "1 913", st: "Traitée", stc: "bg-[#e8f5e9] text-[#2e7d32]", doc: "OUI", dc: "bg-[#e3eefb] text-[#1a5fa8]", idx: "—", hl: false, agence: "011 – TANGER CORNICHE", date: "29/12/2025" },
  { n: 4, ref: "01199253635754846", cpt: "02164000001103005059920", lieu: "011", type: "70V25", lib: "VIREMENT INTERBANCAIRE", mt: "280 000", st: "En attente", stc: "bg-[#fff3e0] text-[#e65100]", doc: "NON", dc: "bg-[#f0f2f4] text-[#666]", idx: "1,36", hl: false, agence: "011 – TANGER CORNICHE", date: "29/12/2025" },
  { n: 5, ref: "01199253637658835", cpt: "02164000001103005059920", lieu: "011", type: "70V25", lib: "VIREMENT INTERBANCAIRE", mt: "292 000", st: "Traitée", stc: "bg-[#e8f5e9] text-[#2e7d32]", doc: "NON", dc: "bg-[#f0f2f4] text-[#666]", idx: "1,36", hl: false, agence: "011 – TANGER CORNICHE", date: "29/12/2025" },
  { n: 6, ref: "01139253636364441", cpt: "02164000001107005075434", lieu: "011", type: "70VT3", lib: "VIREMENT EMIS VERS AUTRE BANQUE", mt: "500 000", st: "En attente", stc: "bg-[#fff3e0] text-[#e65100]", doc: "NON", dc: "bg-[#f0f2f4] text-[#666]", idx: "0,57", hl: false, agence: "011 – TANGER CORNICHE", date: "29/12/2025" },
];

export const COTATIONS: Cotation[] = [
  { label: "Conforme", sub: "", color: "#2e7d32", bg: "#e8f5e9", activeBg: "#2e7d32" },
  { label: "Niveau 1", sub: "Problème procédure", color: "#e65100", bg: "#fff3e0", activeBg: "#e65100" },
  { label: "Niveau 2", sub: "Suspicion fraude", color: "#b45309", bg: "#fffbeb", activeBg: "#b45309" },
  { label: "Niveau 3", sub: "Fraude avérée", color: "#c62828", bg: "#fdeaea", activeBg: "#c62828" },
];
