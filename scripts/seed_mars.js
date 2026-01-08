const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// Read raw data from file
const rawDataPath = path.join(__dirname, '../data/mars.txt');
let productsToInsert = [];

try {
    const rawData = fs.readFileSync(rawDataPath, 'utf8');
    productsToInsert = parseData(rawData);
    console.log(`Parsed ${productsToInsert.length} products from ${rawDataPath}.`);
} catch (err) {
    console.error('Error reading data file:', err);
    process.exit(1);
}

// Helper to parse the text data
function parseData(text) {
    const lines = text.split('\n').filter(l => l.trim());
    const products = [];
    let currentCategory = 'Uncategorized';
    let currentSubCategory = '';

    for (const line of lines) {
        const trimmed = line.trim();
        if (/^\d+\.\s+[A-Z]+/.test(trimmed)) {
            // Main Category (e.g., 1. LIPS)
            currentCategory = trimmed.split('. ')[1];
            currentSubCategory = ''; // Reset
        } else if (/^\d+\.\d+\s+[^–-]+$/.test(trimmed) && !trimmed.includes('Rs.')) {
            // Sub Category (e.g., 1.1 Lipstick)
            const parts = trimmed.split(/^\d+\.\d+\s+/);
            if (parts[1]) currentSubCategory = parts[1].trim();
        } else if (line.includes('Rs.')) {
            const categoryToUse = currentSubCategory ? currentSubCategory : currentCategory;
            extractProduct(trimmed, categoryToUse, products);
        }
    }
    return products;
}

function extractProduct(line, category, products) {
    const cleanLine = line.replace(/^\d+(\.\d+)*\s+/, '');
    const parts = cleanLine.split('– Rs.'); // special dash

    // Also try normal hyphen if split fails
    if (parts.length < 2) {
        const parts2 = cleanLine.split('- Rs.');
        if (parts2.length >= 2) {
            parts.length = 0;
            parts.push(...parts2);
        }
    }

    if (parts.length >= 2) {
        const name = parts[0].trim();
        let priceStr = parts[1].trim();
        const price = parseInt(priceStr.replace(/[^\d]/g, '').substring(0, 5), 10);

        if (name && price) {
            products.push({
                name,
                category,
                price,
                brand: 'MARS',
                image_url: 'https://via.placeholder.com/300?text=' + encodeURIComponent(name),
                description: `${name} by MARS.`,
            });
        }
    }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
    console.log('Seeding Mars products...');

    // Delete existing
    const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('brand', 'MARS');

    if (deleteError) {
        console.log('Could not clear existing products (might be RLS). Proceeding to insert...');
    } else {
        console.log('Cleared existing MARS products.');
    }

    // Insert new
    const { data, error } = await supabase
        .from('products')
        .insert(productsToInsert);

    if (error) {
        console.error('Error inserting products:', error);
    } else {
        console.log(`Successfully inserted ${productsToInsert.length} products.`);
    }
}

seed();
