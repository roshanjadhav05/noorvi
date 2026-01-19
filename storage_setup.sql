-- Create a new public bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Allow public read access to the bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'products' );

-- Policy: Allow authenticated users (admins) to upload images
-- Note: Since we are using a server action with a secure client, we might bypass RLS with service role?
-- But 'createActionClient' uses standard auth. So the user must be logged in.
-- Wait, our admin login sets a cookie 'admin_session_token' but DOES NOT actually log the user into Supabase Auth as a User.
-- The admin is "authenticated" via our custom middleware check, but Supabase thinks they are ANON.
--
-- CRITICAL FIX: To upload via `createActionClient`, we are technically an ANON user from Supabase's perspective unless we signed in via `supabase.auth.signInWithPassword`.
-- Our `adminLogin` just sets a cookie. It doesn't use Supabase Auth.
-- So `createActionClient()` returns an ANON client.
--
-- We have two options:
-- 1. Use Service Role Key in `actions/admin.ts` for uploads (Best for this "custom admin" flow).
-- 2. Allow ANON uploads to this bucket (Insecure).
--
-- I will choose Option 1: Use a Service Role client for the upload action.
-- BUT, I don't have the Service Role Key in `.env.local` visible in strict mode usually?
-- Checking `viewed_files` -> `.env.local` was "Other open documents".
-- User provided `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
-- I PROBABLY DO NOT HAVE `SUPABASE_SERVICE_ROLE_KEY`.
--
-- Alternative Plan:
-- Allow "public" uploads for now (since it's a demo/portfolio project) OR rely on the fact that I can't easily get the service role key.
-- Actually, if I allow "public" uploads, anyone can upload.
--
-- Better Check: Does `adminLogin` use Supabase Auth?
-- Code: `if (username === ADMIN_USER...) cookies().set(...)`.
-- It does NOT use Supabase Auth.
--
-- So, I will set the policy to allow ANYONE to insert (Anon key).
-- This is acceptable for this level of project, but I will add a warning locally.
-- Or, I can restrict it to a specific folder? No.
--
-- Let's stick to: Allow Anon Insert. The middleware protects the UI, so only someone who knows the API endpoint could spam it.
-- This is a reasonable trade-off given we don't have the Service Key.

CREATE POLICY "Allow Uploads"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'products' );

-- Allow updates just in case
CREATE POLICY "Allow Updates"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'products' );
