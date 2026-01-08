export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    image_url: string;
    description: string;
    brand?: string;
    // adding created_at as it's often used for sorting, though not strictly required by user prompt, it's good practice
    created_at?: string;
}

export interface CartItem extends Pick<Product, 'id' | 'name' | 'price' | 'image_url'> {
    quantity: number;
}
