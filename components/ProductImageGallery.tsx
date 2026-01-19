'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductImageGallery({
    images,
    fallbackImage,
    name
}: {
    images: string[] | null,
    fallbackImage: string,
    name: string
}) {
    // If no images array, use fallback as single item array
    const imageList = (images && images.length > 0) ? images : [fallbackImage];

    // Ensure we have unique URLs to avoid key issues, though unlikely with Supabase URLs
    const uniqueImages = Array.from(new Set(imageList));

    const [selectedIndex, setSelectedIndex] = useState(0);

    const handlePrev = () => {
        setSelectedIndex((prev) => (prev === 0 ? uniqueImages.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setSelectedIndex((prev) => (prev === uniqueImages.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="flex flex-col items-center w-full select-none">
            {/* Main Image */}
            <div className="relative w-full aspect-square max-w-md mb-4 overflow-hidden rounded-lg bg-white group">
                <Image
                    src={uniqueImages[selectedIndex]}
                    alt={name}
                    fill
                    className="object-contain transition-opacity duration-300"
                    priority
                />

                {/* Navigation Buttons (Only if multiple images) */}
                {uniqueImages.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.preventDefault(); handlePrev(); }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={(e) => { e.preventDefault(); handleNext(); }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none"
                            aria-label="Next image"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {uniqueImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 w-full max-w-md px-1 no-scrollbar justify-center">
                    {uniqueImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedIndex(idx)}
                            className={`relative w-16 h-16 flex-shrink-0 border-2 rounded-md overflow-hidden transition-all ${selectedIndex === idx
                                ? 'border-indigo-600 shadow-md ring-1 ring-indigo-600'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`${name} view ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Dots indicator for mobile */}
            {uniqueImages.length > 1 && (
                <div className="flex md:hidden gap-1.5 mt-2">
                    {uniqueImages.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all ${selectedIndex === idx ? 'w-4 bg-indigo-600' : 'w-1.5 bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
