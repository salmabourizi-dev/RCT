export interface TarecContract {
  id: number;
  type: string;
  codeAgence: string;
  typeContrat: string;
  evenement: string;
  nCompte: string;
  nContrat: string;
  dateEvenement: string;
  statut: string;
  etatControle: string;
}

export interface TarecControlPoint {
  id: number;
  libelle: string;
  pointVerification: string;
  commentaires: string;
}

export const TAREC_OBJECTIF = 30;

export const VERIFICATION_OPTIONS = [
  { id: 'conforme', label: 'Conforme' },
  { id: 'scan-mismatch', label: 'Le contrat scanné ne correspond pas au contrat attendu' },
  { id: 'scan-incomplete', label: 'Scan Incomplet : Manque 2ème page' },
  { id: 'non-scan-repris', label: "Document non scanné déclaré 'Repris'" },
] as const;

export type VerificationOptionId = (typeof VERIFICATION_OPTIONS)[number]['id'];

export const tarecContracts: TarecContract[] = [
  { id: 1, type: 'Pack', codeAgence: '011', typeContrat: 'Pack Essentiel', evenement: 'CREATION', nCompte: '011001045821', nContrat: 'AA251201XKLP', dateEvenement: '12/05/2025', statut: 'À contrôler', etatControle: '' },
  { id: 2, type: 'Pack', codeAgence: '015', typeContrat: 'Pack Global', evenement: 'MODIFICATION', nCompte: '015001089432', nContrat: 'AA251298PLMN', dateEvenement: '14/05/2025', statut: 'À contrôler', etatControle: '' },
  { id: 3, type: 'Pack', codeAgence: '021', typeContrat: 'Pack Global Plus 1', evenement: 'CREATION', nCompte: '021001072706', nContrat: 'AA251352MMFQ', dateEvenement: '15/05/2025', statut: 'En cours', etatControle: '' },
  { id: 4, type: 'Pack', codeAgence: '021', typeContrat: 'Pack Global Plus 1', evenement: 'RESILIATION', nCompte: '021001033198', nContrat: 'AA251089RTYU', dateEvenement: '10/05/2025', statut: 'À contrôler', etatControle: '' },
  { id: 5, type: 'Pack', codeAgence: '032', typeContrat: 'Pack Premium', evenement: 'CREATION', nCompte: '032001056743', nContrat: 'AA251410QWER', dateEvenement: '16/05/2025', statut: 'À contrôler', etatControle: '' },
  { id: 6, type: 'Pack', codeAgence: '045', typeContrat: 'Pack Essentiel', evenement: 'MODIFICATION', nCompte: '045001078901', nContrat: 'AA251367ASDF', dateEvenement: '17/05/2025', statut: 'À contrôler', etatControle: '' },
  { id: 7, type: 'Pack', codeAgence: '052', typeContrat: 'Pack Global', evenement: 'CREATION', nCompte: '052001091234', nContrat: 'AA251388ZXCV', dateEvenement: '18/05/2025', statut: 'À contrôler', etatControle: '' },
  { id: 8, type: 'Pack', codeAgence: '061', typeContrat: 'Pack Global Plus 1', evenement: 'CREATION', nCompte: '061001102567', nContrat: 'AA251399BNMK', dateEvenement: '19/05/2025', statut: 'À contrôler', etatControle: '' },
];

export const defaultControlPoints: TarecControlPoint[] = [
  { id: 1, libelle: 'Support opération non signé par le client', pointVerification: '', commentaires: '' },
  { id: 2, libelle: 'Absence griffe «Signature Conforme»', pointVerification: '', commentaires: '' },
  { id: 3, libelle: 'Signature Partie Banque', pointVerification: '', commentaires: '' },
  { id: 4, libelle: 'Cachet CDM Banque', pointVerification: '', commentaires: '' },
  { id: 5, libelle: 'Absence de la signature client sur le SI', pointVerification: '', commentaires: '' },
];

export const DEFAULT_SELECTED_CONTRACT_ID = 3;
