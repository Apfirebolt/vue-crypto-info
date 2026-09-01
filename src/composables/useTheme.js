// src/composables/useTheme.js
import { ref, onMounted } from 'vue';

const isDark = ref(false);

export function useTheme() {
  const applyTheme = (dark) => {
    isDark.value = dark;
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleTheme = () => {
    applyTheme(!isDark.value);
  };

  const initTheme = () => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved ? saved === 'dark' : prefersDark);
  };

  return {
    isDark,
    toggleTheme,
    initTheme,
  };
}