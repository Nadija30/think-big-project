const themeSwitch = document.getElementById('themeSwitch');
const mobileThemeSwitch = document.getElementById('mobileThemeSwitch');
const body = document.body;
const mobileBody = document.querySelector('.mobile-menu');

// Функція для зміни теми
function toggleTheme() {
    body.classList.toggle('dark');
    mobileBody.classList.toggle('dark');
    const isDarkTheme = body.classList.contains('dark');
    // Зміна теми в localStorage
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    localStorage.setItem('mobileTheme', isDarkTheme ? 'dark' : 'light');
    // Зміна стилів в localStorage
    const switchStyle = themeSwitch.checked ? 'checked' : '';
    const mobileSwitchStyle = mobileThemeSwitch.checked ? 'checked' : '';
    localStorage.setItem('switchStyle', switchStyle);
    localStorage.setItem('mobileSwitchStyle', mobileSwitchStyle);
}
// Обробка кліку на чекбокс
themeSwitch.addEventListener('change', toggleTheme);
mobileThemeSwitch.addEventListener('change', toggleTheme);

// Застосування збереженої теми та стилів при завантаженні
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const savedMobileTheme = localStorage.getItem('mobileTheme');
    const savedSwitchStyle = localStorage.getItem('switchStyle');
    const savedMobileSwitchStyle = localStorage.getItem('mobileSwitchStyle');


    if (savedTheme === 'dark') {
        body.classList.add('dark');
    }

    if (savedMobileTheme === 'dark') {
        mobileBody.classList.add('dark');
    }

    if (savedSwitchStyle === 'checked') {
        themeSwitch.checked = true;
    }

    if (savedMobileSwitchStyle === 'checked') {
        mobileThemeSwitch.checked = true;
    }
});
