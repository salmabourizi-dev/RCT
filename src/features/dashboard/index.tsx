import { useEffect, useState } from 'react';
import { Briefcase, FileCheck, ChevronRight, MapPin, XCircle, Filter, Search, Eye, Edit2, CheckCircle2 } from 'lucide-react';
import { useDashboard } from '../../hooks/useDashboard';
import { ctrlTabs, operations } from '../../services/operations';
import { InfoChip, StatField, FilterInput } from '../../app/components/core';
import { dashboardStyles as s } from './style';

export function DashboardFeature() {
  const { selectedCtrlTab, dispatch, openEditForm } = useDashboard();
  const [signatureNonNumerisee, setSignatureNonNumerisee] = useState(false);
  const [signatureFragile, setSignatureFragile] = useState(false);
  const [selectedResultatDA, setSelectedResultatDA] = useState(ctrlTabs[selectedCtrlTab].res);

  useEffect(() => {
    setSelectedResultatDA(ctrlTabs[selectedCtrlTab].res);
  }, [selectedCtrlTab]);

  return (
    <div data-testid="view-saisie">
      {/* Title */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-full flex items-center justify-center relative bg-linear-to-br from-[#4fc3f7] to-[#1a5fa8]">
          <Briefcase className="w-4 h-4 text-white" />
          <div className="w-2.5 h-2.5 bg-[#e8174a] rounded-full absolute -top-0.5 -right-0.5 border-2 border-white" />
        </div>
        <h1 className="text-[15px] font-semibold text-[#1a2340]">Caisses comptables — Saisie / Modification</h1>
      </div>

      {/* Info bar */}
      <div className="bg-white border border-[#e2e6f0] rounded-xl px-4 py-3 mb-4 flex items-center flex-wrap gap-x-4 gap-y-2 shadow-sm">
        <InfoChip label="Agence" value="011 – AGENCE DE TANGER CORNICHE" />
        <div className={s.divider} />
        <InfoChip label="CC du" value="29/12/2025" />
        <div className={s.divider} />
        <InfoChip label="Nbre Op." value="16" />
        <div className={s.divider} />
        <InfoChip label="Op. restantes" value="0" />
        <div className={s.divider} />
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-[#999] font-semibold uppercase tracking-wide">Ouverte</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-bold border-[1.5px] bg-[#e3f4e8] text-[#1b7a3e] border-[#a3d9ae]">
            <MapPin className="w-3 h-3" /> OUI
          </span>
        </div>
        <div className={s.divider} />
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-[#999] font-semibold uppercase tracking-wide">Éloignée</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11.5px] font-bold border-[1.5px] bg-[#f0f2f4] text-[#888] border-[#d0d3dc]">
            <XCircle className="w-3 h-3" /> NON
          </span>
        </div>
      </div>

      <div className="bg-white border border-[#e2e6f0] rounded-xl px-4 py-4 mb-4 shadow-sm">
        <div className="text-[11px] text-[#888] uppercase tracking-wide font-semibold mb-3">Résultat remonté par DA</div>
        <div className="grid gap-3">
          <div className="relative">
            <select
              className="w-full border border-[#d5d9ed] rounded-2xl px-4 py-3 text-[13px] text-[#333] bg-white outline-none appearance-none"
              value={selectedResultatDA}
              onChange={e => setSelectedResultatDA(e.target.value)}
            >
              {['OK', 'NON OK', 'À vérifier'].map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <ChevronRight className="w-4 h-4 text-[#aaa] absolute right-4 top-1/2 -translate-y-1/2" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-[13px] font-medium transition ${signatureNonNumerisee ? 'bg-[#e8f5e9] border-transparent text-[#166534]' : 'bg-white border-[#d7d9e0] text-[#333]'}`}>
              <input
                type="checkbox"
                checked={signatureNonNumerisee}
                onChange={() => setSignatureNonNumerisee(prev => !prev)}
                className="h-4 w-4 text-[#1a5fa8] accent-[#1a5fa8]"
              />
              Signature non numérisée
            </label>
            <label className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-[13px] font-medium transition ${signatureFragile ? 'bg-[#fff7ed] border-transparent text-[#b45309]' : 'bg-white border-[#d7d9e0] text-[#333]'}`}>
              <input
                type="checkbox"
                checked={signatureFragile}
                onChange={() => setSignatureFragile(prev => !prev)}
                className="h-4 w-4 text-[#1a5fa8] accent-[#1a5fa8]"
              />
              Signature fragile
            </label>
          </div>
        </div>
      </div>

      {/* Section des contrôles CCO */}
      <div className={`${s.card} mb-4`}>
        <div className={s.cardHeader}>
          <div className="flex items-center gap-2 text-[13px] font-semibold text-[#1a2340]">
            <FileCheck className="w-4 h-4 text-[#1a5fa8]" />
            Contrôles CCO
            <span className="ml-1.5 px-2 py-0.5 rounded-full bg-[#e3eefb] text-[#1a5fa8] text-[11px] font-semibold">{ctrlTabs.length}</span>
          </div>
          <span className="text-[11px] text-[#999]">Sélectionnez un type de contrôle pour voir les opérations correspondantes.</span>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {ctrlTabs.map((c, i) => (
            <button
              key={i}
              data-testid={`ctrl-card-${i}`}
              onClick={() => dispatch({ type: 'SET_CTRL_TAB', payload: i })}
              className={`rounded-3xl border p-4 text-left transition-all ${
                selectedCtrlTab === i ? 'border-[#1a5fa8] bg-[#eef4ff] shadow-sm' : 'border-[#e8edf4] bg-white hover:border-[#cbd5e1] hover:bg-[#f8fafd]'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${selectedCtrlTab === i ? 'text-[#1a5fa8]' : 'text-[#6b7280]'}`}>{c.ref}</span>
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${c.n > 0 ? 'bg-[#dce8f8] text-[#1a5fa8]' : 'bg-[#f0f2f4] text-[#777]'}`}>
                  {c.n} op.
                </span>
              </div>
              <div className={`text-[13px] font-semibold ${selectedCtrlTab === i ? 'text-[#1a2340]' : 'text-[#333]'}`}>{c.name}</div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-[#666]">
                <span>{c.res}</span>
                <span>{c.taux}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Détail du contrôle sélectionné */}
      <div className={s.card}>
        <div className="flex flex-col gap-4 px-4 py-4 border-b border-[#eef0f8] bg-[#f8f9fd] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className={s.refBadge}>{ctrlTabs[selectedCtrlTab].ref}</span>
            <div>
              <div className="text-[13px] font-semibold text-[#1a2340]">{ctrlTabs[selectedCtrlTab].name}</div>
              <div className="text-[12px] text-[#6b7280]">Contrôle CCO ciblé sur le périmètre sélectionné.</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-[#e3eefb] px-3 py-1 text-[11px] font-semibold text-[#1a5fa8]">Docs DOC_ARCHIVES: {ctrlTabs[selectedCtrlTab].docs}</span>
            <span className="inline-flex items-center rounded-full bg-[#fff7ed] px-3 py-1 text-[11px] font-semibold text-[#b45309]">Anomalies: {ctrlTabs[selectedCtrlTab].anomalies}</span>
            <span className="inline-flex items-center rounded-full bg-[#e8f5ff] px-3 py-1 text-[11px] font-semibold text-[#1a5fa8]">Taux: {ctrlTabs[selectedCtrlTab].taux}</span>
          </div>
        </div>

        <div className={s.cardBody}>
          <div className="grid gap-3 lg:grid-cols-[220px_1fr] mb-6">
            <div className="rounded-3xl border border-[#e2e6f0] bg-[#f9fbff] p-4">
              <div className="text-[11px] text-[#888] uppercase tracking-wide font-semibold mb-3">Informations du contrôle</div>
              <div className="space-y-3 text-[13px] text-[#333]">
                <div className="flex items-center justify-between">
                  <span className="text-[#666]">Référence</span>
                  <span className="font-semibold text-[#1a2340]">{ctrlTabs[selectedCtrlTab].ref}-0001</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#666]">Déclaré par DA/RSC</span>
                  <span className="font-semibold text-[#1a2340]">Signée</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#666]">Type CCO</span>
                  <span className="font-semibold text-[#1a2340]">Contrôle CCO</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#666]">Statut opération</span>
                  <span className="font-semibold text-[#1a2340]">En cours</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#e2e6f0] bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className={s.sectionTitle}>Filtres CCO</div>
                  <div className="text-[12px] text-[#6b7280]">Affinez la liste des opérations par critères métier.</div>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <FilterInput label="N° compte" placeholder="Rechercher..." maxWidth="100%" />
                <FilterInput label="Réf. opération" placeholder="Réf..." maxWidth="100%" />
                <div className="flex flex-col gap-1">
                  <label className="text-[10.5px] text-[#888] font-semibold uppercase tracking-wide">Doc. absent ARC</label>
                  <select className={s.select}>
                    <option>Tous</option><option>OUI</option><option>NON</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10.5px] text-[#888] font-semibold uppercase tracking-wide">État</label>
                  <select className={s.select}>
                    <option>Tous</option><option>Traitée</option><option>En attente</option>
                  </select>
                </div>
              </div>
              <button className={`${s.btnPrimary} mt-4 w-full justify-center`} data-testid="button-filter-saisie">
                <Filter className="w-3.5 h-3.5" /> Appliquer
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-[#e8eaf6]">
            <table className="w-full border-collapse text-[12px] min-w-205">
              <thead>
                <tr className="bg-[#f4f6fc]">
                  {['#', 'Réf. opération', 'N° compte', 'Lieu', 'Type', 'Libellé', 'Montant', 'Statut', 'Doc. ARC', 'Indice', 'Actions'].map(h => (
                    <th key={h} className={s.tableHeader}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {operations.map(r => (
                  <tr key={r.n} className={`hover:bg-[#f8f9fd] transition-colors ${r.hl ? 'bg-[#f0f6ff]' : ''}`}>
                    <td className={`${s.tableCell} text-[#555]`}>{r.n}</td>
                    <td className={`${s.tableCell} text-[11px] font-bold text-[#1a2340] whitespace-nowrap`}>{r.ref}</td>
                    <td className={`${s.tableCell} text-[10.5px] text-[#555] whitespace-nowrap`}>{r.cpt}</td>
                    <td className={`${s.tableCell} text-[#555]`}>{r.lieu}</td>
                    <td className={`${s.tableCell} text-[#555]`}>{r.type}</td>
                    <td className={`${s.tableCell} text-[11.5px] text-[#333] max-w-40 truncate`}>{r.lib}</td>
                    <td className={`${s.tableCell} font-bold text-[#1a2340] whitespace-nowrap`}>{r.mt}</td>
                    <td className={s.tableCell}>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${r.stc}`}>{r.st}</span>
                    </td>
                    <td className={s.tableCell}>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${r.dc}`}>{r.doc}</span>
                    </td>
                    <td className={`${s.tableCell} text-[#555]`}>{r.idx}</td>
                    <td className={s.tableCell}>
                      <div className="flex gap-1">
                        <button className="w-7 h-7 rounded-md border border-[#e0e5f0] bg-white flex items-center justify-center hover:bg-[#eaf2ff] hover:border-[#a8c4e8] transition-colors" aria-label="Voir" data-testid={`btn-view-${r.n}`}>
                          <Eye className="w-3.5 h-3.5 text-[#555]" />
                        </button>
                        <button className="w-7 h-7 rounded-md border border-[#e0e5f0] bg-white flex items-center justify-center hover:bg-[#eaf2ff] hover:border-[#a8c4e8] transition-colors" aria-label="Éditer" data-testid={`btn-edit-${r.n}`} onClick={() => openEditForm(r)}>
                          <Edit2 className="w-3.5 h-3.5 text-[#555]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-2 mt-3 pt-3 border-t border-[#f0f3fb]">
            <button className={s.btnSecondary}>
              <Search className="w-3.5 h-3.5" /> Lister
            </button>
            <button className={`${s.btnPrimary} ml-auto`}>
              <CheckCircle2 className="w-3.5 h-3.5" /> Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
