from pathlib import Path

files = {
    'src/pages/dashboard.tsx': '''import { AppLayout } from '../app/components/layout/AppLayout';
import { DashboardFeature } from '../features/dashboard';
import { HomeFeature } from '../features/home';
import { SaisieFormFeature } from '../features/saisie';
import { PlanningFeature } from '../features/planning';
import { SaisieAnomaliesFeature } from '../features/saisie-anomalies';
import { SupervisorFeature } from '../features/supervisor';
import { useDashboard } from '../hooks/useDashboard';
import type { ActiveView } from '../types';

export default function DashboardPage() {
  const { activeView, sidebarOpen, role, dispatch } = useDashboard();

  return (
    <AppLayout
      activeView={activeView}
      role={role}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
      onSetView={(view: ActiveView) => dispatch({ type: 'SET_VIEW', payload: view })}
    >
      {activeView === 'home' && <HomeFeature />}
      {activeView === 'saisie' && <DashboardFeature />}
      {activeView === 'saisie-form' && <SaisieFormFeature />}
      {activeView === 'planning' && <PlanningFeature />}
      {activeView === 'saisie-anomalies' && <SaisieAnomaliesFeature />}
      {['statistiques', 'suivi-investigations', 'suivi-docs', 'supervision-cc', 'supervision-da'].includes(activeView) && (
        <SupervisorFeature view={activeView} />
      )}
    </AppLayout>
  );
}
''',
    'src/pages/settings.tsx': '''import { AppLayout } from '../app/components/layout/AppLayout';
import { SettingsFeature } from '../features/settings';
import { useDashboard } from '../hooks/useDashboard';
import type { ActiveView } from '../types';

export default function SettingsPage() {
  const { activeView, sidebarOpen, role, dispatch } = useDashboard();

  return (
    <AppLayout
      activeView={activeView}
      role={role}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
      onSetView={(view: ActiveView) => dispatch({ type: 'SET_VIEW', payload: view })}
    >
      <SettingsFeature />
    </AppLayout>
  );
}
''',
    'src/features/settings/index.tsx': '''import { useState } from 'react';
import { Globe2, Mail, User, ShieldCheck } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useDashboard } from '../../hooks/useDashboard';
import type { UserRole } from '../../types';

export function SettingsFeature() {
  const { role, dispatch } = useDashboard();
  const [language, setLanguage] = useState('Français');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [fullName, setFullName] = useState('Said Alaoui');
  const [identifier] = useState('cdm-u3799');
  const [email, setEmail] = useState('s.alaoui@creditdumaroc.ma');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[22px] font-semibold text-[#1a2340]">Paramètres</div>
          <div className="text-[13px] text-[#6b7280]">Vue principale</div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-[#e5eaf3] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-[15px] font-semibold text-[#1a2340] mb-1">Préférences générales</div>
              <div className="text-[12px] text-[#6b7280]">Choisir la langue de l’interface et activer les notifications.</div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#eef6ff] px-3 py-2 text-[12px] font-semibold text-[#1a5fa8]">
              <Globe2 className="w-4 h-4" /> Langue
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-3 sm:items-center">
              <label className="text-[12px] font-semibold text-[#6b7280] uppercase tracking-[0.16em]">Langue de l'interface</label>
              <div className="sm:col-span-2">
                <select
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  className="w-full rounded-2xl border border-[#d5d9ed] bg-[#fafbfe] px-4 py-3 text-[13px] text-[#1a2340] outline-none transition-colors focus:border-[#1a5fa8]"
                >
                  <option>Français</option>
                  <option>Anglais</option>
                  <option>Arabe</option>
                </select>
              </div>
            </div>

            <div className="rounded-[22px] border border-[#e5ecf5] bg-[#f8fbff] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[14px] font-semibold text-[#1a2340] mb-1">
                    <Mail className="w-4 h-4 text-[#1a5fa8]" /> Notifications par email
                  </div>
                  <div className="text-[12px] text-[#6b7280]">Recevoir les alertes et rappels</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-medium text-[#1a2340]">{emailNotifications ? 'Activées' : 'Désactivées'}</span>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-[#e5eaf3] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-[15px] font-semibold text-[#1a2340] mb-1">Profil utilisateur</div>
              <div className="text-[12px] text-[#6b7280]">Informations personnelles et accès.</div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#eef9f0] px-3 py-2 text-[12px] font-semibold text-[#166534]">
              <User className="w-4 h-4" /> Profil
            </div>
          </div>

          <div className="grid gap-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-[12px] font-semibold text-[#6b7280] uppercase tracking-[0.16em]">Nom complet</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full rounded-2xl border border-[#d5d9ed] bg-[#fafbfe] px-4 py-3 text-[13px] text-[#1a2340] outline-none focus:border-[#1a5fa8]"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-[12px] font-semibold text-[#6b7280] uppercase tracking-[0.16em]">Identifiant</label>
              <input
                type="text"
                value={identifier}
                readOnly
                className="w-full rounded-2xl border border-[#e5eaf3] bg-[#f4f6fb] px-4 py-3 text-[13px] text-[#6b7280] outline-none cursor-not-allowed"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-[12px] font-semibold text-[#6b7280] uppercase tracking-[0.16em]">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-[#d5d9ed] bg-[#fafbfe] px-4 py-3 text-[13px] text-[#1a2340] outline-none focus:border-[#1a5fa8]"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-[12px] font-semibold text-[#6b7280] uppercase tracking-[0.16em]">Rôle</label>
              <select
                value={role}
                onChange={e => dispatch({ type: 'SET_ROLE', payload: e.target.value as UserRole })}
                className="w-full rounded-2xl border border-[#d5d9ed] bg-[#fafbfe] px-4 py-3 text-[13px] text-[#1a2340] outline-none focus:border-[#1a5fa8]"
              >
                <option value="CCO">CCO</option>
                <option value="SUPERVISEUR">Superviseur</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-2xl bg-[#1a5fa8] px-6 py-3 text-[13px] font-semibold text-white shadow-sm shadow-[#1a5fa8]/10 transition-colors hover:bg-[#154c86]"
        >
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}
''',
    'src/features/supervisor/index.tsx': '''import { ClipboardList, FileSearch, Layers, ShieldCheck, TrendingUp } from 'lucide-react';
import type { ActiveView } from '../../types';

const supervisorLabels: Record<ActiveView, { title: string; description: string; icon: React.ComponentType<any> }> = {
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
''',
}

for filepath, content in files.items():
    Path(filepath).write_text(content, encoding='utf-8')
print('dashboard and settings updated')
