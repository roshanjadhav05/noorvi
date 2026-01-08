'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState('');

    useEffect(() => {
        // Sync local state with URL param
        const q = searchParams.get('q');
        if (q) {
            setQuery(q);
        }
    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full bg-blue-50 rounded-md">
            <button type="submit" className="absolute left-3 top-2.5">
                <Search className="h-4 w-4 text-gray-500 hover:text-blue-600 transition-colors" />
            </button>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products, brands and more"
                className="w-full py-2 pl-10 pr-4 bg-transparent text-sm focus:outline-none placeholder-gray-500"
            />
        </form>
    );
}
