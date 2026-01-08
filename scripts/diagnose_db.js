const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnose() {
    console.log('--- Starting Diagnosis ---');

    // 1. Try to fetch one product to see if connection works
    const { data: fetchTest, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .limit(1);

    if (fetchError) {
        console.error('FAIL: Could not fetch products. Error:', JSON.stringify(fetchError));
    } else {
        console.log('SUCCESS: Connected and fetched products.');
    }

    // 2. Try to insert a dummy product with 'brand' to check if column exists
    const testProduct = {
        name: 'Test Product',
        category: 'Test',
        price: 100,
        image_url: 'http://example.com',
        brand: 'TEST_BRAND'
    };

    const { data: insertTest, error: insertError } = await supabase
        .from('products')
        .insert([testProduct])
        .select();

    if (insertError) {
        console.error('FAIL: Insert failed. Error:', JSON.stringify(insertError));
        if (insertError.message.includes('column "brand" of relation "products" does not exist')) {
            console.log('DIAGNOSIS: The "brand" column is missing from the database.');
        } else if (insertError.code === '42501') {
            console.log('DIAGNOSIS: Permission denied (RLS policy).');
        }
    } else {
        console.log('SUCCESS: Inserted product with brand. Column exists and permissions are OK.');
        // Clean up
        if (insertTest && insertTest[0]) {
            await supabase.from('products').delete().eq('id', insertTest[0].id);
        }
    }

    console.log('--- Diagnosis Complete ---');
}

diagnose();
