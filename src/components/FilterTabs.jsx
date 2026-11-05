import React from 'react';

/**
 * Componente de Filtros (FilterTabs)
 * Permite filtrar por status ou tipo de agendamento.
 */
export function FilterTabs({ currentFilter, onFilterChange }) {
  const filters = [
    { key: 'all', label: 'Todas' },
    { key: 'pending', label: 'Pendentes' },
    { key: 'completed', label: 'Concluídas' },
    { key: 'today', label: 'Para Hoje' },
    { key: 'scheduled', label: 'Com Data' }
  ];

  return (
    <nav className="filter-tabs" aria-label="Filtrar tarefas">
      {filters.map((filter) => (
        <button
          key={filter.key}
          type="button"
          className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.key)}
        >
          {filter.label}
        </button>
      ))}
    </nav>
  );
}
