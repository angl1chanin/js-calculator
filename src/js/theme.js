const THEME_LIGHT_PATH = 'css/light.min.css';
const THEME_DARK_PATH = 'css/dark.min.css';
const ACTIVE_THEME = localStorage.getItem('theme');

let switcher = document.getElementById('checkbox');

switcher.addEventListener('click', () => {
    if (switcher.checked) {
        switchTheme(THEME_DARK_PATH);
    } else {
        switchTheme(THEME_LIGHT_PATH);
    }
})

let switchTheme = (themeModePath) => {
    document.querySelector('[title="theme"]').setAttribute('href', themeModePath);
    localStorage.setItem('theme',themeModePath);
};

if (ACTIVE_THEME === null) {
    switchTheme(THEME_LIGHT_PATH);
} else {
    switchTheme(ACTIVE_THEME);
    if (ACTIVE_THEME === THEME_DARK_PATH) {
        document.getElementById('checkbox').click();
    }
}
