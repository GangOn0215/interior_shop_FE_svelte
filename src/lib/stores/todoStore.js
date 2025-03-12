// localStore.js
import { writable } from 'svelte/store';
// import { findAll } from '@api/todo/todoApi';
import { findAll } from '$lib/service/todo/todo.js';

export const todoStore = async (key, initial) => {
  // 브라우저 환경인지 확인 (SSR 대응)
  const browser = typeof window !== 'undefined';
  
  // todos 데이터를 가져온다는 가정하에
  const storedValue = browser ? await findAll() : null;

  // writable 스토어 생성
  const store = writable(storedValue !== null ? storedValue : initial);
  
  // 스토어 값 변경 시 로컬 스토리지에 저장
  if (browser) {
    // 값이 바뀜
    store.subscribe(value => {
      // 만약 데이터를 업데이트 된 후, 기존에 있는 모든 storedValue를 지우고, 새로운 데이터를 가져온다면?
      console.log(value);

    });
  }
  
  return store;
};