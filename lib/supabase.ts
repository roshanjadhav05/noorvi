import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    // We can't throw here because it might break build time if envs are missing
    console.warn('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(
    supabaseUrl || '',
    supabaseAnonKey || ''
)
