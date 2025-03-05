// localStore.js
import { writable } from 'svelte/store';

export const localStore = (key, initial) => {
  // 브라우저 환경인지 확인 (SSR 대응)
  const browser = typeof window !== 'undefined';
  
  // 로컬 스토리지에서 데이터 가져오기
  const storedValue = browser ? localStorage.getItem(key) : null;
  
  // writable 스토어 생성
  const store = writable(storedValue !== null ? JSON.parse(storedValue) : initial);
  
  // 스토어 값 변경 시 로컬 스토리지에 저장
  if (browser) {
    store.subscribe(value => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }
  
  return store;
};