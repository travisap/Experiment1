// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const THEME_KEY = 'preferred-theme';
const LIGHT_THEME = 'light';
const DARK_THEME = 'dark';

// Initialize theme from localStorage or system preference
function initializeTheme() {
    let theme = localStorage.getItem(THEME_KEY);

    // If no saved preference, check system preference
    if (!theme) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = prefersDark ? DARK_THEME : LIGHT_THEME;
    }

    setTheme(theme);
}

// Set the theme and update the DOM
function setTheme(theme) {
    if (theme === DARK_THEME) {
        htmlElement.setAttribute('data-theme', DARK_THEME);
        localStorage.setItem(THEME_KEY, DARK_THEME);
        updateThemeIcon(DARK_THEME);
    } else {
        htmlElement.removeAttribute('data-theme');
        localStorage.setItem(THEME_KEY, LIGHT_THEME);
        updateThemeIcon(LIGHT_THEME);
    }
}

// Update the theme toggle button icon
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('.theme-icon');
    if (theme === DARK_THEME) {
        icon.textContent = '☀️';
    } else {
        icon.textContent = '🌙';
    }
}

// Get current theme
function getCurrentTheme() {
    return htmlElement.hasAttribute('data-theme') ? DARK_THEME : LIGHT_THEME;
}

// Toggle theme
function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    setTheme(newTheme);
}

// Event listener for theme toggle button
themeToggle.addEventListener('click', toggleTheme);

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const newTheme = e.matches ? DARK_THEME : LIGHT_THEME;
    setTheme(newTheme);
});

// Initialize theme on page load
initializeTheme();
