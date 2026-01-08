import Link from 'next/link';
import Image from 'next/image';

interface CategorySectionProps {
    categories: { id: string; name: string }[];
}

// Map categories to images (in a real app these might come from DB)
const CATEGORY_IMAGES: Record<string, string> = {
    'Lipstick': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=150&q=80',
    'Mascara': 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=150&q=80',
    'Foundation': 'https://images.unsplash.com/photo-1590156206657-b16ce724c326?w=150&q=80',
    'Compact': 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=150&q=80',
    'Skincare': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=150&q=80',
    'Accessories': 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=150&q=80',
};

export default function CategorySection({ categories }: CategorySectionProps) {
    return (
        <div className="bg-white py-4 overflow-x-auto scrollbar-hide">
            <div className="flex min-w-max px-4 mx-auto max-w-7xl gap-4 md:gap-8 justify-start md:justify-center">
                {categories.map((cat) => (
                    <Link key={cat.id} href={`/category/${cat.name}`} className="flex flex-col items-center group min-w-[70px]">
                        <div className="h-16 w-16 md:h-20 md:w-20 relative mb-1 overflow-hidden rounded-full bg-gray-100 border border-gray-100 group-hover:border-blue-500 transition-all">
                            <Image
                                src={CATEGORY_IMAGES[cat.name] || 'https://via.placeholder.com/150'}
                                alt={cat.name}
                                fill
                                className="object-cover p-1 rounded-full"
                            />
                        </div>
                        <span className="text-xs md:text-sm font-medium text-gray-700 text-center leading-tight">
                            {cat.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
