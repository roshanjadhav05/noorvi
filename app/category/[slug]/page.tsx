import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';

// Fetch products by category
async function getCategoryProducts(category: string) {
    // Decode slug component to handle spaces if needed (though usually slugs are hyphenated)
    // Assuming exact match on name for now, or we should use slugify
    // The task says "category names" are plain text.

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('category', category) // Case insensitive match
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }
    return data || [];
}

interface CategoryPageProps {
    params: { slug: string };
}

export const revalidate = 0;

export default async function CategoryPage({ params }: CategoryPageProps) {
    const categoryName = decodeURIComponent(params.slug);
    const products = await getCategoryProducts(categoryName);

    return (
        <div className="container mx-auto px-2 md:px-4 py-4">
            <h1 className="text-xl font-bold text-gray-800 mb-4 capitalize">{categoryName}</h1>

            {products.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-lg text-gray-500">No products found in this category.</h3>
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
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
