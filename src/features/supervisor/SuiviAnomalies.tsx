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
  AlertTriangle,
  ShieldAlert,
  X,
  Download,
  Eye,
} from 'lucide-react';
import { ctrlTabs, operations } from '../../services/operations';
import { InfoChip } from '../../app/components/core';
import { dashboardStyles as s } from '../dashboard/style';
import { useToast } from '@/hooks/use-toast';
import type { Operation } from '../../types';

interface SuiviAnomalieOperation extends Operation {
  cco: string;
  isClosed?: boolean;
  isEscalated?: boolean;
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

export function SuiviAnomalies() {
  const { toast } = useToast();
  const [selectedCtrlTab, setSelectedCtrlTab] = useState(0);
  const [selectedResultatDA, setSelectedResultatDA] = useState(ctrlTabs[0].res);

  // Initialize operations with mock CCO names, status fields, and mock CCO inputs
  const [ops, setOps] = useState<SuiviAnomalieOperation[]>(() =>
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
        isClosed: idx === 1, // Pre-close one for demonstration
        isEscalated: false,
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
  const [editingOp, setEditingOp] = useState<SuiviAnomalieOperation | null>(null);
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

  // Visual document liseuse modal
  const [showDocViewer, setShowDocViewer] = useState(false);

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
      description: 'La liste des anomalies a été mise à jour.',
    });
  };

  // Trigger Escalation Action
  const handleTriggerEscalation = () => {
    if (!editingOp) return;

    const updatedComments: Record<number, string> = {};
    controlPoints.forEach(p => {
      updatedComments[p.id] = p.commentaires;
    });

    setOps(prev =>
      prev.map(op =>
        op.n === editingOp.n
          ? {
              ...op,
              isEscalated: true,
              isClosed: false,
              notes: observations,
              remediationTriggered: true,
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
      title: 'Processus d\'escalade déclenché',
      description: `L'opération ${editingOp.ref} a été escaladée à la direction supérieure.`,
      variant: 'default',
    });

    setEditingOp(null);
  };

  // Validate & Close Anomaly Action (Satisfaisant)
  const handleCloseAnomaly = () => {
    if (!editingOp) return;

    const updatedComments: Record<number, string> = {};
    controlPoints.forEach(p => {
      updatedComments[p.id] = p.commentaires;
    });

    setOps(prev =>
      prev.map(op =>
        op.n === editingOp.n
          ? {
              ...op,
              isClosed: true,
              isEscalated: false,
              notes: observations,
              signatureIlisible,
              signatureFragile,
              signatureNonScanne,
              docArchiveStatus,
              statutAnomalie: 'Conforme',
              observationsCCO,
              commentairesPoints: updatedComments,
            }
          : op
      )
    );

    toast({
      title: 'Anomalie régularisée & Clôturée',
      description: `L'opération ${editingOp.ref} a été marquée comme conforme et clôturée.`,
    });

    setEditingOp(null);
  };

  // Filter operations based on filters
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

  // Get dynamic filename based on operation details
  const getAttachmentDetails = (op: SuiviAnomalieOperation) => {
    const isVirement = op.type?.startsWith('70') || op.lib?.includes('VIREMENT');
    return {
      name: isVirement ? 'Bordereau_Virement_Signe.pdf' : 'CNI_et_Signature_Régularisée.pdf',
      size: isVirement ? '342 KB' : '1.1 MB',
      title: isVirement ? "BORDEREAU D'ORDRE DE VIREMENT" : "TICKET DE RETRAIT ESPÈCES CHÈQUE",
      beneficiary: isVirement ? "VIREMENT INTERBANCAIRE" : "RETRAIT ESPÈCES CLIENT",
      amountText: isVirement ? `${op.mt} MAD` : `${op.mt} MAD`,
      amountLetters: isVirement ? "Deux cent quatre-vingt mille Dirhams (280 000,00 MAD)" : "Quarante-cinq mille Dirhams (45 000,00 MAD)",
      stampText: isVirement ? "CRÉDIT DU MAROC - TANGER CORNICHE - CONFORME" : "CRÉDIT DU MAROC - SIGNATURE VÉRIFIÉE",
    };
  };

  const attDetails = editingOp ? getAttachmentDetails(editingOp) : null;

  if (editingOp && attDetails) {
    // EDIT VIEW (FORM COMPONENT)
    return (
      <div data-testid="view-suivi-anomalies-form" className="space-y-5">
        <div className="flex items-center justify-between">
          <button
            className="flex items-center gap-1.5 text-[#1a5fa8] text-[12.5px] font-medium hover:underline transition-colors"
            onClick={() => setEditingOp(null)}
          >
            <ArrowLeft className="w-4 h-4" /> Retour à la liste
          </button>
          
          {editingOp.isEscalated && (
            <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
              <ShieldAlert className="w-3.5 h-3.5" /> Dossier en Escalade active
            </span>
          )}
        </div>

        <div className="bg-white border border-[#e2e6f0] rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4 border-b border-[#eef0f8] bg-gradient-to-r from-[#f8f9fd] to-white gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-[#f59e0b] to-[#d97706]">
                <Edit2 className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-[15px] font-semibold text-[#1a2340]">Qualification & Escalade de l'anomalie</h2>
                <p className="text-[12px] text-[#6b7280]">Analysez les justificatifs de retour, qualifiez l'anomalie ou déclenchez l'escalade.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-[#e3eefb] text-[#1a5fa8] text-[11px] font-bold">
                {ctrlTabs[selectedCtrlTab].ref}-ANOMALIE
              </span>
              <span
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                  editingOp.isClosed
                    ? 'bg-[#e8f5e9] text-[#2e7d32]'
                    : editingOp.isEscalated
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-[#fff3e0] text-[#e65100]'
                }`}
              >
                {editingOp.isClosed ? 'Clôturée' : editingOp.isEscalated ? 'Escaladée' : 'En cours de suivi'}
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
                  <div className="text-[13px] font-semibold text-[#1a2340]">Détails de l’opération suspecte</div>
                  <div className="text-[12px] text-[#6b7280]">Informations de la transaction et écart relevé.</div>
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

            {/* 2. INBOX RETURN DOCUMENT PREVIEW SECTION (CRITICAL REQUIREMENT) */}
            <div className="rounded-3xl border border-[#cbd5e1] bg-[#f8fafc] p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#1a5fa8]" />
                  <div>
                    <h3 className="text-[13px] font-semibold text-[#1a2340]">Pièce justificative reçue du retour d'agence</h3>
                    <p className="text-[11.5px] text-[#6b7280]">Veuillez lire et analyser ce document pour valider ou non la régularisation.</p>
                  </div>
                </div>
                <span className="bg-[#eef4ff] text-[#1a5fa8] border border-[#dbe4f4] px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                  Document Reçu
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-[#e2e6f0] p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 border border-red-150 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[12.5px] font-bold text-[#1a2340] max-w-xs md:max-w-md truncate">
                      {attDetails.name}
                    </div>
                    <div className="text-[11px] text-[#888]">{attDetails.size} • Reçu de l'agence exécutante</div>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => setShowDocViewer(true)}
                  className="px-4 py-2 rounded-xl bg-[#1a5fa8] hover:bg-[#154c86] text-white text-[12px] font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0"
                >
                  <Eye className="w-3.5 h-3.5" /> Voir le document
                </button>
              </div>
            </div>

            {/* 3. CCO INPUTS INTEGRATION (VISUALIZE & OVERRIDE) */}
            <div className="border border-[#e2e6f0] rounded-3xl p-5 bg-white space-y-6">
              <div className="flex items-center gap-2 border-b border-[#eef0f8] pb-3">
                <Edit className="w-4 h-4 text-[#1a5fa8]" />
                <div>
                  <h3 className="text-[14px] font-bold text-[#1a2340]">Saisie CCO à vérifier et modifier</h3>
                  <p className="text-[12px] text-[#6b7280]">Vérifiez les points cochés par le CCO et apportez des corrections si nécessaire.</p>
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

              {/* Anomaly status & Observations */}
              <div className="grid gap-4 sm:grid-cols-2 pt-2">
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

            {/* 4. Observations & Supervisor notes */}
            <div className="rounded-3xl border border-[#e2e6f0] bg-white p-4">
              <div>
                <h3 className="text-[13px] font-semibold text-[#1a2340]">Observations & Directives de Supervision</h3>
                <p className="text-[12px] text-[#6b7280]">Ajoutez vos directives ou remarques justifiant la clôture ou l'escalade de cette anomalie.</p>
              </div>
              <textarea
                className="w-full border border-[#d5d9ed] rounded-2xl px-4 py-3 text-[13px] text-[#333] bg-[#fafbfe] outline-none resize-none min-h-32 mt-3 focus:border-[#1a5fa8] transition-colors"
                placeholder="Ex. Le document d'agence ne comporte pas les signatures requises. Escalade pour remédiation formelle."
                value={observations}
                onChange={e => setObservations(e.target.value)}
              />
            </div>
          </div>

          {/* Form Actions Footer (REPLACING ENREGISTRER WITH ESCALADE BUTTON) */}
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
                className="flex items-center justify-center gap-1.5 px-5 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-red-600 text-white text-[12.5px] font-semibold hover:from-amber-700 hover:to-red-700 transition-colors shadow-sm"
                onClick={handleTriggerEscalation}
              >
                <AlertTriangle className="w-3.5 h-3.5" /> Déclencher le processus d'escalade
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-1.5 px-5 py-2 rounded-lg bg-[#2e7d32] text-white text-[12.5px] font-semibold hover:bg-[#235f26] transition-colors shadow-sm"
                onClick={handleCloseAnomaly}
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Valider & Clôturer l'opération
              </button>
            </div>
          </div>
        </div>

        {/* 4. VISUAL HIGH-FIDELITY DOCUMENT VIEWER OVERLAY */}
        {showDocViewer && editingOp && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#f0f2f5] rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              {/* Viewer Header */}
              <div className="bg-[#1a2340] px-6 py-4 flex items-center justify-between text-white border-b border-[#2d3a63]">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#4fc3f7]" />
                  <div>
                    <h3 className="text-[14px] font-bold">{attDetails.name}</h3>
                    <p className="text-[11.5px] text-[#9aa8bc]">Liseuse de documents justificatifs agence</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      toast({
                        title: 'Téléchargement lancé',
                        description: 'Le justificatif a été enregistré sur votre machine.',
                      });
                    }}
                    className="p-2 bg-[#2d3a63] hover:bg-[#3b4c80] rounded-xl transition text-white"
                    title="Télécharger"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDocViewer(false)}
                    className="p-2 bg-red-600/30 hover:bg-red-600/50 text-red-400 rounded-xl transition"
                    title="Fermer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Document Scanned View Container */}
              <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-gray-500/10">
                {/* Simulated A4 Sheet */}
                <div className="bg-white border border-[#c4cbd9] w-full max-w-xl p-8 shadow-md rounded-[4px] relative min-h-[640px] text-black font-sans flex flex-col justify-between">
                  <div>
                    {/* Bank Header Logo style */}
                    <div className="flex items-start justify-between border-b-[2px] border-black pb-4 mb-6">
                      <div>
                        <div className="text-[15px] font-extrabold tracking-wider text-[#1a2340]">
                          CRÉDIT DU MAROC
                        </div>
                        <div className="text-[9px] text-gray-500 uppercase tracking-widest mt-0.5">
                          groupe attijariwafa bank
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-gray-700">ORDRE DE TRANSACTION</div>
                        <div className="text-[8px] text-gray-400 mt-0.5">CODE LIEU: {editingOp.lieu} / DEPT CAISSE</div>
                      </div>
                    </div>

                    {/* Document Title */}
                    <div className="text-center my-6">
                      <h4 className="text-[14px] font-bold underline tracking-wide">
                        {attDetails.title}
                      </h4>
                    </div>

                    {/* Transaction details grid */}
                    <div className="space-y-4 text-[12px] my-6">
                      <div className="flex justify-between border-b border-gray-100 py-1.5">
                        <span className="font-semibold text-gray-500">RÉFÉRENCE UNIQUE D'OPÉRATION</span>
                        <span className="font-bold text-[#1a2340] tracking-wider">{editingOp.ref}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 py-1.5">
                        <span className="font-semibold text-gray-500">COMPTE DÉBITEUR (TIB)</span>
                        <span className="font-mono font-semibold text-gray-800">{editingOp.cpt}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 py-1.5">
                        <span className="font-semibold text-gray-500">AGENCE EXÉCUTANTE</span>
                        <span className="font-bold text-gray-800">{editingOp.agence}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 py-1.5">
                        <span className="font-semibold text-gray-500">BÉNÉFICIAIRE</span>
                        <span className="font-semibold text-gray-800">{attDetails.beneficiary}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 py-1.5">
                        <span className="font-semibold text-gray-500">MONTANT DE LA TRANSACTION</span>
                        <span className="font-bold text-[13px] text-[#1a2340]">{attDetails.amountText}</span>
                      </div>
                      <div className="py-2 bg-gray-50 px-3 rounded-lg text-[11px] italic text-gray-600 leading-normal border border-gray-150">
                        Montant en lettres: {attDetails.amountLetters}
                      </div>
                    </div>
                  </div>

                  {/* Validation and Signature section */}
                  <div className="space-y-8 mt-12 pt-4 border-t border-dashed border-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Customer signature */}
                      <div className="border border-gray-100 rounded-lg p-3 relative h-28 flex flex-col justify-between">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                          SIGNATURE PORTANTE
                        </span>
                        <div className="text-center">
                          {/* simulated signature */}
                          <div className="font-serif italic text-[18px] text-gray-500 select-none pointer-events-none transform -rotate-3 select-none">
                            Signature Validée
                          </div>
                        </div>
                        <span className="text-[8px] text-center text-gray-400 block mt-2">COMPARÉE AU DOSSIER</span>
                      </div>

                      {/* Agency Validation Stamp (Griffe) */}
                      <div className="border-[2px] border-blue-600/70 text-blue-600/80 rounded-xl p-3 relative h-28 flex flex-col justify-between items-center text-center transform rotate-2">
                        <div className="text-[8px] font-extrabold uppercase tracking-widest">
                          CONTRÔLE INTERNE CDM
                        </div>
                        <div className="flex flex-col items-center gap-1 my-1">
                          <CheckCircle2 className="w-5 h-5 text-blue-600/80" />
                          <span className="text-[8.5px] font-bold leading-tight">
                            {attDetails.stampText}
                          </span>
                        </div>
                        <span className="text-[8px] font-mono">DATE: {editingOp.date}</span>
                      </div>
                    </div>

                    <div className="text-[8px] text-gray-400 text-center leading-normal mt-4">
                      Ce document fait office de copie électronique certifiée conforme de la pièce justificative originale transmise par retour agence.
                    </div>
                  </div>
                </div>
              </div>

              {/* Viewer Footer */}
              <div className="bg-white border-t border-[#e2e6f0] px-6 py-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowDocViewer(false)}
                  className="px-4 py-2 border border-[#d5d9ed] bg-white text-[#555] rounded-xl text-[12.5px] font-semibold hover:bg-gray-50 transition"
                >
                  Fermer l'aperçu
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDocViewer(false);
                      handleTriggerEscalation();
                    }}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-[12.5px] font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    <AlertTriangle className="w-4 h-4" /> Non satisfaisant : Escalader
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowDocViewer(false);
                      handleCloseAnomaly();
                    }}
                    className="px-5 py-2 bg-[#2e7d32] text-white hover:bg-[#235f26] rounded-xl text-[12.5px] font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Satisfaisant : Clôturer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // LIST VIEW
  return (
    <div data-testid="view-suivi-anomalies">
      {/* Title */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-full flex items-center justify-center relative bg-gradient-to-br from-[#f59e0b] to-[#d97706]">
          <Briefcase className="w-4 h-4 text-white" />
          <div className="w-2.5 h-2.5 bg-[#e8174a] rounded-full absolute -top-0.5 -right-0.5 border-2 border-white" />
        </div>
        <h1 className="text-[15px] font-semibold text-[#1a2340]">Caisses comptables — Suivi et résolution des anomalies</h1>
      </div>

      {/* Info bar */}
      <div className="bg-white border border-[#e2e6f0] rounded-xl px-4 py-3 mb-4 flex items-center flex-wrap gap-x-4 gap-y-2 shadow-sm">
        <InfoChip label="Agence" value="011 – AGENCE DE TANGER CORNICHE" />
        <div className={s.divider} />
        <InfoChip label="Anomalies Total" value={ops.length.toString()} />
        <div className={s.divider} />
        <InfoChip label="Régularisées" value={ops.filter(o => o.isClosed).length.toString()} />
        <div className={s.divider} />
        <InfoChip label="Escaladées" value={ops.filter(o => o.isEscalated).length.toString()} />
        <div className={s.divider} />
        <InfoChip label="En attente" value={ops.filter(o => !o.isClosed && !o.isEscalated).length.toString()} />
      </div>

      {/* Controls CCO cards */}
      <div className={`${s.card} mb-4`}>
        <div className={s.cardHeader}>
          <div className="flex items-center gap-2 text-[13px] font-semibold text-[#1a2340]">
            <FileCheck className="w-4 h-4 text-[#1a5fa8]" />
            Catégories d'anomalies CCO
            <span className="ml-1.5 px-2 py-0.5 rounded-full bg-[#fff7ed] text-[#b45309] text-[11px] font-semibold">
              {ctrlTabs.length}
            </span>
          </div>
          <span className="text-[11px] text-[#999]">Sélectionnez un type de contrôle pour suivre ses anomalies.</span>
        </div>
        <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
          {ctrlTabs.map((c, i) => (
            <button
              key={i}
              data-testid={`anomaly-ctrl-card-${i}`}
              onClick={() => setSelectedCtrlTab(i)}
              className={`rounded-3xl border p-4 text-left transition-all ${
                selectedCtrlTab === i
                  ? 'border-[#f59e0b] bg-[#fffbeb] shadow-sm'
                  : 'border-[#e8edf4] bg-white hover:border-[#cbd5e1] hover:bg-[#f8fafd]'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${
                    selectedCtrlTab === i ? 'text-[#b45309]' : 'text-[#6b7280]'
                  }`}
                >
                  {c.ref}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    c.n > 0 ? 'bg-[#fff3e0] text-[#e65100]' : 'bg-[#f0f2f4] text-[#777]'
                  }`}
                >
                  {c.n} anomalies
                </span>
              </div>
              <div
                className={`text-[13px] font-semibold ${
                  selectedCtrlTab === i ? 'text-[#7c2d12]' : 'text-[#333]'
                }`}
              >
                {c.name}
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-[#666]">
                <span>Taux anomalies: {c.ref === 'CT21R_2.3' ? '4.0%' : c.ref === 'CT21R_2.5' ? '2.0%' : '0%'}</span>
                <span className="text-red-600 font-medium">Non conformes</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Operations List */}
      <div className={s.card}>
        <div className="flex flex-col gap-4 px-4 py-4 border-b border-[#eef0f8] bg-[#f8f9fd] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded-md bg-[#f59e0b] text-white text-[11px] font-bold">{ctrlTabs[selectedCtrlTab].ref}</span>
            <div>
              <div className="text-[13px] font-semibold text-[#1a2340]">
                {ctrlTabs[selectedCtrlTab].name}
              </div>
              <div className="text-[12px] text-[#6b7280]">
                Supervision des anomalies, consultation des retours justificatifs et processus d'escalade.
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-250 px-3 py-1 text-[11px] font-semibold text-amber-800">
              Escaladées: {ops.filter(o => o.isEscalated).length}
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-250 px-3 py-1 text-[11px] font-semibold text-emerald-800">
              Clôturées: {ops.filter(o => o.isClosed).length}
            </span>
          </div>
        </div>

        <div className={s.cardBody}>
          {/* Filters section */}
          <div className="bg-[#fafbfe] border border-[#e2e6f0] rounded-3xl p-4 mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-[#f59e0b]" />
              <span className="text-[13px] font-semibold text-[#1a2340]">Filtres de suivi des anomalies</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10.5px] text-[#888] font-semibold uppercase tracking-wide">N° compte</label>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="border border-[#d5d9ed] rounded-lg px-2.5 py-[7px] text-[12.5px] text-[#333] bg-white outline-none w-full focus:border-[#f59e0b] transition-colors"
                  value={filterCpt}
                  onChange={e => setFilterCpt(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10.5px] text-[#888] font-semibold uppercase tracking-wide">Réf. opération</label>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="border border-[#d5d9ed] rounded-lg px-2.5 py-[7px] text-[12.5px] text-[#333] bg-white outline-none w-full focus:border-[#f59e0b] transition-colors"
                  value={filterRef}
                  onChange={e => setFilterRef(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10.5px] text-[#888] font-semibold uppercase tracking-wide">Agence</label>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="border border-[#d5d9ed] rounded-lg px-2.5 py-[7px] text-[12.5px] text-[#333] bg-white outline-none w-full focus:border-[#f59e0b] transition-colors"
                  value={filterAgence}
                  onChange={e => setFilterAgence(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10.5px] text-[#888] font-semibold uppercase tracking-wide">CCO</label>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="border border-[#d5d9ed] rounded-lg px-2.5 py-[7px] text-[12.5px] text-[#333] bg-white outline-none w-full focus:border-[#f59e0b] transition-colors"
                  value={filterCco}
                  onChange={e => setFilterCco(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={handleApplyFilters}
              className="bg-[#f59e0b] hover:bg-[#d97706] text-white px-3.5 py-[7px] rounded-lg text-[12.5px] flex items-center gap-1.5 font-medium whitespace-nowrap justify-center mt-4 w-full transition-colors"
              data-testid="btn-appliquer-filtres-anomalies"
            >
              <Filter className="w-3.5 h-3.5" /> Filtrer les anomalies
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-3xl border border-[#e8eaf6]">
            <table className="w-full border-collapse text-[12px] min-w-200">
              <thead>
                <tr className="bg-[#f4f6fc]">
                  {['#', 'Réf. opération', 'N° compte', 'Lieu', 'Type', 'Libellé', 'Montant', 'Statut Suivi', 'Actions'].map(h => (
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
                      r.hl ? 'bg-[#fffbeb]' : ''
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
                    <td className={s.tableCell}>
                      {r.isClosed ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#2e7d32] font-semibold bg-[#e8f5e9] px-2 py-0.5 rounded-md">
                          <Check className="w-3 h-3" /> Clôturée
                        </span>
                      ) : r.isEscalated ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-800 font-semibold bg-amber-100 border border-amber-250 px-2 py-0.5 rounded-md">
                          <ShieldAlert className="w-3 h-3 text-amber-700" /> Escaladée
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#e65100] font-semibold bg-[#fff3e0] px-2 py-0.5 rounded-md">
                          <AlertTriangle className="w-3 h-3 text-[#e65100]" /> À qualifier
                        </span>
                      )}
                    </td>
                    <td className={s.tableCell}>
                      <div className="flex gap-2.5">
                        <button
                          type="button"
                          className="px-2.5 py-1 text-[11.5px] font-semibold text-[#1a5fa8] hover:bg-[#eef4ff] border border-[#d5d9ed] rounded-md transition-colors flex items-center gap-1"
                          onClick={() => setEditingOp(r)}
                          title="Éditer et analyser l'anomalie"
                        >
                          <Edit2 className="w-3 h-3" /> Éditer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredOps.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-gray-500 font-medium bg-[#fafafa]">
                      Aucune anomalie à suivre.
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
