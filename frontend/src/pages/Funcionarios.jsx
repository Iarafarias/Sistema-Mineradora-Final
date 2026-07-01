import React, { useEffect, useState } from 'react';
import { FaListUl, FaPlus, FaUsers } from 'react-icons/fa';
import { cidadeService, funcionarioService } from '../services/api';

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [setor, setSetor] = useState('');
  const [cidadeId, setCidadeId] = useState('');

  const carregarDados = async () => {
    try {
      const [funcionariosResponse, cidadesResponse] = await Promise.all([
        funcionarioService.listar(),
        cidadeService.listar(),
      ]);

      setFuncionarios(funcionariosResponse.data);
      setCidades(cidadesResponse.data);
    } catch (error) {
      console.error('Erro ao buscar dados de funcionarios', error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const cadastrar = async () => {
    if (!nome || !cargo) {
      alert('Preencha nome e cargo.');
      return;
    }

    try {
      await funcionarioService.criar({
        nome,
        cargo,
        setor: setor || null,
        cidade_id: cidadeId ? Number(cidadeId) : null,
      });

      setNome('');
      setCargo('');
      setSetor('');
      setCidadeId('');
      carregarDados();
    } catch (error) {
      console.error('Erro ao cadastrar funcionario', error);
    }
  };

  return (
    <section>
      <div className="page-title-row">
        <FaUsers className="title-icon" aria-hidden="true" />
        <h2 className="page-title">Gestão de Funcionários</h2>
      </div>
      <p className="page-subtitle">Mantenha o quadro de equipe com cargo, setor e base por cidade.</p>

      <div className="grid cols-2">
        <div>
          <label className="label" htmlFor="func-nome">
            Nome
          </label>
          <input
            id="func-nome"
            className="input"
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
        </div>

        <div>
          <label className="label" htmlFor="func-cargo">
            Cargo
          </label>
          <input
            id="func-cargo"
            className="input"
            type="text"
            placeholder="Ex: Operador"
            value={cargo}
            onChange={(event) => setCargo(event.target.value)}
          />
        </div>

        <div>
          <label className="label" htmlFor="func-setor">
            Setor
          </label>
          <input
            id="func-setor"
            className="input"
            type="text"
            placeholder="Ex: Lavra"
            value={setor}
            onChange={(event) => setSetor(event.target.value)}
          />
        </div>

        <div>
          <label className="label" htmlFor="func-cidade">
            Cidade
          </label>
          <select
            id="func-cidade"
            className="select"
            value={cidadeId}
            onChange={(event) => setCidadeId(event.target.value)}
          >
            <option value="">Sem cidade</option>
            {cidades.map((cidade) => (
              <option key={cidade.id} value={cidade.id}>
                {cidade.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="actions">
        <button type="button" className="btn-primary" onClick={cadastrar}>
          <FaPlus aria-hidden="true" />
          Cadastrar funcionario
        </button>
      </div>

      <section className="panel">
        <div className="panel-header">
          <FaListUl aria-hidden="true" />
          Funcionários cadastrados
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Setor</th>
                <th>Cidade</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.length === 0 && (
                <tr>
                  <td colSpan="5">Nenhum funcionário cadastrado.</td>
                </tr>
              )}
              {funcionarios.map((funcionario) => (
                <tr key={funcionario.id}>
                  <td>{funcionario.id}</td>
                  <td>{funcionario.nome}</td>
                  <td>{funcionario.cargo}</td>
                  <td>{funcionario.setor || '-'}</td>
                  <td>{funcionario.cidades?.nome || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
