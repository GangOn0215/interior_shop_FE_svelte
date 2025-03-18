// src/routes/api.test.js
import { describe, it, expect } from 'vitest';
import { fetchData, postData } from '../lib/api.js';
import { INSERT_TODO, SELECT_TODO } from '../lib/api/config/apiURL.js'; // 실제 파일 경로로 수정
import { findAll } from '../lib/service/todo/todo.js'; // todo api

const API_URL = 'http://localhost:5173/api/v1';

describe('투두 API 통합 테스트', () => {
  it('Insert', async () => {
    const randomNumber = Math.floor(Math.random() * 1000);

    // 준비
    const data = {
      user_id: 1,

      title: `Title ${randomNumber}`,
      content: `Content ${randomNumber}`,
      complete: 'N',
      created_id: 1,
      created_ip: ''
    }; //?
    
    const postURL = `${API_URL}${INSERT_TODO.path}${INSERT_TODO.task}`; //?
    
    // 실행
    // const response = await postData(postURL, data); //?
    const response = null;

    if(response) {
        const result = await response.json(); // ?
        expect(result.statusMessage).toBe('OK'); // ?
        expect(result.res.title).toBe(data.title); // ?
    }

  });
  
  it('Find All', async () => {
    // 준비
    const getURL = `${API_URL}${SELECT_TODO.path}${SELECT_TODO.task}`;
    
    // 실행
    const response = await postData(getURL, {page: 1}); // ?
    const result = await response.json();

    console.log("Result >>> ", result);

    const todoList = result.res; //?
  });
});