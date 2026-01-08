import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// This function safely returns a supabase client or null if env vars are missing
// adhering to the standard "don't crash build" requirement.
export const createSafeSupabaseClient = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Supabase environment variables are missing. API calls will fail gracefully.');
        return null;
    }

    return createClient<Database>(supabaseUrl, supabaseAnonKey);
};
