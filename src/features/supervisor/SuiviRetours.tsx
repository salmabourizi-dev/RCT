import { useState } from 'react';
import {
  Mail,
  MailOpen,
  Search,
  FileText,
  Clock,
  CheckCircle2,
  X,
  Download,
  AlertCircle,
  CornerUpLeft,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { InfoChip } from '../../app/components/core';
import { dashboardStyles as s } from '../dashboard/style';

interface EmailMessage {
  id: string;
  sender: string;
  senderEmail: string;
  date: string;
  subject: string;
  preview: string;
  body: string;
  isRead: boolean;
  refOp: string;
  montant: string;
  compte: string;
  attachmentName: string;
  attachmentSize: string;
  documentMockup: {
    title: string;
    beneficiary: string;
    description: string;
    stampText: string;
  };
}

export function SuiviRetours() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmailId, setSelectedEmailId] = useState<string>('msg-1');
  const [showDocViewer, setShowDocViewer] = useState(false);

  // Initial mockup emails in the inbox
  const [emails, setEmails] = useState<EmailMessage[]>([
    {
      id: 'msg-1',
      sender: 'Agence Tanger Corniche (011)',
      senderEmail: 'tanger.corniche@creditdumaroc.ma',
      date: '02/06/2026 à 10:15',
      subject: 'Retour justificatif - Op. virement 280 000 MAD (Réf. 01199253635754846)',
      preview: 'Bonjour, suite à votre demande de justificatifs, veuillez trouver ci-joint le...',
      body: `Bonjour Monsieur Alaoui,\n\nSuite à l'anomalie signalée lors du contrôle CCO pour l'opération de virement interbancaire d'un montant de 280 000 MAD (N° compte: 02164000001103005059920), nous avons procédé aux vérifications nécessaires auprès du client.\n\nVous trouverez ci-joint le bordereau d'ordre de virement original, dûment signé par le titulaire du compte avec la griffe de conformité apposée par l'agence.\n\nNous restons à votre disposition pour tout complément d'information.\n\nCordialement,\nLe Directeur de l'Agence Tanger Corniche`,
      isRead: false,
      refOp: '01199253635754846',
      montant: '280 000 MAD',
      compte: '02164000001103005059920',
      attachmentName: 'Bordereau_Virement_Signe.pdf',
      attachmentSize: '342 KB',
      documentMockup: {
        title: "BORDEREAU D'ORDRE DE VIREMENT",
        beneficiary: "VIREMENT INTERBANCAIRE",
        description: "Deux cent quatre-vingt mille Dirhams (280 000,00 MAD)",
        stampText: "CRÉDIT DU MAROC - TANGER CORNICHE - CONFORME",
      },
    },
    {
      id: 'msg-2',
      sender: 'Agence Casablanca Anfa (022)',
      senderEmail: 'casa.anfa@creditdumaroc.ma',
      date: '01/06/2026 à 15:30',
      subject: 'Justificatif de Régularisation - Retrait espèces Chèque Client (Réf. 022881546)',
      preview: 'Madame, Monsieur, nous vous transmettons le livret de compte régularisé pour...',
      body: `Madame, Monsieur,\n\nNous faisons suite à la demande de documents justificatifs initiée hier par votre supervision sur les retraits de caisse.\n\nVous trouverez en pièce jointe la pièce d'identité (CNI) scannée du porteur du chèque ainsi que la double signature validée en agence.\n\nNous vous remercions de bien vouloir clôturer l'anomalie correspondante.\n\nRespectueusement,\nL'équipe Caisse de Casablanca Anfa`,
      isRead: true,
      refOp: '022881546',
      montant: '45 000 MAD',
      compte: '02164000002208009087541',
      attachmentName: 'Justificatif_Retrait_Cheque.pdf',
      attachmentSize: '1.2 MB',
      documentMockup: {
        title: "TICKET DE RETRAIT ESPÈCES CHÈQUE",
        beneficiary: "RETRAIT CLIENT",
        description: "Quarante-cinq mille Dirhams (45 000,00 MAD)",
        stampText: "CRÉDIT DU MAROC - CASABLANCA ANFA - SIGNATURE VÉRIFIÉE",
      },
    },
    {
      id: 'msg-3',
      sender: 'Agence Rabat Agdal (033)',
      senderEmail: 'rabat.agdal@creditdumaroc.ma',
      date: '30/05/2026 à 09:12',
      subject: 'Pièces complémentaires - Retrait Livret CSC (Réf. 033772591)',
      preview: 'Bonjour, vous trouverez en pièce jointe le scan du livret de compte sur carnet...',
      body: `Bonjour,\n\nNous vous prions de trouver ci-joint le scan du livret de compte sur carnet (CSC) mis à jour pour le retrait d'espèces de 12 000 MAD du 29/12.\n\nLa signature a été comparée et validée par notre chef de caisse.\n\nCordialement,\nAgence Rabat Agdal`,
      isRead: true,
      refOp: '033772591',
      montant: '12 000 MAD',
      compte: '02164000003301004076329',
      attachmentName: 'Scan_CSC_Signe_Agdal.pdf',
      attachmentSize: '780 KB',
      documentMockup: {
        title: "BORDEREAU RETRAIT COMPTE SUR CARNET",
        beneficiary: "RETRAIT LIVRET CLIENT",
        description: "Douze mille Dirhams (12 000,00 MAD)",
        stampText: "CRÉDIT DU MAROC - RABAT AGDAL - LIVRET CSC VALIDÉ",
      },
    },
  ]);

  // Handle email click
  const handleSelectEmail = (id: string) => {
    setSelectedEmailId(id);
    setEmails(prev =>
      prev.map(email => (email.id === id ? { ...email, isRead: true } : email))
    );
  };

  // Validate return and close dossier
  const handleValidateReturn = (email: EmailMessage) => {
    toast({
      title: 'Dossier validé et clôturé',
      description: `L'opération ${email.refOp} (Agence ${email.sender}) a été clôturée avec succès suite à la réception du document.`,
    });
    // Remove email or mark it as validated in UI
    setEmails(prev => prev.filter(e => e.id !== email.id));
    setShowDocViewer(false);
  };

  // Filtered emails based on search
  const filteredEmails = emails.filter(
    email =>
      email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.refOp.includes(searchTerm)
  );

  const activeEmail = emails.find(e => e.id === selectedEmailId);

  return (
    <div data-testid="view-suivi-retours">
      {/* Title */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-full flex items-center justify-center relative bg-gradient-to-br from-[#4fc3f7] to-[#1a5fa8]">
          <Mail className="w-4 h-4 text-white" />
          {emails.some(e => !e.isRead) && (
            <div className="w-2.5 h-2.5 bg-[#e8174a] rounded-full absolute -top-0.5 -right-0.5 border-2 border-white" />
          )}
        </div>
        <h1 className="text-[15px] font-semibold text-[#1a2340]">Caisses comptables — Suivi des retours d'agences</h1>
      </div>

      {/* Info bar */}
      <div className="bg-white border border-[#e2e6f0] rounded-xl px-4 py-3 mb-4 flex items-center flex-wrap gap-x-4 gap-y-2 shadow-sm">
        <InfoChip label="Boîte de réception" value="Justificatifs CCO" />
        <div className={s.divider} />
        <InfoChip label="Dossiers en attente" value={emails.length.toString()} />
        <div className={s.divider} />
        <InfoChip label="Messages non lus" value={emails.filter(e => !e.isRead).length.toString()} />
      </div>

      {/* Main Mailbox Grid */}
      <div className="grid gap-5 lg:grid-cols-[380px_1fr] bg-white border border-[#e2e6f0] rounded-3xl overflow-hidden shadow-sm min-h-[580px]">
        {/* Left Panel: Email list */}
        <div className="border-r border-[#eef0f8] flex flex-col bg-[#fafbfe]">
          {/* Search Box */}
          <div className="p-4 border-b border-[#eef0f8] bg-white">
            <div className="relative">
              <Search className="w-4 h-4 text-[#999] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rechercher une agence, réf. opération..."
                className="w-full pl-10 pr-4 py-2.5 border border-[#d5d9ed] rounded-2xl text-[12.5px] text-[#333] bg-[#fafbfe] outline-none focus:border-[#1a5fa8] transition-colors"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Email Item List */}
          <div className="flex-1 overflow-y-auto max-h-[520px]">
            {filteredEmails.map(email => (
              <div
                key={email.id}
                onClick={() => handleSelectEmail(email.id)}
                className={`p-4 border-b border-[#eef0f8] cursor-pointer transition-colors ${
                  selectedEmailId === email.id
                    ? 'bg-[#eef4ff] border-r-[3px] border-r-[#1a5fa8]'
                    : 'hover:bg-[#f1f3f7] bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[12.5px] ${!email.isRead ? 'font-bold text-[#1a5fa8]' : 'font-semibold text-[#1a2340]'}`}>
                    {email.sender}
                  </span>
                  <span className="text-[10.5px] text-[#888] flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3" /> {email.date.split(' à ')[0]}
                  </span>
                </div>
                <div className={`text-[12px] truncate ${!email.isRead ? 'font-bold text-[#1a2340]' : 'text-[#333]'}`}>
                  {email.subject}
                </div>
                <div className="text-[11.5px] text-[#6b7280] mt-1 line-clamp-2 leading-relaxed">
                  {email.preview}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10.5px] bg-[#e3eefb] text-[#1a5fa8] px-2 py-0.5 rounded-md font-semibold">
                    Réf. {email.refOp}
                  </span>
                  {!email.isRead && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1a5fa8]" />
                  )}
                </div>
              </div>
            ))}
            {filteredEmails.length === 0 && (
              <div className="p-8 text-center text-[#888] font-medium">
                Aucun retour d'agence trouvé.
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Detail view */}
        <div className="flex flex-col bg-white min-h-[500px]">
          {activeEmail ? (
            <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">
              {/* Header Details */}
              <div className="border-b border-[#eef0f8] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-[15px] font-bold text-[#1a2340] mb-1.5 leading-snug">
                    {activeEmail.subject}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-[#333]">
                    <span className="font-semibold text-[#1a5fa8]">{activeEmail.sender}</span>
                    <span className="text-[#888]">&lt;{activeEmail.senderEmail}&gt;</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[11.5px] text-[#888]">{activeEmail.date}</div>
                  <span className="inline-flex items-center rounded-full bg-[#e8f5e9] px-2.5 py-0.5 text-[11px] font-semibold text-[#2e7d32] mt-1">
                    Pièce jointe disponible
                  </span>
                </div>
              </div>

              {/* Email Content Body */}
              <div className="text-[13px] text-[#243145] leading-relaxed whitespace-pre-line flex-1 border-b border-[#eef0f8] pb-6">
                {activeEmail.body}
              </div>

              {/* Attachment card */}
              <div className="rounded-2xl border border-[#dbe4f4] bg-[#f8fbff] p-4 max-w-md">
                <div className="text-[11px] text-[#888] uppercase tracking-wide font-semibold mb-2">Pièce jointe reçue (justificatif)</div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 border border-red-100">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[12.5px] font-bold text-[#1a2340] max-w-60 truncate">
                        {activeEmail.attachmentName}
                      </div>
                      <div className="text-[11.5px] text-[#888]">{activeEmail.attachmentSize}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowDocViewer(true)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#1a5fa8] text-white text-[12px] font-bold hover:bg-[#154c86] transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      Voir le document
                    </button>
                  </div>
                </div>
              </div>

              {/* Direct validations from inbox */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    toast({
                      title: 'Dossier rejeté',
                      description: `Une demande de pièces complémentaires a été renvoyée à l'agence ${activeEmail.sender}.`,
                    });
                  }}
                  className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-[12.5px] font-semibold transition-colors flex items-center gap-1.5"
                >
                  <CornerUpLeft className="w-3.5 h-3.5" /> Rejeter & Demander à nouveau
                </button>
                <button
                  type="button"
                  onClick={() => handleValidateReturn(activeEmail)}
                  className="px-5 py-2 bg-[#2e7d32] text-white hover:bg-[#235f26] rounded-lg text-[12.5px] font-bold transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Valider & Clôturer le Dossier
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-[#888]">
              <MailOpen className="w-12 h-12 text-[#ccc] mb-3" />
              <div className="text-[14px] font-medium">Sélectionnez un message pour voir son contenu</div>
            </div>
          )}
        </div>
      </div>

      {/* 4. VISUAL HIGH-FIDELITY DOCUMENT VIEWER OVERLAY */}
      {showDocViewer && activeEmail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#f0f2f5] rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Viewer Header */}
            <div className="bg-[#1a2340] px-6 py-4 flex items-center justify-between text-white border-b border-[#2d3a63]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#4fc3f7]" />
                <div>
                  <h3 className="text-[14px] font-bold">{activeEmail.attachmentName}</h3>
                  <p className="text-[11.5px] text-[#9aa8bc]">Liseuse de documents justificatifs agence</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    toast({
                      title: 'Téléchargement lancé',
                      description: 'Le fichier a été enregistré dans vos téléchargements.',
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
                      <div className="text-[8px] text-gray-400 mt-0.5">CODE LIEU: 011 / DEPT CAISSE</div>
                    </div>
                  </div>

                  {/* Document Title */}
                  <div className="text-center my-6">
                    <h4 className="text-[14px] font-bold underline tracking-wide">
                      {activeEmail.documentMockup.title}
                    </h4>
                  </div>

                  {/* Transaction details grid */}
                  <div className="space-y-4 text-[12px] my-6">
                    <div className="flex justify-between border-b border-gray-100 py-1.5">
                      <span className="font-semibold text-gray-500">RÉFÉRENCE UNIQUE D'OPÉRATION</span>
                      <span className="font-bold text-[#1a2340] tracking-wider">{activeEmail.refOp}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 py-1.5">
                      <span className="font-semibold text-gray-500">COMPTE DÉBITEUR (TIB)</span>
                      <span className="font-mono font-semibold text-gray-800">{activeEmail.compte}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 py-1.5">
                      <span className="font-semibold text-gray-500">AGENCE EXÉCUTANTE</span>
                      <span className="font-bold text-gray-800">{activeEmail.sender}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 py-1.5">
                      <span className="font-semibold text-gray-500">BÉNÉFICIAIRE</span>
                      <span className="font-semibold text-gray-800">{activeEmail.documentMockup.beneficiary}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 py-1.5">
                      <span className="font-semibold text-gray-500">MONTANT DE LA TRANSACTION</span>
                      <span className="font-bold text-[13px] text-[#1a2340]">{activeEmail.montant}</span>
                    </div>
                    <div className="py-2 bg-gray-50 px-3 rounded-lg text-[11px] italic text-gray-600 leading-normal border border-gray-150">
                      Montant en lettres: {activeEmail.documentMockup.description}
                    </div>
                  </div>
                </div>

                {/* Validation and Signature section */}
                <div className="space-y-8 mt-12 pt-4 border-t border-dashed border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Customer signature */}
                    <div className="border border-gray-100 rounded-lg p-3 relative h-28 flex flex-col justify-between">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                        SIGNATURE CLIENT
                      </span>
                      <div className="text-center">
                        {/* simulated signature */}
                        <div className="font-serif italic text-[18px] text-gray-500 select-none pointer-events-none transform -rotate-3 select-none">
                          Signature Validée
                        </div>
                      </div>
                      <span className="text-[8px] text-center text-gray-400 block mt-2">DÉPOSÉE AU DOSSIER</span>
                    </div>

                    {/* Agency Validation Stamp (Griffe) */}
                    <div className="border-[2px] border-blue-600/70 text-blue-600/80 rounded-xl p-3 relative h-28 flex flex-col justify-between items-center text-center transform rotate-2">
                      <div className="text-[8px] font-extrabold uppercase tracking-widest">
                        CONTRÔLE INTERNE CDM
                      </div>
                      <div className="flex flex-col items-center gap-1 my-1">
                        <CheckCircle2 className="w-5 h-5 text-blue-600/80" />
                        <span className="text-[8.5px] font-bold leading-tight">
                          {activeEmail.documentMockup.stampText}
                        </span>
                      </div>
                      <span className="text-[8px] font-mono">DATE: 29/12/2025</span>
                    </div>
                  </div>

                  <div className="text-[8px] text-gray-400 text-center leading-normal mt-4">
                    Ce document fait office de copie électronique certifiée conforme de la pièce justificative originale archivée.
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
              <button
                type="button"
                onClick={() => handleValidateReturn(activeEmail)}
                className="px-5 py-2 bg-[#2e7d32] text-white hover:bg-[#235f26] rounded-xl text-[12.5px] font-bold transition flex items-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" /> Valider & Clôturer le Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
