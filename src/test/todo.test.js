// src/routes/api.test.js
import { describe, it, expect } from 'vitest';
import { fetchData, postData } from '../lib/api.js';
import { INSERT_TODO, SELECT_TODO } from '../api/apiURL.js'; // 실제 파일 경로로 수정
import { findAll } from '../api/todo/todoApi.js'; // todo api

const API_URL = 'http://localhost:8080/api/v1';

describe('투두 API 통합 테스트', () => {
  // it('투두 추가 기능이 정상적으로 동작해야 함', async () => {
  //   const randomNumber = Math.floor(Math.random() * 1000);

  //   // 준비
  //   const data = {
  //     user_id: 1,
  //     title: `Title ${randomNumber}`,
  //     content: `Content ${randomNumber}`,
  //     complete: 'N',
  //     created_id: 1,
  //     created_ip: ''
  //   }; //?
    
  //   const postURL = `${API_URL}${INSERT_TODO.path}${INSERT_TODO.task}`; //?
    
  //   // 실행
  //   const result = await postData(postURL, data); //?
    
  //   // 검증
  //   expect(result).toHaveProperty('id');
  //   expect(result.title).toBe('제목');
  //   expect(result.content).toBe('내용');
  // });
  
  it('투두 조회 기능이 정상적으로 동작해야 함', async () => {
    // 준비
    const getURL = `${API_URL}${SELECT_TODO.path}${SELECT_TODO.task}`;
    
    // 실행
    const response = await fetchData(getURL); // ?
    const result = await response.json();

    console.log("Result >>> ", result);

    const todoList = result.res; //?

  });

  it('todoApi 모듈이 정상적으로 동작해야 함', async () => {
    // 준비
    
    // 실행
    const todoList = await findAll(); //?

    console.log(todoList); // ?
  });
});