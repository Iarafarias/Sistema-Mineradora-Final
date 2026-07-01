import React, { useEffect, useState } from 'react';
import { FaCity, FaListUl, FaPlus } from 'react-icons/fa';
import { cidadeService } from '../services/api';

export default function Cidades() {
  const [cidades, setCidades] = useState([]);
  const [nome, setNome] = useState('');

  const carregarCidades = async () => {
    try {
      const response = await cidadeService.listar();
      setCidades(response.data);
    } catch (error) {
      console.error('Erro ao buscar cidades', error);
    }
  };

  useEffect(() => {
    carregarCidades();
  }, []);

  const cadastrar = async () => {
    if (!nome) {
      alert('Informe o nome da cidade.');
      return;
    }

    try {
      await cidadeService.criar({ nome });
      setNome('');
      carregarCidades();
    } catch (error) {
      console.error('Erro ao cadastrar cidade', error);
    }
  };

  return (
    <section>
      <div className="page-title-row">
        <FaCity className="title-icon" aria-hidden="true" />
        <h2 className="page-title">Gestão de Cidades</h2>
      </div>
      <p className="page-subtitle">Base territorial para alocação de equipes e serviços.</p>

      <div>
        <label className="label" htmlFor="cidade-nome">
          Nome da cidade
        </label>
        <input
          id="cidade-nome"
          className="input"
          type="text"
          placeholder="Ex: Parauapebas"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
      </div>

      <div className="actions">
        <button type="button" className="btn-primary" onClick={cadastrar}>
          <FaPlus aria-hidden="true" />
          Cadastrar cidade
        </button>
      </div>

      <section className="panel">
        <div className="panel-header">
          <FaListUl aria-hidden="true" />
          Cidades cadastradas
        </div>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
              </tr>
            </thead>
            <tbody>
              {cidades.length === 0 && (
                <tr>
                  <td colSpan="2">Nenhuma cidade cadastrada.</td>
                </tr>
              )}
              {cidades.map((cidade) => (
                <tr key={cidade.id}>
                  <td>{cidade.id}</td>
                  <td>{cidade.nome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
