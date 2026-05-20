import { Calendar, Filter, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import { PLANNING_FILTERS, planningData } from '../../services/planning';
import { KpiCard } from '../../app/components/core';

const months = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];
const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

function formatToIso(date: string) {
  const [day, month, year] = date.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

function MiniCal({ events, selected, onSelect }: { events: typeof planningData; selected: string | null; onSelect: (date: string) => void }) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const fd = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const evDates = events.map(e => formatToIso(e.date));
  const cells: Array<number | null> = [];

  for (let i = 0; i < (fd === 0 ? 6 : fd - 1); i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prev = () => {
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  };

  const next = () => {
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  };

  return (
    <div className="bg-white rounded-[22px] p-5 shadow-sm border border-[#e8edf4]">
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={prev} className="text-[#555] text-[20px] leading-none px-2 py-1 hover:text-[#1a5fa8]">‹</button>
        <div className="text-center">
          <div className="text-[14px] font-semibold text-[#1a2340]">{months[month]} {year}</div>
        </div>
        <button type="button" onClick={next} className="text-[#555] text-[20px] leading-none px-2 py-1 hover:text-[#1a5fa8]">›</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {days.map(day => (
          <div key={day} className="text-[10px] font-semibold uppercase text-[#aab0bc]">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {cells.map((d, index) => {
          if (!d) return <div key={`empty-${index}`} className="h-8" />;
          const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
          const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const isSelected = iso === selected;
          const hasEvent = evDates.includes(iso);

          return (
            <button
              key={iso}
              type="button"
              onClick={() => onSelect(iso)}
              className={`h-8 rounded-xl text-[11px] font-semibold transition ${isSelected ? 'bg-[#1a5fa8] text-white' : isToday ? 'bg-[#eff4ff] text-[#1a5fa8]' : 'text-[#333]'} ${hasEvent && !isSelected ? 'ring-1 ring-[#e8003d]' : ''}`}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function getStatusClass(status: string) {
  switch (status) {
    case 'À traiter':
      return 'bg-[#fff3e0] text-[#e65100]';
    case 'En cours':
      return 'bg-[#e3eefb] text-[#1a5fa8]';
    case 'Déjà traité':
      return 'bg-[#e8f5e9] text-[#2e7d32]';
    case 'Non démarré':
      return 'bg-[#f0f2f4] text-[#666]';
    default:
      return 'bg-[#f0f2f4] text-[#666]';
  }
}

export function PlanningFeature() {
  const { filteredPlanning, planningCounts, planningFilter, planningStatusSelect, dispatch, goToPlanningCtrl } = useDashboard();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const displayedPlanning = filteredPlanning.filter(item => {
    if (!selectedDate) return true;
    return formatToIso(item.date) === selectedDate;
  });

  const selectedDayPlanning = selectedDate
    ? planningData.filter(item => formatToIso(item.date) === selectedDate)
    : planningData;

  const dailyOpCount = selectedDayPlanning.reduce((sum, item) => sum + item.op, 0);
  const dailyCaisseCount = selectedDayPlanning.length;

  const selectedStatusCounts: Record<string, number> = selectedDayPlanning.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div data-testid="view-planning" className="space-y-5">
      <div className="flex items-center gap-3 justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#d9eefa] text-[#1a5fa8]">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-[18px] font-semibold text-[#1a2340]">Planning</h1>
            <div className="text-[13px] text-[#6b7280]">Vue principale</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-5">
        <div className="space-y-4">
          <MiniCal events={planningData} selected={selectedDate} onSelect={setSelectedDate} />
          <div className="bg-white rounded-[22px] p-5 shadow-sm border border-[#e8edf4]">
            <div className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#6b7280]">Résumé</div>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 rounded-2xl bg-[#fff7e6] px-4 py-3">
                <span className="text-[13px] text-[#92400e]">À traiter</span>
                <span className="text-[15px] font-semibold text-[#92400e]">{selectedStatusCounts['À traiter'] ?? 0}</span>
              </div>
              <div className="flex items-center justify-between gap-2 rounded-2xl bg-[#e3eefb] px-4 py-3">
                <span className="text-[13px] text-[#1a5fa8]">En cours</span>
                <span className="text-[15px] font-semibold text-[#1a5fa8]">{selectedStatusCounts['En cours'] ?? 0}</span>
              </div>
              <div className="flex items-center justify-between gap-2 rounded-2xl bg-[#e8f5e9] px-4 py-3">
                <span className="text-[13px] text-[#166534]">Déjà traité</span>
                <span className="text-[15px] font-semibold text-[#166534]">{selectedStatusCounts['Déjà traité'] ?? 0}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-[#e5eaf2] rounded-3xl shadow-sm p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <h2 className="text-[16px] font-semibold text-[#1a2340]">Liste des contrôles</h2>
                <p className="text-[13px] text-[#6b7280]">Cliquez sur une caisse pour ouvrir la saisie/modification.</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                {selectedDate && (
                  <div className="text-[13px] text-[#374151] bg-[#f3f4f6] rounded-full px-3 py-1">
                    {dailyCaisseCount} caisse{dailyCaisseCount > 1 ? 's' : ''} • {dailyOpCount} op{dailyOpCount > 1 ? 's' : ''}
                  </div>
                )}
                <div className="text-[12px] text-[#6b7280] bg-[#f3f4f6] rounded-full px-3 py-1">{displayedPlanning.length} élément{displayedPlanning.length > 1 ? 's' : ''}</div>
              </div>
            </div>

            <div className="space-y-4">
              {displayedPlanning.map((row, index) => {
                const [day, month, year] = row.date.split('/');
                const monthLabel = months[Number(month) - 1].slice(0, 3);
                return (
                  <button
                    key={row.ctrl ?? index}
                    type="button"
                    onClick={() => goToPlanningCtrl(row.ctrl)}
                    className="w-full text-left rounded-3xl border border-[#edf2f7] bg-[#f8fafd] p-4 transition hover:border-[#cbd5e1] hover:bg-white"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-20 w-20 flex-col items-center justify-center rounded-3xl bg-white text-center shadow-sm">
                          <div className="text-[22px] font-bold text-[#1a2340]">{Number(day)}</div>
                          <div className="text-[11px] uppercase text-[#6b7280]">{monthLabel}</div>
                        </div>
                        <div>
                          <div className="text-[15px] font-semibold text-[#1a2340]">{row.agenceName}</div>
                          <div className="text-[12px] text-[#6b7280] mt-1">{row.date} · {row.op} op.</div>
                          <div className="text-[12px] text-[#4b5563] mt-1">Taux scan {row.scan}</div>
                        </div>
                      </div>

                      <div className="flex flex-col items-start sm:items-end gap-3">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-[12px] font-semibold ${getStatusClass(row.status)}`}>
                          {row.status}
                        </span>
                        <span className="text-[12px] text-[#1a5fa8] font-semibold">{row.ctrl}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
              {displayedPlanning.length === 0 && (
                <div className="rounded-[22px] border border-[#edf2f7] bg-[#f8fafd] p-6 text-center text-[#6b7280]">
                  Aucune caisse trouvée pour cette sélection.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
