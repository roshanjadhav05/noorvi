'use client';

import Image from 'next/image';
import Link from 'next/link';
import { addToCart } from '@/lib/cart';
import { Heart, Star } from 'lucide-react';

import { Product } from '@/types';

interface ProductCardProps extends Partial<Product> {
    id: string;
    name: string;
    category: string;
    price: number;
    imageUrl: string;
    brand?: string;
}

export default function ProductCard({ id, name, category, price, imageUrl, brand }: ProductCardProps) {
    // Mock data for visual completeness matching the reference image
    const rating = 4.2;
    const ratingCount = Math.floor(Math.random() * 5000) + 500;
    const originalPrice = Math.round(price * 1.35);
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation
        addToCart({
            id,
            name,
            price,
            quantity: 1,
            image_url: imageUrl
        });
        alert('Added to cart!');
    };

    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col h-[380px] w-full relative group">

            {/* Wishlist Heart - Absolute Position */}
            <div className="absolute top-3 right-3 z-10">
                <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm text-gray-400 hover:text-red-500 cursor-pointer transition-colors border border-gray-100">
                    <Heart className="h-4 w-4" />
                </div>
            </div>

            {/* Trending Tag (Mock) - Optional */}
            {/* <div className="absolute top-3 left-0 z-10">
                <div className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-r-sm shadow-sm">
                    Running out
                </div>
            </div> */}

            <Link href={`/product/${id}`} className="relative h-[220px] w-full block bg-white p-2">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </Link>

            <div className="p-3 flex flex-col flex-grow bg-white rounded-b-lg">
                {/* Brand */}
                <div className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider truncate">
                    {brand || category}
                </div>

                {/* Title */}
                <Link href={`/product/${id}`} className="text-sm text-gray-800 line-clamp-2 leading-tight mb-2 hover:text-blue-600 transition-colors h-10">
                    {name}
                </Link>

                {/* Rating Badge */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="px-1.5 py-0.5 bg-green-700 text-white text-[10px] font-bold rounded flex items-center gap-0.5 shadow-sm">
                        {rating} <Star size={10} className="fill-white" />
                    </div>
                    <span className="text-xs text-gray-500 font-medium">({ratingCount.toLocaleString()})</span>
                </div>

                <div className="mt-auto">
                    {/* Price Row */}
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-base font-bold text-gray-900">₹{price}</span>
                        <span className="text-xs text-gray-500 line-through">₹{originalPrice}</span>
                        <span className="text-xs font-bold text-green-600">{discount}% off</span>
                    </div>

                    {/* Lowest Price Tag */}
                    <div className="inline-block px-2 py-0.5 bg-green-50 border border-green-100 rounded-full mb-3">
                        <span className="text-[10px] font-bold text-green-700 block text-center">
                            Lowest price since launch
                        </span>
                    </div>

                    {/* Add to Cart - Full width button at bottom */}
                    {/* <button
                        onClick={handleAddToCart}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 rounded-sm text-xs transition-colors shadow-sm"
                    >
                        Add to Cart
                    </button> */}
                </div>
            </div>
        </div>
    );
}
