import { useState } from 'react';
import { Globe2, Mail, User } from 'lucide-react';
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