// import { fetchData, postData } from "$lib/api.js";
import { fetchData, postData } from "../../api.js";

// const API_URL = import.meta.env.VITE_API_PATH;
export const API_URL = "http://localhost:5173/api/v1";

// Insert Todo
export const INSERT_TODO = { 
  path: '/todo/insert',
  task: '00001',
}

// Select Todo
export const SELECT_TODO = {
  path: '/todo/select',
  task: '00001'
}

// Update Todo
export const UPDATE_TODO = {
  path: '/todo/update',
  task: '00001'
}

// Delete Todo
export const DELETE_TODO = {
  path: '/todo/delete',
  task: '00001'
}