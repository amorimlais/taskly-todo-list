import React from 'react';

/**
 * Componente de Cabeçalho (Header)
 * Exibe a marca da aplicação (taskly-todo-list), data formatada e subtítulo.
 */
export function Header() {
  const formattedDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="header-badge">
          <span className="badge-dot"></span>
          <span className="app-code-name">taskly-todo-list</span>
        </div>
        <h1 className="app-title">
          Taskly <span className="title-sub">• To-Do List</span>
        </h1>
        <p className="app-subtitle">Organize suas atividades diárias, prazos e próximos acontecimentos</p>
      </div>
      <div className="header-right">
        <div className="date-badge">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="current-date">{formattedDate}</span>
        </div>
      </div>
    </header>
  );
}
