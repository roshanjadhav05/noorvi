'use client';

import { deleteProduct } from '@/actions/admin';
import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';

export default function DeleteProductButton({ id, name }: { id: string, name: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        if (confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) {
            startTransition(async () => {
                const res = await deleteProduct(id);
                if (res?.error) {
                    alert(res.error);
                }
            });
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="text-red-600 hover:text-red-900 mx-2 p-1 rounded hover:bg-red-50 disabled:opacity-50"
            title="Delete Product"
        >
            <Trash2 size={18} />
        </button>
    );
}
