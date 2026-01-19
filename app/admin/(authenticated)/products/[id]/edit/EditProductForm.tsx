'use client';

import { updateProduct } from '@/actions/admin';
import { useState, useTransition } from 'react';
import Image from 'next/image';
import { X, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Product {
    id: string;
    name: string;
    brand: string | null;
    category: string;
    price: number;
    description: string | null;
    images: string[] | null;
    image_url: string; // fallback
}

export default function EditProductForm({ product }: { product: Product }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [existingImages, setExistingImages] = useState<string[]>(
        product.images && product.images.length > 0 ? product.images : (product.image_url ? [product.image_url] : [])
    );
    const [error, setError] = useState<string | null>(null);

    const handleRemoveImage = (indexToRemove: number) => {
        setExistingImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
    };

    const handleSubmit = async (formData: FormData) => {
        setError(null);

        // Append existing images manually
        existingImages.forEach(url => {
            formData.append('existing_images', url);
        });

        startTransition(async () => {
            const res = await updateProduct(product.id, null, formData);
            if (res?.error) {
                setError(res.error);
            } else {
                // Success - maybe redirect or show toast?
                // Action already redirects/revalidates, but client might need to know
                // `updateProduct` does validation but let's assume if no error, we are good.
                // Actually `updateProduct` only revalidates. We might need to manually push to valid page if we want to leave the edit page.
                // But wait, revalidatePath doesn't redirect unless we use `redirect()`.
                // My action didn't use `redirect()`. It returns success.
                // So we should redirect here.
                router.push('/admin/products');
                router.refresh();
            }
        });
    };

    return (
        <form action={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input name="name" defaultValue={product.name} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Brand</label>
                    <input name="brand" defaultValue={product.brand || ''} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select name="category" defaultValue={product.category} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                        <option value="Face">Face</option>
                        <option value="Eyes">Eyes</option>
                        <option value="Lips">Lips</option>
                        <option value="Nails">Nails</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Price (MRP)</label>
                    <input name="price" type="number" step="0.01" defaultValue={product.price ? Math.round(product.price / 0.8) : ''} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    <p className="text-xs text-gray-500 mt-1">Selling price will be calculated as 20% off this value.</p>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" rows={4} defaultValue={product.description || ''} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>

                {/* Existing Images Grid */}
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-4">
                    {existingImages.map((url, idx) => (
                        <div key={idx} className="relative group aspect-square border rounded-md overflow-hidden">
                            <Image src={url} alt="Product" fill className="object-cover" />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(idx)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Upload New */}
                <div className="mt-1">
                    <label className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                        <Upload className="mr-2 h-5 w-5" />
                        Upload New Images
                        <input name="new_images" type="file" multiple accept="image/*" className="hidden" />
                    </label>
                    <p className="mt-1 text-xs text-gray-500">Selected files will be appended to existing images.</p>
                </div>
            </div>

            <div className="flex justify-end pt-5">
                <button
                    type="submit"
                    disabled={isPending}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {isPending ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}
