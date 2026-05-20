import { useState, type ReactNode } from 'react';
import { ArrowLeft, Monitor, LogOut, Save, Search } from 'lucide-react';
import { useDashboard } from '../../hooks/useDashboard';
import { dashboardStyles as s } from '../dashboard/style';
import {
  TAREC_OBJECTIF,
  VERIFICATION_OPTIONS,
  defaultControlPoints,
  tarecContracts,
  DEFAULT_SELECTED_CONTRACT_ID,
  type TarecControlPoint,
  type VerificationOptionId,
} from '../../services/tarec';

function HeaderField({
  label,
  value,
  onChange,
  readOnly,
  withSearch,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  readOnly?: boolean;
  withSearch?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 min-w-[120px] flex-1">
      <label className="text-[10.5px] text-[#888] font-semibold uppercase tracking-wide">{label}</label>
      <div className="relative flex">
        <input
          className="border border-[#d5d9ed] rounded-lg px-2.5 py-[7px] text-[12.5px] text-[#333] bg-[#f9fafc] outline-none w-full focus:border-[#1a5fa8] transition-colors"
          type="text"
          value={value}
          readOnly={readOnly}
          onChange={e => onChange?.(e.target.value)}
        />
        {withSearch && (
          <button
            type="button"
            className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md border border-[#e0e5f0] bg-white flex items-center justify-center hover:bg-[#eaf2ff] transition-colors"
            aria-label={`Rechercher ${label}`}
          >
            <Search className="w-3.5 h-3.5 text-[#555]" />
          </button>
        )}
      </div>
    </div>
  );
}

function FieldGroup({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-3">{children}</div>;
}

export function SaisieAnomaliesFeature() {
  const { dispatch } = useDashboard();
  const [selectedId, setSelectedId] = useState(DEFAULT_SELECTED_CONTRACT_ID);
  const [verification, setVerification] = useState<VerificationOptionId | ''>('');
  const [selectedControlId, setSelectedControlId] = useState(1);
  const [controlPoints, setControlPoints] = useState<TarecControlPoint[]>(() =>
    defaultControlPoints.map(p => ({ ...p })),
  );

  const selected = tarecContracts.find(c => c.id === selectedId) ?? tarecContracts[0];
  const resteATraiter = tarecContracts.filter(c => !c.etatControle).length;

  const updateControlPoint = (id: number, field: 'pointVerification' | 'commentaires', value: string) => {
    setControlPoints(prev =>
      prev.map(p => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  const selectContract = (id: number) => {
    setSelectedId(id);
    setVerification('');
    setSelectedControlId(1);
    setControlPoints(defaultControlPoints.map(p => ({ ...p })));
  };

  return (
    <div data-testid="view-saisie-anomalies" className="space-y-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[15px] font-semibold text-[#1a2340]">
            TAREC : Traçabilité des anomalies
          </div>
          <div className="text-[12.5px] text-[#6b7280]">
            Objectif : {TAREC_OBJECTIF} — Reste à traiter : {resteATraiter}
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" className={s.btnSecondary} data-testid="btn-visualiser">
            <Monitor className="w-3.5 h-3.5" /> Visualiser
          </button>
          <button
            type="button"
            className={s.btnSecondary}
            data-testid="btn-quitter"
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'saisie' })}
          >
            <LogOut className="w-3.5 h-3.5" /> Quitter
          </button>
        </div>
      </div>

      <div className={s.card}>
        <div className={`${s.cardBody} space-y-4`}>
          <FieldGroup>
            <HeaderField label="Code Ag." value={selected.codeAgence} readOnly />
            <HeaderField label="Type Contrat" value={selected.typeContrat} readOnly />
            <HeaderField label="Date Evènement" value={selected.dateEvenement} readOnly />
            <HeaderField label="Evènement" value={selected.evenement} readOnly />
          </FieldGroup>
          <FieldGroup>
            <HeaderField label="Numéro de compte" value={selected.nCompte} withSearch readOnly />
            <HeaderField label="Numéro de Contrat" value={selected.nContrat} withSearch readOnly />
            <HeaderField label="Etat" value={selected.etatControle} readOnly />
          </FieldGroup>

          <div className="overflow-x-auto rounded-xl border border-[#e8eaf6]">
            <table className="w-full border-collapse text-[12px] min-w-[900px]">
              <thead>
                <tr className="bg-[#f4f6fc]">
                  {[
                    'Type',
                    'CodeAgence',
                    'TypeContrat',
                    'Evènement',
                    'NCompte',
                    'NContrat',
                    'Date Evènement',
                    'Statut',
                    'Etat du contrôle',
                    'id',
                  ].map(h => (
                    <th key={h} className={s.tableHeader}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tarecContracts.map(row => {
                  const isSelected = row.id === selectedId;
                  return (
                    <tr
                      key={row.id}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#d4e4f8]' : 'hover:bg-[#f8f9fd]'
                      }`}
                      onClick={() => selectContract(row.id)}
                      data-testid={`tarec-row-${row.id}`}
                    >
                      <td className={s.tableCell}>{row.type}</td>
                      <td className={s.tableCell}>{row.codeAgence}</td>
                      <td className={s.tableCell}>{row.typeContrat}</td>
                      <td className={s.tableCell}>{row.evenement}</td>
                      <td className={`${s.tableCell} whitespace-nowrap`}>{row.nCompte}</td>
                      <td className={`${s.tableCell} font-semibold text-[#1a2340] whitespace-nowrap`}>
                        {row.nContrat}
                      </td>
                      <td className={s.tableCell}>{row.dateEvenement}</td>
                      <td className={s.tableCell}>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            row.statut === 'En cours'
                              ? 'bg-[#fff3e0] text-[#e65100]'
                              : 'bg-[#e3eefb] text-[#1a5fa8]'
                          }`}
                        >
                          {row.statut}
                        </span>
                      </td>
                      <td className={s.tableCell}>{row.etatControle || '—'}</td>
                      <td className={`${s.tableCell} text-[#888]`}>{row.id}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pt-2 border-t border-[#eef0f8]">
            <div className="text-[13px] font-semibold text-[#c62828] mb-3">
              Points de vérification :
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-4">
              {VERIFICATION_OPTIONS.map(opt => (
                <label
                  key={opt.id}
                  className="flex items-start gap-2 cursor-pointer text-[12.5px] text-[#333] max-w-sm"
                >
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 accent-[#1a5fa8] shrink-0"
                    checked={verification === opt.id}
                    onChange={() => setVerification(prev => (prev === opt.id ? '' : opt.id))}
                    data-testid={`verification-${opt.id}`}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#e8eaf6]">
              <table className="w-full border-collapse text-[12px]">
                <thead>
                  <tr className="bg-[#f4f6fc]">
                    {['Libellé du contrôle', 'Point de vérification', 'Commentaires'].map(h => (
                      <th key={h} className={s.tableHeader}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {controlPoints.map(point => {
                    const isSelected = point.id === selectedControlId;
                    return (
                      <tr
                        key={point.id}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#d4e4f8]' : 'hover:bg-[#f8f9fd]'
                        }`}
                        onClick={() => setSelectedControlId(point.id)}
                        data-testid={`control-point-${point.id}`}
                      >
                        <td className={`${s.tableCell} font-medium text-[#1a2340] min-w-[280px]`}>
                          {point.libelle}
                        </td>
                        <td className={s.tableCell} onClick={e => e.stopPropagation()}>
                          <input
                            className="w-full border border-[#d5d9ed] rounded-lg px-2 py-1.5 text-[12px] bg-white outline-none focus:border-[#1a5fa8]"
                            value={point.pointVerification}
                            onChange={e =>
                              updateControlPoint(point.id, 'pointVerification', e.target.value)
                            }
                            data-testid={`point-verification-${point.id}`}
                          />
                        </td>
                        <td className={s.tableCell} onClick={e => e.stopPropagation()}>
                          <input
                            className="w-full border border-[#d5d9ed] rounded-lg px-2 py-1.5 text-[12px] bg-white outline-none focus:border-[#1a5fa8]"
                            value={point.commentaires}
                            onChange={e =>
                              updateControlPoint(point.id, 'commentaires', e.target.value)
                            }
                            data-testid={`commentaires-${point.id}`}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2 border-t border-[#f0f3fb]">
            <button
              type="button"
              className={s.btnSecondary}
              data-testid="btn-retour"
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'saisie' })}
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Retour
            </button>
            <button type="button" className={s.btnPrimary} data-testid="btn-enregistrer-tarec">
              <Save className="w-3.5 h-3.5" /> Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
