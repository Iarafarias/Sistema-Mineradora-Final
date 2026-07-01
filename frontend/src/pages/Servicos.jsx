import React, { useEffect, useState } from 'react';
import { FaClipboardList, FaListUl, FaPlus } from 'react-icons/fa';
import { equipamentoService, funcionarioService, servicoService } from '../services/api';

export default function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);

  const [descricao, setDescricao] = useState('');
  const [dataServico, setDataServico] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [funcionarioId, setFuncionarioId] = useState('');
  const [equipamentoId, setEquipamentoId] = useState('');

  const carregarDados = async () => {
    try {
      const [servicosResponse, funcionariosResponse, equipamentosResponse] = await Promise.all([
        servicoService.listar(),
        funcionarioService.listar(),
        equipamentoService.listar(),
      ]);

      setServicos(servicosResponse.data);
      setFuncionarios(funcionariosResponse.data);
      setEquipamentos(equipamentosResponse.data);
    } catch (error) {
      console.error('Erro ao buscar dados de servicos', error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const cadastrar = async () => {
    if (!descricao) {
      alert('Preencha a descricao do servico.');
      return;
    }

    try {
      await servicoService.criar({
        descricao,
        data_servico: dataServico || undefined,
        status,
        funcionario_id: funcionarioId ? Number(funcionarioId) : null,
        equipamento_id: equipamentoId ? Number(equipamentoId) : null,
      });

      setDescricao('');
      setDataServico('');
      setStatus('Pendente');
      setFuncionarioId('');
      setEquipamentoId('');
      carregarDados();
    } catch (error) {
      console.error('Erro ao cadastrar servico', error);
    }
  };

  return (
    <section>
      <div className="page-title-row">
        <FaClipboardList className="title-icon" aria-hidden="true" />
        <h2 className="page-title">Gestão de Serviços</h2>
      </div>
      <p className="page-subtitle">Planeje execuções e vincule responsável e equipamento de forma clara.</p>

      <div className="grid cols-2">
        <div>
          <label className="label" htmlFor="serv-desc">
            Descrição
          </label>
          <input
            id="serv-desc"
            className="input"
            type="text"
            placeholder="Ex: Revisão hidráulica"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
          />
        </div>

        <div>
          <label className="label" htmlFor="serv-data">
            Data do serviço
          </label>
          <input
            id="serv-data"
            className="input"
            type="date"
            value={dataServico}
            onChange={(event) => setDataServico(event.target.value)}
          />
        </div>

        <div>
          <label className="label" htmlFor="serv-status">
            Status
          </label>
          <select id="serv-status" className="select" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="Pendente">Pendente</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
          </select>
        </div>

        <div>
          <label className="label" htmlFor="serv-func">
            Funcionário responsável
          </label>
          <select
            id="serv-func"
            className="select"
            value={funcionarioId}
            onChange={(event) => setFuncionarioId(event.target.value)}
          >
            <option value="">Sem funcionário</option>
            {funcionarios.map((funcionario) => (
              <option key={funcionario.id} value={funcionario.id}>
                {funcionario.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="serv-equip">
            Equipamento
          </label>
          <select
            id="serv-equip"
            className="select"
            value={equipamentoId}
            onChange={(event) => setEquipamentoId(event.target.value)}
          >
            <option value="">Sem equipamento</option>
            {equipamentos.map((equipamento) => (
              <option key={equipamento.id} value={equipamento.id}>
                {equipamento.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="actions">
        <button type="button" className="btn-primary" onClick={cadastrar}>
          <FaPlus aria-hidden="true" />
          Cadastrar servico
        </button>
      </div>

      <section className="panel">
        <div className="panel-header">
          <FaListUl aria-hidden="true" />
          Serviços cadastrados
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Status</th>
                <th>Data</th>
                <th>Funcionário</th>
                <th>Equipamento</th>
              </tr>
            </thead>
            <tbody>
              {servicos.length === 0 && (
                <tr>
                  <td colSpan="6">Nenhum serviço cadastrado.</td>
                </tr>
              )}
              {servicos.map((servico) => (
                <tr key={servico.id}>
                  <td>{servico.id}</td>
                  <td>{servico.descricao}</td>
                  <td>
                    <span
                      className={`badge ${
                        servico.status === 'Concluído'
                          ? 'concluido'
                          : servico.status === 'Em andamento'
                            ? 'andamento'
                            : 'pendente'
                      }`}
                    >
                      {servico.status}
                    </span>
                  </td>
                  <td>{servico.data_servico}</td>
                  <td>{servico.funcionarios?.nome || '-'}</td>
                  <td>{servico.equipamentos?.nome || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
