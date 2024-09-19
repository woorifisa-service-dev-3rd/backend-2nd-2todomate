import { instance } from './instance';

// 모든 다이어리 조회 (get, /api/diaries/list)
export const getDiaries = async() => {
  const response = await instance('diaries/list', {
    method: 'GET',
  });
  return response;
}

// 다이어리 추가 (post, /api/diaries/add)
export const addDiary = async ({ title, content }) => {
  const response = await instance('diaries/add', {
    body: JSON.stringify({ title, content }),
    method: 'POST',
  });
  return response;
}

// 다이어리 수정 (put, /api/diaries/{id})
export const updateDiary = async ({ id, title, content }) => {
  const response = await instance('diaries/${id}', {
    body: JSON.stringify({ title, content }),
    method: 'PUT',
  });
  return response;
}

// 다이어리 삭제 (post, /api/diaries/{id})
export const deleteDiary = async ({ id }) => {
  const response = await instance('diaries/${id}', {
    method: 'POST',
  });
  return response;
}
