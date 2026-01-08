// scripts/test_db.js
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('--- Supabase Diagnostic Test ---');
console.log('Checking Environment Variables:');
console.log('NEXT_PUBLIC_SUPABASE_URL:', url ? 'FOUND' : 'MISSING');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', key ? 'FOUND' : 'MISSING');

if (!url || !key) {
    console.error('❌ CRITICAL: Missing Env Vars. Please create .env.local');
    process.exit(1);
}

const supabase = createClient(url, key);

async function testConnection() {
    console.log('\nTesting Database Connection...');

    // 1. Check if table exists and has data
    const { count, error: countError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

    if (countError) {
        console.error('❌ Error connecting to "products" table:', countError.message);
        console.error('   Hint: Check if table exists in Supabase or if RLS policies block anonymous access.');
        return;
    }

    console.log(`✅ Connection Successful. Found ${count} products in table.`);

    if (count === 0) {
        console.warn('⚠️  Table is empty. Please run "node scripts/seed_mars.js"');
    } else {
        // 2. Try to fetch one product
        const { data: samples, error: sampleError } = await supabase
            .from('products')
            .select('id, name, category, brand')
            .limit(3);

        if (sampleError) {
            console.error('❌ Error fetching samples:', sampleError.message);
        } else {
            console.log('\nSample Products Fetched:');
            console.table(samples);
        }
    }
}

testConnection();
