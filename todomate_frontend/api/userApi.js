import { instance } from './instance';

// 로그인 데이터 보내기 
export default postUserData = async() => {
    const response = await instance('user', {
       method:'POST',  
    });
    return response;
}


