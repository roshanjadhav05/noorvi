'use server'

import { createActionClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function signUp(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string
    const phone = formData.get('phone') as string
    const supabase = createActionClient()

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                phone: phone,
            },
        },
    })

    if (error) {
        return { error: error.message }
    }

    // Redirect to verify email page or login if email confirmation is disabled
    // For now, redirect to login with a message
    return { success: true, message: 'Signup successful! Please log in.' }
}

export async function signIn(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createActionClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error('Login Error:', error.message)
        return { error: error.message }
    }

    console.log('Login Successful for:', email)
    redirect('/')
}

export async function signOut() {
    const supabase = createActionClient()
    await supabase.auth.signOut()
    redirect('/login')
}
