-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create categories table
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null
);

-- Create products table
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category text not null, -- denormalized for simplicity as per request, or link to categories.id
  price numeric not null,
  image_url text not null,
  description text,
  brand text, -- Added brand column
  created_at timestamp with time zone default now()
);

-- Add search_vector column for full-text search safely
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'search_vector') THEN
        ALTER TABLE products
        ADD COLUMN search_vector tsvector
        GENERATED ALWAYS AS (
          to_tsvector('english',
            coalesce(name,'') || ' ' ||
            coalesce(brand,'') || ' ' ||
            coalesce(category,'') || ' ' ||
            coalesce(description,'')
          )
        ) STORED;
    END IF;
END $$;

-- Create index for faster search (drop if exists to ensure clean state or just create if not exists)
DROP INDEX IF EXISTS products_search_idx;
CREATE INDEX products_search_idx
ON products USING GIN (search_vector);

-- Create orders table (optional/future use)
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  customer_name text not null,
  phone text not null,
  address text not null,
  product_name text not null,
  quantity integer not null,
  created_at timestamp with time zone default now()
);

-- Insert seed data for categories (checking for duplicates generally not needed if name unique but simple inserts here)
-- Consider commenting out if data already exists or clearing tables if it's a dev reset
-- insert into categories (name) values ...
