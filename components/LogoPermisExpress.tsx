export default function LogoPermisExpress({ size = 60 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Permisexpress.fr">
      {/* Fond cercle blanc */}
      <circle cx="100" cy="100" r="98" fill="#f4f6fb" stroke="#1a3a8f" strokeWidth="3" />

      {/* Carte d'identité bleue */}
      <rect x="30" y="45" width="110" height="75" rx="10" fill="#1a3a8f" />
      {/* Photo zone */}
      <rect x="38" y="53" width="42" height="59" rx="6" fill="#2a5abf" />
      {/* Silhouette personne */}
      <circle cx="59" cy="72" r="10" fill="#fff" opacity="0.9" />
      <ellipse cx="59" cy="95" rx="14" ry="10" fill="#fff" opacity="0.9" />
      {/* Lignes texte */}
      <rect x="90" y="60" width="42" height="7" rx="3" fill="#fff" opacity="0.85" />
      <rect x="90" y="74" width="35" height="6" rx="3" fill="#fff" opacity="0.65" />
      <rect x="90" y="87" width="38" height="6" rx="3" fill="#fff" opacity="0.65" />
      <rect x="90" y="100" width="30" height="6" rx="3" fill="#fff" opacity="0.65" />

      {/* Ailes rouges */}
      <rect x="138" y="55" width="38" height="9" rx="4" fill="#d42b2b" />
      <rect x="143" y="70" width="30" height="8" rx="4" fill="#d42b2b" />
      <rect x="148" y="84" width="22" height="7" rx="3" fill="#d42b2b" />

      {/* Texte PERMIS */}
      <text x="100" y="148" textAnchor="middle" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="26" fill="#1a3a8f" letterSpacing="1">PERMIS</text>
      {/* Texte EXPRESS */}
      <text x="100" y="174" textAnchor="middle" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="24" fill="#d42b2b" letterSpacing="1">EXPRESS</text>
    </svg>
  )
}
