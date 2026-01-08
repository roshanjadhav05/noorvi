'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
    '/banners/noorvi_banner.jpg',
    '/banners/noorvi_banner.jpg',
    '/banners/noorvi_banner.jpg',
];

export default function BannerCarousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % banners.length);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
    };

    return (
        <div className="relative w-full aspect-[2/1] md:aspect-[3/1] bg-gray-100 rounded-lg overflow-hidden mb-4 group">
            {banners.map((src, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <Image
                        src={src}
                        alt={`Banner ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                </div>
            ))}

            {/* Navigation Buttons (Hidden on mobile, shown on hover/desktop) */}
            <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 p-1 rounded-full hover:bg-white hidden group-hover:block"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 p-1 rounded-full hover:bg-white hidden group-hover:block"
            >
                <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                {banners.map((_, index) => (
                    <div
                        key={index}
                        className={`h-1.5 w-1.5 rounded-full transition-all ${index === current ? 'bg-white w-4' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
