import React from 'react';
import { FaChartLine, FaClipboardList, FaHardHat, FaUsers } from 'react-icons/fa';

export default function Inicio() {
	return (
		<section>
			<div className="page-title-row">
				<FaChartLine className="title-icon" aria-hidden="true" />
				<h2 className="page-title">Visão Geral da Operação</h2>
			</div>
			<p className="page-subtitle">
				Acompanhe os principais módulos do sistema para manter a operação de campo organizada e rastreável.
			</p>

			<div className="metrics">
				<article className="metric">
					<div className="metric-label">
						<FaHardHat className="metric-icon" aria-hidden="true" />
						Módulo de Ativos
					</div>
					<div className="metric-value">Equipamentos</div>
				</article>
				<article className="metric">
					<div className="metric-label">
						<FaUsers className="metric-icon" aria-hidden="true" />
						Módulo de Pessoas
					</div>
					<div className="metric-value">Funcionários</div>
				</article>
				<article className="metric">
					<div className="metric-label">
						<FaClipboardList className="metric-icon" aria-hidden="true" />
						Módulo de Execução
					</div>
					<div className="metric-value">Serviços</div>
				</article>
			</div>
		</section>
	);
}
