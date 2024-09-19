'use server';

// import { session } from 'next/headers'; // 서버 사이드에서 세션을 처리하기 위한 내장 모듈
import { BASE_URL } from '@/constants/url';
import { cookies } from 'next/headers';

const fetchInstance = async (url, options = {}) => {
  const session = cookies().get('JSESSIONID');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (session) {
    headers['Cookie'] = `JSESSIONID=${session.value}`;
    headers['credentials'] = 'include';
  }

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
      console.log("하하하", response.headers.getSetCookie())

      const text = await response.text();
      return { ...text, cookie: response.headers.getSetCookie() }
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

export const instance = fetchInstance;
