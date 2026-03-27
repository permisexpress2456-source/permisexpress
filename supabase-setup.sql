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
  documents JSONB DEFAULT '[]',
  status TEXT DEFAULT 'en_attente'
);

-- 2. Table des admins
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  nom TEXT DEFAULT '',
  is_super BOOLEAN DEFAULT false
);

-- 3. Admin par défaut (mot de passe: Admin2024!)
-- Le mot de passe est hashé avec pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO admins (email, password, nom, is_super)
VALUES ('permisexpress2456@gmail.com', crypt('Admin2024!', gen_salt('bf')), 'Super Admin', true)
ON CONFLICT (email) DO NOTHING;

-- 4. Bucket Storage
INSERT INTO storage.buckets (id, name, public)
VALUES ('inscriptions', 'inscriptions', false)
ON CONFLICT (id) DO NOTHING;

-- 5. Fonction pour vérifier le mot de passe admin
CREATE OR REPLACE FUNCTION verify_admin_password(input_password TEXT, hashed_password TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN hashed_password = crypt(input_password, hashed_password);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Fonction pour hasher un mot de passe
CREATE OR REPLACE FUNCTION hash_password(input_password TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN crypt(input_password, gen_salt('bf'));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
