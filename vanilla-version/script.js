/**
 * ==============================================================================
 * APLICAÇÃO TO-DO LIST (JAVASCRIPT PURO)
 * ==============================================================================
 * Este arquivo é responsável por toda a lógica de funcionamento e interatividade
 * da aplicação: gerenciar o estado das tarefas, manipular o DOM (HTML) e
 * persistir as informações no navegador do usuário utilizando o LocalStorage.
 */

// Chave utilizada para salvar os dados no LocalStorage
const STORAGE_KEY = 'todo_app_tasks';

// ------------------------------------------------------------------------------
// 1. ESTADO DA APLICAÇÃO (STATE)
// ------------------------------------------------------------------------------
// A variável 'tasks' guarda a lista de tarefas na memória enquanto a página roda.
let tasks = [];

// Guarda o filtro de visualização atual ('all', 'pending', 'completed')
let currentFilter = 'all';

// ------------------------------------------------------------------------------
// 2. REFERÊNCIAS AOS ELEMENTOS DO HTML (DOM)
// ------------------------------------------------------------------------------
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const pendingCountEl = document.getElementById('pendingCount');
const completedCountEl = document.getElementById('completedCount');
const totalCountEl = document.getElementById('totalCount');
const currentDateEl = document.getElementById('currentDate');
const filterButtons = document.querySelectorAll('.filter-btn');

// ------------------------------------------------------------------------------
// 3. PERSISTÊNCIA: LOCALSTORAGE
// ------------------------------------------------------------------------------

/**
 * Salva a lista de tarefas atual no LocalStorage do navegador.
 * Transforma o array de objetos em texto JSON.
 */
function saveTasksToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Carrega as tarefas salvas anteriormente no LocalStorage.
 * Se houver dados, converte de volta o texto JSON para array de objetos.
 */
function loadTasksFromLocalStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      tasks = JSON.parse(stored);
    } catch (error) {
      console.error('Erro ao ler dados do LocalStorage:', error);
      tasks = [];
    }
  } else {
    // Tarefas de exemplo para boas-vindas caso seja o primeiro acesso
    tasks = [
      { id: '1', text: 'Completar o desafio da Imersão IA', completed: false, createdAt: Date.now() },
      { id: '2', text: 'Entender a estrutura HTML, CSS e JS', completed: true, createdAt: Date.now() }
    ];
    saveTasksToLocalStorage();
  }
}

// ------------------------------------------------------------------------------
// 4. OPERAÇÕES DE TAREFAS (CRUD BÁSICO)
// ------------------------------------------------------------------------------

/**
 * Adiciona uma nova tarefa à lista.
 * @param {string} text - Descrição da tarefa digitada pelo usuário.
 */
function addTask(text) {
  const trimmedText = text.trim();
  
  // Validação: impede adição de textos vazios
  if (!trimmedText) return;

  const newTask = {
    id: Date.now().toString(), // Gera um ID único com base no timestamp atual
    text: trimmedText,
    completed: false,
    createdAt: Date.now()
  };

  // Adiciona a nova tarefa no início da lista
  tasks.unshift(newTask);

  // Persiste e atualiza a interface
  saveTasksToLocalStorage();
  render();
}

/**
 * Alterna o estado de uma tarefa entre concluída e pendente.
 * @param {string} id - O identificador único da tarefa.
 */
function toggleTaskStatus(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  saveTasksToLocalStorage();
  render();
}

/**
 * Remove uma tarefa da lista.
 * @param {string} id - O identificador único da tarefa a ser excluída.
 */
function deleteTask(id) {
  // Filtra mantendo apenas as tarefas que têm id diferente do que queremos remover
  tasks = tasks.filter(task => task.id !== id);

  saveTasksToLocalStorage();
  render();
}

// ------------------------------------------------------------------------------
// 5. ATUALIZAÇÃO DA INTERFACE (RENDERIZAÇÃO)
// ------------------------------------------------------------------------------

/**
 * Atualiza os contadores numéricos (Pendentes, Concluídas e Total).
 */
function updateCounters() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;

  pendingCountEl.textContent = pending;
  completedCountEl.textContent = completed;
  totalCountEl.textContent = total;
}

/**
 * Cria o elemento HTML de uma tarefa individual de forma segura contra XSS.
 * @param {Object} task - O objeto da tarefa { id, text, completed }
 * @returns {HTMLElement} - O elemento <li> pronto para ser inserido no DOM.
 */
function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = `task-item ${task.completed ? 'completed' : ''}`;
  li.dataset.id = task.id;

  // Lado esquerdo: Checkbox customizado + Texto
  const leftDiv = document.createElement('div');
  leftDiv.className = 'task-left';

  // Label para permitir clicar no checkbox
  const label = document.createElement('label');
  label.className = 'task-checkbox-container';
  label.title = task.completed ? 'Marcar como pendente' : 'Marcar como concluída';

  // Input checkbox real (escondido visualmente mas acessível)
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox-input';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => toggleTaskStatus(task.id));

  // Caixa visual customizada do checkbox
  const customBox = document.createElement('span');
  customBox.className = 'task-custom-checkbox';
  customBox.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  `;

  label.appendChild(checkbox);
  label.appendChild(customBox);

  // Texto da tarefa
  const textSpan = document.createElement('span');
  textSpan.className = 'task-text';
  textSpan.textContent = task.text; // textContent é seguro contra injeção de script (XSS)

  leftDiv.appendChild(label);
  leftDiv.appendChild(textSpan);

  // Botão de excluir (com ícone de lixeira SVG)
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-delete';
  deleteBtn.setAttribute('aria-label', `Excluir tarefa: ${task.text}`);
  deleteBtn.title = 'Excluir tarefa';
  deleteBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  `;
  deleteBtn.addEventListener('click', () => deleteTask(task.id));

  // Montagem final do item
  li.appendChild(leftDiv);
  li.appendChild(deleteBtn);

  return li;
}

/**
 * Função principal de renderização.
 * Filtra as tarefas, limpa o container e adiciona os itens na tela.
 */
function render() {
  // 1. Atualizar contadores
  updateCounters();

  // 2. Filtrar as tarefas conforme a aba selecionada
  let filteredTasks = tasks;
  if (currentFilter === 'pending') {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (currentFilter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  }

  // 3. Limpar a lista atual do DOM
  taskList.innerHTML = '';

  // 4. Exibir ou ocultar o estado vazio
  if (filteredTasks.length === 0) {
    emptyState.classList.add('visible');
  } else {
    emptyState.classList.remove('visible');
    // Adiciona cada tarefa filtrada à lista
    filteredTasks.forEach(task => {
      const taskElement = createTaskElement(task);
      taskList.appendChild(taskElement);
    });
  }
}

// ------------------------------------------------------------------------------
// 6. UTILITÁRIOS (Data formatada)
// ------------------------------------------------------------------------------

/**
 * Exibe a data de hoje formatada em português (ex: "Quinta-feira, 5 de novembro").
 */
function displayCurrentDate() {
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const today = new Date().toLocaleDateString('pt-BR', options);
  currentDateEl.textContent = today;
}

// ------------------------------------------------------------------------------
// 7. EVENT LISTENERS (Ouvintes de eventos do usuário)
// ------------------------------------------------------------------------------

/**
 * Configura os ouvintes de eventos da página.
 */
function setupEventListeners() {
  // Submissão do formulário para adicionar tarefa
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita o recarregamento padrão da página
    addTask(taskInput.value);
    taskInput.value = ''; // Limpa o campo de entrada
    taskInput.focus();    // Mantém o foco no campo para digitar a próxima
  });

  // Filtros (Todas, Pendentes, Concluídas)
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      currentFilter = button.dataset.filter;
      render();
    });
  });
}

// ------------------------------------------------------------------------------
// 8. INICIALIZAÇÃO DA APLICAÇÃO
// ------------------------------------------------------------------------------

/**
 * Ponto de partida: carrega dados e inicializa os componentes.
 */
function init() {
  displayCurrentDate();
  loadTasksFromLocalStorage();
  setupEventListeners();
  render();
}

// Executa a inicialização após o script ser carregado
init();

