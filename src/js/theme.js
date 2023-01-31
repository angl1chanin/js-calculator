const THEME_LIGHT_PATH = 'css/light.min.css';
const THEME_DARK_PATH = 'css/dark.min.css';
const ACTIVE_THEME = localStorage.getItem('theme');

let switcher = document.getElementById('checkbox');

switcher.addEventListener('click', () => {
    switcher.checked ? switchTheme(THEME_DARK_PATH) : switchTheme(THEME_LIGHT_PATH);
})

let switchTheme = (themeModePath) => {
    document.querySelector('[title="theme"]').setAttribute('href', themeModePath);
    localStorage.setItem('theme',themeModePath);
};

ACTIVE_THEME === null ? switchTheme(THEME_LIGHT_PATH) : switchTheme(ACTIVE_THEME);

if (ACTIVE_THEME === THEME_DARK_PATH) {
    document.getElementById('checkbox').click();
}
