import React from 'react';
import { FaChartBar, FaCity, FaClipboardList, FaHardHat, FaUsers } from 'react-icons/fa';

const itens = [
  { id: 'inicio', label: 'Início', icon: FaChartBar },
  { id: 'equipamentos', label: 'Equipamentos', icon: FaHardHat },
  { id: 'cidades', label: 'Cidades', icon: FaCity },
  { id: 'funcionarios', label: 'Funcionários', icon: FaUsers },
  { id: 'servicos', label: 'Serviços', icon: FaClipboardList },
];

export default function Menu({ pagina, setPagina }) {
  return (
    <nav className="menu-bar">
      {itens.map((item) => (
        <button key={item.id} type="button" className={`menu-btn ${pagina === item.id ? 'active' : ''}`} onClick={() => setPagina(item.id)}>
          <item.icon aria-hidden="true" />
          {item.label}
        </button>
      ))}
    </nav>
  );
}
