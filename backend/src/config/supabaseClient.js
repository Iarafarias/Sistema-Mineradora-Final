const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variaveis SUPABASE_URL e SUPABASE_ANON_KEY sao obrigatorias.');
}

if (supabaseUrl.includes('SEU-PROJETO') || supabaseAnonKey.includes('SUA_CHAVE_ANON')) {
  throw new Error(
    'Configure backend/.env com credenciais reais do Supabase antes de iniciar o backend.'
  );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;
