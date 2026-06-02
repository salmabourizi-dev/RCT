import { useState, useEffect } from 'react';
import {
  Briefcase,
  FileCheck,
  ChevronRight,
  Filter,
  Search,
  Edit2,
  CheckCircle2,
  ArrowLeft,
  Activity,
  FileText,
  Check,
  Save,
  Lock,
  Edit,
} from 'lucide-react';
import { ctrlTabs, operations } from '../../services/operations';
import { InfoChip } from '../../app/components/core';
import { dashboardStyles as s } from '../dashboard/style';
import { useToast } from '@/hooks/use-toast';
import type { Operation } from '../../types';

// Extend the Operation type locally to support supervisor-specific and CCO validation fields
interface SupervisionOperation extends Operation {
  cco: string;
  isClosed?: boolean;
  remediationTriggered?: boolean;
  justificatifRequested?: boolean;
  notes?: string; // Supervisor notes
  signatureIlisible?: boolean;
  signatureFragile?: boolean;
  signatureNonScanne?: boolean;
  docArchiveStatus?: string;
  statutAnomalie?: string;
  commentairesPoints?: Record<number, string>;
  observationsCCO?: string;
}

export function SupervisionCC() {
  const { toast } = useToast();
  const [selectedCtrlTab, setSelectedCtrlTab] = useState(0);
  const [selectedResultatDA, setSelectedResultatDA] = useState(ctrlTabs[0].res);

  // Initialize operations with mock CCO names, status fields, and mock CCO inputs
  const [ops, setOps] = useState<SupervisionOperation[]>(() =>
    operations.map((op, idx) => {
      const signatureIlisible = idx === 3;
      const signatureFragile = idx === 5;
      const statutAnomalie = (idx === 3 || idx === 5) ? 'Non conforme' : 'Conforme';
      const docArchiveStatus = (idx === 3) ? 'Non scanné' : 'Scanné';
      const observationsCCO = (idx === 3)
        ? "Signature ne correspond pas au spécimen du carton de signature. Document absent de DOC_ARCHIVES."
        : (idx === 5)
        ? "Signature très fragile et peu lisible sur le BCT."
        : "Contrôle effectué, signature et documents conformes.";

      const commentairesPoints: Record<number, string> = {};
      if (idx === 3) {
        commentairesPoints[1] = "Absence de pouvoir sur le SI pour cette opération.";
        commentairesPoints[7] = "Bordereau non signé par le fondé de pouvoir.";
      }

      return {
        ...op,
        cco: idx % 2 === 0 ? 'A. Bennani' : 'S. Alaoui',
        isClosed: false,
        remediationTriggered: false,
        justificatifRequested: false,
        notes: '',
        signatureIlisible,
        signatureFragile,
        signatureNonScanne: false,
        docArchiveStatus,
        statutAnomalie,
        commentairesPoints,
        observationsCCO,
      };
    })
  );

  // Filters State
  const [filterCpt, setFilterCpt] = useState('');
  const [filterRef, setFilterRef] = useState('');
  const [filterAgence, setFilterAgence] = useState('');
  const [filterCco, setFilterCco] = useState('');

  // Active filters applied to list
  const [appliedFilters, setAppliedFilters] = useState({
    cpt: '',
    ref: '',
    agence: '',
    cco: '',
  });

  // Edit Mode State (Supervisor specific)
  const [editingOp, setEditingOp] = useState<SupervisionOperation | null>(null);
  const [remediationActive, setRemediationActive] = useState(false);
  const [justificatifActive, setJustificatifActive] = useState(false);
  const [observations, setObservations] = useState(''); // Supervisor notes

  // CCO Saisie state (copy for editing)
  const [signatureIlisible, setSignatureIlisible] = useState(false);
  const [signatureFragile, setSignatureFragile] = useState(false);
  const [signatureNonScanne, setSignatureNonScanne] = useState(false);
  const [docArchiveStatus, setDocArchiveStatus] = useState('Scanné');
  const [statutAnomalie, setStatutAnomalie] = useState('Conforme');
  const [observationsCCO, setObservationsCCO] = useState('');
  const [controlPoints, setControlPoints] = useState<{ id: number; libelle: string; commentaires: string }[]>([]);

  useEffect(() => {
    setSelectedResultatDA(ctrlTabs[selectedCtrlTab].res);
  }, [selectedCtrlTab]);

  // Handle when editingOp changes to populate form states
  useEffect(() => {
    if (editingOp) {
      setRemediationActive(!!editingOp.remediationTriggered);
      setJustificatifActive(!!editingOp.justificatifRequested);
      setObservations(editingOp.notes || '');

      // Load CCO inputs
      setSignatureIlisible(!!editingOp.signatureIlisible);
      setSignatureFragile(!!editingOp.signatureFragile);
      setSignatureNonScanne(!!editingOp.signatureNonScanne);
      setDocArchiveStatus(editingOp.docArchiveStatus || 'Scanné');
      setStatutAnomalie(editingOp.statutAnomalie || 'Conforme');
      setObservationsCCO(editingOp.observationsCCO || '');

      // Populate 7 CCO control points
      const initialPoints = [
        { id: 1, libelle: 'Absence combinaisons de pouvoirs sur le SI', commentaires: editingOp.commentairesPoints?.[1] || '' },
        { id: 2, libelle: 'Absence date et lieu de création', commentaires: editingOp.commentairesPoints?.[2] || '' },
        { id: 3, libelle: 'Absence demande sur papier entête', commentaires: editingOp.commentairesPoints?.[3] || '' },
        { id: 4, libelle: 'Absence griffe «Signature Conforme»', commentaires: editingOp.commentairesPoints?.[4] || '' },
        { id: 5, libelle: 'Absence instruction sur la demande', commentaires: editingOp.commentairesPoints?.[5] || '' },
        { id: 6, libelle: 'Absence mentions légales : RC/IF/ICE, adresse siège) sur le papier entête', commentaires: editingOp.commentairesPoints?.[6] || '' },
        { id: 7, libelle: 'Absence ordre original', commentaires: editingOp.commentairesPoints?.[7] || '' },
      ];
      setControlPoints(initialPoints);
    }
  }, [editingOp]);

  // Update a single control point comment
  const updateControlPointComment = (id: number, val: string) => {
    setControlPoints(prev =>
      prev.map(p => (p.id === id ? { ...p, commentaires: val } : p))
    );
  };

  // Apply filters handler
  const handleApplyFilters = () => {
    setAppliedFilters({
      cpt: filterCpt,
      ref: filterRef,
      agence: filterAgence,
      cco: filterCco,
    });
    toast({
      title: 'Filtres appliqués',
      description: 'La liste des opérations a été mise à jour.',
    });
  };

  // Direct Clôturer action from table row
  const handleCloseDirectly = (n: number) => {
    setOps(prev =>
      prev.map(op => (op.n === n ? { ...op, isClosed: true } : op))
    );
    const op = ops.find(o => o.n === n);
    toast({
      title: 'Opération clôturée',
      description: `L'opération ${op?.ref} a été clôturée avec succès.`,
    });
  };

  // Save changes from Edit Form
  const handleSaveEdit = (closeOperation = false) => {
    if (!editingOp) return;

    // Convert controlPoints array back to record
    const updatedComments: Record<number, string> = {};
    controlPoints.forEach(p => {
      updatedComments[p.id] = p.commentaires;
    });

    setOps(prev =>
      prev.map(op =>
        op.n === editingOp.n
          ? {
              ...op,
              remediationTriggered: remediationActive,
              justificatifRequested: justificatifActive,
              notes: observations,
              isClosed: closeOperation ? true : op.isClosed,
              // Save CCO inputs (edited by supervisor)
              signatureIlisible,
              signatureFragile,
              signatureNonScanne,
              docArchiveStatus,
              statutAnomalie,
              observationsCCO,
              commentairesPoints: updatedComments,
            }
          : op
      )
    );

    toast({
      title: closeOperation ? 'Opération clôturée & enregistrée' : 'Modifications enregistrées',
      description: closeOperation
        ? `L'opération ${editingOp.ref} a été clôturée et les actions ont été enregistrées.`
        : `Les actions pour l'opération ${editingOp.ref} ont été mises à jour.`,
    });

    setEditingOp(null);
  };

  // Filter operations based on CCO filter and inputs
  const filteredOps = ops.filter(op => {
    const matchesCpt = appliedFilters.cpt === '' || op.cpt.includes(appliedFilters.cpt);
    const matchesRef = appliedFilters.ref === '' || op.ref.includes(appliedFilters.ref);
    const matchesAgence =
      appliedFilters.agence === '' ||
      op.agence.toLowerCase().includes(appliedFilters.agence.toLowerCase());
    const matchesCco =
      appliedFilters.cco === '' ||
      op.cco.toLowerCase().includes(appliedFilters.cco.toLowerCase());

    return matchesCpt && matchesRef && matchesAgence && matchesCco;
  });

  if (editingOp) {
    // RENDER SUPERVISOR EDIT FORM WITH INTEGRATED CCO INPUTS
    return (
      <div data-testid="view-supervision-cc-form" className="space-y-5">
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-1.5 text-[#1a5fa8] text-[12.5px] font-medium hover:underline transition-colors"
            onClick={() => setEditingOp(null)}
          >
            <ArrowLeft className="w-4 h-4" /> Retour à la liste
          </button>
        </div>

        <div className="bg-white border border-[#e2e6f0] rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4 border-b border-[#eef0f8] bg-gradient-to-r from-[#f8f9fd] to-white gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-[#4fc3f7] to-[#1a5fa8]">
                <Edit2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-[15px] font-semibold text-[#1a2340]">Supervision et Validation</h2>
                <p className="text-[12px] text-[#6b7280]">Consultez, modifiez les saisies du CCO et validez le contrôle.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-[#e3eefb] text-[#1a5fa8] text-[11px] font-bold">
                {ctrlTabs[selectedCtrlTab].ref}-0001
              </span>
              <span
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                  editingOp.isClosed
                    ? 'bg-[#e8f5e9] text-[#2e7d32]'
                    : 'bg-[#fff3e0] text-[#e65100]'
                }`}
              >
                {editingOp.isClosed ? 'Clôturée' : 'En cours de supervision'}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* 1. Operation info card */}
            <div className="rounded-3xl border border-[#e2e6f0] bg-[#fafbfe] p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-br from-[#4fc3f7] to-[#1a5fa8]">
                  <span className="text-white text-[9px] font-bold">i</span>
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-[#1a2340]">Informations de l’opération</div>
                  <div className="text-[12px] text-[#6b7280]">Détails saisis par le CCO pour validation.</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[13px] text-[#333]">
                {[
                  { label: 'Réf. opération', value: editingOp.ref },
                  { label: 'Montant', value: editingOp.mt + ' MAD' },
                  { label: 'N° compte', value: editingOp.cpt },
                  { label: 'Type', value: editingOp.type },
                  { label: 'Agence', value: editingOp.agence },
                  { label: 'Date', value: editingOp.date },
                  { label: 'CCO Assigné', value: editingOp.cco },
                  { label: 'Indice sensibilité', value: editingOp.idx },
                ].map(item => (
                  <div key={item.label} className="space-y-1">
                    <div className="text-[10px] text-[#888] uppercase tracking-wide font-semibold">{item.label}</div>
                    <div className="font-semibold text-[#1a2340]">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. CCO INPUTS INTEGRATION (VISUALIZE & OVERRIDE) */}
            <div className="border border-[#e2e6f0] rounded-3xl p-5 bg-white space-y-6">
              <div className="flex items-center gap-2 border-b border-[#eef0f8] pb-3">
                <Edit className="w-4 h-4 text-[#1a5fa8]" />
                <div>
                  <h3 className="text-[14px] font-bold text-[#1a2340]">Saisie CCO à vérifier et modifier</h3>
                  <p className="text-[12px] text-[#6b7280]">Vérifiez les points cochés par le CCO et modifiez-les si nécessaire.</p>
                </div>
              </div>

              {/* Doc Archive Status */}
              <div>
                <div className="text-[11.5px] text-[#888] uppercase tracking-wide font-semibold">Le document existe-t-il dans DOC_ARCHIVES ?</div>
                <select
                  className="w-full max-w-xs border border-[#d5d9ed] rounded-lg px-3 py-2 text-[12.5px] text-[#333] bg-white outline-none mt-2 focus:border-[#1a5fa8]"
                  value={docArchiveStatus}
                  onChange={e => setDocArchiveStatus(e.target.value)}
                >
                  {['Scanné', 'Non scanné', 'Localiser', 'Non localiser'].map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Checkboxes Signatures */}
              <div className="space-y-2">
                <div className="text-[11.5px] text-[#888] uppercase tracking-wide font-semibold">Points de vérification (Signature sur BCT)</div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'Signature illisible sur BCT', value: signatureIlisible, onChange: () => setSignatureIlisible(!signatureIlisible) },
                    { label: 'Signature fragile sur BCT', value: signatureFragile, onChange: () => setSignatureFragile(!signatureFragile) },
                    { label: 'Signature non scannée sur BCT', value: signatureNonScanne, onChange: () => setSignatureNonScanne(!signatureNonScanne) },
                  ].map((item, idx) => (
                    <label key={idx} className={`inline-flex items-center gap-3 rounded-full border px-5 py-2.5 text-[12.5px] cursor-pointer transition ${item.value ? 'bg-[#eef4ff] border-[#1a5fa8] text-[#1a5fa8] font-medium' : 'bg-white border-[#dbe4f4] text-[#243145]'}`}>
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
              </div>

              {/* 7 Points control table */}
              <div className="space-y-2">
                <div className="text-[11.5px] text-[#888] uppercase tracking-wide font-semibold">Points de vérification réglementaires & Commentaires</div>
                <div className="overflow-x-auto rounded-2xl border border-[#dbe4f4] bg-white shadow-sm">
                  <table className="min-w-full text-[12px] text-[#243145]">
                    <thead className="bg-[#e9f2ff] text-[10px] uppercase tracking-[0.22em] text-[#5f6b83]">
                      <tr>
                        <th className="px-4 py-3 text-left">Points de vérification</th>
                        <th className="px-4 py-3 text-left">Commentaires du CCO / Modifiables</th>
                      </tr>
                    </thead>
                    <tbody>
                      {controlPoints.map(point => (
                        <tr key={point.id} className="border-t border-[#eef2f8] hover:bg-[#f7fbff]">
                          <td className="px-4 py-3 text-[#1a2340] font-medium align-top max-w-xs">{point.libelle}</td>
                          <td className="px-4 py-3 align-top">
                            <input
                              type="text"
                              value={point.commentaires}
                              onChange={e => updateControlPointComment(point.id, e.target.value)}
                              className="w-full rounded-lg border border-[#dbe4f4] bg-[#f8fbff] px-3 py-1.5 text-[12.5px] text-[#243145] outline-none focus:border-[#1a5fa8] transition-colors"
                              placeholder="Saisir un commentaire..."
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Anomaly status */}
              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                <div>
                  <div className="text-[11.5px] text-[#888] uppercase tracking-wide font-semibold mb-2">Statut anomalie (Synthèse CCO)</div>
                  <div className="space-y-2">
                    {['Conforme', 'Non conforme', 'Investigation complémentaire'].map(option => (
                      <label key={option} className={`flex items-center gap-3 rounded-2xl border px-3 py-2.5 cursor-pointer transition ${statutAnomalie === option ? 'bg-[#e3ebf5] border-[#1a5fa8]' : 'border-[#d7dde9] bg-white hover:border-[#a8c4e8]'}`}>
                        <input
                          type="radio"
                          name="synthesis-anomaly"
                          value={option}
                          className="h-4 w-4 text-[#1a5fa8] accent-[#1a5fa8]"
                          checked={statutAnomalie === option}
                          onChange={() => setStatutAnomalie(option)}
                        />
                        <div>
                          <div className="text-[12.5px] font-semibold text-[#1a2340]">{option}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Observations CCO */}
                <div>
                  <div className="text-[11.5px] text-[#888] uppercase tracking-wide font-semibold mb-2">Observations et anomalies (CCO)</div>
                  <textarea
                    className="w-full border border-[#d5d9ed] rounded-2xl px-4 py-2.5 text-[12.5px] text-[#333] bg-[#fafbfe] outline-none resize-none min-h-[110px] focus:border-[#1a5fa8]"
                    placeholder="Remarques et anomalies constatées par le CCO."
                    value={observationsCCO}
                    onChange={e => setObservationsCCO(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* 3. Remediation & Supporting Doc Toggles (Supervisor Specific) */}
            <div className="rounded-3xl border border-[#d8e2f0] bg-[#f7faff] p-5">
              <div className="mb-4">
                <h3 className="text-[13px] font-semibold text-[#1a2340]">Actions complémentaires de supervision</h3>
                <p className="text-[12px] text-[#5f6b83]">Sélectionnez les mesures à engager pour traiter cette anomalie.</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Choice 1: Remediation */}
                <button
                  type="button"
                  onClick={() => setRemediationActive(prev => !prev)}
                  className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition-all ${
                    remediationActive
                      ? 'border-[#1a5fa8] bg-[#e3ebf5] text-[#1a5fa8] shadow-sm'
                      : 'border-[#d5d9ed] bg-white text-[#5c6b82] hover:bg-[#fafbfe]'
                  }`}
                >
                  <div
                    className={`mt-1 p-2 rounded-xl flex items-center justify-center shrink-0 ${
                      remediationActive ? 'bg-[#1a5fa8] text-white' : 'bg-[#f0f2f4] text-[#5c6b82]'
                    }`}
                  >
                    <Activity className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-bold text-[#1a2340] flex items-center gap-1.5">
                      Processus de remédiation
                      {remediationActive && <Check className="w-3.5 h-3.5 text-[#1a5fa8]" />}
                    </div>
                    <p className="text-[11.5px] text-[#6b7280] mt-1 leading-normal">
                      Déclencher le processus officiel de remédiation et correction de l'anomalie.
                    </p>
                  </div>
                </button>

                {/* Choice 2: Supporting documents */}
                <button
                  type="button"
                  onClick={() => setJustificatifActive(prev => !prev)}
                  className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition-all ${
                    justificatifActive
                      ? 'border-[#2e7d32] bg-[#e8f5e9] text-[#2e7d32] shadow-sm'
                      : 'border-[#d5d9ed] bg-white text-[#5c6b82] hover:bg-[#fafbfe]'
                  }`}
                >
                  <div
                    className={`mt-1 p-2 rounded-xl flex items-center justify-center shrink-0 ${
                      justificatifActive ? 'bg-[#2e7d32] text-white' : 'bg-[#f0f2f4] text-[#5c6b82]'
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[13px] font-bold text-[#1a2340] flex items-center gap-1.5">
                      Demande de documents justificatifs
                      {justificatifActive && <Check className="w-3.5 h-3.5 text-[#2e7d32]" />}
                    </div>
                    <p className="text-[11.5px] text-[#6b7280] mt-1 leading-normal">
                      Exiger la transmission immédiate des justificatifs manquants auprès de l'agence.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* 4. Observations text area (Supervisor Specific) */}
            <div className="rounded-3xl border border-[#e2e6f0] bg-white p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-[13px] font-semibold text-[#1a2340]">Observations & Directives du Superviseur</h3>
                  <p className="text-[12px] text-[#6b7280]">Consigner vos remarques et instructions pour l'historique du contrôle.</p>
                </div>
              </div>
              <textarea
                className="w-full border border-[#d5d9ed] rounded-2xl px-4 py-3 text-[13px] text-[#333] bg-[#fafbfe] outline-none resize-none min-h-32 focus:border-[#1a5fa8] transition-colors"
                placeholder="Ex. Rappel de la procédure, vérifications complémentaires effectuées..."
                value={observations}
                onChange={e => setObservations(e.target.value)}
              />
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center justify-between px-6 py-4 border-t border-[#eef0f8] bg-[#f8f9fd]">
            <button
              type="button"
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-[#d5d9ed] bg-white text-[#555] text-[12.5px] font-medium hover:bg-[#f0f2f8] transition-colors"
              onClick={() => setEditingOp(null)}
            >
              Annuler
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex items-center justify-center gap-1.5 px-5 py-2 rounded-lg bg-white border border-[#d5d9ed] text-[#555] text-[12.5px] font-semibold hover:bg-[#f0f2f8] transition-colors"
                onClick={() => handleSaveEdit(false)}
              >
                <Save className="w-3.5 h-3.5" /> Enregistrer
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-1.5 px-5 py-2 rounded-lg bg-[#2e7d32] text-white text-[12.5px] font-semibold hover:bg-[#235f26] transition-colors shadow-sm"
                onClick={() => handleSaveEdit(true)}
              >
                <Lock className="w-3.5 h-3.5" /> Clôturer l'opération
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RENDER SUPERVISOR LIST VIEW (DEFAULT)
  return (
    <div data-testid="view-supervision-cc">
      {/* Title */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-full flex items-center justify-center relative bg-gradient-to-br from-[#4fc3f7] to-[#1a5fa8]">
          <Briefcase className="w-4 h-4 text-white" />
          <div className="w-2.5 h-2.5 bg-[#e8174a] rounded-full absolute -top-0.5 -right-0.5 border-2 border-white" />
        </div>
        <h1 className="text-[15px] font-semibold text-[#1a2340]">Caisses comptables — Supervision CC</h1>
      </div>

      {/* Info bar (Replace Rôle Actuel with Agence) */}
      <div className="bg-white border border-[#e2e6f0] rounded-xl px-4 py-3 mb-4 flex items-center flex-wrap gap-x-4 gap-y-2 shadow-sm">
        <InfoChip label="Agence" value="011 – AGENCE DE TANGER CORNICHE" />
        <div className={s.divider} />
        <InfoChip label="CC du" value="29/12/2025" />
        <div className={s.divider} />
        <InfoChip label="Total Opérations" value={ops.length.toString()} />
        <div className={s.divider} />
        <InfoChip label="Op. Clôturées" value={ops.filter(o => o.isClosed).length.toString()} />
        <div className={s.divider} />
        <InfoChip label="Op. En Cours" value={ops.filter(o => !o.isClosed).length.toString()} />
      </div>

      {/* Onglets des contrôles CCO (7 types) */}
      <div className={`${s.card} mb-4`}>
        <div className={s.cardHeader}>
          <div className="flex items-center gap-2 text-[13px] font-semibold text-[#1a2340]">
            <FileCheck className="w-4 h-4 text-[#1a5fa8]" />
            Contrôles à superviser
            <span className="ml-1.5 px-2 py-0.5 rounded-full bg-[#e3eefb] text-[#1a5fa8] text-[11px] font-semibold">
              {ctrlTabs.length}
            </span>
          </div>
          <span className="text-[11px] text-[#999]">Sélectionnez un type de contrôle pour voir les opérations.</span>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {ctrlTabs.map((c, i) => (
            <button
              key={i}
              data-testid={`ctrl-card-${i}`}
              onClick={() => setSelectedCtrlTab(i)}
              className={`rounded-3xl border p-4 text-left transition-all ${
                selectedCtrlTab === i
                  ? 'border-[#1a5fa8] bg-[#eef4ff] shadow-sm'
                  : 'border-[#e8edf4] bg-white hover:border-[#cbd5e1] hover:bg-[#f8fafd]'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                    selectedCtrlTab === i ? 'text-[#1a5fa8]' : 'text-[#6b7280]'
                  }`}
                >
                  {c.ref}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    c.n > 0 ? 'bg-[#dce8f8] text-[#1a5fa8]' : 'bg-[#f0f2f4] text-[#777]'
                  }`}
                >
                  {c.n} op.
                </span>
              </div>
              <div
                className={`text-[13px] font-semibold ${
                  selectedCtrlTab === i ? 'text-[#1a2340]' : 'text-[#333]'
                }`}
              >
                {c.name}
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-[#666]">
                <span>{c.res}</span>
                <span>{c.taux}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Liste des opérations du contrôle sélectionné */}
      <div className={s.card}>
        <div className="flex flex-col gap-4 px-4 py-4 border-b border-[#eef0f8] bg-[#f8f9fd] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className={s.refBadge}>{ctrlTabs[selectedCtrlTab].ref}</span>
            <div>
              <div className="text-[13px] font-semibold text-[#1a2340]">
                {ctrlTabs[selectedCtrlTab].name}
              </div>
              <div className="text-[12px] text-[#6b7280]">
                Supervision des écarts et actions correctives.
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-[#e3eefb] px-3 py-1 text-[11px] font-semibold text-[#1a5fa8]">
              Remédiations: {ops.filter(o => o.remediationTriggered).length}
            </span>
            <span className="inline-flex items-center rounded-full bg-[#e8f5ff] px-3 py-1 text-[11px] font-semibold text-[#1a5fa8]">
              Justificatifs: {ops.filter(o => o.justificatifRequested).length}
            </span>
          </div>
        </div>

        <div className={s.cardBody}>
          {/* Section Filtres Superviseur */}
          <div className="bg-[#fafbfe] border border-[#e2e6f0] rounded-3xl p-4 mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-[#1a5fa8]" />
              <span className="text-[13px] font-semibold text-[#1a2340]">Filtres de Supervision</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10.5px] text-[#888] font-semibold uppercase tracking-wide">N° compte</label>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="border border-[#d5d9ed] rounded-lg px-2.5 py-[7px] text-[12.5px] text-[#333] bg-white outline-none w-full focus:border-[#1a5fa8] transition-colors"
                  value={filterCpt}
                  onChange={e => setFilterCpt(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10.5px] text-[#888] font-semibold uppercase tracking-wide">Réf. opération</label>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="border border-[#d5d9ed] rounded-lg px-2.5 py-[7px] text-[12.5px] text-[#333] bg-white outline-none w-full focus:border-[#1a5fa8] transition-colors"
                  value={filterRef}
                  onChange={e => setFilterRef(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10.5px] text-[#888] font-semibold uppercase tracking-wide">Agence</label>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="border border-[#d5d9ed] rounded-lg px-2.5 py-[7px] text-[12.5px] text-[#333] bg-white outline-none w-full focus:border-[#1a5fa8] transition-colors"
                  value={filterAgence}
                  onChange={e => setFilterAgence(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10.5px] text-[#888] font-semibold uppercase tracking-wide">CCO</label>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="border border-[#d5d9ed] rounded-lg px-2.5 py-[7px] text-[12.5px] text-[#333] bg-white outline-none w-full focus:border-[#1a5fa8] transition-colors"
                  value={filterCco}
                  onChange={e => setFilterCco(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={handleApplyFilters}
              className={`${s.btnPrimary} mt-4 w-full justify-center`}
              data-testid="btn-appliquer-filtres-supervision"
            >
              <Filter className="w-3.5 h-3.5" /> Appliquer les filtres
            </button>
          </div>

          {/* Tableau épuré des opérations (sans Statut ni Doc. ARC) */}
          <div className="overflow-x-auto rounded-3xl border border-[#e8eaf6]">
            <table className="w-full border-collapse text-[12px] min-w-200">
              <thead>
                <tr className="bg-[#f4f6fc]">
                  {['#', 'Réf. opération', 'N° compte', 'Lieu', 'Type', 'Libellé', 'Montant', 'Indice', 'Actions'].map(h => (
                    <th key={h} className={s.tableHeader}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredOps.map(r => (
                  <tr
                    key={r.n}
                    className={`hover:bg-[#f8f9fd] transition-colors ${
                      r.hl ? 'bg-[#f0f6ff]' : ''
                    } ${r.isClosed ? 'opacity-70 bg-[#fafafa]' : ''}`}
                  >
                    <td className={`${s.tableCell} text-[#555]`}>{r.n}</td>
                    <td className={`${s.tableCell} text-[11px] font-bold text-[#1a2340] whitespace-nowrap`}>
                      {r.ref}
                    </td>
                    <td className={`${s.tableCell} text-[10.5px] text-[#555] whitespace-nowrap`}>
                      {r.cpt}
                    </td>
                    <td className={`${s.tableCell} text-[#555]`}>{r.lieu}</td>
                    <td className={`${s.tableCell} text-[#555]`}>{r.type}</td>
                    <td className={`${s.tableCell} text-[11.5px] text-[#333] max-w-40 truncate`}>
                      {r.lib}
                    </td>
                    <td className={`${s.tableCell} font-bold text-[#1a2340] whitespace-nowrap`}>
                      {r.mt}
                    </td>
                    <td className={`${s.tableCell} text-[#555]`}>{r.idx}</td>
                    <td className={s.tableCell}>
                      <div className="flex gap-2.5">
                        {r.isClosed ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#2e7d32] font-semibold bg-[#e8f5e9] px-2 py-1 rounded-md">
                            <Check className="w-3 h-3" /> Clôturée
                          </span>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="px-2.5 py-1 text-[11.5px] font-semibold text-[#1a5fa8] hover:bg-[#eef4ff] border border-[#d5d9ed] rounded-md transition-colors flex items-center gap-1"
                              onClick={() => setEditingOp(r)}
                              title="Éditer et qualifier l'opération"
                            >
                              <Edit2 className="w-3 h-3" /> Éditer
                            </button>
                            <button
                              type="button"
                              className="px-2.5 py-1 text-[11.5px] font-semibold text-[#2e7d32] hover:bg-[#e8f5e9] border border-[#d5d9ed] rounded-md transition-colors flex items-center gap-1"
                              onClick={() => handleCloseDirectly(r.n)}
                              title="Clôturer immédiatement le contrôle"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Clôturer
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredOps.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-gray-500 font-medium bg-[#fafafa]">
                      Aucune opération ne correspond à vos critères de recherche.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex gap-2 mt-4 pt-3 border-t border-[#f0f3fb]">
            <button
              onClick={() => {
                setFilterCpt('');
                setFilterRef('');
                setFilterAgence('');
                setFilterCco('');
                setAppliedFilters({ cpt: '', ref: '', agence: '', cco: '' });
                toast({ title: 'Filtres réinitialisés' });
              }}
              className={s.btnSecondary}
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
