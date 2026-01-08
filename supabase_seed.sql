-- Seed data for Products table

-- Clear existing sample data (optional, be careful in production)
-- DELETE FROM products WHERE brand = 'MARS';

INSERT INTO products (name, category, brand, price, image_url, description)
VALUES
  ('Matte Lipstick Red', 'Lips', 'MARS', 299, 'https://via.placeholder.com/300?text=Matte+Lipstick', 'Long-lasting matte lipstick in vibrant red.'),
  ('Liquid Eyeliner Black', 'Eyes', 'MARS', 199, 'https://via.placeholder.com/300?text=Eyeliner', 'Waterproof liquid eyeliner for precise application.'),
  ('BB Cream Natural', 'Face', 'MARS', 349, 'https://via.placeholder.com/300?text=BB+Cream', 'Lightweight BB cream for a natural glow.'),
  ('Nail Polish Pink', 'Nails', 'MARS', 99, 'https://via.placeholder.com/300?text=Nail+Polish', 'Quick-drying nail polish in soft pink.'),
  ('Makeup Brushes Set', 'Tools', 'MARS', 499, 'https://via.placeholder.com/300?text=Brushes', 'A comprehensive set of makeup brushes.'),
  ('Volume Mascara', 'Eyes', 'MARS', 249, 'https://via.placeholder.com/300?text=Mascara', 'Volumizing mascara for dramatic lashes.'),
  ('Compact Powder', 'Face', 'MARS', 159, 'https://via.placeholder.com/300?text=Compact', 'Oil-control compact powder for all skin types.');
