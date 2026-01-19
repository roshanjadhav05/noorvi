import 'server-only'
import { createServerComponentClient, createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'

export const createClient = () => {
    const cookieStore = cookies()
    return createServerComponentClient<Database>({ cookies: () => cookieStore })
}

export const createActionClient = () => {
    const cookieStore = cookies()
    return createServerActionClient<Database>({ cookies: () => cookieStore })
}

export const createSafeSupabaseClient = () => {
    const cookieStore = cookies()
    try {
        return createServerComponentClient<Database>({ cookies: () => cookieStore })
    } catch (error) {
        // Return null if something fails (missing envs etc)
        console.error('Failed to create supabase client:', error)
        return null
    }
}
