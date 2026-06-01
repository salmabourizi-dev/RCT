import { useState } from 'react';
import { Edit2, ArrowLeft, AlertTriangle, Eye, CheckCircle2, X, ChevronDown } from 'lucide-react';
import { useDashboard } from '../../hooks/useDashboard';
import { ctrlTabs, COTATIONS } from '../../services/operations';
import { TarecControlPoint } from '../../services/tarec';

export function SaisieFormFeature() {
  const {
    selectedOperation,
    selectedCtrlTab,
    cotation,
    formStatut,
    formResultat,
    dispatch,
  } = useDashboard();
  const [fragileSignature, setFragileSignature] = useState(false);
  const [signatureIlisible, setSignatureIlisible] = useState(false);
  const [signatureNonScanne, setSignatureNonScanne] = useState(false);
  const [docArchiveStatus, setDocArchiveStatus] = useState('Scanné');
  const initialControlPoints: TarecControlPoint[] = [
    { id: 1, libelle: 'Absence combinaisons de pouvoirs sur le SI', pointVerification: '', commentaires: '' },
    { id: 2, libelle: 'Absence date et lieu de création', pointVerification: '', commentaires: '' },
    { id: 3, libelle: 'Absence demande sur papier entête', pointVerification: '', commentaires: '' },
    { id: 4, libelle: 'Absence griffe «Signature Conforme»', pointVerification: '', commentaires: '' },
    { id: 5, libelle: 'Absence instruction sur la demande', pointVerification: '', commentaires: '' },
    { id: 6, libelle: 'Absence mentions légales : RC/IF/ICE, adresse siège) sur le papier entête', pointVerification: '', commentaires: '' },
    { id: 7, libelle: 'Absence ordre original', pointVerification: '', commentaires: '' },
  ];
  const [controlPoints, setControlPoints] = useState<TarecControlPoint[]>(initialControlPoints);

  const updateControlPoint = (id: number, field: 'pointVerification' | 'commentaires', value: string) => {
    setControlPoints(prev => prev.map(point => point.id === id ? { ...point, [field]: value } : point));
  };

  if (!selectedOperation) return null;

  const isVirement = selectedOperation.type.toLowerCase().includes('virement');

  function setSignatureFragile(arg0: (prev: any) => boolean) {
    throw new Error('Function not implemented.');
  }

  return (
    <div data-testid="view-saisie-form">
      <div className="flex items-center gap-3 mb-5">
        <button
          className="flex items-center gap-1.5 text-[#1a5fa8] text-[12.5px] font-medium hover:underline transition-colors"
          onClick={() => dispatch({ type: 'SET_VIEW', payload: 'saisie' })}
          data-testid="btn-back-saisie"
        >
          <ArrowLeft className="w-4 h-4" /> Retour à la liste
        </button>
      </div>

      <div className="bg-white border border-[#e2e6f0] rounded-xl shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4 border-b border-[#eef0f8] bg-linear-to-r from-[#f8f9fd] to-white gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-linear-to-br from-[#4fc3f7] to-[#1a5fa8]">
              <Edit2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-[#1a2340]">Saisie du résultat de contrôle</h2>
              <p className="text-[12px] text-[#6b7280]">Workflow CCO : contrôle du bordereau, qualification des anomalies et validation DA.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-[#e3eefb] text-[#1a5fa8] text-[11px] font-bold">
              {ctrlTabs[selectedCtrlTab].ref}-0001
            </span>
            <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${selectedOperation.st === 'En attente' ? 'bg-[#fff3e0] text-[#e65100]' : 'bg-[#e8f5e9] text-[#2e7d32]'}`}>
              {selectedOperation.st}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="rounded-3xl border border-[#e2e6f0] bg-[#fafbfe] p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-linear-to-br from-[#4fc3f7] to-[#1a5fa8]">
                <span className="text-white text-[9px] font-bold">i</span>
              </div>
              <div>
                <div className="text-[13px] font-semibold text-[#1a2340]">Informations de l’opération</div>
                <div className="text-[12px] text-[#6b7280]">Toutes les informations utiles au contrôle CCO.</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-[13px] text-[#333]">
              {[
                { label: 'Réf. opération', value: selectedOperation.ref },
                { label: 'Montant', value: selectedOperation.mt + ' MAD' },
                { label: 'N° compte', value: selectedOperation.cpt },
                { label: 'Type', value: selectedOperation.type },
                { label: 'Agence', value: selectedOperation.agence },
                { label: 'Date', value: selectedOperation.date },
                { label: 'Code lieu', value: selectedOperation.lieu },
                { label: 'Indice sensibilité', value: selectedOperation.idx },
              ].map(item => (
                <div key={item.label} className="space-y-1">
                  <div className="text-[10px] text-[#888] uppercase tracking-wide font-semibold">{item.label}</div>
                  <div className="font-semibold text-[#1a2340]">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-3xl border border-[#d5d9ed] bg-white p-4">
              <div className="mb-2">
                <div className="text-[11px] text-[#888] uppercase tracking-wide font-semibold">Est-ce que le doc existe dans DOC_ARCHIVES ?</div>
                <div className="mt-2">
                  <select
                    className="w-full border border-[#d5d9ed] rounded-lg px-3 py-2 text-[12.5px] text-[#333] bg-white outline-none"
                    value={docArchiveStatus}
                    onChange={e => setDocArchiveStatus(e.target.value)}
                    data-testid="select-doc-archive-status"
                  >
                    {['Scanné', 'Non scanné', 'Localiser', 'Non localiser'].map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#d8e2f0] bg-[#f7faff] p-4">
            <div className="mb-4">
              <div className="text-[13px] font-semibold text-[#1a2340]">Points de vérification :</div>
              <div className="text-[12px] text-[#5f6b83]">Cochez les éléments observés sur le bordereau.</div>
            </div>
            <div className="flex flex-wrap gap-3 mb-5">
              {[
                {
                  label: 'Signature illisible sur BCT',
                  value: signatureIlisible,
                  onChange: () => setSignatureIlisible(prev => !prev),
                },
                {
                  label: 'Signature fragile sur BCT',
                  value: fragileSignature,
                  onChange: () => setSignatureFragile(prev => !prev),
                },
                {
                  label: 'Signature non scannée sur BCT',
                  value: signatureNonScanne,
                  onChange: () => setSignatureNonScanne(prev => !prev),
                },
              ].map((item, idx) => (
                <label key={idx} className="inline-flex items-center gap-3 rounded-full border border-[#dbe4f4] bg-white px-5 py-3 text-[13px] text-[#243145] shadow-sm hover:border-[#adc4eb] transition-colors">
                  <input
                    type="checkbox"
                    checked={item.value}
                    onChange={item.onChange}
                    className="h-4 w-4 text-[#1a5fa8] accent-[#1a5fa8]"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
            <div className="overflow-x-auto rounded-[28px] border border-[#dbe4f4] bg-white shadow-sm">
              <table className="min-w-full text-[12px] text-[#243145]">
                <thead className="bg-[#e9f2ff] text-[10px] uppercase tracking-[0.22em] text-[#5f6b83]">
                  <tr>
                    <th className="px-4 py-3 text-left">Points de vérification</th>
                    <th className="px-4 py-3 text-left">Commentaires</th>
                  </tr>
                </thead>
                <tbody>
                  {controlPoints.map(point => (
                    <tr key={point.id} className="border-t border-[#eef2f8] hover:bg-[#f7fbff]">
                      <td className="px-4 py-3 text-[#1a2340] font-medium align-top">{point.libelle}</td>
                      <td className="px-4 py-3 align-top">
                        <input
                          type="text"
                          value={point.commentaires}
                          onChange={e => updateControlPoint(point.id, 'commentaires', e.target.value)}
                          className="w-full rounded-full border border-[#dbe4f4] bg-[#f8fbff] px-3 py-2 text-[12px] text-[#243145] outline-none focus:border-[#1a5fa8]"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

            <div className="space-y-5">
              <div className="rounded-3xl border border-[#e2e6f0] bg-[#fafbfe] p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[13px] font-semibold text-[#1a2340]">Synthèse CCO</div>
                    <div className="text-[12px] text-[#6b7280]">Qualifiez le contrôle et le résultat DA.</div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#1a2340] bg-[#e3eefb] rounded-full px-3 py-1">Support : {isVirement ? 'Virement' : 'Standard'}</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <div className="text-[10.5px] text-[#888] font-semibold uppercase tracking-wide mb-1.5">Statut anomalie</div>
                    <div className="grid grid-cols-1 gap-3">
                      {['Conforme', 'Non conforme', 'Investigation complémentaire'].map(option => (
                        <label key={option} className="flex items-center gap-3 rounded-2xl border border-[#d7dde9] px-3 py-3 cursor-pointer hover:border-[#a8c4e8] transition-colors">
                          <input
                            type="radio"
                            name="anomaly"
                            value={option}
                            className="h-4 w-4 text-[#1a5fa8] accent-[#1a5fa8]"
                            checked={formStatut === option}
                            onChange={() => dispatch({ type: 'SET_FORM_STATUT', payload: option })}
                          />
                          <div>
                            <div className="text-[13px] text-[#1a2340]">{option}</div>
                            {option !== 'Conforme' && <div className="text-[11px] text-[#666]">{option === 'Non conforme' ? 'Anomalie identifiée.' : 'Analyse complémentaire requise.'}</div>}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-[#e2e6f0] bg-white p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-[13px] font-semibold text-[#1a2340]">Observations et anomalies</div>
                    <div className="text-[12px] text-[#6b7280]">Saisissez les anomalies et remarques du contrôle.</div>
                  </div>
                  <span className="text-[11px] bg-[#eef6ee] text-[#1f7a3c] rounded-full px-3 py-1">Pour clôture</span>
                </div>
                <textarea
                  className="w-full border border-[#d5d9ed] rounded-3xl px-4 py-3 text-[13px] text-[#333] bg-[#fafbfe] outline-none resize-none min-h-40 focus:border-[#1a5fa8] transition-colors"
                  placeholder="Décrire les anomalies, le constat DA, la signature et les points vérifiés."
                  data-testid="textarea-observations"
                />
              </div>
            </div>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center justify-between px-6 py-4 border-t border-[#eef0f8] bg-[#f8f9fd]">
          <button
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-[#d5d9ed] bg-white text-[#555] text-[12.5px] font-medium hover:bg-[#f0f2f8] transition-colors"
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'saisie' })}
            data-testid="btn-annuler"
          >
            <X className="w-3.5 h-3.5" /> Annuler
          </button>
          <button
            className="flex items-center justify-center gap-1.5 px-5 py-2 rounded-lg bg-[#1a5fa8] text-white text-[12.5px] font-semibold hover:bg-[#154c86] transition-colors shadow-sm"
            data-testid="btn-enregistrer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
