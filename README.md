# 📝 Gerenciador de Tarefas & Eventos (React + Vite)

Aplicação web moderna, responsiva e ampla para organização de tarefas, prazos e acontecimentos diários, desenvolvida com **React 18**, **Vite** e **CSS Puro**.

---

## ✨ Principais Funcionalidades

- **Agendamento de Acontecimentos / Prazos:** Permite definir a data de cada tarefa com badges inteligentes coloridos (*Hoje*, *Amanhã*, *Atrasada*, etc.).
- **Aproveitamento Total da Tela:** Layout de *Dashboard* em 2 colunas amplas (Sidebar para criação e métricas; Painel Principal para listagem e filtros).
- **Métricas em Tempo Real:** Total de tarefas, pendentes, concluídas e com data agendada.
- **Filtros Rápidos & Busca em Tempo Real:** Abas para ver *Todas*, *Pendentes*, *Concluídas*, *Para Hoje* e *Com Data*, além de campo de busca textual.
- **Persistência com LocalStorage:** Suas tarefas e datas permanecem salvas mesmo após atualizar o navegador.

---

## 🚀 Como Executar

No terminal, na pasta do projeto:

```bash
# Iniciar o servidor de desenvolvimento
npm run dev
```

Abra a URL indicada (geralmente `http://localhost:3000` ou `http://localhost:5173`) no navegador.

---

## 📁 Estrutura do Projeto

```
to-do/
├── index.html                 # Ponto de entrada HTML
├── src/
│   ├── main.jsx               # Ponto de inicialização do React
│   ├── App.jsx                # Componente mestre (estado, busca, persistência)
│   ├── index.css              # Estilos do Dashboard, temas e responsividade
│   ├── utils/
│   │   └── dateUtils.js       # Formatação e cálculo inteligente de datas
│   └── components/
│       ├── Header.jsx         # Cabeçalho com data atual e título
│       ├── TaskForm.jsx       # Formulário com descrição e seletor de data
│       ├── TaskStats.jsx      # Cards de resumo (Pendentes, Concluídas, etc.)
│       ├── FilterTabs.jsx     # Abas de filtro rápido
│       ├── TaskList.jsx       # Lista com renderização e estados vazios
│       └── TaskItem.jsx       # Card da tarefa com badge de data e ações
```
