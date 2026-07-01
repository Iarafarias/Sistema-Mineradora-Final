import React, { useState, useEffect } from 'react';
import { FaHardHat, FaListUl, FaPlus } from 'react-icons/fa';
import { equipamentoService } from '../services/api';

export default function Equipamentos() {
	const [equipamentos, setEquipamentos] = useState([]);
	const [nome, setNome] = useState('');
	const [setor, setSetor] = useState('');

	useEffect(() => {
		carregarEquipamentos();
	}, []);

	const carregarEquipamentos = async () => {
		try {
			const response = await equipamentoService.listar();
			setEquipamentos(response.data);
		} catch (error) {
			console.error('Erro ao buscar equipamentos', error);
		}
	};

	const cadastrar = async () => {
		if (!nome || !setor) {
			alert('Preencha todos os campos!');
			return;
		}

		try {
			await equipamentoService.criar({ nome, setor });
			setNome('');
			setSetor('');
			carregarEquipamentos();
		} catch (error) {
			console.error('Erro ao cadastrar', error);
		}
	};

	return (
		<section>
			<div className="page-title-row">
				<FaHardHat className="title-icon" aria-hidden="true" />
				<h2 className="page-title">Gestão de Equipamentos</h2>
			</div>
			<p className="page-subtitle">Cadastre e acompanhe os ativos mecânicos por setor de operação.</p>

			<div className="grid cols-2">
				<div>
					<label className="label" htmlFor="equip-nome">
						Nome do equipamento
					</label>
					<input
						id="equip-nome"
						className="input"
						type="text"
						placeholder="Ex: Escavadeira 320"
						value={nome}
						onChange={(event) => setNome(event.target.value)}
					/>
				</div>

				<div>
					<label className="label" htmlFor="equip-setor">
						Setor
					</label>
					<input
						id="equip-setor"
						className="input"
						type="text"
						placeholder="Ex: Extração"
						value={setor}
						onChange={(event) => setSetor(event.target.value)}
					/>
				</div>
			</div>

			<div className="actions">
				<button type="button" className="btn-primary" onClick={cadastrar}>
					<FaPlus aria-hidden="true" />
					Cadastrar equipamento
				</button>
			</div>

			<section className="panel">
				<div className="panel-header">
					<FaListUl aria-hidden="true" />
					Equipamentos cadastrados
				</div>
				<div className="table-wrap">
					<table className="table">
						<thead>
							<tr>
								<th>ID</th>
								<th>Nome</th>
								<th>Setor</th>
							</tr>
						</thead>
						<tbody>
							{equipamentos.length === 0 && (
								<tr>
									<td colSpan="3">Nenhum equipamento cadastrado.</td>
								</tr>
							)}
							{equipamentos.map((equipamento) => (
								<tr key={equipamento.id}>
									<td>{equipamento.id}</td>
									<td>{equipamento.nome}</td>
									<td>{equipamento.setor}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</section>
	);
}
