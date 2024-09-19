'use server';

import { cookies } from 'next/headers';
import { instance } from './instance';

// 로그인 데이터 보내기 
export const postUserData = async({ username, password }) => {
    const response = await instance('users/login', {
        body: JSON.stringify({ username, password }),
        method: 'POST',
    });
    console.log(response);

    const cookie = response.cookie[0]?.split(";")[0].split("=")[1];
    console.log(cookie);

    cookies().set('JSESSIONID', cookie, {
        path: '/',
      maxAge: 60 * 60 * 24 * 31,
      sameSite: 'lax',
      httpOnly: true,
    })
    return response;
}