import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import CategorySection from '@/components/CategorySection';
import BannerCarousel from '@/components/BannerCarousel';
import BrandSection from '@/components/BrandSection';

export const revalidate = 0; // Disable caching for now to see real-time updates

import { Product } from '@/types';

interface Category {
  id: string;
  name: string;
}

// Data fetching
async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data as Product[] || [];
}

async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data as Category[] || [];
}

export default async function Home() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="bg-gray-100 min-h-screen pb-20">
      <div className="container mx-auto px-2 md:px-4 py-2">
        {/* Banner Carousel */}
        <BannerCarousel />

        {/* Categories */}
        <div className="bg-white rounded-lg shadow-sm mb-4">
          <CategorySection categories={categories} />
        </div>

        {/* Shop By Brand */}
        <BrandSection />

        {/* Featured Products */}
        <h2 className="text-lg font-bold text-gray-800 mb-3 px-2 mt-6">Best Selling Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 px-1">
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
          {products.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-lg">
              No products found. Please ensure database is seeded.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
