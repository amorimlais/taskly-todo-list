import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TaskStats } from './components/TaskStats';
import { TaskForm } from './components/TaskForm';
import { FilterTabs } from './components/FilterTabs';
import { TaskList } from './components/TaskList';
import { getTodayDateString } from './utils/dateUtils';

const STORAGE_KEY = 'todo_app_tasks_agenda';

/**
 * Componente Principal da Aplicação (App)
 * Gerencia o estado das tarefas com data de acontecimento, busca e filtros.
 * Organizado em layout amplo de Dashboard para utilizar melhor o espaço da tela.
 */
export function App() {
  // 1. Estado da lista de tarefas
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (e) {
        console.error('Erro ao ler LocalStorage:', e);
      }
    }
    // Dados padrão iniciais
    const today = getTodayDateString();
    const futureDate = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

    return [
      {
        id: '1',
        text: 'Reunião de alinhamento com a equipe',
        dueDate: today,
        completed: false,
        createdAt: Date.now()
      },
      {
        id: '2',
        text: 'Apresentação do projeto e entrega de resultados',
        dueDate: futureDate,
        completed: false,
        createdAt: Date.now()
      },
      {
        id: '3',
        text: 'Revisar relatórios financeiros da semana',
        dueDate: '',
        completed: true,
        createdAt: Date.now()
      }
    ];
  });

  // 2. Filtro ativo e termo de busca
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 3. Persistência automática no LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // Ações de gerenciamento das tarefas
  const handleAddTask = (text, dueDate) => {
    const newTask = {
      id: Date.now().toString(),
      text,
      dueDate: dueDate || '',
      completed: false,
      createdAt: Date.now()
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Contadores para o painel de estatísticas
  const todayStr = getTodayDateString();
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;
  const scheduledCount = tasks.filter((t) => Boolean(t.dueDate)).length;

  // Filtragem e busca
  const filteredTasks = tasks.filter((task) => {
    // Filtro por texto de busca
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const taskText = (task.text || '').toLowerCase();
      const matchText = taskText.includes(query);
      const matchDate = task.dueDate ? task.dueDate.includes(query) : false;
      if (!matchText && !matchDate) return false;
    }

    // Filtros por aba
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    if (filter === 'today') return task.dueDate === todayStr;
    if (filter === 'scheduled') return Boolean(task.dueDate);

    return true; // 'all'
  });

  return (
    <div className="dashboard-container">
      {/* Cabeçalho amplo com data e identidade visual */}
      <Header />

      {/* Corpo principal em 2 colunas para preencher a tela */}
      <div className="dashboard-layout">
        {/* Coluna da Esquerda: Formulário de Adição + Painel de Métricas */}
        <aside className="dashboard-sidebar">
          <TaskForm onAddTask={handleAddTask} />
          <TaskStats
            pendingCount={pendingCount}
            completedCount={completedCount}
            scheduledCount={scheduledCount}
            totalCount={totalCount}
          />
        </aside>

        {/* Coluna da Direita: Barra de Ferramentas + Lista de Tarefas */}
        <main className="dashboard-main">
          {/* Barra de Filtros e Busca */}
          <div className="card-panel toolbar-panel">
            <div className="toolbar-top">
              <FilterTabs currentFilter={filter} onFilterChange={setFilter} />

              <div className="search-wrapper">
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
                  className="search-icon"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Pesquisar tarefas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="btn-clear-search"
                    onClick={() => setSearchQuery('')}
                    title="Limpar pesquisa"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="toolbar-info">
              <span>
                Exibindo <strong>{filteredTasks.length}</strong> {filteredTasks.length === 1 ? 'tarefa' : 'tarefas'}
              </span>
            </div>
          </div>

          {/* Lista de Tarefas / Acontecimentos */}
          <div className="card-panel tasks-panel">
            <TaskList
              tasks={filteredTasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
              activeFilter={filter}
              searchQuery={searchQuery}
            />
          </div>
        </main>
      </div>

      {/* Rodapé da aplicação */}
      <footer className="app-footer">
        <p>Gerenciador de Tarefas & Eventos</p>
      </footer>
    </div>
  );
}

export default App;
