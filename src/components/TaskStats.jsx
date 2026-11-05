import React from 'react';

/**
 * Componente de Estatísticas (TaskStats)
 * Exibe um resumo com as contagens de tarefas pendentes, concluídas, agendadas e total.
 */
export function TaskStats({ pendingCount, completedCount, scheduledCount, totalCount }) {
  return (
    <div className="card-panel stats-panel">
      <div className="card-header">
        <h2 className="card-title">Resumo Geral</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card pending">
          <div className="stat-info">
            <span className="stat-label">Pendentes</span>
            <span className="stat-value">{pendingCount}</span>
          </div>
          <div className="stat-icon pending-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
        </div>

        <div className="stat-card completed">
          <div className="stat-info">
            <span className="stat-label">Concluídas</span>
            <span className="stat-value">{completedCount}</span>
          </div>
          <div className="stat-icon completed-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <div className="stat-card scheduled">
          <div className="stat-info">
            <span className="stat-label">Com Data</span>
            <span className="stat-value">{scheduledCount}</span>
          </div>
          <div className="stat-icon scheduled-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
        </div>

        <div className="stat-card total">
          <div className="stat-info">
            <span className="stat-label">Total</span>
            <span className="stat-value">{totalCount}</span>
          </div>
          <div className="stat-icon total-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
