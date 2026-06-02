import type { ComponentType } from 'react';
import { ClipboardList, FileSearch, Layers, ShieldCheck, TrendingUp, Undo2 } from 'lucide-react';
import type { ActiveView } from '../../types';
import { SupervisionCC } from './SupervisionCC';
import { SuiviRetours } from './SuiviRetours';

const supervisorLabels: Record<ActiveView, { title: string; description: string; icon: ComponentType<any> }> = {
  statistiques: {
    title: 'Statistiques',
    description: 'Pilotage des indicateurs clés et vision globale des contrôles CCO.',
    icon: TrendingUp,
  },
  'suivi-investigations': {
    title: 'Suivi des anomalies',
    description: 'Analyse des anomalies de caisse détectées et en cours de suivi.',
    icon: FileSearch,
  },
  'suivi-docs': {
    title: 'Suivi DOC Non repris',
    description: 'Traçabilité des documents non repris et relances en attente.',
    icon: ClipboardList,
  },
  'supervision-cc': {
    title: 'Supervision CC',
    description: 'Supervision des contrôles CCO et validation des résultats.',
    icon: Layers,
  },
  'supervision-da': {
    title: 'Supervision fiche DA',
    description: 'Vérification des fiches DA et suivi des anomalies détectées.',
    icon: ShieldCheck,
  },
  'suivi-retours': {
    title: 'Suivi des retours',
    description: 'Suivi des retours de lots et des suspens de caisse.',
    icon: Undo2,
  },
  home: { title: '', description: '', icon: ShieldCheck },
  saisie: { title: '', description: '', icon: ShieldCheck },
  'saisie-form': { title: '', description: '', icon: ShieldCheck },
  planning: { title: '', description: '', icon: ShieldCheck },
  'saisie-anomalies': { title: '', description: '', icon: ShieldCheck },
};

export function SupervisorFeature({ view }: { view: ActiveView }) {
  if (view === 'supervision-cc') {
    return <SupervisionCC />;
  }
  if (view === 'suivi-retours') {
    return <SuiviRetours />;
  }

  const entry = supervisorLabels[view];
  const Icon = entry.icon;

  return (
    <div className="rounded-[28px] border border-[#dbe4f4] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#1a5fa8]">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="text-[22px] font-semibold text-[#1a2340]">{entry.title}</div>
          <p className="text-[13px] text-[#5f6b83] mt-1">{entry.description}</p>
        </div>
      </div>

      {view === 'statistiques' ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-[28px] border border-[#dbe4f4] bg-[#eef4ff] p-6 text-center">
            <div className="text-[12px] uppercase tracking-[0.18em] text-[#5c6b82] mb-3">Taux de réalisation</div>
            <div className="text-[34px] font-semibold text-[#1a5fa8]">73.4%</div>
            <div className="mt-3 text-[13px] text-[#6b7280]">Indicateur de la performance effective des contrôles CCO.</div>
          </div>
          <div className="rounded-[28px] border border-[#dbe4f4] bg-[#fff7ed] p-6 text-center">
            <div className="text-[12px] uppercase tracking-[0.18em] text-[#7c5c28] mb-3">Taux du contrôle</div>
            <div className="text-[34px] font-semibold text-[#c55a11]">65.2%</div>
            <div className="mt-3 text-[13px] text-[#6b7280]">Couverture des opérations effectivement contrôlées.</div>
          </div>
          <div className="rounded-[28px] border border-[#dbe4f4] bg-[#fef3f2] p-6 text-center">
            <div className="text-[12px] uppercase tracking-[0.18em] text-[#9b2c2c] mb-3">Taux d’anomalie</div>
            <div className="text-[34px] font-semibold text-[#b91c1c]">12.8%</div>
            <div className="mt-3 text-[13px] text-[#6b7280]">Part des opérations avec anomalies détectées.</div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-[#e8edf4] bg-[#f9fbff] p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#6b7280] mb-2">Actions recommandées</div>
            <div className="space-y-3 text-[13px] text-[#334155]">
              {view === 'suivi-retours' ? (
                <>
                  <div>Traiter les retours en anomalie.</div>
                  <div>Valider les justificatifs de régularisation.</div>
                  <div>Relancer les agences sur les suspens.</div>
                </>
              ) : (
                <>
                  <div>Vérifier les anomalies CCO ouvertes.</div>
                  <div>Suivre les dossiers non clôturés.</div>
                  <div>Relancer les responsables sur les documents manquants.</div>
                </>
              )}
            </div>
          </div>
          <div className="rounded-3xl border border-[#e8edf4] bg-white p-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#6b7280] mb-2">Récapitulatif</div>
            <div className="grid gap-3">
              {view === 'suivi-retours' ? (
                <>
                  <div className="rounded-2xl bg-[#eef4ff] p-3 text-[13px] text-[#1a5fa8]">5 retours en attente de traitement</div>
                  <div className="rounded-2xl bg-[#fff7ed] p-3 text-[13px] text-[#b45309]">2 justificatifs non validés</div>
                </>
              ) : (
                <>
                  <div className="rounded-2xl bg-[#eef4ff] p-3 text-[13px] text-[#1a5fa8]">8 contrôles critiques à suivre</div>
                  <div className="rounded-2xl bg-[#fff7ed] p-3 text-[13px] text-[#b45309]">3 documents non repris</div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}