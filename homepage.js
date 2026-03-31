// -------------------------------------------
// Grab the dark mode toggle button
// -------------------------------------------
const darkModeToggle = document.getElementById('darkModeToggle');

// -------------------------------------------
// Utility: Apply light or dark theme
// -------------------------------------------
function applyTheme(mode) {
    const isDark = mode === 'dark';
    document.body.classList.toggle('dark-mode', isDark);
    darkModeToggle.textContent = isDark ? '☀️' : '🌙'; // Toggle icon
}

// -------------------------------------------
// Automatically apply theme based on time
// -------------------------------------------
function autoTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'manual') return; // Skip auto if manual mode set

    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    // Dark mode between 8:30 PM and 6:00 AM
    if (hour > 20 || (hour === 20 && minute >= 30) || hour < 6) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
}

// -------------------------------------------
// Manual toggle: click to switch theme
// -------------------------------------------
darkModeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', 'manual'); // Lock to manual mode
});

// -------------------------------------------
// Reset to auto mode on double-click
// -------------------------------------------
darkModeToggle.addEventListener('dblclick', () => {
    localStorage.removeItem('theme'); // Remove manual override
    autoTheme();
});

// -------------------------------------------
// Apply theme on initial load
// -------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    autoTheme();
});

// -------------------------------------------
// Re-evaluate theme every 5 minutes
// -------------------------------------------
setInterval(autoTheme, 5 * 60 * 1000);

// -------------------------------------------
// Popup functionality
// -------------------------------------------
const popup = document.getElementById('popup');
const popupCloseBtn = document.querySelector('.close-btn');
let popupCloseTimer;

function closePopup() {
  if (popup) {
    popup.style.display = 'none';
  }
  if (popupCloseTimer) {
    clearTimeout(popupCloseTimer);
  }
}

if (popupCloseBtn) {
  popupCloseBtn.addEventListener('click', closePopup);
}

window.addEventListener('DOMContentLoaded', () => {
  if (popup && popup.style.display !== 'none') {
    popupCloseTimer = setTimeout(closePopup, 5000);
  }
});
