import React, { useState } from 'react';
import Menu from './components/Menu';
import Inicio from './pages/Inicio';
import Equipamentos from './pages/Equipamentos';
import Cidades from './pages/Cidades';
import Funcionarios from './pages/Funcionarios';
import Servicos from './pages/Servicos';

function App() {
	const [pagina, setPagina] = useState('inicio');

	return (
		<div className="app-shell">
			<header className="hero">
				<h1 className="hero-title">Centro Operacional Mineradora</h1>
				<p className="hero-subtitle">Controle de equipamentos, equipes e serviços em um único painel.</p>
			</header>

			<Menu pagina={pagina} setPagina={setPagina} />

			<main className="content-card">
				{pagina === 'inicio' && <Inicio />}
				{pagina === 'equipamentos' && <Equipamentos />}
				{pagina === 'cidades' && <Cidades />}
				{pagina === 'funcionarios' && <Funcionarios />}
				{pagina === 'servicos' && <Servicos />}
			</main>
		</div>
	);
}

export default App;