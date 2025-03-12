// import { fetchData, postData } from "$lib/api.js";
import { fetchData, postData } from "../api.js";

// const API_URL = import.meta.env.VITE_API_PATH;
export const API_URL = "http://localhost:5173/api/v1";

// 투두 추가
export const INSERT_TODO = { 
  path: '/todo/insert',
  task: '00001',
}

// 전체 검색
export const SELECT_TODO = {
  path: '/todo/select',
  task: '00001'
}
