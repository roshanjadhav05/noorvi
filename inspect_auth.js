const auth = require('@supabase/auth-helpers-nextjs');
const fs = require('fs');
const exportsList = Object.keys(auth);
fs.writeFileSync('auth_exports.json', JSON.stringify(exportsList, null, 2));
console.log('Exports written to auth_exports.json');
