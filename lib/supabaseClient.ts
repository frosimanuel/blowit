import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fwkgxhgovwyuxwbjevmg.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3a2d4aGdvdnd5dXh3Ympldm1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5ODc4MjEsImV4cCI6MjA2NTU2MzgyMX0.W4wJ_LndkkYAnobnu2pThsQEWUfj6vl4-8AdaVYocZw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
