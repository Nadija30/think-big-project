console.log('hello');

const headerSwitch = document.querySelector('.header-switch');
const body = document.body;

headerSwitch.addEventListener('change', () => {
    body.classList.toggle('dark');
    const isDarkTheme = body.classList.contains('dark');
    if (isDarkTheme) {
        localStorage.setItem('theme', 'dark');
        document.documentElement.style.setProperty(
            '--light-theme-text-color',
            '#fff'
        );
        document.documentElement.style.setProperty('--light-color', '#000');
        document.documentElement.style.setProperty(
            '--light-theme-semi-transparent-color',
            '#ffffff80'
        );
    } else {
        localStorage.setItem('theme', 'light');
        document.documentElement.style.setProperty(
            '--light-theme-text-color',
            '#000'
        );
        document.documentElement.style.setProperty('--light-color', '#fff');
        document.documentElement.style.setProperty(
            '--light-theme-semi-transparent-color',
            '#05050580'
        );
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        body.classList.add('dark');
    } else {
        body.classList.remove('dark');
    }
});
