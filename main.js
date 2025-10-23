document.addEventListener('DOMContentLoaded', function () {
  const role = localStorage.getItem('role');
  const user = localStorage.getItem('user');

  if (!role || !user) {
    if (!window.location.pathname.endsWith('index.html')) {
      window.location.href = 'index.html';
    }
    return;
  }

  // Отображение роли
  const roleEl = document.getElementById('userRole');
  if (roleEl) {
    roleEl.textContent = `Role: ${role.charAt(0).toUpperCase() + role.slice(1)}`;
  }

  // Показ админки
  const adminLink = document.getElementById('adminLink');
  if (adminLink && role === 'admin') {
    adminLink.style.display = 'block';
  }

  // Активная ссылка
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Проверка напоминаний (на всех страницах кроме логина)
  if (!currentPage.includes('index.html')) {
    checkReminders();
  }
});

function logout() {
  localStorage.removeItem('role');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

function copyToClipboard(id) {
  const el = document.getElementById(id);
  if (el) {
    const text = el.textContent.trim();
    if (text && text !== '—') {
      navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = original, 1000);
      });
    }
  }
}