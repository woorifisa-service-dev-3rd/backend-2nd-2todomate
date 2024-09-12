"use client";
import LoginForm from "@/components/user/LoginForm";
import { postUserData } from '@/api/userApi';
import { useRouter } from "next/navigation"; 
 

export default function Page() {
  const router = useRouter();

  const handleLogin = async (credentials) => {
    const { username, password } = credentials;
    const response = await postUserData({ username, password });
    console.log('response',response);
    
    if (response.error) {
      alert('로그인 실패');
    } else {
      localStorage.setItem('username', username)
      router.push('/todo');
    }
  };
  

  return (
    <div className="min-h-screen bg-slate-500 flex items-center justify-center">
      <div className="w-full max-w-md p-7 space-y-8 bg-gray-700 rounded-xl shadow-md">
        <LoginForm onLogin={handleLogin} /> 
      </div>
    </div>
  );
}
