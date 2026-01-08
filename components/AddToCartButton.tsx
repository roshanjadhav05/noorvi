'use client';

import { addToCart } from '@/lib/cart';

interface Product {
    id: string;
    name: string;
    price: number;
    image_url: string;
}

export default function AddToCartButton({ product }: { product: Product }) {
    const handleAdd = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image_url: product.image_url
        });
    };

    return (
        <button
            onClick={handleAdd}
            className="flex-1 bg-white border border-gray-300 text-gray-800 font-bold py-3 rounded-md hover:bg-gray-50 transition-colors"
        >
            Add to Cart
        </button>
    );
}
