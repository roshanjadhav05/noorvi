-- Add images array column to products table
alter table public.products 
add column if not exists images text[] default '{}';

-- Migration: Initialize images array with existing image_url if images is empty
update public.products 
set images = array[image_url] 
where images is null or cardinality(images) = 0;
