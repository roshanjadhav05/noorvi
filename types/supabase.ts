export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            categories: {
                Row: {
                    id: string
                    name: string
                }
                Insert: {
                    id?: string
                    name: string
                }
                Update: {
                    id?: string
                    name?: string
                }
            }
            products: {
                Row: {
                    id: string
                    name: string
                    category: string
                    price: number
                    image_url: string
                    description: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    category: string
                    price: number
                    image_url: string
                    description?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    category?: string
                    price?: number
                    image_url?: string
                    description?: string | null
                    created_at?: string
                }
            }
            orders: {
                Row: {
                    id: string
                    customer_name: string
                    phone: string
                    address: string
                    product_name: string
                    quantity: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    customer_name: string
                    phone: string
                    address: string
                    product_name: string
                    quantity: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    customer_name?: string
                    phone?: string
                    address?: string
                    product_name?: string
                    quantity?: number
                    created_at?: string
                }
            }
        }
    }
}
