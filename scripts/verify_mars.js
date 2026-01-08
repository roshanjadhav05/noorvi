const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
    const { count, error } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('brand', 'MARS');

    if (error) {
        console.error('Error verifying products:', error);
        process.exit(1);
    } else {
        console.log(`Found ${count} MARS products.`);
        if (count > 0) process.exit(0);
        else process.exit(1);
    }
}

verify();
