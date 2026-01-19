-- Add total_price to orders table if it doesn't exist
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS total_price DECIMAL(10, 2) DEFAULT 0;

-- Add brand to products table if it doesn't exist
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS brand TEXT;

-- Create index on created_at for faster analytics queries
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at);

-- Create index on user_id for faster counts
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);

-- Note: The queries for analytics will rely on created_at and total_price.
-- Make sure to run this script in the Supabase SQL Editor.
