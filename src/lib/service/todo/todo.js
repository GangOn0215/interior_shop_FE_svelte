/*
import { fetchData, postData } from "$lib/api.js";
import { API_URL, INSERT_TODO, SELECT_TODO } from "$lib/api/apiURL.js";
import { formatDate } from "$lib/utils/common.js";
*/

// Quokka 전용
import { fetchData, postData } from "../../api.js";
import { API_URL, INSERT_TODO, UPDATE_TODO, SELECT_TODO, DELETE_TODO } from "../../api/config/apiURL.js";
import { formatDate } from "../../utils/common.js";
import { Todo } from "../../model/TodoModel.js";

// 조회
export async function findAll() {
  try {
    const getURL = `${API_URL}${SELECT_TODO.path}${SELECT_TODO.task}`; // ?

    const response = await fetchData(getURL); // ?

    if(response.status === 200) {
      const result = await response.json();
      const todoList = result.res;

      todoList.forEach((element, index, array) => {
        element.created_at = formatDate(element.created_at);

        array[index] = new Todo(element);
      });

      return todoList;
    } else {
      console.error("Error >>> ", response);
    }

    
  } catch(e) {
    
  }
}

{{
  findAll();
}}

// 조회
export async function findById() {
  try {
    return await 1;
  } catch(e) {

  }
}

{{
  // findById()
}}

// 추가
export async function insertTodo(todo) {
  try {

    const postURL = `${API_URL}${INSERT_TODO.path}${INSERT_TODO.task}`; //?
    const response = await postData(postURL, todo); // ?
    const result = await response.json(); // ?

  } catch(e) {}
}

{{
  const todo = new Todo({
    user_id: 1,
    created_id: 1,
    title: "테스트",
    content: "테스트 내용",
    complete: "N"
  })
  
  // insertTodo(todo);
}}

// 업데이트
export async function updateTodo(todo) {
  try {
    const postURL = `${API_URL}${UPDATE_TODO.path}${UPDATE_TODO.task}`; //?
    const response = await postData(postURL, todo); // ?
    const result = await response.json(); // ?

  } catch(e) {
    
  }
}

export async function serviceDeleteTodo(id) {
  try {
    const postURL = `${API_URL}${DELETE_TODO.path}${DELETE_TODO.task}`; //?
    const response = await postData(postURL, {id: id}); // ?
    const result = await findAll(); // ?

    return result;
  } catch(e) {

  }
}
  
{{
  // serviceDeleteTodo({id: 835});
}}