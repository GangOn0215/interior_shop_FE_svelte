/*
import { fetchData, postData } from "$lib/api.js";
import { API_URL, INSERT_TODO, SELECT_TODO } from "$lib/api/apiURL.js";
import { formatDate } from "$lib/utils/common.js";
*/

// Quokka 전용
import { fetchData, postData } from "../../api.js"; 
import { API_URL, INSERT_TODO, UPDATE_TODO, SELECT_TODO, DELETE_TODO, SELECT_TODO_LAST_SEQUENCE } from "../../api/config/apiURL.js";
import { formatDate } from "../../utils/common.js";
import { Todo } from "../../model/TodoModel.js";

// const useDB = import.meta.env.VITE_USE_DATABASE;
const useDB = true;

// FE 만 쓴다면.
async function setPagenation(todoList, page = 1, setCurrentPage) {
  // 1. 총 갯수
  const totalCnt = todoList.length;
  // 2. 페이지당 보여줄 갯수
  const pageLimit = 10;
  // 3. 현재 페이지
  const currentPage = page; // 받아와야함 ?
  // 4. 총 페이지
  const totalPage = Math.ceil(totalCnt / pageLimit);
  // 5. 시작 페이지
  const startPage = Math.floor(currentPage / pageLimit) * pageLimit;
  // 6. 끝 페이지
  const endPage = Math.min(startPage + pageLimit - 1, totalPage);
  // 7. 시작 인덱스
  const startIndex = (currentPage - 1) * pageLimit;
  // 8. 끝 인덱스
  const endIndex = Math.min(startIndex + pageLimit - 1, totalCnt) + 1;
  
  if (setCurrentPage) {
    setCurrentPage(currentPage);
  }

  todoList = todoList.slice(startIndex, endIndex);

  return todoList;
}

// 조회
export async function findAll(page = 1, setCurrentPage) {

  try {
    const getURL = `${API_URL}${SELECT_TODO.path}${SELECT_TODO.task}`; // ?

    // const response = await fetchData(getURL); // ?
    const response = await postData(getURL, {pageNum: page}); // ?

    if(response.status === 200) {
      const result = await response.json();
      let todoList = result.res.list;

      // config 처리해서 pagination 같이 처리하기.

      if(!useDB) {
        todoList = await setPagenation(todoList, page, setCurrentPage);
      }

      // 1. created_at 날짜 형식 변경
      // 2. 받은 데이터 Todo 객체로 변환
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
  // const todoList = await findAll();
}}

// 조회
export async function findById() {
  try {
    return await 1;
  } catch(e) {

  }
}

{{
  // selectLastSequence();
}}

// 추가
export async function insertTodo(todo) {
  try {

    const postURL = `${API_URL}${INSERT_TODO.path}${INSERT_TODO.task}`; //?
    const response = await postData(postURL, todo); // ?
    const result = await response.json(); // ?

    return result.res;
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
    if (response.status === 200) {
      const result = await response.json();
      return result.res;
    } else {
      console.error("Error >>> ", response);
    }
  } catch (e) {
    console.error(e);
  }
}

export async function serviceDeleteTodo(id) {
  try {
    const postURL = `${API_URL}${DELETE_TODO.path}${DELETE_TODO.task}`; //?
    const response = await postData(postURL, { id: id }); // ?
    if (response.status === 200) {
      const result = await findAll(); // ?
      return result;
    } else {
      console.error("Error >>> ", response);
    }
  } catch (e) {
    console.error(e);
  }
}
  
{{
  // serviceDeleteTodo({id: 835});
}}