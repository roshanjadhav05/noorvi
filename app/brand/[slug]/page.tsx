import { createSafeSupabaseClient } from '@/lib/supabase/server';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const revalidate = 0;

import { Product } from '@/types';

interface PageProps {
    params: {
        slug: string;
    };
}

// Fetch products by brand
// Fetch products by brand
async function getBrandProducts(brandName: string): Promise<Product[]> {
    const supabase = createSafeSupabaseClient();

    if (!supabase) {
        console.warn('Supabase client invalid (missing env vars?), returning empty products.');
        return [];
    }

    try {
        // Decode the slug to handle spaces or special vars if any, though likely simple text
        const decodedBrand = decodeURIComponent(brandName);

        // Use textSearch or ilike for flexible matching, or exact match if preferred
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .ilike('brand', decodedBrand)
            .order('price', { ascending: true }); // Maybe sort by price or created_at

        if (error) {
            console.error(`Error fetching products for brand ${brandName}:`, error);
            return [];
        }
        return data as Product[] || [];
    } catch (e) {
        console.error('Unexpected error fetching brand products:', e);
        return [];
    }
}

export default async function BrandPage({ params }: PageProps) {
    const brandName = decodeURIComponent(params.slug);
    const products = await getBrandProducts(params.slug);

    // Group by category
    const groupedProducts: Record<string, Product[]> = {};
    products.forEach(p => {
        const cat = p.category || 'Other';
        if (!groupedProducts[cat]) groupedProducts[cat] = [];
        groupedProducts[cat].push(p);
    });

    const categories = Object.keys(groupedProducts).sort();

    return (
        <div className="bg-gray-100 min-h-screen pb-20">
            {/* Breadcrumb / Header */}
            <div className="bg-white shadow-sm sticky top-0 md:top-14 z-40 border-b border-gray-200">
                <div className="container mx-auto px-4 py-3 flex items-center gap-4">
                    <Link href="/" className="md:hidden">
                        <ChevronLeft className="h-6 w-6 text-gray-600" />
                    </Link>
                    {/* Desktop nav also good to have breadcrumb style */}
                    <Link href="/" className="hidden md:flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
                        <ChevronLeft className="h-4 w-4" />
                        <span>Back to Home</span>
                    </Link>
                    <div className="h-6 w-[1px] bg-gray-300 hidden md:block"></div>
                    <h1 className="text-lg md:text-xl font-bold text-gray-800">
                        {brandName} <span className="text-sm font-normal text-gray-500">({products.length} Items)</span>
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-2 md:px-4 py-4 space-y-6">
                {categories.map(category => (
                    <div key={category} className="bg-white rounded-lg p-3 md:p-4 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 px-2 border-l-4 border-blue-600 pl-2">
                            {category}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 px-1">
                            {groupedProducts[category].map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    category={product.category}
                                    price={product.price}
                                    imageUrl={product.image_url}
                                    brand={product.brand}
                                />
                            ))}
                        </div>
                    </div>
                ))}

                {products.length === 0 && (
                    <div className="col-span-full py-20 text-center">
                        <div className="text-gray-500 mb-4">No products found for {brandName}</div>
                        <Link href="/" className="text-blue-600 font-medium hover:underline">
                            Go back home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
