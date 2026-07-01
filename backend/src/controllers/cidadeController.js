const supabase = require('../config/supabaseClient');

const listarCidades = async (req, res) => {
  const { data, error } = await supabase.from('cidades').select('*').order('id', { ascending: true });

  if (error) {
    return res.status(500).json({ erro: 'Erro ao listar cidades', detalhes: error.message });
  }

  return res.status(200).json(data);
};

const criarCidade = async (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: 'O campo nome e obrigatorio.' });
  }

  const { data, error } = await supabase.from('cidades').insert({ nome }).select().single();

  if (error) {
    return res.status(500).json({ erro: 'Erro ao criar cidade', detalhes: error.message });
  }

  return res.status(201).json(data);
};

module.exports = {
  listarCidades,
  criarCidade,
};
