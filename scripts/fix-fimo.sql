-- Vérifier toutes les offres avec FIMO dans le titre
SELECT id, slug, title, price, is_active, created_at
FROM offers
WHERE title ILIKE '%fimo%' OR slug ILIKE '%fimo%';

-- Si l'offre existe mais n'est pas active, la rendre active
UPDATE offers
SET is_active = true
WHERE (title ILIKE '%fimo%' OR slug ILIKE '%fimo%')
  AND is_active = false;

-- Vérifier le résultat
SELECT id, slug, title, price, is_active
FROM offers
WHERE title ILIKE '%fimo%' OR slug ILIKE '%fimo%';
