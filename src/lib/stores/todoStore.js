import { writable } from 'svelte/store';
import { findAll } from '$lib/service/todo/todo.js';

export const todoStore = async (key, initial) => {
  // 브라우저 환경인지 확인 (SSR 대응)
  const browser = typeof window !== 'undefined';
  
  // todos 데이터를 가져온다는 가정하에
  const todoOBJ = await findAll();

  // writable 스토어 생성
  const store = writable(todoOBJ.newTodoList !== null ? todoOBJ.newTodoList : initial);

  // 스토어 값 변경 시 로컬 스토리지에 저장
  if (browser) {
    store.subscribe(value => {
    });
  }
  
  return store;
};

export const currentPage = writable(1);
export const pageInfo = writable({});