'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="md:hidden p-1 mr-2 rounded-full hover:bg-gray-100"
            aria-label="Go back"
        >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>
    );
}
