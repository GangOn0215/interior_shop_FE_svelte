// stores/theme.js
import { writable } from 'svelte/store';

const browser = typeof window !== 'undefined';

// 초기 테마 설정 (로컬 스토리지 확인)
const storedTheme = "dark";
export const theme = writable(storedTheme);

// 테마 변경 함수
export function toggleTheme() {
  theme.update(currentTheme => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    return newTheme;
  });
}

// 현재 테마 설정 함수
export function setTheme(newTheme) {
  localStorage.setItem('theme', newTheme);
  theme.set(newTheme);
}