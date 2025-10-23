// Инициализация данных
function initStorage() {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
      { username: 'admin', role: 'admin' }
    ]));
  }
  if (!localStorage.getItem('clients')) {
    localStorage.setItem('clients', JSON.stringify([]));
  }
  if (!localStorage.getItem('comments')) {
    localStorage.setItem('comments', JSON.stringify({}));
  }
}

// Пользователи
function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}
function addUser(username, role) {
  const users = getUsers();
  if (users.some(u => u.username === username)) return false;
  users.push({ username, role });
  localStorage.setItem('users', JSON.stringify(users));
  return true;
}
function removeUser(username) {
  const users = getUsers().filter(u => u.username !== username && u.username !== 'admin');
  localStorage.setItem('users', JSON.stringify(users));
}

// Клиенты
function getClients() {
  return JSON.parse(localStorage.getItem('clients') || '[]');
}
function saveClients(clients) {
  localStorage.setItem('clients', JSON.stringify(clients));
}
function addClient(client) {
  const clients = getClients();
  client.id = Date.now().toString();
  clients.push(client);
  saveClients(clients);
  return client.id;
}
function getClientById(id) {
  return getClients().find(c => c.id === id);
}
function updateClient(id, data) {
  const clients = getClients();
  const index = clients.findIndex(c => c.id === id);
  if (index !== -1) {
    clients[index] = { ...clients[index], ...data };
    saveClients(clients);
  }
}

// Комментарии
function getComments(clientId) {
  const all = JSON.parse(localStorage.getItem('comments') || '{}');
  return all[clientId] || [];
}
function addComment(clientId, text, author) {
  const all = JSON.parse(localStorage.getItem('comments') || '{}');
  if (!all[clientId]) all[clientId] = [];
  all[clientId].push({
    id: Date.now(),
    text,
    author,
    date: new Date().toLocaleString()
  });
  localStorage.setItem('comments', JSON.stringify(all));
}

// Проверка напоминаний
function checkReminders() {
  const now = new Date();
  const clients = getClients().filter(c => c.reminder && new Date(c.reminder) <= now);
  if (clients.length > 0) {
    const alert = document.createElement('div');
    alert.className = 'reminder-alert';
    alert.innerHTML = `🔔 ${clients.length} client(s) need attention!`;
    setTimeout(() => {
      if (document.body) document.body.appendChild(alert);
      setTimeout(() => alert.remove(), 5000);
    }, 1000);
  }
}