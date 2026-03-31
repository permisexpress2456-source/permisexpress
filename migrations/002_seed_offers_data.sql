-- ============================================
-- Migration: Insertion des données d'offres depuis permisData.ts
-- À exécuter dans Supabase > SQL Editor APRÈS 001_create_offers_table.sql
-- Exigences: 7.2, 7.3
-- ============================================

-- Insertion de toutes les offres existantes
-- ON CONFLICT (slug) DO NOTHING pour éviter les doublons

INSERT INTO offers (slug, title, price, description, documents, is_active)
VALUES
  (
    'permis-b',
    'Permis B — Voiture',
    '850€',
    'Le permis B vous permet de conduire des véhicules légers jusqu''à 3,5 tonnes. Formation complète incluant code et conduite.',
    '["Pièce d''identité (CNI ou passeport) recto/verso", "Justificatif de domicile de moins de 3 mois", "2 photos d''identité récentes", "NEPH (si déjà inscrit au fichier national)", "Attestation de recensement (si moins de 25 ans)"]'::jsonb,
    true
  ),
  (
    'permis-am',
    'Permis AM — Cyclomoteur',
    'Sur devis',
    'Le permis AM permet de conduire des cyclomoteurs et scooters jusqu''à 50 cm³ dès 14 ans.',
    '["Pièce d''identité recto/verso", "Justificatif de domicile", "2 photos d''identité", "Autorisation parentale (si mineur)"]'::jsonb,
    true
  ),
  (
    'passerelle-a1',
    'Permis 125 — Passerelle A1',
    '1 300€',
    'Formation 7h pour conduire une moto 125 cm³ avec le permis B depuis au moins 2 ans.',
    '["Permis B (original + copie)", "Pièce d''identité recto/verso", "Justificatif de domicile", "2 photos d''identité"]'::jsonb,
    true
  ),
  (
    'permis-a2-21h',
    'Permis Moto A2 — 21h',
    '600€',
    'Formation moto 21 heures pour accéder au permis A2 (motos jusqu''à 35 kW).',
    '["Pièce d''identité recto/verso", "Justificatif de domicile", "2 photos d''identité", "Attestation ASSR2 ou ASR"]'::jsonb,
    true
  ),
  (
    'permis-a2-27h',
    'Permis Moto A2 — 27h',
    '600€',
    'Formation moto 27 heures — idéale pour les débutants souhaitant plus de pratique.',
    '["Pièce d''identité recto/verso", "Justificatif de domicile", "2 photos d''identité", "Attestation ASSR2 ou ASR"]'::jsonb,
    true
  ),
  (
    'passerelle-a',
    'Permis Moto A — Passerelle',
    '1 300€',
    'Accédez au permis A (toutes cylindrées) depuis le permis A2 après 2 ans.',
    '["Permis A2 (original + copie)", "Pièce d''identité recto/verso", "Justificatif de domicile", "2 photos d''identité"]'::jsonb,
    true
  ),
  (
    'permis-be',
    'Permis BE — Remorque',
    '1 000€',
    'Conduisez un véhicule léger avec une remorque de plus de 750 kg.',
    '["Permis B (original + copie)", "Pièce d''identité recto/verso", "Justificatif de domicile", "2 photos d''identité"]'::jsonb,
    true
  ),
  (
    'permis-b96',
    'Permis B96',
    '1 500€',
    'Extension du permis B pour tracter des remorques jusqu''à 4,25 tonnes de PTAC.',
    '["Permis B (original + copie)", "Pièce d''identité recto/verso", "Justificatif de domicile", "2 photos d''identité"]'::jsonb,
    true
  ),
  (
    'permis-c',
    'Permis C — Poids Lourd',
    '1 500€',
    'Conduisez des poids lourds de plus de 3,5 tonnes. Accès aux métiers du transport.',
    '["Permis B (original + copie)", "Pièce d''identité recto/verso", "Justificatif de domicile", "2 photos d''identité", "Visite médicale professionnelle", "Attestation d''aptitude médicale"]'::jsonb,
    true
  ),
  (
    'permis-ce',
    'Permis CE — Semi-remorque',
    '1 700€',
    'Conduisez des ensembles articulés (semi-remorques). Permis C requis.',
    '["Permis C (original + copie)", "Pièce d''identité recto/verso", "Justificatif de domicile", "2 photos d''identité", "Visite médicale professionnelle"]'::jsonb,
    true
  ),
  (
    'permis-ce-super',
    'Super Poids Lourd — CE',
    '2 000€',
    'Formation complète super poids lourd pour les convois exceptionnels.',
    '["Permis C ou CE (original + copie)", "Pièce d''identité recto/verso", "Justificatif de domicile", "2 photos d''identité", "Visite médicale professionnelle"]'::jsonb,
    true
  ),
  (
    'code',
    'Code de la Route',
    '250€',
    'Préparation intensive au code de la route avec accès illimité à notre plateforme en ligne.',
    '["Pièce d''identité recto/verso", "Justificatif de domicile", "2 photos d''identité", "Numéro NEPH (si déjà inscrit au fichier national)"]'::jsonb,
    true
  ),
  (
    'permis-chasse',
    'Permis de Chasse',
    '700€',
    'Formation complète pour obtenir le permis de chasser : théorie et pratique.',
    '["Pièce d''identité recto/verso", "Justificatif de domicile", "2 photos d''identité", "Certificat médical de moins de 3 mois"]'::jsonb,
    true
  ),
  (
    'permis-bateau',
    'Permis Bateau Côtier & Fluvial',
    '1 800€',
    'Naviguez en mer et sur les voies fluviales. Formation théorique et pratique complète.',
    '["Pièce d''identité recto/verso", "Justificatif de domicile", "2 photos d''identité", "Attestation de natation", "Certificat médical"]'::jsonb,
    true
  ),
  (
    'permis-hauturier',
    'Permis Hauturier',
    '500€',
    'Extension du permis côtier pour naviguer au-delà de 6 milles d''un abri.',
    '["Permis côtier (original + copie)", "Pièce d''identité recto/verso", "Justificatif de domicile", "2 photos d''identité"]'::jsonb,
    true
  )
ON CONFLICT (slug) DO NOTHING;
