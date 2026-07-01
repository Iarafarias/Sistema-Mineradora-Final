const { createClient } = require('@supabase/supabase-js');

const sanitizeEnvValue = (value) => {
  if (!value) {
    return '';
  }

  return value.trim().replace(/^['\"]|['\"]$/g, '');
};

const supabaseUrl = sanitizeEnvValue(process.env.SUPABASE_URL);
const supabaseAnonKey = sanitizeEnvValue(process.env.SUPABASE_ANON_KEY);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variaveis SUPABASE_URL e SUPABASE_ANON_KEY sao obrigatorias.');
}

let parsedSupabaseUrl;

try {
  parsedSupabaseUrl = new URL(supabaseUrl);
} catch (error) {
  throw new Error(
    'SUPABASE_URL invalida. Use o formato https://<project-ref>.supabase.co sem aspas.'
  );
}

if (parsedSupabaseUrl.protocol !== 'https:') {
  throw new Error('SUPABASE_URL deve usar https.');
}

if (supabaseUrl.includes('SEU-PROJETO') || supabaseAnonKey.includes('SUA_CHAVE_ANON')) {
  throw new Error(
    'Configure backend/.env com credenciais reais do Supabase antes de iniciar o backend.'
  );
}

const supabase = createClient(parsedSupabaseUrl.origin, supabaseAnonKey);

module.exports = supabase;
