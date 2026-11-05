import React from 'react';
import { formatDueDate } from '../utils/dateUtils';

/**
 * Componente do Item de Tarefa (TaskItem)
 * Exibe a tarefa individual, data do acontecimento com badge inteligente,
 * checkbox customizado e botão de exclusão.
 */
export function TaskItem({ task, onToggle, onDelete }) {
  const dateInfo = task.dueDate ? formatDueDate(task.dueDate) : null;

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content-left">
        {/* Checkbox customizado */}
        <label
          className="task-checkbox-container"
          title={task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
        >
          <input
            type="checkbox"
            className="task-checkbox-input"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <span className="task-custom-checkbox">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        </label>

        {/* Informações da Tarefa */}
        <div className="task-details">
          <span className="task-text">{task.text}</span>
          
          {/* Badge da Data do Acontecimento */}
          {dateInfo && (
            <div className={`task-date-badge ${dateInfo.status}`} title={`Data agendada: ${task.dueDate}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>{dateInfo.label}</span>
            </div>
          )}
        </div>
      </div>

      {/* Ações (Botão Excluir) */}
      <div className="task-actions">
        <button
          type="button"
          className="btn-delete"
          title="Excluir tarefa"
          aria-label={`Excluir tarefa: ${task.text}`}
          onClick={() => onDelete(task.id)}
        >
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
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </button>
      </div>
    </li>
  );
}
