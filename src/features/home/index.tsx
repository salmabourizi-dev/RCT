import {
  ArrowRight,
  ChevronRight,
  Clipboard,
  Eye,
  HelpCircle,
  List,
  MoreHorizontal,
  Hourglass,
  CheckCircle,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  ShieldAlert,
  Layers,
  Undo2,
  BarChart3,
  Calendar,
  MapPin,
  Clock,
  ArrowUpRight,
} from 'lucide-react';
import { useDashboard } from '../../hooks/useDashboard';
import type { ActiveView } from '../../types';

// ==========================================
// CCO HOME PAGE CONFIG & COMPONENTS
// ==========================================

const ccoStatistics = [
  { label: 'Contrôles du jour', value: '18', sub: "Aujourd'hui", color: '#1a5fa8', icon: 'clipboard', bg: '#eef4ff', iconColor: '#1a5fa8' },
  { label: 'Nombre total', value: '124', sub: "d'opérations", color: '#6d28d9', icon: 'list', bg: '#f3f0ff', iconColor: '#6d28d9' },
  { label: 'Opérations à traiter', value: '62', sub: '', color: '#d97706', icon: 'hourglass', bg: '#fff7ed', iconColor: '#d97706' },
  { label: 'Opérations traitées', value: '62', sub: '', color: '#047857', icon: 'check', bg: '#ecfdf5', iconColor: '#047857' },
];

const dailyControls = [
  {
    ref: 'CTR-2024-0018',
    objet: 'Contrôle des virements > 10 000 MAD',
    agence: 'Casa Centre',
    etat: 'En cours',
    echeance: '22/05/2024',
    priorite: 'Élevée',
  },
  {
    ref: 'CTR-2024-0017',
    objet: 'Contrôle des remises de chèques',
    agence: 'Rabat Agdal',
    etat: 'À traiter',
    echeance: '23/05/2024',
    priorite: 'Moyenne',
  },
  {
    ref: 'CTR-2024-0016',
    objet: 'Contrôle des retraits espèces',
    agence: 'Marrakech Guéliz',
    etat: 'Traité',
    echeance: '21/05/2024',
    priorite: 'Faible',
  },
  {
    ref: 'CTR-2024-0015',
    objet: 'Contrôle des commissions',
    agence: 'Fès Ville Nouvelle',
    etat: 'À traiter',
    echeance: '24/05/2024',
    priorite: 'Moyenne',
  },
  {
    ref: 'CTR-2024-0014',
    objet: "Contrôle des annulations d'opérations",
    agence: 'Tanger Centre',
    etat: 'En cours',
    echeance: '25/05/2024',
    priorite: 'Élevée',
  },
];

function StatusBadge({ etat }: { etat: string }) {
  const config: Record<string, { bg: string; color: string; dot: string }> = {
    Traité: { bg: '#e6f4ea', color: '#1f7a3c', dot: '#1f7a3c' },
    'En cours': { bg: '#e8f1ff', color: '#1a5fa8', dot: '#f59e0b' },
    'À traiter': { bg: '#fff7ed', color: '#b45309', dot: '#f59e0b' },
  };
  const c = config[etat] || config['À traiter'];
  return (
    <span
      style={{ background: c.bg, color: c.color }}
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold"
    >
      <span style={{ background: c.dot }} className="w-1.5 h-1.5 rounded-full inline-block" />
      {etat}
    </span>
  );
}

function PrioriteBadge({ priorite }: { priorite: string }) {
  const config: Record<string, { bg: string; color: string }> = {
    Élevée: { bg: '#fef2f2', color: '#dc2626' },
    Moyenne: { bg: '#fff7ed', color: '#d97706' },
    Faible: { bg: '#f0fdf4', color: '#16a34a' },
  };
  const c = config[priorite] || config['Moyenne'];
  return (
    <span
      style={{ background: c.bg, color: c.color }}
      className="inline-flex rounded-full px-3 py-1 text-[11px] font-semibold"
    >
      {priorite}
    </span>
  );
}

// ==========================================
// CCO HOME FEATURE
// ==========================================

function CcoHome({ onSetView }: { onSetView: (view: ActiveView) => void }) {
  const progress = 50;
  const r = 52;
  const dashLength = 2 * Math.PI * r;

  return (
    <div className="space-y-6 p-6 bg-[#f4f7fb] min-h-screen">
      {/* Welcome Card */}
      <div className="rounded-2xl border border-[#e2eaf6] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <div className="text-[22px] font-bold text-[#1a2340]">Bienvenue sur RCT</div>
            </div>
            <p className="text-[13px] text-[#6b7280] mb-5">
              Suivez l'avancement de vos contrôles et traitez vos opérations en toute simplicité.
            </p>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              {ccoStatistics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[#eef2fb] bg-white p-4 shadow-sm flex items-center gap-3"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: item.bg }}
                  >
                    {item.icon === 'clipboard' && <Clipboard className="w-5 h-5" style={{ color: item.iconColor }} />}
                    {item.icon === 'list' && <List className="w-5 h-5" style={{ color: item.iconColor }} />}
                    {item.icon === 'hourglass' && <Hourglass className="w-5 h-5" style={{ color: item.iconColor }} />}
                    {item.icon === 'check' && <CheckCircle className="w-5 h-5" style={{ color: item.iconColor }} />}
                  </div>
                  <div>
                    <div
                      className="text-[22px] font-extrabold leading-none"
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </div>
                    <div className="text-[12px] text-[#6b7280] font-medium mt-0.5">{item.label}</div>
                    {item.sub && <div className="text-[11px] text-[#9aa3b8]">{item.sub}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full lg:w-56 shrink-0">
            <div className="relative h-44 w-44">
              <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                <circle cx="60" cy="60" r={r} stroke="#e5edf9" strokeWidth="10" fill="none" />
                <circle
                  cx="60"
                  cy="60"
                  r={r}
                  stroke="#1a5fa8"
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={dashLength}
                  strokeDashoffset={dashLength * (1 - progress / 100)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[28px] font-bold text-[#1a2340]">{progress}%</span>
                <span className="text-[11px] text-[#6b7280] font-semibold mt-0.5">Avancement<br />global</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-4 text-[12px] text-[#5f6b83]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1a5fa8] inline-block" />
                62 traitées
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d1d9e8] inline-block" />
                62 restantes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Controls Table */}
      <div className="rounded-2xl border border-[#e2eaf6] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#eef4ff] flex items-center justify-center">
              <Clipboard className="w-4 h-4 text-[#1a5fa8]" />
            </div>
            <span className="text-[15px] font-bold text-[#1a2340]">Contrôles du jour</span>
          </div>
          <button 
            onClick={() => onSetView('saisie')}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#d5d9ed] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#1a5fa8] hover:bg-[#eef4ff] transition cursor-pointer"
          >
            Voir tout <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#f0f4fa] text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9aa3b8]">
                <th className="pb-3 pr-4 pl-1">Contrôle</th>
                <th className="pb-3 pr-4">Objet du contrôle</th>
                <th className="pb-3 pr-4">Agence / Direction</th>
                <th className="pb-3 pr-4">État</th>
                <th className="pb-3 pr-4">Échéance</th>
                <th className="pb-3 pr-4">Priorité</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dailyControls.map((item) => (
                <tr
                  key={item.ref}
                  className="border-b border-[#f8fafc] hover:bg-[#fafbff] transition"
                >
                  <td className="py-3.5 pr-4 pl-1">
                    <span 
                      onClick={() => onSetView('saisie')}
                      className="font-semibold text-[#1a5fa8] cursor-pointer hover:underline"
                    >
                      {item.ref}
                    </span>
                  </td>
                  <td className="py-3.5 pr-4 text-[#374151]">{item.objet}</td>
                  <td className="py-3.5 pr-4 text-[#6b7280]">{item.agence}</td>
                  <td className="py-3.5 pr-4">
                    <StatusBadge etat={item.etat} />
                  </td>
                  <td className="py-3.5 pr-4 text-[#dc2626] font-medium">{item.echeance}</td>
                  <td className="py-3.5 pr-4">
                    <PrioriteBadge priorite={item.priorite} />
                  </td>
                  <td className="py-3.5 flex items-center gap-1.5">
                    <button 
                      onClick={() => onSetView('saisie-form')}
                      className="inline-flex items-center justify-center rounded-full border border-[#d5d9ed] bg-white p-2 text-[#1a5fa8] hover:bg-[#eef4ff] transition cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => onSetView('saisie-form')}
                      className="inline-flex items-center justify-center rounded-full text-[#9aa3b8] hover:bg-[#f8f9fc] p-2 transition cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SUPERVISOR URGENT ALERTS & STATS
// ==========================================

const supervisorStatistics = [
  { label: 'Taux de réalisation', value: '73.4%', sub: 'Performance globale', color: '#1a5fa8', icon: TrendingUp, bg: '#eef4ff', iconColor: '#1a5fa8' },
  { label: 'Anomalies critiques', value: '8', sub: 'À valider/analyser', color: '#c2410c', icon: AlertTriangle, bg: '#fff7ed', iconColor: '#c2410c' },
  { label: 'Retours en suspens', value: '5', sub: 'Justificatifs agences', color: '#047857', icon: Undo2, bg: '#ecfdf5', iconColor: '#047857' },
  { label: 'Escalades actives', value: '3', sub: 'Niveau supérieur', color: '#be123c', icon: ShieldAlert, bg: '#fff1f2', iconColor: '#be123c' },
];

const supervisorAlerts = [
  {
    id: 'alt-1',
    type: 'Anomalie Critique',
    desc: 'Signature non conforme - Virement 280 000 MAD',
    agence: '011 – Tanger Corniche',
    refOp: '01199253635754846',
    priorite: 'Critique',
    date: 'Aujourd\'hui à 10:15',
    statut: 'À qualifier',
    view: 'suivi-investigations' as ActiveView,
  },
  {
    id: 'alt-2',
    type: 'Retour Justificatif',
    desc: 'CNI et double signature scannée transmis',
    agence: '022 – Casablanca Anfa',
    refOp: '022881546',
    priorite: 'Haute',
    date: 'Hier à 15:30',
    statut: 'À valider',
    view: 'suivi-retours' as ActiveView,
  },
  {
    id: 'alt-3',
    type: 'Dépassement Délai',
    desc: 'Absence de justificatif requis depuis 48h',
    agence: '011 – Tanger Corniche',
    refOp: '01139253636364441',
    priorite: 'Critique',
    date: '29/12/2025',
    statut: 'À relancer',
    view: 'suivi-investigations' as ActiveView,
  },
  {
    id: 'alt-4',
    type: 'Suspicion Ecart',
    desc: 'Signature fragile non approuvée par CCO',
    agence: '011 – Tanger Corniche',
    refOp: '01199253637658835',
    priorite: 'Moyenne',
    date: '29/12/2025',
    statut: 'À qualifier',
    view: 'suivi-investigations' as ActiveView,
  },
];

function AlertPriorityBadge({ priorite }: { priorite: string }) {
  const config: Record<string, { bg: string; color: string }> = {
    Critique: { bg: '#ffe4e6', color: '#be123c' },
    Haute: { bg: '#fff7ed', color: '#c2410c' },
    Moyenne: { bg: '#fef9c3', color: '#a16207' },
  };
  const c = config[priorite] || config['Moyenne'];
  return (
    <span
      className="inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold"
      style={{ backgroundColor: c.bg, color: c.color }}
    >
      {priorite}
    </span>
  );
}

function AlertStatusBadge({ statut }: { statut: string }) {
  const config: Record<string, { bg: string; color: string }> = {
    'À qualifier': { bg: '#fff7ed', color: '#ea580c' },
    'À valider': { bg: '#eef2ff', color: '#4f46e5' },
    'À relancer': { bg: '#fdf2f8', color: '#db2777' },
  };
  const c = config[statut] || config['À qualifier'];
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
      style={{ backgroundColor: c.bg, color: c.color }}
    >
      <span className="w-1 h-1 rounded-full bg-current" />
      {statut}
    </span>
  );
}

// ==========================================
// SUPERVISOR PROFESSIONAL HOME FEATURE
// ==========================================

function SupervisorHome({ onSetView }: { onSetView: (view: ActiveView) => void }) {
  const progress = 73.4;
  const coverage = 65.2;
  const anomalyRate = 12.8;

  return (
    <div className="space-y-6 p-6 bg-[#f4f7fb] min-h-screen">
      {/* Executive Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-[#e2eaf6] p-6 rounded-3xl shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[#1a5fa8] text-white text-[11px] font-extrabold tracking-wider uppercase">
              Rôle : Superviseur
            </span>
            <div className="text-[#888] font-semibold text-[11px] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#1a5fa8]" /> Direction Casablanca-Anfa & Nord
            </div>
          </div>
          <h1 className="text-[22px] font-bold text-[#1a2340] tracking-tight">
            Console Exécutive de Supervision CC
          </h1>
          <p className="text-[13px] text-[#6b7280]">
            Suivi en temps réel de la conformité des caisses, des anomalies critiques et des alertes de remédiation.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#fafbfe] border border-[#e2e6f0] px-4 py-2.5 rounded-2xl shrink-0">
          <Calendar className="w-4 h-4 text-[#1a5fa8]" />
          <div>
            <div className="text-[10px] text-[#888] uppercase tracking-wide font-semibold">CC en date du</div>
            <div className="text-[13px] font-bold text-[#1a2340]">Mardi 02 Juin 2026</div>
          </div>
        </div>
      </div>

      {/* Professional KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {supervisorStatistics.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-3xl border border-[#e2eaf6] bg-white p-5 shadow-xs flex items-center justify-between hover:shadow-sm transition-all"
            >
              <div className="space-y-2">
                <div className="text-[12px] text-[#6b7280] font-semibold">{item.label}</div>
                <div className="text-[26px] font-extrabold leading-none" style={{ color: item.color }}>
                  {item.value}
                </div>
                <div className="text-[11px] text-[#9aa3b8] font-medium">{item.sub}</div>
              </div>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs"
                style={{ backgroundColor: item.bg }}
              >
                <Icon className="w-5 h-5" style={{ color: item.iconColor }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytical charts / circular progressions */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Urgent alerts / supervision list */}
        <div className="rounded-3xl border border-[#e2eaf6] bg-white p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#f0f4fa] pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-600 border border-red-100">
                <ShieldAlert className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-[15px] font-bold text-[#1a2340]">Alertes & Incidents de Supervision</span>
                <p className="text-[11.5px] text-[#6b7280] mt-0.5">Dossiers prioritaires nécessitant une intervention immédiate.</p>
              </div>
            </div>
            <button
              onClick={() => onSetView('suivi-investigations')}
              className="inline-flex items-center gap-1 rounded-xl border border-[#d5d9ed] bg-white px-3.5 py-1.5 text-[12px] font-bold text-[#1a5fa8] hover:bg-[#eef4ff] transition cursor-pointer shrink-0"
            >
              Traiter les anomalies <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[13px] border-collapse">
              <thead>
                <tr className="border-b border-[#f0f4fa] text-left text-[10.5px] font-bold uppercase tracking-[0.12em] text-[#9aa3b8]">
                  <th className="pb-3 pr-3 pl-1">Type d'incident</th>
                  <th className="pb-3 pr-3">Détails de l'anomalie</th>
                  <th className="pb-3 pr-3">Agence</th>
                  <th className="pb-3 pr-3">Priorité</th>
                  <th className="pb-3 pr-3">Statut</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {supervisorAlerts.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#f8fafc] hover:bg-[#fafbff] transition-colors"
                  >
                    <td className="py-3.5 pr-3 pl-1 font-bold text-[#1a2340]">{item.type}</td>
                    <td className="py-3.5 pr-3">
                      <div className="font-semibold text-gray-800 text-[12.5px]">{item.desc}</div>
                      <div className="text-[11px] text-gray-400 font-mono mt-0.5">Réf: {item.refOp}</div>
                    </td>
                    <td className="py-3.5 pr-3 text-gray-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-450 shrink-0" />
                        {item.agence.split(' – ')[1]}
                      </div>
                    </td>
                    <td className="py-3.5 pr-3">
                      <AlertPriorityBadge priorite={item.priorite} />
                    </td>
                    <td className="py-3.5 pr-3">
                      <AlertStatusBadge statut={item.statut} />
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => onSetView(item.view)}
                        className="px-2.5 py-1 text-[11.5px] font-bold text-[#1a5fa8] hover:bg-[#eef4ff] border border-[#d5d9ed] rounded-lg transition flex items-center gap-1 ml-auto cursor-pointer"
                        title="Ouvrir le dossier"
                      >
                        Traiter <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Circular / side tracking dashboard panel */}
        <div className="space-y-6 flex flex-col">
          {/* Progress Card */}
          <div className="rounded-3xl border border-[#e2eaf6] bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-[#f0f4fa] pb-3">
              <BarChart3 className="w-4 h-4 text-[#1a5fa8]" />
              <span className="text-[13.5px] font-bold text-[#1a2340]">Couverture & Risques</span>
            </div>

            <div className="space-y-4">
              {/* Stat 1: Réalisation */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[12px] font-semibold text-[#334155]">
                  <span>Avancement Réalisation</span>
                  <span className="text-[#1a5fa8]">{progress}%</span>
                </div>
                <div className="w-full bg-[#f1f5f9] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#1a5fa8] h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Stat 2: Couverture */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[12px] font-semibold text-[#334155]">
                  <span>Taux de Couverture</span>
                  <span className="text-[#047857]">{coverage}%</span>
                </div>
                <div className="w-full bg-[#f1f5f9] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#047857] h-full rounded-full transition-all duration-500" style={{ width: `${coverage}%` }} />
                </div>
              </div>

              {/* Stat 3: Anomalies */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[12px] font-semibold text-[#334155]">
                  <span>Indice d'Anomalie</span>
                  <span className="text-[#be123c]">{anomalyRate}%</span>
                </div>
                <div className="w-full bg-[#f1f5f9] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#be123c] h-full rounded-full transition-all duration-500" style={{ width: `${anomalyRate}%` }} />
                </div>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#6b7280] flex items-start gap-1.5 leading-normal">
              <Clock className="w-3.5 h-3.5 text-[#1a5fa8] shrink-0 mt-0.5" />
              <span>Dernière synchronisation des données effectuée il y a 5 minutes.</span>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="rounded-3xl border border-[#e2eaf6] bg-[#fafbfe] p-5 shadow-xs space-y-3.5 flex-1 flex flex-col justify-center">
            <div>
              <span className="text-[12.5px] font-bold text-[#1a2340]">Actions rapides Superviseur</span>
              <p className="text-[11px] text-[#6b7280] mt-0.5">Accédez directement aux modules métiers.</p>
            </div>

            <div className="grid gap-2">
              <button
                onClick={() => onSetView('supervision-cc')}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-[#e2e6f0] hover:border-[#1a5fa8] text-[#1a2340] rounded-2xl text-[12.5px] font-semibold transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#1a5fa8]" />
                  <span>Superviser les contrôles</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#999] group-hover:text-[#1a5fa8] transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => onSetView('suivi-investigations')}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-[#e2e6f0] hover:border-[#1a5fa8] text-[#1a2340] rounded-2xl text-[12.5px] font-semibold transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#ea580c]" />
                  <span>Résoudre les anomalies</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#999] group-hover:text-[#1a5fa8] transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => onSetView('suivi-retours')}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-[#e2e6f0] hover:border-[#1a5fa8] text-[#1a2340] rounded-2xl text-[12.5px] font-semibold transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Undo2 className="w-4 h-4 text-[#047857]" />
                  <span>Vérifier retours agences</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#999] group-hover:text-[#1a5fa8] transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={() => onSetView('statistiques')}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-[#e2e6f0] hover:border-[#1a5fa8] text-[#1a2340] rounded-2xl text-[12.5px] font-semibold transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#6d28d9]" />
                  <span>Analyser les statistiques</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#999] group-hover:text-[#1a5fa8] transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// CORE EXPORTED HOME FEATURE
// ==========================================

export function HomeFeature() {
  const { role, dispatch } = useDashboard();

  const handleSetView = (view: ActiveView) => {
    dispatch({ type: 'SET_VIEW', payload: view });
  };

  if (role === 'SUPERVISEUR') {
    return <SupervisorHome onSetView={handleSetView} />;
  }

  return <CcoHome onSetView={handleSetView} />;
}