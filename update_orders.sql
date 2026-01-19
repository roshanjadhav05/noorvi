-- Add user_id to orders table
ALTER TABLE public.orders 
ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Enable RLS on orders if not already enabled
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own orders
CREATE POLICY "Users can view their own orders" 
ON public.orders 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create policy for users to insert their own orders (if not already handled)
CREATE POLICY "Users can create their own orders" 
ON public.orders 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Optional: Policy for admin view (if an admin system existed)
-- For now, maybe allow users to view orders matching their phone number if user_id is null? 
-- (This helps linking old orders if the phone matches the profile phone)
CREATE POLICY "Users can view orders by phone" 
ON public.orders 
FOR SELECT 
USING (
  phone IN (
    SELECT phone FROM public.profiles WHERE id = auth.uid()
  )
);
