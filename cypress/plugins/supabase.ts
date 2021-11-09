

import { createClient } from '@supabase/supabase-js';
// console.log(process.env)
const supbaseUrl = process.env.VUE_APP_SUPABASE_URL;
export const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const supabase = createClient(supbaseUrl!, serviceRoleKey!);
