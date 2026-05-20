/** Icônes menu latéral — style maquette CDM (bleu / rose). */

const iconClass = 'shrink-0';

export function NavIconHome() {
  return (
    <svg className={iconClass} width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M4 12.5L14 4l10 8.5V23a1 1 0 01-1 1h-6v-7H11v7H5a1 1 0 01-1-1V12.5z" fill="#5eb8e8" />
      <path d="M14 4L4 12.5h3.5L14 7.2 20.5 12.5H24L14 4z" fill="#e8174a" />
    </svg>
  );
}

export function NavIconCaisses() {
  return (
    <svg className={iconClass} width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="11" cy="13" r="6" fill="#7ec8f0" />
      <circle cx="17" cy="13" r="6" fill="#4aa3e0" />
      <circle cx="20.5" cy="19.5" r="5" fill="#e8174a" />
      <text x="20.5" y="21.5" textAnchor="middle" fill="white" fontSize="7" fontWeight="700" fontFamily="Inter,sans-serif">
        i
      </text>
    </svg>
  );
}

export function NavIconContrat() {
  return (
    <svg className={iconClass} width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M7 6h10l4 4v14a1 1 0 01-1 1H7a1 1 0 01-1-1V7a1 1 0 011-1z" fill="#5eb8e8" />
      <path d="M17 6v4h4" fill="#3d8fd4" />
      <rect x="9" y="14" width="10" height="1.5" rx=".75" fill="white" opacity=".9" />
      <rect x="9" y="17.5" width="7" height="1.5" rx=".75" fill="white" opacity=".7" />
      <circle cx="20" cy="9" r="3.5" fill="#e8174a" />
    </svg>
  );
}

export function NavIconPlanning() {
  return (
    <svg className={iconClass} width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="5" y="7" width="18" height="16" rx="2" fill="#5eb8e8" />
      <rect x="5" y="7" width="18" height="5" rx="2" fill="#3d8fd4" />
      <rect x="8" y="15" width="4" height="3" rx=".5" fill="white" />
      <rect x="14" y="15" width="4" height="3" rx=".5" fill="white" />
      <rect x="8" y="19.5" width="4" height="2" rx=".5" fill="white" opacity=".8" />
      <circle cx="20" cy="8" r="2.5" fill="#e8174a" />
    </svg>
  );
}

export function NavIconSettings() {
  return (
    <svg className={iconClass} width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M14 8.2a1.4 1.4 0 002.45-1.15l.2-.35a1.4 1.4 0 012.42 1.4l-.2.35a1.4 1.4 0 001.2 2.05 1.4 1.4 0 000 2.5 1.4 1.4 0 00-1.2 2.05l.2.35a1.4 1.4 0 01-2.42 1.4l-.2-.35A1.4 1.4 0 0014 19.8a1.4 1.4 0 00-2.45 1.15l-.2.35a1.4 1.4 0 01-2.42-1.4l.2-.35a1.4 1.4 0 00-1.2-2.05 1.4 1.4 0 000-2.5 1.4 1.4 0 001.2-2.05l-.2-.35a1.4 1.4 0 012.42-1.4l.2.35A1.4 1.4 0 0014 8.2z"
        fill="#4aa3e0"
      />
      <circle cx="14" cy="14" r="3.2" fill="#e8174a" />
      <circle cx="14" cy="14" r="1.6" fill="white" />
    </svg>
  );
}
