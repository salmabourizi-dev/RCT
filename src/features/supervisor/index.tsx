import type { ComponentType } from 'react';
import { ClipboardList, FileSearch, Layers, ShieldCheck, TrendingUp } from 'lucide-react';
import type { ActiveView } from '../../types';

const supervisorLabels: Record<ActiveView, { title: string; description: string; icon: ComponentType<any> }> = {
  statistiques: {
    title: 'Statistiques',
    description: 'Pilotage des indicateurs clés et vision globale des contrôles CCO.',
    icon: TrendingUp,
  },
  'suivi-investigations': {
    title: 'Suivi Investigation des CC',
    description: 'Analyse des investigations en cours et points d’attention.',
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
  home: { title: '', description: '', icon: ShieldCheck },
  saisie: { title: '', description: '', icon: ShieldCheck },
  'saisie-form': { title: '', description: '', icon: ShieldCheck },
  planning: { title: '', description: '', icon: ShieldCheck },
  'saisie-anomalies': { title: '', description: '', icon: ShieldCheck },
};

export function SupervisorFeature({ view }: { view: ActiveView }) {
  const entry = supervisorLabels[view] ?? supervisorLabels.home;
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
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-[#e8edf4] bg-[#f9fbff] p-4">
          <div className="text-[11px] uppercase tracking-[0.18em] text-[#6b7280] mb-2">Actions recommandées</div>
          <div className="space-y-3 text-[13px] text-[#334155]">
            <div>Vérifier les anomalies CCO ouvertes.</div>
            <div>Suivre les dossiers non clôturés.</div>
            <div>Relancer les responsables sur les documents manquants.</div>
          </div>
        </div>
        <div className="rounded-3xl border border-[#e8edf4] bg-white p-4">
          <div className="text-[11px] uppercase tracking-[0.18em] text-[#6b7280] mb-2">Récapitulatif</div>
          <div className="grid gap-3">
            <div className="rounded-2xl bg-[#eef4ff] p-3 text-[13px] text-[#1a5fa8]">8 contrôles critiques à suivre</div>
            <div className="rounded-2xl bg-[#fff7ed] p-3 text-[13px] text-[#b45309]">3 documents non repris</div>
          </div>
        </div>
      </div>
    </div>
  );
}
