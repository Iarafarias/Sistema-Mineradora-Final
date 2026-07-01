const supabase = require('../config/supabaseClient');

const listarFuncionarios = async (req, res) => {
  const { data, error } = await supabase
    .from('funcionarios')
    .select('id, nome, cargo, setor, cidade_id, cidades(id, nome)')
    .order('id', { ascending: true });

  if (error) {
    return res.status(500).json({ erro: 'Erro ao listar funcionarios', detalhes: error.message });
  }

  return res.status(200).json(data);
};

const criarFuncionario = async (req, res) => {
  const { nome, cargo, setor, cidade_id } = req.body;

  if (!nome || !cargo) {
    return res.status(400).json({ erro: 'Os campos nome e cargo sao obrigatorios.' });
  }

  const payload = {
    nome,
    cargo,
    setor: setor || null,
    cidade_id: cidade_id || null,
  };

  const { data, error } = await supabase.from('funcionarios').insert(payload).select().single();

  if (error) {
    return res.status(500).json({ erro: 'Erro ao criar funcionario', detalhes: error.message });
  }

  return res.status(201).json(data);
};

module.exports = {
  listarFuncionarios,
  criarFuncionario,
};
