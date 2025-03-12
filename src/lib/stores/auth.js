import { writable } from "svelte/store";

const initalState = {
  isAuth: false,
  user: null,
  token: null
}

export const authStore = writable(initalState);

export function login(userData, token) {
  authStore.update(store => {
    store.isAuth = true;
    store.user = userData;
    store.token = token;
  })
}

export function logout() {
  authStore.set(initalState);
  localStorage.removeItem('token');
}

export function checkAuth() {
  const token = localStorage.getItem('token');
  if (token) {
    fetchUserData(token).then(userData => {
      login(userData, token);
    });
  }
}

async function fetchUserData(token) {
  // 실제로는 API 호출을 통해 사용자 정보를 가져옵니다
  return { id: 1, name: '홍길동' };
}