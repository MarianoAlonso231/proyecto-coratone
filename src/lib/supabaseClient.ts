import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://xtabqtyclyliadkzajxh.supabase.co'; const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0YWJxdHljbHlsaWFka3phanhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5OTczMDQsImV4cCI6MjA2MjU3MzMwNH0._NctkFWEVx42WaPFBo1NJ8YZZOcXJbcAbOJ1QJ87BCM';
export const supabase = createClient(supabaseUrl, supabaseKey);

