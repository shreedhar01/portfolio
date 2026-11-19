const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const themeStorageKey = "theme";

let savedTheme;
try {
    savedTheme = window.localStorage.getItem(themeStorageKey);
} catch {
    // Theme switching still works when storage is unavailable.
}

if (savedTheme === "light" || savedTheme === "dark") {
    root.dataset.theme = savedTheme;
}

function isDarkTheme() {
    return root.dataset.theme ? root.dataset.theme === "dark" : systemTheme.matches;
}

function syncThemeToggle() {
    themeToggle.setAttribute("aria-pressed", String(isDarkTheme()));
}

syncThemeToggle();
themeToggle.hidden = false;
systemTheme.addEventListener("change", syncThemeToggle);

themeToggle.addEventListener("click", () => {
    root.dataset.theme = isDarkTheme() ? "light" : "dark";
    syncThemeToggle();

    try {
        window.localStorage.setItem(themeStorageKey, root.dataset.theme);
    } catch {
        // The current choice remains active for this page.
    }
});
