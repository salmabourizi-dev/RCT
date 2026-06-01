import { ArrowRight, ChevronRight, Clipboard, Eye, HelpCircle, List, MoreHorizontal, Hourglass, CheckCircle, ShieldCheck } from 'lucide-react';
import { useDashboard } from '../../hooks/useDashboard';

const statistics = [
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

function StatusBadge({ etat }) {
  const config = {
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

function PrioriteBadge({ priorite }) {
  const config = {
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

export function HomeFeature() {
  const { dispatch } = useDashboard();
  const progress = 50;
  const r = 52;
  const dashLength = 2 * Math.PI * r;

  return (
    <div className="space-y-6 p-6 bg-[#f4f7fb] min-h-screen">
      {/* Welcome Card */}
      <div className="rounded-2xl border border-[#e2eaf6] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Left: KPI cards + title */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <div className="text-[22px] font-bold text-[#1a2340]">Bienvenue sur RCT</div>
            </div>
            <p className="text-[13px] text-[#6b7280] mb-5">
              Suivez l'avancement de vos contrôles et traitez vos opérations en toute simplicité.
            </p>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              {statistics.map((item) => (
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

          {/* Right: Circular progress */}
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
          <button className="inline-flex items-center gap-1.5 rounded-full border border-[#d5d9ed] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#1a5fa8] hover:bg-[#eef4ff] transition">
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
              {dailyControls.map((item, i) => (
                <tr
                  key={item.ref}
                  className="border-b border-[#f8fafc] hover:bg-[#fafbff] transition"
                >
                  <td className="py-3.5 pr-4 pl-1">
                    <span className="font-semibold text-[#1a5fa8] cursor-pointer hover:underline">
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
                    <button className="inline-flex items-center justify-center rounded-full border border-[#d5d9ed] bg-white p-2 text-[#1a5fa8] hover:bg-[#eef4ff] transition">
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button className="inline-flex items-center justify-center rounded-full text-[#9aa3b8] hover:bg-[#f8f9fc] p-2 transition">
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