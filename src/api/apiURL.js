// import { fetchData, postData } from "$lib/api";
import { fetchData, postData } from "../lib/api.js";

// const API_URL = import.meta.env.VITE_API_PATH;
const API_URL = 'http://localhost:3000/api/v1';

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


{
  // 투두 추가
  export async function insertTodo (data) {
    return postData(`${API_URL}${INSERT_TODO.path}${INSERT_TODO.task}`, data);
  }

  postData(
    `${API_URL}${INSERT_TODO.path}${INSERT_TODO.task}`, data
  );

  // 전체 검색
  // export async function selectTodo () {
  //   return fetchData(`${API_URL}${SELECT_TODO.path}${SELECT_TODO.task}`);
  // }
}