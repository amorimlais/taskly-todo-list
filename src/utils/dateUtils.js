/**
 * Utilitários para manipulação e formatação de datas
 */

/**
 * Retorna a data de hoje no formato YYYY-MM-DD para uso em inputs type="date"
 */
export function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formata a data do acontecimento de maneira inteligente e humana.
 * Ex: "Hoje", "Amanhã", "Atrasada (02/11)", "15 de nov."
 * 
 * @param {string} dateString - Formato 'YYYY-MM-DD'
 * @returns {object|null} { label, status }
 */
export function formatDueDate(dateString) {
  if (!dateString) return null;

  const parts = dateString.split('-');
  if (parts.length !== 3) return null;

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const targetDate = new Date(year, month, day);
  if (isNaN(targetDate.getTime())) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetZero = new Date(year, month, day);
  targetZero.setHours(0, 0, 0, 0);

  const diffMs = targetZero.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return { label: 'Hoje', status: 'today' };
  }
  if (diffDays === 1) {
    return { label: 'Amanhã', status: 'tomorrow' };
  }
  if (diffDays === -1) {
    return { label: 'Ontem (Atrasado)', status: 'overdue' };
  }
  if (diffDays < -1) {
    return {
      label: `Atrasada (${targetDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })})`,
      status: 'overdue'
    };
  }

  // Datas futuras: exibe ex: "15 nov" ou "15 nov 2027" se outro ano
  const isSameYear = targetDate.getFullYear() === today.getFullYear();
  const formatted = targetDate.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: isSameYear ? undefined : 'numeric'
  });

  return { label: formatted, status: 'upcoming' };
}

