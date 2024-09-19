import { instance } from './instance';

// 로그인 데이터 보내기 
export const postUserData = async ({ username, password }) => {
    const response = await instance('users/login', {
        body: JSON.stringify({ username, password }),
        method: 'POST',
    });
    return response;
}