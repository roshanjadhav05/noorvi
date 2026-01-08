import { createSafeSupabaseClient } from '@/lib/supabase/server';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

export const revalidate = 0;

// Fetch products by category
async function getCategoryProducts(category: string): Promise<Product[]> {
    const supabase = createSafeSupabaseClient();

    // Graceful fallback if env vars missing (build time protection)
    if (!supabase) {
        console.warn('Supabase client invalid (missing env vars?), returning empty products.');
        return [];
    }

    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .ilike('category', category) // Case insensitive match
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching products:', error);
            return [];
        }
        return data as Product[] || [];
    } catch (e) {
        console.error('Unexpected error fetching products:', e);
        return [];
    }
}

interface CategoryPageProps {
    params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const categoryName = decodeURIComponent(params.slug);
    const products = await getCategoryProducts(categoryName);

    return (
        <div className="container mx-auto px-2 md:px-4 py-4">
            <h1 className="text-xl font-bold text-gray-800 mb-4 capitalize">{categoryName}</h1>

            {products.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-lg text-gray-500">No products found in this category.</h3>
                    <p className="text-sm text-gray-400 mt-2">
                        (If this is a fresh deploy, ensure Supabase env vars are set)
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                    {products.map((product) => (
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
            )}
        </div>
    );
}
