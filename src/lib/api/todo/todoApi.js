import { fetchData, postData } from "../../lib/api.js";
import { API_URL, INSERT_TODO, SELECT_TODO } from "../apiURL.js";
import { formatDate } from "../../lib/utils/common.js";

// Todo 전체 조회
export async function findAll() {
  try {
    const getURL = `${API_URL}${SELECT_TODO.path}${SELECT_TODO.task}`; // ?

    const response = await fetchData(getURL); // ?

    if(response.status === 200) {
      const result = await response.json();
      const todoList = result.res;

      todoList.forEach(element => {
        element.created_at = formatDate(element.created_at);
      });

      return todoList;
    } else {
      console.error("Error >>> ", response);
    }

    
  } catch(e) {
    
  }
}

// Todo 단건 조회
export async function findById() {
  try {
    
  } catch(e) {

  }
}

// Todo 추가
export async function insertTodo() {
  try {

  } catch(e) {

  }
}