export type PermisInfo = {
  title: string
  price: string
  description: string
  documents: string[]
}

export const permisData: Record<string, PermisInfo> = {
  'permis-b': {
    title: 'Permis B — Voiture',
    price: '850€',
    description: 'Le permis B vous permet de conduire des véhicules légers jusqu\'à 3,5 tonnes. Formation complète incluant code et conduite.',
    documents: [
      'Pièce d\'identité (CNI ou passeport) recto/verso',
      'Justificatif de domicile de moins de 3 mois',
      '2 photos d\'identité récentes',
      'NEPH (si déjà inscrit au fichier national)',
      'Attestation de recensement (si moins de 25 ans)',
    ],
  },
  'permis-am': {
    title: 'Permis AM — Cyclomoteur',
    price: 'Sur devis',
    description: 'Le permis AM permet de conduire des cyclomoteurs et scooters jusqu\'à 50 cm³ dès 14 ans.',
    documents: [
      'Pièce d\'identité recto/verso',
      'Justificatif de domicile',
      '2 photos d\'identité',
      'Autorisation parentale (si mineur)',
    ],
  },
  'passerelle-a1': {
    title: 'Permis 125 — Passerelle A1',
    price: '1 300€',
    description: 'Formation 7h pour conduire une moto 125 cm³ avec le permis B depuis au moins 2 ans.',
    documents: [
      'Permis B (original + copie)',
      'Pièce d\'identité recto/verso',
      'Justificatif de domicile',
      '2 photos d\'identité',
    ],
  },
  'permis-a2-21h': {
    title: 'Permis Moto A2 — 21h',
    price: '600€',
    description: 'Formation moto 21 heures pour accéder au permis A2 (motos jusqu\'à 35 kW).',
    documents: [
      'Pièce d\'identité recto/verso',
      'Justificatif de domicile',
      '2 photos d\'identité',
      'Attestation ASSR2 ou ASR',
    ],
  },
  'permis-a2-27h': {
    title: 'Permis Moto A2 — 27h',
    price: '600€',
    description: 'Formation moto 27 heures — idéale pour les débutants souhaitant plus de pratique.',
    documents: [
      'Pièce d\'identité recto/verso',
      'Justificatif de domicile',
      '2 photos d\'identité',
      'Attestation ASSR2 ou ASR',
    ],
  },
  'passerelle-a': {
    title: 'Permis Moto A — Passerelle',
    price: '1 300€',
    description: 'Accédez au permis A (toutes cylindrées) depuis le permis A2 après 2 ans.',
    documents: [
      'Permis A2 (original + copie)',
      'Pièce d\'identité recto/verso',
      'Justificatif de domicile',
      '2 photos d\'identité',
    ],
  },
  'permis-be': {
    title: 'Permis BE — Remorque',
    price: '1 000€',
    description: 'Conduisez un véhicule léger avec une remorque de plus de 750 kg.',
    documents: [
      'Permis B (original + copie)',
      'Pièce d\'identité recto/verso',
      'Justificatif de domicile',
      '2 photos d\'identité',
    ],
  },
  'permis-b96': {
    title: 'Permis B96',
    price: '1 500€',
    description: 'Extension du permis B pour tracter des remorques jusqu\'à 4,25 tonnes de PTAC.',
    documents: [
      'Permis B (original + copie)',
      'Pièce d\'identité recto/verso',
      'Justificatif de domicile',
      '2 photos d\'identité',
    ],
  },
  'permis-c': {
    title: 'Permis C — Poids Lourd',
    price: '1 500€',
    description: 'Conduisez des poids lourds de plus de 3,5 tonnes. Accès aux métiers du transport.',
    documents: [
      'Permis B (original + copie)',
      'Pièce d\'identité recto/verso',
      'Justificatif de domicile',
      '2 photos d\'identité',
      'Visite médicale professionnelle',
      'Attestation d\'aptitude médicale',
    ],
  },
  'permis-ce': {
    title: 'Permis CE — Semi-remorque',
    price: '1 700€',
    description: 'Conduisez des ensembles articulés (semi-remorques). Permis C requis.',
    documents: [
      'Permis C (original + copie)',
      'Pièce d\'identité recto/verso',
      'Justificatif de domicile',
      '2 photos d\'identité',
      'Visite médicale professionnelle',
    ],
  },
  'permis-ce-super': {
    title: 'Super Poids Lourd — CE',
    price: '2 000€',
    description: 'Formation complète super poids lourd pour les convois exceptionnels.',
    documents: [
      'Permis C ou CE (original + copie)',
      'Pièce d\'identité recto/verso',
      'Justificatif de domicile',
      '2 photos d\'identité',
      'Visite médicale professionnelle',
    ],
  },
  'code': {
    title: 'Code de la Route',
    price: '250€',
    description: 'Préparation intensive au code de la route avec accès illimité à notre plateforme en ligne.',
    documents: [
      'Pièce d\'identité recto/verso',
      'Justificatif de domicile',
      '2 photos d\'identité',
      'Numéro NEPH (si déjà inscrit au fichier national)',
    ],
  },
  'permis-chasse': {
    title: 'Permis de Chasse',
    price: '700€',
    description: 'Formation complète pour obtenir le permis de chasser : théorie et pratique.',
    documents: [
      'Pièce d\'identité recto/verso',
      'Justificatif de domicile',
      '2 photos d\'identité',
      'Certificat médical de moins de 3 mois',
    ],
  },
  'permis-bateau': {
    title: 'Permis Bateau Côtier & Fluvial',
    price: '1 800€',
    description: 'Naviguez en mer et sur les voies fluviales. Formation théorique et pratique complète.',
    documents: [
      'Pièce d\'identité recto/verso',
      'Justificatif de domicile',
      '2 photos d\'identité',
      'Attestation de natation',
      'Certificat médical',
    ],
  },
  'permis-hauturier': {
    title: 'Permis Hauturier',
    price: '500€',
    description: 'Extension du permis côtier pour naviguer au-delà de 6 milles d\'un abri.',
    documents: [
      'Permis côtier (original + copie)',
      'Pièce d\'identité recto/verso',
      'Justificatif de domicile',
      '2 photos d\'identité',
    ],
  },
  'fimo': {
    title: 'FIMO — Formation Initiale Minimale Obligatoire',
    price: '1 500€',
    description: 'Formation obligatoire pour les conducteurs de poids lourds souhaitant exercer une activité de transport routier.',
    documents: [
      'Permis C ou CE (original + copie)',
      'Pièce d\'identité recto/verso',
      'Justificatif de domicile',
      '2 photos d\'identité',
      'Attestation de formation initiale',
    ],
  },
}
