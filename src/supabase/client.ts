import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (window as any).MEOO_CONFIG?.meoo_app_access_url
  ? `${(window as any).MEOO_CONFIG.meoo_app_access_url}/sb-api`
  : `${window.location.origin}/sb-api`;

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lb28tYWdlbnQiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc0NDg1MTIwMCwiZXhwIjoxODAyNjE3NjAwfQ.test';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getSupabaseUrl(): string {
  return supabaseUrl;
}
