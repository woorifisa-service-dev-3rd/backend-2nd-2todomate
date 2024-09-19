'use server';

// import { session } from 'next/headers'; // 서버 사이드에서 세션을 처리하기 위한 내장 모듈
import { BASE_URL } from '@/constants/url';

const fetchInstance = async (url, options = {}) => {
  // 세션에서 사용자 정보를 가져옵니다.
  //   const userId = session().get('userId'); 

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  //   // 사용자 정보가 있는 경우에만 요청을 보냄
  //   if (userId) {
  //     // 필요한 경우 사용자 정보를 헤더에 추가할 수 있습니다.
  //     headers['X-User-Id'] = userId; 
  //   }

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
    });



    if (!response.ok) {
      if (response.headers.get('Content-Type')?.includes('application/json')) {
        const errorResponse = await response.json();
        return { error: errorResponse };
      }
      else {
        return { error: await response.text() };
      }
    }


    if (response.headers.get('Content-Type')?.includes('application/json')) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

export const instance = fetchInstance;
