-- ============================================
-- À exécuter dans Supabase > SQL Editor
-- ============================================

-- 1. Table des inscriptions
CREATE TABLE IF NOT EXISTS inscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  folder TEXT UNIQUE NOT NULL,
  permis TEXT NOT NULL,
  slug TEXT NOT NULL,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  email TEXT NOT NULL,
  tel TEXT,
  message TEXT,
  transcash TEXT,
  documents JSONB DEFAULT '[]'
);

-- 2. Créer le bucket Storage pour les documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('inscriptions', 'inscriptions', false)
ON CONFLICT (id) DO NOTHING;

-- 3. Policy : permettre au service role d'uploader (déjà par défaut)
-- Les fichiers ne sont PAS publics, seul le backend y accède via service_role
