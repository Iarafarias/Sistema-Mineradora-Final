const supabase = require('../config/supabaseClient');

const listarEquipamentos = async (req, res) => {
  const { data, error } = await supabase.from('equipamentos').select('*').order('id', { ascending: true });

  if (error) {
    return res.status(500).json({ erro: 'Erro ao listar equipamentos', detalhes: error.message });
  }

  return res.status(200).json(data);
};

const criarEquipamento = async (req, res) => {
  const { nome, setor } = req.body;

  if (!nome || !setor) {
    return res.status(400).json({ erro: 'Os campos nome e setor sao obrigatorios.' });
  }

  const payload = {
    nome,
    setor,
  };

  const { data, error } = await supabase.from('equipamentos').insert(payload).select().single();

  if (error) {
    return res.status(500).json({ erro: 'Erro ao criar equipamento', detalhes: error.message });
  }

  return res.status(201).json(data);
};

module.exports = {
  listarEquipamentos,
  criarEquipamento,
};
