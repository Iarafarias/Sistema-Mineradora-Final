const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function request(path, options = {}) {
  const resposta = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!resposta.ok) {
    throw new Error('Erro na comunicacao com a API.');
  }

  const data = await resposta.json();
  return { data };
}

export const equipamentoService = {
  listar: () => request('/equipamentos'),
  criar: (payload) => request('/equipamentos', { method: 'POST', body: JSON.stringify(payload) }),
};

export const cidadeService = {
  listar: () => request('/cidades'),
  criar: (payload) => request('/cidades', { method: 'POST', body: JSON.stringify(payload) }),
};

export const funcionarioService = {
  listar: () => request('/funcionarios'),
  criar: (payload) => request('/funcionarios', { method: 'POST', body: JSON.stringify(payload) }),
};

export const servicoService = {
  listar: () => request('/servicos'),
  criar: (payload) => request('/servicos', { method: 'POST', body: JSON.stringify(payload) }),
};
