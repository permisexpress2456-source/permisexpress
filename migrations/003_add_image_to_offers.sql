-- ============================================
-- Migration: Ajout du champ image_url à la table offers
-- À exécuter dans Supabase > SQL Editor
-- ============================================

-- Ajouter la colonne image_url
ALTER TABLE offers ADD COLUMN IF NOT EXISTS image_url TEXT DEFAULT '';

-- Mettre à jour les offres existantes avec des images par défaut
UPDATE offers SET image_url = 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80' WHERE image_url = '' OR image_url IS NULL;


-- ============================================
-- Configuration du Storage pour les images
-- À faire manuellement dans Supabase Dashboard:
-- 1. Aller dans Storage
-- 2. Créer un bucket "images" 
-- 3. Le rendre PUBLIC (pour que les images soient accessibles)
-- 4. Ajouter une policy pour permettre l'upload via service_role
-- ============================================

-- Note: Les buckets ne peuvent pas être créés via SQL.
-- Utilisez le dashboard Supabase > Storage > New bucket
-- Nom: images
-- Public: Oui
