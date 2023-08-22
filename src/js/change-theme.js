const themeSwitch = document.getElementById('themeSwitch');
const body = document.body;

// Функція для зміни теми
function toggleTheme() {
    body.classList.toggle('dark');
    const isDarkTheme = body.classList.contains('dark');
    
    // Зміна теми в localStorage
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    // Зміна стилів в localStorage
    const switchStyle = themeSwitch.checked ? 'checked' : '';
    localStorage.setItem('switchStyle', switchStyle);
}

// Обробка кліку на чекбокс
themeSwitch.addEventListener('change', toggleTheme);

// Застосування збереженої теми та стилів при завантаженні
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const savedSwitchStyle = localStorage.getItem('switchStyle');

    if (savedTheme === 'dark') {
        body.classList.add('dark');
    }

    if (savedSwitchStyle === 'checked') {
        themeSwitch.checked = true;
    }
});
