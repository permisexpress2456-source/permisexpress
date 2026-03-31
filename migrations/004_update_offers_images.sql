-- ============================================
-- Migration: Mise à jour des images pour chaque offre
-- À exécuter dans Supabase > SQL Editor
-- ============================================

-- Permis B — Voiture
UPDATE offers SET image_url = 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80' 
WHERE slug = 'permis-b';

-- Permis AM — Cyclomoteur (scooter)
UPDATE offers SET image_url = 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80' 
WHERE slug = 'permis-am';

-- Permis 125 — Passerelle A1 (moto 125)
UPDATE offers SET image_url = 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80' 
WHERE slug = 'passerelle-a1';

-- Permis Moto A2 — 21h
UPDATE offers SET image_url = 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80' 
WHERE slug = 'permis-a2-21h';

-- Permis Moto A2 — 27h
UPDATE offers SET image_url = 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80' 
WHERE slug = 'permis-a2-27h';

-- Permis Moto A — Passerelle
UPDATE offers SET image_url = 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80' 
WHERE slug = 'passerelle-a';

-- Permis A moto
UPDATE offers SET image_url = 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=800&q=80' 
WHERE slug = 'permis-a';

-- Permis BE — Remorque
UPDATE offers SET image_url = 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80' 
WHERE slug = 'permis-be';

-- Permis B96
UPDATE offers SET image_url = 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80' 
WHERE slug = 'permis-b96';

-- Permis C — Poids Lourd
UPDATE offers SET image_url = 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80' 
WHERE slug = 'permis-c';

-- Permis CE — Semi-remorque
UPDATE offers SET image_url = 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80' 
WHERE slug = 'permis-ce';

-- Super Poids Lourd — CE
UPDATE offers SET image_url = 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80' 
WHERE slug = 'permis-ce-super';

-- Code de la Route
UPDATE offers SET image_url = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80' 
WHERE slug = 'code';

-- Permis de Chasse
UPDATE offers SET image_url = 'https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=800&q=80' 
WHERE slug = 'permis-chasse';

-- Permis Bateau Côtier & Fluvial
UPDATE offers SET image_url = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80' 
WHERE slug = 'permis-bateau';

-- Permis Hauturier
UPDATE offers SET image_url = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80' 
WHERE slug = 'permis-hauturier';
