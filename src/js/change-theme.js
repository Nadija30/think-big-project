const themeSwitch = document.getElementById('themeSwitch');
const body = document.body;

// Функція для зміни теми
function toggleTheme() {
    body.classList.toggle('dark');
    const isDarkTheme = body.classList.contains('dark');
    // Зміна теми в localStorage
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}
// Обробка кліку на чекбокс
themeSwitch.addEventListener('change', toggleTheme);

// Застосування збереженої теми при завантаженні
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        body.classList.add('dark');
    }
});
