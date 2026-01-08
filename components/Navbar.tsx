'use client';

import Link from 'next/link';
import { ShoppingCart, Menu } from 'lucide-react';
import { useState, useEffect, Suspense } from 'react';
import { getCart } from '@/lib/cart';
import SearchBar from './SearchBar';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        // Initial load
        setCartCount(getCart().reduce((acc, item) => acc + item.quantity, 0));

        // Listen for updates
        const handleCartUpdate = () => {
            setCartCount(getCart().reduce((acc, item) => acc + item.quantity, 0));
        };

        window.addEventListener('cart-updated', handleCartUpdate);
        return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }, []);

    return (
        <nav className="bg-white text-gray-800 sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-2 md:px-4">
                {/* Top Row: Menu, Logo, Actions */}
                <div className="flex items-center justify-between h-14 gap-2">

                    <div className="flex items-center gap-2">
                        {/* Hamburger Menu */}
                        <button className="md:hidden p-1 text-gray-600">
                            <Menu className="h-6 w-6" />
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-1">
                            <div className="flex flex-col leading-none">
                                <span className="font-bold text-lg md:text-xl text-blue-600 italic tracking-wide">NOORVI</span>
                                <span className="text-[10px] md:text-xs text-gray-500 font-medium">
                                    Wholesale Cosmetic
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Search */}
                    <div className="hidden md:flex flex-1 max-w-xl mx-6">
                        <Suspense fallback={<div className="h-10 bg-gray-100 rounded-md animate-pulse" />}>
                            <SearchBar />
                        </Suspense>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 md:gap-6">
                        {/* Login (Hidden on tiny screens if needed, but usually visible) */}
                        <button className="hidden md:block px-6 py-1 text-blue-600 bg-white border border-gray-200 font-medium text-sm hover:bg-blue-600 hover:text-white transition-colors rounded-sm">
                            Login
                        </button>

                        <Link href="/cart" className="flex items-center gap-2 font-medium text-gray-700">
                            <div className="relative">
                                <ShoppingCart className="h-6 w-6" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span className="hidden md:inline text-sm">Cart</span>
                        </Link>
                    </div>
                </div>

                {/* Mobile Search Bar (Separate Row) */}
                <div className="md:hidden pb-2">
                    <Suspense fallback={<div className="h-10 bg-gray-100 rounded-lg animate-pulse" />}>
                        <SearchBar />
                    </Suspense>
                </div>
            </div>
        </nav>
    );
}
