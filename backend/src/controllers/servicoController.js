const supabase = require('../config/supabaseClient');

const listarServicos = async (req, res) => {
  const { data, error } = await supabase
    .from('servicos')
    .select('id, descricao, data_servico, status, funcionario_id, equipamento_id, funcionarios(id, nome), equipamentos(id, nome)')
    .order('id', { ascending: true });

  if (error) {
    return res.status(500).json({ erro: 'Erro ao listar servicos', detalhes: error.message });
  }

  return res.status(200).json(data);
};

const criarServico = async (req, res) => {
  const { descricao, data_servico, status, funcionario_id, equipamento_id } = req.body;

  if (!descricao) {
    return res.status(400).json({ erro: 'O campo descricao e obrigatorio.' });
  }

  const payload = {
    descricao,
    data_servico: data_servico || undefined,
    status: status || 'Pendente',
    funcionario_id: funcionario_id || null,
    equipamento_id: equipamento_id || null,
  };

  const { data, error } = await supabase.from('servicos').insert(payload).select().single();

  if (error) {
    return res.status(500).json({ erro: 'Erro ao criar servico', detalhes: error.message });
  }

  return res.status(201).json(data);
};

module.exports = {
  listarServicos,
  criarServico,
};
