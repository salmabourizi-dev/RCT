export function SampleBehaviorsFeature() {
  const samples = [
    { label: 'Navigation Planning → Saisie', desc: 'Cliquer sur une ligne du planning navigue vers la saisie avec le contrôle sélectionné.' },
    { label: 'Saisie du résultat', desc: "Cliquer sur l'icône crayon dans la table ouvre le formulaire de saisie détaillé." },
    { label: 'Filtres combinés', desc: 'Les pills de filtre rapide et le select Statut fonctionnent en combinaison.' },
    { label: 'Export PDF', desc: 'Le bouton Exporter PDF génère un fichier PDF du tableau de planning.' },
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-[14px] font-semibold text-[#1a2340] mb-4">Comportements de l'application</h2>
      {samples.map((s, i) => (
        <div key={i} className="bg-white border border-[#e2e6f0] rounded-xl px-4 py-3 shadow-sm">
          <div className="text-[13px] font-semibold text-[#1a5fa8] mb-1">{s.label}</div>
          <div className="text-[12px] text-[#666]">{s.desc}</div>
        </div>
      ))}
    </div>
  );
}
