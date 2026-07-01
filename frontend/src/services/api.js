const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'https://sistema-mineradora-final.onrender.com' : '');

function getApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error('Configure VITE_API_URL no ambiente de producao.');
  }

  return API_BASE_URL;
}

async function request(path, options = {}) {
  const resposta = await fetch(`${getApiBaseUrl()}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!resposta.ok) {
    throw new Error(`Erro na comunicacao com a API. Status: ${resposta.status}`);
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
