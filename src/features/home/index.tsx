import { ArrowRight, CalendarDays, CheckCircle2, HelpCircle, ShieldCheck } from 'lucide-react';
import { useDashboard } from '../../hooks/useDashboard';
import { InfoChip, KpiCard } from '../../app/components/core';

export function HomeFeature() {
  const { dispatch } = useDashboard();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[#dbe4f4] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-[18px] font-semibold text-[#1a2340]">Bienvenue sur le portail CCO</div>
            <div className="mt-2 text-[13px] text-[#5f6b83] max-w-2xl">
              Gérez vos contrôles de bordereau, suivez les anomalies et lancez rapidement vos tâches de saisie.
              Ce tableau de bord vous aide à démarrer et à garder l’essentiel à portée de main.
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#e3eefb] px-4 py-2 text-[12px] font-semibold text-[#1a5fa8]">
            <ShieldCheck className="w-4 h-4" /> CCO - Contrôle & conformité
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-4 lg:grid-cols-2">
        <KpiCard
          label="Contrôles à traiter"
          value="18"
          color="#1a5fa8"
          sub="Saisie / Modification"
        />
        <KpiCard
          label="Anomalies ouvertes"
          value="6"
          color="#d97706"
          sub="Saisie des anomalies"
        />
        <KpiCard
          label="Rendez-vous du jour"
          value="4"
          color="#047857"
          sub="Plannings importants"
        />
        <KpiCard
          label="Taux de conformité"
          value="92%"
          color="#2563eb"
          sub="Dernière mise à jour"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-[#dbe4f4] bg-[#fafbfe] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[13px] font-semibold text-[#1a2340]">Actions rapides</div>
              <div className="text-[11px] text-[#6b7280]">Lancez votre prochaine tâche CCO.</div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#1a5fa8]" />
          </div>
          <div className="space-y-3">
            <button
              type="button"
              className="w-full rounded-2xl border border-[#d5d9ed] bg-white px-4 py-3 text-left text-[13px] font-medium text-[#1a2340] hover:border-[#1a5fa8] transition"
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'saisie' })}
            >
              Saisie / Modification
            </button>
            <button
              type="button"
              className="w-full rounded-2xl border border-[#d5d9ed] bg-white px-4 py-3 text-left text-[13px] font-medium text-[#1a2340] hover:border-[#1a5fa8] transition"
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'saisie-anomalies' })}
            >
              Saisie des anomalies
            </button>
            <button
              type="button"
              className="w-full rounded-2xl border border-[#d5d9ed] bg-white px-4 py-3 text-left text-[13px] font-medium text-[#1a2340] hover:border-[#1a5fa8] transition"
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'planning' })}
            >
              Planning CCO
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-[#dbe4f4] bg-white p-5 shadow-sm">
          <div className="mb-4">
            <div className="text-[13px] font-semibold text-[#1a2340]">Priorités du contrôle</div>
            <div className="text-[11px] text-[#6b7280]">Points clés pour un contrôle fiable.</div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3 rounded-2xl border border-[#eef2f8] bg-[#f7fbff] p-4">
              <CheckCircle2 className="mt-1 h-5 w-5 text-[#1a5fa8]" />
              <div>
                <div className="text-[12.5px] font-semibold text-[#1a2340]">Vérifier la signature</div>
                <div className="text-[12px] text-[#5f6b83]">Contrôler lisibilité et conformité du bordereau.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-[#eef2f8] bg-[#f7fbff] p-4">
              <HelpCircle className="mt-1 h-5 w-5 text-[#1a5fa8]" />
              <div>
                <div className="text-[12.5px] font-semibold text-[#1a2340]">Respect des mentions</div>
                <div className="text-[12px] text-[#5f6b83]">Assurez-vous des mentions légales et de l’ordre original.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#dbe4f4] bg-[#fafbfe] p-5 shadow-sm">
          <div className="mb-4">
            <div className="text-[13px] font-semibold text-[#1a2340]">Aide CCO</div>
            <div className="text-[11px] text-[#6b7280]">Conseils pour démarrer rapidement.</div>
          </div>
          <div className="grid gap-3">
            <InfoChip label="Étape 1" value="Sélectionner un contrôle" />
            <InfoChip label="Étape 2" value="Compléter le formulaire de saisie" />
            <InfoChip label="Étape 3" value="Vérifier & valider" />
            <div className="rounded-2xl border border-[#d5d9ed] bg-white p-4 text-[12px] text-[#5f6b83]">
              Pour un traitement fluide, vérifiez l’état du bordereau et la présence des pièces justificatives.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
