import React from 'react';
import { TaskItem } from './TaskItem';

/**
 * Componente da Lista de Tarefas (TaskList)
 * Renderiza o conjunto de tarefas ou o estado vazio.
 */
export function TaskList({ tasks, onToggle, onDelete, activeFilter, searchQuery }) {
  if (tasks.length === 0) {
    let emptyMessage = 'Nenhuma tarefa cadastrada ainda.';
    let emptySub = 'Utilize o painel ao lado para adicionar seus compromissos e tarefas.';

    if (searchQuery) {
      emptyMessage = `Nenhum resultado para "${searchQuery}"`;
      emptySub = 'Tente buscar com outros termos ou limpe o campo de busca.';
    } else if (activeFilter === 'pending') {
      emptyMessage = 'Tudo em dia!';
      emptySub = 'Você não possui nenhuma tarefa pendente no momento.';
    } else if (activeFilter === 'completed') {
      emptyMessage = 'Nenhuma tarefa concluída';
      emptySub = 'Marque suas tarefas como concluídas para vê-las aqui.';
    } else if (activeFilter === 'today') {
      emptyMessage = 'Nenhuma tarefa agendada para hoje';
      emptySub = 'Adicione uma tarefa com a data de hoje para acompanhar seu dia.';
    } else if (activeFilter === 'scheduled') {
      emptyMessage = 'Nenhuma tarefa com data agendada';
      emptySub = 'Defina uma data ao cadastrar para planejar seus acontecimentos.';
    }

    return (
      <div className="empty-state">
        <div className="empty-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <path d="M9 14l2 2 4-4" />
          </svg>
        </div>
        <p className="empty-title">{emptyMessage}</p>
        <p className="empty-subtitle">{emptySub}</p>
      </div>
    );
  }

  return (
    <ul className="task-list" aria-live="polite">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
