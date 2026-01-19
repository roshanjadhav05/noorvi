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
                    images: string[] | null
                    description: string | null
                    created_at: string
                    brand: string | null
                }
                Insert: {
                    id?: string
                    name: string
                    category: string
                    price: number
                    image_url: string
                    images?: string[] | null
                    description?: string | null
                    created_at?: string
                    brand?: string | null
                }
                Update: {
                    id?: string
                    name?: string
                    category?: string
                    price?: number
                    image_url?: string
                    images?: string[] | null
                    description?: string | null
                    created_at?: string
                    brand?: string | null
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
                    user_id: string | null
                    total_price: number | null
                }
                Insert: {
                    id?: string
                    customer_name: string
                    phone: string
                    address: string
                    product_name: string
                    quantity: number
                    created_at?: string
                    user_id?: string | null
                    total_price?: number | null
                }
                Update: {
                    id?: string
                    customer_name?: string
                    phone?: string
                    address?: string
                    product_name?: string
                    quantity?: number
                    created_at?: string
                    user_id?: string | null
                    total_price?: number | null
                }
            }
            wishlist: {
                Row: {
                    id: string
                    user_id: string
                    product_id: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    product_id: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    product_id?: string
                    created_at?: string
                }
            }
        }
    }
}
