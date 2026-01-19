import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import EditProductForm from './EditProductForm';

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const supabase = createClient();
    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();

    if (error || !product) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Product</h1>
            <EditProductForm product={product} />
        </div>
    );
}
