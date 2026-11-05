import React, { useState } from 'react';

/**
 * Componente do Formulário (TaskForm)
 * Permite cadastrar uma nova tarefa com texto e data de quando o acontecimento ocorrerá.
 * 
 * Props:
 * - onAddTask: function(text, dueDate)
 */
export function TaskForm({ onAddTask }) {
  const [inputText, setInputText] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = inputText.trim();
    if (!trimmed) return;

    // Dispara a criação passando o texto e a data agendada
    onAddTask(trimmed, dueDate);

    // Limpa os campos
    setInputText('');
    setDueDate('');
  };

  return (
    <div className="card-panel form-card">
      <div className="card-header">
        <h2 className="card-title">Novo Acontecimento / Tarefa</h2>
        <span className="card-subtitle">Preencha o título e agende a data</span>
      </div>

      <form className="task-form" onSubmit={handleSubmit} autoComplete="off">
        {/* Campo do Título da Tarefa */}
        <div className="form-group">
          <label htmlFor="taskTitle" className="form-label">
            O que precisa ser feito?
          </label>
          <div className="input-wrapper">
            <input
              id="taskTitle"
              type="text"
              className="task-input"
              placeholder="Ex: Reunião de equipe, pagar conta, entregar projeto..."
              maxLength={120}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Campo da Data do Acontecimento */}
        <div className="form-group">
          <label htmlFor="taskDate" className="form-label">
            Data do acontecimento (opcional):
          </label>
          <div className="date-input-wrapper">
            <input
              id="taskDate"
              type="date"
              className="task-date-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        {/* Botão de Adição */}
        <button type="submit" className="btn-add" aria-label="Adicionar tarefa">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Criar Tarefa</span>
        </button>
      </form>
    </div>
  );
}
